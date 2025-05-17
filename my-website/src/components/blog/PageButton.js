import React, { memo } from 'react';
import { withRenderTracking } from '../../components/blog/PerformanceMonitor';
import { PageButton as StyledPageButton } from '../../styles/BlogArchiveStyles';

/**
 * 分页按钮组件 - 已优化性能
 */
const PageButtonComponent = memo(({ onClick, active, disabled, children }) => (
  <StyledPageButton onClick={onClick} active={active} disabled={disabled}>
    {children}
  </StyledPageButton>
));

// 添加渲染追踪
export const MemoizedPageButton = withRenderTracking(PageButtonComponent, 'PageButton');

export default MemoizedPageButton; 