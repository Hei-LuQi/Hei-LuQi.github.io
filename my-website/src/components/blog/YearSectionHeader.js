import React, { memo } from 'react';
import { YearHeader, YearTitle, YearCount, ExpandIcon } from '../../styles/BlogArchiveStyles';

/**
 * 年份部分标题组件 - 已优化性能
 */
const YearSectionHeader = memo(({ year, count, isExpanded, onToggle }) => (
  <YearHeader expanded={isExpanded} onClick={onToggle}>
    <YearTitle>
      {year}
      <YearCount>{count} 篇文章</YearCount>
    </YearTitle>
    <ExpandIcon expanded={isExpanded}>▼</ExpandIcon>
  </YearHeader>
));

export default YearSectionHeader; 