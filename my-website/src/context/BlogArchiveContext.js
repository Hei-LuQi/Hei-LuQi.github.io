import React, { createContext, useState, useContext, useMemo, useCallback, useEffect, useRef } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { PerformanceMonitor } from '../components/blog/PerformanceMonitor';
import blogService from '../services/blog/blogService';
import useDebounce from '../hooks/useDebounce';
import useThrottledRAF from '../hooks/useThrottledRAF';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

// 设置
const POSTS_PER_PAGE = 5;

// 创建上下文
const BlogArchiveContext = createContext({
  // 提供默认值，避免SSR时出现undefined
  activeYear: null,
  isLoading: true,
  isContentVisible: false,
  yearStates: {},
  searchQuery: '',
  debouncedSearchQuery: '',
  showPerformance: false,
  visibleYears: new Set(),
  allPosts: [],
  filteredPosts: [],
  postsByYear: {},
  years: [],
  setActiveYear: () => {},
  setSearchQuery: () => {},
  setVisibleYears: () => {},
  setShowPerformance: () => {},
  updateYearState: () => {},
  scrollToYear: () => {},
  toggleYearExpansion: () => {},
  expandAllYears: () => {},
  collapseAllYears: () => {},
  changePage: () => {},
  getPaginatedPosts: () => [],
  POSTS_PER_PAGE: 5
});

// 创建Provider组件
export function BlogArchiveProvider({ children }) {
  // 基础状态
  const [activeYear, setActiveYear] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [yearStates, setYearStates] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showPerformance, setShowPerformance] = useState(false);
  const [visibleYears, setVisibleYears] = useState(new Set());
  
  // 防抖搜索查询
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  // 引用
  const prevVisibleYears = useRef(new Set());
  const scrollPosRef = useRef(0);
  const performanceReportRef = useRef(null);
  
  // 判断是否在浏览器环境
  const isBrowser = ExecutionEnvironment.canUseDOM;
  
  // 加载博客文章数据
  const allPosts = useMemo(() => {
    if (isBrowser) {
      return blogService.getAllPosts(PerformanceMonitor);
    }
    return [];
  }, [isBrowser]);
  
  // 搜索过滤
  const filteredPosts = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return allPosts;
    }

    const query = debouncedSearchQuery.toLowerCase().trim();
    return allPosts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(query);
      const tagsMatch = post.tags.some(tag => 
        (tag.label || tag).toLowerCase().includes(query)
      );
      const dateMatch = post.formattedDate?.toLowerCase().includes(query) ||
        post.date.toLocaleDateString('zh-CN').toLowerCase().includes(query);
      
      return titleMatch || tagsMatch || dateMatch;
    });
  }, [allPosts, debouncedSearchQuery]);

  // 按年份分组
  const { postsByYear, years } = useMemo(() => {
    const postsByYearMap = {};
    
    filteredPosts.forEach(post => {
      const year = post.date.getFullYear();
      if (!postsByYearMap[year]) {
        postsByYearMap[year] = [];
      }
      postsByYearMap[year].push(post);
    });
    
    return {
      postsByYear: postsByYearMap,
      years: Object.keys(postsByYearMap).sort((a, b) => b - a)
    };
  }, [filteredPosts]);
  
  // 使用新的IntersectionObserver hook跟踪年份区块可见性
  const handleYearVisible = useCallback((id) => {
    const year = id.replace('year-', '');
    setVisibleYears(prev => new Set([...prev, year]));
  }, []);
  
  // 生成年份ID数组
  const yearIds = useMemo(() => {
    return years.map(year => `year-${year}`);
  }, [years]);
  
  // 使用客户端专用的hook - 仅在浏览器环境运行
  if (isBrowser) {
    // 使用自定义hook观察年份区块
    useIntersectionObserver(handleYearVisible, { rootMargin: '200px' }, yearIds);
    
    // 使用滚动事件跟踪当前激活的年份
    useThrottledRAF(() => {
      // 滚动位置变化检测
      const currentScrollPos = window.scrollY;
      if (Math.abs(currentScrollPos - scrollPosRef.current) < 50) return;
      
      scrollPosRef.current = currentScrollPos;
      
      // 检测哪个年份区域在可视区域内
      years.forEach(year => {
        const element = document.getElementById(`year-${year}`);
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        // 如果元素在视口中或刚好在视口上方
        if (rect.top <= 100 && rect.bottom >= 0) {
          setActiveYear(year);
        }
      });
    }, [years]);
  }
  
  // 初始化或更新年份状态
  useEffect(() => {
    if (years.length > 0 && isBrowser) {
      setYearStates(prevStates => {
        const newStates = { ...prevStates };
        
        // 处理新增的年份
        years.forEach(year => {
          if (!newStates[year]) {
            newStates[year] = {
              isExpanded: false,
              currentPage: 1,
              isTransitioning: false
            };
          }
        });
        
        // 移除不存在的年份
        Object.keys(newStates).forEach(year => {
          if (!years.includes(year)) {
            delete newStates[year];
          }
        });
        
        // 确保至少有一个年份展开
        if (!Object.values(newStates).some(state => state.isExpanded)) {
          const mostRecentYear = years[0];
          if (mostRecentYear) {
            newStates[mostRecentYear].isExpanded = true;
            setActiveYear(mostRecentYear);
          }
        }
        
        return newStates;
      });
    }
  }, [years, isBrowser]);

  // 优化的状态更新函数
  const updateYearState = useCallback((year, updates) => {
    setYearStates(prevStates => ({
      ...prevStates,
      [year]: {
        ...prevStates[year],
        ...updates
      }
    }));
  }, []);

  // 滚动到特定年份部分
  const scrollToYear = useCallback((year) => {
    setActiveYear(year);
    updateYearState(year, { isExpanded: true });
    
    if (isBrowser) {
      requestAnimationFrame(() => {
        const element = document.getElementById(`year-${year}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }, [updateYearState, isBrowser]);

  // 切换年份展开状态
  const toggleYearExpansion = useCallback((year) => {
    setYearStates(prevStates => ({
      ...prevStates,
      [year]: {
        ...prevStates[year],
        isExpanded: !prevStates[year]?.isExpanded
      }
    }));
  }, []);

  // 展开所有年份
  const expandAllYears = useCallback(() => {
    setYearStates(prevStates => {
      const newStates = { ...prevStates };
      years.forEach(year => {
        if (newStates[year]) {
          newStates[year].isExpanded = true;
        }
      });
      return newStates;
    });
  }, [years]);

  // 折叠所有年份
  const collapseAllYears = useCallback(() => {
    setYearStates(prevStates => {
      const newStates = { ...prevStates };
      years.forEach(year => {
        if (newStates[year]) {
          newStates[year].isExpanded = false;
        }
      });
      return newStates;
    });
  }, [years]);

  // 切换分页
  const changePage = useCallback((year, pageNumber) => {
    const yearState = yearStates[year];
    if (!yearState || yearState.isTransitioning) return;

    updateYearState(year, { isTransitioning: true, currentPage: pageNumber });
    
    if (isBrowser) {
      setTimeout(() => {
        updateYearState(year, { isTransitioning: false });
      }, 300);
    }
  }, [yearStates, updateYearState, isBrowser]);

  // 获取某年的分页文章
  const getPaginatedPosts = useCallback((year) => {
    const posts = postsByYear[year] || [];
    const yearState = yearStates[year];
    const currentPage = yearState?.currentPage || 1;
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    
    return posts.slice(startIndex, endIndex);
  }, [postsByYear, yearStates]);

  // 跟踪哪些年份是展开的
  useEffect(() => {
    if (!isBrowser) return;
    
    const currentVisibleYears = new Set();
    
    Object.entries(yearStates).forEach(([year, state]) => {
      if (state.isExpanded) {
        currentVisibleYears.add(year);
      }
    });
    
    prevVisibleYears.current = currentVisibleYears;
  }, [yearStates, isBrowser]);
  
  // 延迟加载数据
  useEffect(() => {
    if (!isBrowser) return;
    
    let isMounted = true;
    
    async function loadPosts() {
      try {
        await new Promise(resolve => setTimeout(resolve, 0));
        if (!isMounted) return;
        
        setIsLoading(false);
        setTimeout(() => {
          if (isMounted) {
            setIsContentVisible(true);
          }
        }, 50);
      } catch (error) {
        console.error('Error loading posts:', error);
        if (isMounted) {
          setIsLoading(false);
          setIsContentVisible(true);
        }
      }
    }
    
    loadPosts();
    
    return () => {
      isMounted = false;
    };
  }, [isBrowser]);
  
  // 重置性能监控
  useEffect(() => {
    if (!isBrowser) return;
    
    PerformanceMonitor.reset();
    
    return () => {
      performanceReportRef.current = PerformanceMonitor.getReport();
    };
  }, [isBrowser]);
  
  // 性能监控快捷键
  useEffect(() => {
    if (!isBrowser || process.env.NODE_ENV !== 'development') return;
    
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === 'p') {
        setShowPerformance(prev => !prev);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isBrowser]);
  
  // 状态上下文值
  const contextValue = {
    // 状态
    activeYear,
    isLoading,
    isContentVisible,
    yearStates,
    searchQuery,
    debouncedSearchQuery,
    showPerformance,
    visibleYears,
    allPosts,
    filteredPosts,
    postsByYear,
    years,
    
    // 修改状态的函数
    setActiveYear,
    setSearchQuery,
    setVisibleYears,
    setShowPerformance,
    updateYearState,
    scrollToYear,
    toggleYearExpansion,
    expandAllYears,
    collapseAllYears,
    changePage,
    getPaginatedPosts,
    
    // 常量
    POSTS_PER_PAGE
  };
  
  return (
    <BlogArchiveContext.Provider value={contextValue}>
      {children}
    </BlogArchiveContext.Provider>
  );
}

// 自定义hook，用于访问博客归档上下文
export function useBlogArchive() {
  const context = useContext(BlogArchiveContext);
  if (!context) {
    throw new Error('useBlogArchive must be used within a BlogArchiveProvider');
  }
  return context;
}

export default BlogArchiveContext; 