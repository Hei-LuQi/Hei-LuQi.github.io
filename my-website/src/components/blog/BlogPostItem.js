import React, { memo } from 'react';
import { withRenderTracking } from '../../components/blog/PerformanceMonitor';
import { PostItem, PostDate, PostLink, TagsList, Tag } from '../../styles/BlogArchiveStyles';
import { formatDate } from '../../services/blog/blogService';

/**
 * 博客文章项组件 - 已优化性能
 */
const BlogPostItem = memo(({ post }) => (
  <PostItem>
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
));

// 添加渲染追踪
export const MemoizedPostItem = withRenderTracking(BlogPostItem, 'PostItem');

export default MemoizedPostItem; 