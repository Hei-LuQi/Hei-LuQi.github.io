import styled from '@emotion/styled';
import Link from '@docusaurus/Link';

// 自定义样式组件
export const ArchiveContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

export const ArchiveHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(90deg, #4285f4, #6ea2f7);
  padding: 3rem 1rem;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.2);
`;

export const ArchiveTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

export const ArchiveDescription = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

export const YearsNavigation = styled.div`
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

export const YearLink = styled.a`
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

export const YearSection = styled.div`
  margin-bottom: 3rem;
  scroll-margin-top: 140px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const YearHeader = styled.div`
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

export const YearTitle = styled.h2`
  font-size: 1.8rem;
  margin: 0;
  color: #4285f4;
  display: flex;
  align-items: center;
`;

export const YearCount = styled.span`
  font-size: 1.1rem;
  color: var(--ifm-color-emphasis-600);
  margin-left: 1rem;
  font-weight: normal;
`;

export const ExpandIcon = styled.span`
  font-size: 1.5rem;
  transition: transform 0.3s ease;
  transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

export const PostList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: ${props => props.expanded ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  transform: translateZ(0);
  will-change: max-height;
`;

export const PostsContainer = styled.div`
  height: ${props => props.expanded ? '460px' : '0'};  /* 固定高度：360px内容 + 100px分页 */
  min-height: ${props => props.expanded ? '460px' : '0'};
  max-height: ${props => props.expanded ? '460px' : '0'};
  display: flex;
  flex-direction: column;
  background-color: var(--ifm-card-background-color);
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
  transform: translateZ(0);
  will-change: height;
`;

export const PostItemsWrapper = styled.div`
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
  transform: translateZ(0);
  will-change: opacity;
`;

export const PostItem = styled.li`
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

export const PostDate = styled.span`
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

export const PostLink = styled(Link)`
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

export const TagsList = styled.div`
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

export const Tag = styled.span`
  background-color: rgba(66, 133, 244, 0.1);
  color: #4285f4;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--ifm-card-background-color);
  border-radius: 8px;
  margin: 2rem 0;
`;

export const StatsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--ifm-card-background-color);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #4285f4;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--ifm-color-emphasis-600);
`;

export const ActionButton = styled.button`
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
export const PaginationContainer = styled.div`
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
export const Pagination = styled.div`
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
export const PageButton = styled.button`
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

export const PageInfo = styled.span`
  margin: 0 1rem;
  color: var(--ifm-color-content-secondary);
  font-size: 0.9rem;
`;

export const PageControls = styled.div`
  display: flex;
  align-items: center;
`;

// 添加加载指示器
export const LoadingIndicator = styled.div`
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

// 优化加载容器样式
export const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--ifm-background-color);
  opacity: ${props => props.isExiting ? 0 : 1};
  transition: opacity 0.3s ease;
`;

// 修改 CSSReset 组件，添加最小高度
export const CSSReset = styled.div`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  min-height: 100vh;
  background-color: var(--ifm-background-color);
`;

// 添加回 PaginationWrapper 组件
export const PaginationWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  min-height: 100px;
  max-height: 100px;
`;

export const SearchContainer = styled.div`
  margin: 1rem 0 2rem;
  padding: 1rem;
  background-color: var(--ifm-card-background-color);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid rgba(66, 133, 244, 0.1);
  border-radius: 6px;
  font-size: 1rem;
  background-color: var(--ifm-background-color);
  color: var(--ifm-color-content);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4285f4;
    box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
  }

  &::placeholder {
    color: var(--ifm-color-content-secondary);
  }
`;

export const SearchStats = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--ifm-color-content-secondary);
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--ifm-color-content-secondary);
  background-color: var(--ifm-card-background-color);
  border-radius: 8px;
  margin: 1rem 0;
`;
