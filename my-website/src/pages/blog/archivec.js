import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
// 导入性能监控工具
import { PerformanceMonitor, PerformanceReport } from '../../components/blog/PerformanceMonitor';

// 导入样式组件
import {
  ArchiveContainer, ArchiveHeader, ArchiveTitle, ArchiveDescription,
  YearsNavigation, YearSection, PostList, PostsContainer, PostItemsWrapper,
  EmptyMessage, StatsBar, StatItem, StatValue, StatLabel, ActionButton,
  PaginationContainer, Pagination, PageInfo, PageControls, LoadingIndicator,
  LoadingContainer, CSSReset, PaginationWrapper, SearchContainer, SearchInput,
  SearchStats, NoResults
} from '../../styles/BlogArchiveStyles';

// 导入自定义hooks
import useDebounce from '../../hooks/useDebounce';
import useThrottledRAF from '../../hooks/useThrottledRAF';

// 导入拆分出的组件
import LazyImage from '../../components/blog/LazyImage';
import MemoizedYearLink from '../../components/blog/YearLinkButton';
import MemoizedPostItem from '../../components/blog/BlogPostItem';
import YearSectionHeader from '../../components/blog/YearSectionHeader';
import MemoizedPageButton from '../../components/blog/PageButton';

// 导入博客服务
import blogService from '../../services/blog/blogService';

// 导入上下文Provider和hook
import { BlogArchiveProvider, useBlogArchive } from '../../context/BlogArchiveContext';

// 页面控制设置
const POSTS_PER_PAGE = 5; // 每页显示的文章数量，从10改为5，使分页效果更明显

// 博客归档内容组件
function BlogArchiveContent() {
  const { siteConfig } = useDocusaurusContext();
  const {
    // 状态
    activeYear,
    isLoading,
    isContentVisible,
    yearStates,
    searchQuery,
    debouncedSearchQuery,
    showPerformance,
    visibleYears,
    filteredPosts,
    postsByYear,
    years,
    
    // 操作
    setSearchQuery,
    scrollToYear,
    toggleYearExpansion,
    expandAllYears,
    collapseAllYears,
    changePage,
    getPaginatedPosts,
    setShowPerformance
  } = useBlogArchive();

  // 渲染分页
  const renderPagination = (year) => {
    const posts = postsByYear[year] || [];
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const currentPage = yearStates[year]?.currentPage || 1;
    
    if (totalPages <= 1) {
      return null;
    }
    
    // 优化页码按钮生成逻辑
    const pageButtons = [];
    const maxVisiblePages = 5;
    
    // 计算要显示哪些页码按钮
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
    
    // 添加首页按钮
    if (startPage > 1) {
      pageButtons.push(
        <MemoizedPageButton
          key={`${year}-page-1`}
          onClick={() => changePage(year, 1)}
          active={currentPage === 1}
        >
          1
        </MemoizedPageButton>
      );
      
      // 添加省略号
      if (startPage > 2) {
        pageButtons.push(<PageInfo key={`${year}-ellipsis-1`}>...</PageInfo>);
      }
    }
    
    // 优化中间页码按钮生成
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <MemoizedPageButton
          key={`${year}-page-${i}`}
          onClick={() => changePage(year, i)}
          active={currentPage === i}
        >
          {i}
        </MemoizedPageButton>
      );
    }
    
    // 添加尾页按钮
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(<PageInfo key={`${year}-ellipsis-2`}>...</PageInfo>);
      }
      
      pageButtons.push(
        <MemoizedPageButton
          key={`${year}-page-${totalPages}`}
          onClick={() => changePage(year, totalPages)}
          active={currentPage === totalPages}
        >
          {totalPages}
        </MemoizedPageButton>
      );
    }
    
    return (
      <PaginationContainer>
        <Pagination>
          <PageControls>
            <MemoizedPageButton
              onClick={() => changePage(year, currentPage - 1)}
              disabled={currentPage === 1}
            >
              &#8592;
            </MemoizedPageButton>
            {pageButtons}
            <MemoizedPageButton
              onClick={() => changePage(year, currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &#8594;
            </MemoizedPageButton>
          </PageControls>
          <PageInfo>
            {`第 ${currentPage} 页，共 ${totalPages} 页 (${posts.length} 篇文章)`}
          </PageInfo>
        </Pagination>
      </PaginationContainer>
    );
  };

  // 渲染年份内容
  const renderYearContent = (year) => {
    // 如果年份未展开，返回 null
    if (!yearStates[year]?.isExpanded) {
      return null;
    }
    
    const posts = getPaginatedPosts(year);
    const isTransitioning = yearStates[year]?.isTransitioning;
    
    return (
      <PostsContainer expanded={true}>
        <PostItemsWrapper transitioning={isTransitioning}>
          <LoadingIndicator visible={isTransitioning} />
          {posts.map((post, index) => (
            <MemoizedPostItem 
              key={`${post.permalink}-${index}`}
              post={post}
            />
          ))}
        </PostItemsWrapper>
        <PaginationWrapper>
          {renderPagination(year)}
        </PaginationWrapper>
      </PostsContainer>
    );
  };

  // 渲染年份链接
  const renderYearLinks = () => {
    if (!years || !years.length) return null;
    
    return years.map(year => (
      <MemoizedYearLink
        key={year}
        year={year}
        count={(postsByYear[year] || []).length}
        onClick={() => scrollToYear(year)}
        active={activeYear === year}
      />
    ));
  };

  // 渲染年份区块
  const renderYearSections = () => {
    if (!years || !years.length) return null;
    
    // 仅在需要时渲染，避免一次性渲染所有内容
    return years.map(year => {
      const isExpanded = yearStates[year]?.isExpanded;
      const isVisible = visibleYears.has(year);
      const shouldRenderContent = isExpanded || isVisible;
      
      return (
        <YearSection key={year} id={`year-${year}`}>
          <YearSectionHeader
            year={year}
            count={(postsByYear[year] || []).length}
            isExpanded={isExpanded}
            onToggle={() => toggleYearExpansion(year)}
          />
          <PostList expanded={isExpanded}>
            {shouldRenderContent ? renderYearContent(year) : null}
          </PostList>
        </YearSection>
      );
    });
  };

  // 使用 Loading 条件渲染
  if (isLoading) {
    return (
      <LoadingContainer isExiting={!isLoading}>
        <LoadingIndicator visible={true} />
      </LoadingContainer>
    );
  }

  return (
    <CSSReset>
      <ArchiveContainer isVisible={isContentVisible}>
        <ArchiveHeader>
          <ArchiveTitle>博客归档</ArchiveTitle>
          <ArchiveDescription>
            探索技术文章宝库，按时间整理的开发知识
          </ArchiveDescription>
        </ArchiveHeader>

        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="搜索文章标题、标签或日期..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchStats>
            找到 {filteredPosts.length} 篇文章
            {debouncedSearchQuery && ` (搜索："${debouncedSearchQuery}")`}
          </SearchStats>
        </SearchContainer>
        
        {years.length > 0 ? (
          <>
            <StatsBar>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <StatItem>
                  <StatValue>{filteredPosts.length}</StatValue>
                  <StatLabel>{debouncedSearchQuery ? '搜索结果' : '文章总数'}</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{years.length}</StatValue>
                  <StatLabel>年份跨度</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>
                    {years.length ? (filteredPosts.length / years.length).toFixed(1) : '0.0'}
                  </StatValue>
                  <StatLabel>年均文章</StatLabel>
                </StatItem>
              </div>
              <div>
                <ActionButton onClick={expandAllYears}>展开全部</ActionButton>
                <ActionButton onClick={collapseAllYears}>折叠全部</ActionButton>
              </div>
            </StatsBar>

            <YearsNavigation>
              {renderYearLinks()}
            </YearsNavigation>

            {renderYearSections()}
          </>
        ) : (
          <NoResults>
            <h3>未找到匹配的文章</h3>
            <p>
              {debouncedSearchQuery 
                ? `没有找到包含 "${debouncedSearchQuery}" 的文章，请尝试其他关键词。` 
                : '暂无博客文章。'}
            </p>
          </NoResults>
        )}
        
        {/* 开发环境中显示性能报告 */}
        {process.env.NODE_ENV === 'development' && <PerformanceReport showPerformance={showPerformance} onClose={() => setShowPerformance(false)} />}
      </ArchiveContainer>
    </CSSReset>
  );
}

// 博客归档主组件 - 提供上下文
export default function BlogArchive() {
  return (
    <Layout
      title="博客归档"
      description="浏览所有博客文章按时间顺序排列">
      <BlogArchiveProvider>
        <BlogArchiveContent />
      </BlogArchiveProvider>
    </Layout>
  );
} 