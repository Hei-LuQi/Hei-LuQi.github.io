import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styled from '@emotion/styled';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// 自定义样式组件
const ArchiveContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ArchiveHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(90deg, #4285f4, #6ea2f7);
  padding: 3rem 1rem;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.2);
`;

const ArchiveTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const ArchiveDescription = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

const YearsNavigation = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--ifm-card-background-color);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 70px;
  z-index: 10;
`;

const YearLink = styled.a`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: ${props => props.active ? 'rgba(66, 133, 244, 0.2)' : 'transparent'};
  color: var(--ifm-color-content);
  font-weight: ${props => props.active ? '600' : 'normal'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(66, 133, 244, 0.1);
    color: #4285f4;
    text-decoration: none;
  }
`;

const YearSection = styled.div`
  margin-bottom: 3rem;
  scroll-margin-top: 140px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const YearHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: var(--ifm-card-background-color);
  cursor: pointer;
  border-bottom: ${props => props.expanded ? '1px solid rgba(0, 0, 0, 0.05)' : 'none'};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(66, 133, 244, 0.05);
  }
`;

const YearTitle = styled.h2`
  font-size: 1.8rem;
  margin: 0;
  color: #4285f4;
  display: flex;
  align-items: center;
`;

const YearCount = styled.span`
  font-size: 1.1rem;
  color: var(--ifm-color-emphasis-600);
  margin-left: 1rem;
  font-weight: normal;
`;

const ExpandIcon = styled.span`
  font-size: 1.5rem;
  transition: transform 0.3s ease;
  transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const PostList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: ${props => props.expanded ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
`;

const PostsContainer = styled.div`
  height: ${props => props.expanded ? '460px' : '0'};  /* 固定高度：360px内容 + 100px分页 */
  min-height: ${props => props.expanded ? '460px' : '0'};
  max-height: ${props => props.expanded ? '460px' : '0'};
  display: flex;
  flex-direction: column;
  background-color: var(--ifm-card-background-color);
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
`;

const PostItemsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 360px;
  min-height: 360px;
  max-height: 360px;
  transition: opacity 0.3s ease;
  opacity: ${props => props.transitioning ? 0.5 : 1};
  overflow: hidden;
  padding: 0;
  margin: 0;
`;

const PostItem = styled.li`
  display: flex;
  align-items: center;
  margin: 0; /* 完全移除外边距 */
  padding: 0 1.5rem; /* 只保留左右内边距 */
  transition: all 0.3s ease;
  background-color: var(--ifm-card-background-color);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  height: 60px; /* 完全固定高度 */
  min-height: 60px;
  max-height: 60px;
  box-sizing: border-box; /* 确保padding不影响高度计算 */
  overflow: hidden; /* 确保内容不会溢出 */

  &:hover {
    background-color: rgba(66, 133, 244, 0.05);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 1.5rem;
    height: 80px; /* 移动设备上的固定高度 */
    min-height: 80px;
    max-height: 80px;
  }
`;

const PostDate = styled.span`
  width: 110px;
  min-width: 110px;
  max-width: 110px;
  font-family: monospace;
  color: var(--ifm-color-emphasis-600);
  text-align: left;
  height: 20px;
  line-height: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-top: 10px;
    width: 100%;
    max-width: 100%;
    height: 20px;
    line-height: 20px;
  }
`;

const PostLink = styled(Link)`
  color: var(--ifm-color-content);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  max-width: 500px;
  position: relative;
  height: 20px;
  line-height: 20px;

  &:hover {
    color: #4285f4;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 20px;
    line-height: 20px;
  }
`;

const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  gap: 0.5rem;
  height: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 5px;
    height: 20px;
    width: 100%;
  }
`;

const Tag = styled.span`
  background-color: rgba(66, 133, 244, 0.1);
  color: #4285f4;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--ifm-card-background-color);
  border-radius: 8px;
  margin: 2rem 0;
`;

const StatsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--ifm-card-background-color);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #4285f4;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--ifm-color-emphasis-600);
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? '#4285f4' : 'rgba(66, 133, 244, 0.1)'};
  color: ${props => props.primary ? 'white' : '#4285f4'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#3b77db' : 'rgba(66, 133, 244, 0.2)'};
  }
`;

// 完全控制分页容器样式
const PaginationContainer = styled.div`
  height: 100px;
  min-height: 100px;
  max-height: 100px;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  background-color: var(--ifm-card-background-color);
  overflow: hidden;
  position: relative;
`;

// 完全控制分页组件样式
const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  flex-wrap: nowrap;
  height: 60px;
  min-height: 60px;
  max-height: 60px;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: 90px;
    min-height: 90px;
    max-height: 90px;
    padding: 0.25rem 1rem;
    justify-content: center;
    gap: 0.5rem;
  }
`;

// 控制页码按钮
const PageButton = styled.button`
  background-color: ${props => props.active ? 'rgba(66, 133, 244, 0.2)' : 'transparent'};
  color: ${props => props.active ? '#4285f4' : 'var(--ifm-color-content)'};
  border: ${props => props.active ? '1px solid #4285f4' : '1px solid rgba(0, 0, 0, 0.05)'};
  padding: 0.4rem 0.8rem;
  margin: 0 0.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  min-width: 2.2rem;
  height: 36px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(66, 133, 244, 0.1);
    color: #4285f4;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: transparent;
    color: var(--ifm-color-content-secondary);
    &:hover {
      background-color: transparent;
      color: var(--ifm-color-content-secondary);
    }
  }
`;

const PageInfo = styled.span`
  margin: 0 1rem;
  color: var(--ifm-color-content-secondary);
  font-size: 0.9rem;
`;

const PageControls = styled.div`
  display: flex;
  align-items: center;
`;

// 页面控制设置
const POSTS_PER_PAGE = 5; // 每页显示的文章数量，从10改为5，使分页效果更明显

// 添加加载指示器
const LoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid rgba(66, 133, 244, 0.1);
  border-top-color: #4285f4;
  animation: spin 1s linear infinite;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s ease;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  
  @keyframes spin {
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

// 添加一个CSSReset组件，用于防止任何全局样式影响我们的固定高度
const CSSReset = styled.div`
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

// 进一步修改PostsContainer来确保子元素不会改变布局
const PaginationWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  min-height: 100px;
  max-height: 100px;
`;

/**
 * 获取所有博客文章
 * @returns {Array} 博客文章数组
 */
function getAllPosts() {
  try {
    // 获取当前文件的绝对路径
    const blogDir = require.context('../../../blog/', true, /.*\.md$|.*\.mdx$/);
    const blogFiles = blogDir.keys();
    
    const posts = [];
    
    // 遍历所有博客文件
    blogFiles.forEach(relativePath => {
      try {
        const content = blogDir(relativePath);
        // 检查是否有元数据
        if (content.metadata) {
          const metadata = content.metadata;
          posts.push({
            title: metadata.title,
            permalink: metadata.permalink,
            date: new Date(metadata.date),
            tags: metadata.tags || [],
            formattedDate: metadata.formattedDate
          });
        }
      } catch (e) {
        console.error(`Error processing blog file ${relativePath}:`, e);
      }
    });
    
    // 按日期降序排序
    return posts.sort((a, b) => b.date - a.date);
  } catch (e) {
    console.error('Failed to load blog posts using require.context:', e);
    // 如果require.context不可用，提供一些样例数据
    return [
      {
        title: '找不到博客文章',
        permalink: '#',
        date: new Date(),
        formattedDate: new Date().toLocaleDateString('zh-CN', { month: 'short', day: '2-digit' }),
        tags: [{ label: '错误' }],
      },
      {
        title: '请检查控制台错误',
        permalink: '#',
        date: new Date(),
        formattedDate: new Date().toLocaleDateString('zh-CN', { month: 'short', day: '2-digit' }),
        tags: [{ label: '提示' }],
      },
    ];
  }
}




export default function BlogArchive() {
  const { siteConfig } = useDocusaurusContext();
  const [activeYear, setActiveYear] = useState(null);
  const [expandedYears, setExpandedYears] = useState({});
  const [currentPages, setCurrentPages] = useState({});
  const [transitioning, setTransitioning] = useState({});
  
  // 获取所有博客文章
  const allPosts = getAllPosts();
  
  // 按年份组织文章
  const postsByYear = {};
  
  allPosts.forEach(post => {
    const year = post.date.getFullYear();
    
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    
    postsByYear[year].push(post);
  });
  
  // 年份排序（降序）
  const years = Object.keys(postsByYear).sort((a, b) => b - a);
  
  // 在首次加载时展开第一个年份并初始化分页
  useEffect(() => {
    if (years.length > 0) {
      const initialYear = years[0];
      setExpandedYears({ [initialYear]: true });
      setActiveYear(initialYear);
      
      // 初始化每个年份的当前页为第1页
      const initialPages = {};
      const initialTransitioning = {}; // 初始化过渡状态
      years.forEach(year => {
        initialPages[year] = 1;
        initialTransitioning[year] = false;
      });
      setCurrentPages(initialPages);
      setTransitioning(initialTransitioning);
    }
  }, []);
  
  // 格式化日期
  const formatDate = (date) => {
    const options = { month: 'short', day: '2-digit' };
    return date.toLocaleDateString('zh-CN', options);
  };

  // 滚动到特定年份区域
  const scrollToYear = (year) => {
    setActiveYear(year);
    
    // 确保展开被点击的年份
    setExpandedYears(prev => ({
      ...prev,
      [year]: true
    }));
    
    const element = document.getElementById(`year-${year}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // 切换年份展开/折叠状态
  const toggleYearExpansion = (year) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };
  
  // 展开所有年份
  const expandAllYears = () => {
    const allExpanded = {};
    years.forEach(year => {
      allExpanded[year] = true;
    });
    setExpandedYears(allExpanded);
  };
  
  // 折叠所有年份
  const collapseAllYears = () => {
    setExpandedYears({});
  };
  
  // 添加防抖变量防止快速点击导致问题
  const [isChangingPage, setIsChangingPage] = useState(false);
  
  // 修改changePage函数，添加全局防抖保护
  const changePage = (year, pageNumber) => {
    // 如果正在切换页面或特定年份正在过渡，忽略点击
    if (isChangingPage || transitioning[year]) return;
    
    // 设置全局防抖
    setIsChangingPage(true);
    
    // 设置过渡状态为true
    setTransitioning(prev => ({
      ...prev,
      [year]: true
    }));
    
    // 延迟更新页码，创建淡出淡入效果
    setTimeout(() => {
      setCurrentPages(prev => ({
        ...prev,
        [year]: pageNumber
      }));
      
      // 完成过渡
      setTimeout(() => {
        setTransitioning(prev => ({
          ...prev,
          [year]: false
        }));
        
        // 解锁防抖
        setIsChangingPage(false);
      }, 300);
    }, 150);
  };
  
  // 获取指定年份的分页后的文章
  const getPaginatedPosts = (year) => {
    const posts = postsByYear[year] || [];
    const currentPage = currentPages[year] || 1;
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    
    return posts
      .sort((a, b) => b.date - a.date)
      .slice(startIndex, endIndex);
  };
  
  // 生成分页控件
  const renderPagination = (year) => {
    const posts = postsByYear[year] || [];
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const currentPage = currentPages[year] || 1;
    
    if (totalPages <= 1) {
      return null; // 如果只有一页，不显示分页控件
    }
    
    // 生成页码按钮
    const pageButtons = [];
    const maxVisiblePages = 5; // 最多显示的页码按钮数
    
    // 计算显示的页码范围
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // 调整起始页，确保显示足够数量的页码
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
    
    // 添加首页按钮
    if (startPage > 1) {
      pageButtons.push(
        <PageButton
          key={`${year}-page-1`}
          onClick={() => changePage(year, 1)}
          active={currentPage === 1}
        >
          1
        </PageButton>
      );
      
      // 添加省略号
      if (startPage > 2) {
        pageButtons.push(<PageInfo key={`${year}-ellipsis-1`}>...</PageInfo>);
      }
    }
    
    // 添加中间的页码按钮
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <PageButton
          key={`${year}-page-${i}`}
          onClick={() => changePage(year, i)}
          active={currentPage === i}
        >
          {i}
        </PageButton>
      );
    }
    
    // 添加尾页按钮
    if (endPage < totalPages) {
      // 添加省略号
      if (endPage < totalPages - 1) {
        pageButtons.push(<PageInfo key={`${year}-ellipsis-2`}>...</PageInfo>);
      }
      
      pageButtons.push(
        <PageButton
          key={`${year}-page-${totalPages}`}
          onClick={() => changePage(year, totalPages)}
          active={currentPage === totalPages}
        >
          {totalPages}
        </PageButton>
      );
    }
    
    return (
      <PaginationContainer>
        <Pagination>
          <PageControls>
            <PageButton
              onClick={() => changePage(year, currentPage - 1)}
              disabled={currentPage === 1}
            >
              &#8592;
            </PageButton>
            
            {pageButtons}
            
            <PageButton
              onClick={() => changePage(year, currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &#8594;
            </PageButton>
          </PageControls>
          <PageInfo>
            {`第 ${currentPage} 页，共 ${totalPages} 页 (${posts.length} 篇文章)`}
          </PageInfo>
        </Pagination>
      </PaginationContainer>
    );
  };
  
  // 计算统计数据
  const totalPosts = allPosts.length;
  const totalYears = years.length;
  const postsPerYear = totalYears ? (totalPosts / totalYears).toFixed(1) : 0;
  
  const mostRecentYear = years.length > 0 ? years[0] : '';
  const mostRecentPostCount = mostRecentYear ? postsByYear[mostRecentYear].length : 0;

  return (
    <Layout
      title="博客归档"
      description="浏览所有博客文章按时间顺序排列">
      <CSSReset>
        <ArchiveContainer>
          <ArchiveHeader>
            <ArchiveTitle>博客归档</ArchiveTitle>
            <ArchiveDescription>
              探索技术文章宝库，按时间整理的开发知识
            </ArchiveDescription>
          </ArchiveHeader>
          
          {years.length > 0 && (
            <>
              <StatsBar>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <StatItem>
                    <StatValue>{totalPosts}</StatValue>
                    <StatLabel>文章总数</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatValue>{totalYears}</StatValue>
                    <StatLabel>年份跨度</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatValue>{postsPerYear}</StatValue>
                    <StatLabel>年均文章</StatLabel>
                  </StatItem>
                </div>
                <div>
                  <ActionButton onClick={expandAllYears}>展开全部</ActionButton>
                  <ActionButton onClick={collapseAllYears}>折叠全部</ActionButton>
                </div>
              </StatsBar>
              
              <YearsNavigation>
                {years.map(year => (
                  <YearLink 
                    key={year} 
                    onClick={() => scrollToYear(year)}
                    active={activeYear === year}
                  >
                    {year} <span style={{opacity: 0.7, fontSize: '0.9em'}}>({postsByYear[year].length})</span>
                  </YearLink>
                ))}
              </YearsNavigation>
            </>
          )}

          {years.length > 0 ? (
            years.map(year => (
              <YearSection key={year} id={`year-${year}`}>
                <YearHeader 
                  expanded={expandedYears[year]}
                  onClick={() => toggleYearExpansion(year)}
                >
                  <YearTitle>
                    {year}
                    <YearCount>{postsByYear[year].length} 篇文章</YearCount>
                  </YearTitle>
                  <ExpandIcon expanded={expandedYears[year]}>▼</ExpandIcon>
                </YearHeader>
                <PostList expanded={expandedYears[year]}>
                  <PostsContainer expanded={expandedYears[year]}>
                    <PostItemsWrapper transitioning={transitioning[year]}>
                      <LoadingIndicator visible={transitioning[year]} />
                      {getPaginatedPosts(year).map((post, index) => (
                        <PostItem key={index}>
                          <PostDate>{post.formattedDate || formatDate(post.date)}</PostDate>
                          <PostLink to={post.permalink} title={post.title}>
                            {post.title}
                          </PostLink>
                          <TagsList>
                            {post.tags && post.tags.slice(0, 2).map(tag => (
                              <Tag key={tag.label || tag}>{tag.label || tag}</Tag>
                            ))}
                          </TagsList>
                        </PostItem>
                      ))}
                      {/* 如果文章不足5个，添加空白填充项保持一致的高度 */}
                      {getPaginatedPosts(year).length < 5 && Array.from({ length: 5 - getPaginatedPosts(year).length }).map((_, index) => (
                        <div key={`empty-${index}`} style={{ height: '60px' }}></div>
                      ))}
                    </PostItemsWrapper>
                    {expandedYears[year] && postsByYear[year].length > POSTS_PER_PAGE && (
                      <PaginationWrapper>
                        <PaginationContainer>
                          {renderPagination(year)}
                        </PaginationContainer>
                      </PaginationWrapper>
                    )}
                  </PostsContainer>
                </PostList>
              </YearSection>
            ))
          ) : (
            <EmptyMessage>
              <h2>暂无博客文章</h2>
              <p>请稍后再来查看，我们正在准备精彩内容！</p>
            </EmptyMessage>
          )}
        </ArchiveContainer>
      </CSSReset>
    </Layout>
  );
} 