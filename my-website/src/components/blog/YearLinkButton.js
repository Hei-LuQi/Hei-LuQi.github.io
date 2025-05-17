import React, { memo } from 'react';
import { withRenderTracking } from '../../components/blog/PerformanceMonitor';
import { YearLink } from '../../styles/BlogArchiveStyles';

/**
 * 年份链接按钮组件 - 已优化性能
 */
const YearLinkButton = memo(({ year, count, onClick, active }) => (
  <YearLink onClick={onClick} active={active}>
    {year} <span style={{opacity: 0.7, fontSize: '0.9em'}}>({count})</span>
  </YearLink>
));

// 添加渲染追踪
export const MemoizedYearLink = withRenderTracking(YearLinkButton, 'YearLink');

export default MemoizedYearLink; 