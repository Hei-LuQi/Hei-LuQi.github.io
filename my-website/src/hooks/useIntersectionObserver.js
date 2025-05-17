import { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

/**
 * 使用IntersectionObserver观察元素的可见性
 * @param {Function} callback 当元素可见时的回调函数
 * @param {Object} options IntersectionObserver配置选项
 * @param {Array} targetIds 需要观察的元素ID数组
 */
export function useIntersectionObserver(callback, options = {}, targetIds = []) {
  useEffect(() => {
    // 确保只在浏览器环境执行
    if (!ExecutionEnvironment.canUseDOM || !targetIds.length) return;
    
    // 确保IntersectionObserver API可用
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('IntersectionObserver API is not supported in this browser');
      return;
    }
    
    const defaultOptions = { rootMargin: '200px', threshold: 0 };
    const observerOptions = { ...defaultOptions, ...options };
    
    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target.id);
        }
      });
    }, observerOptions);
    
    // 观察所有指定ID的元素
    const elements = [];
    targetIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        elements.push(element);
      }
    });
    
    // 清理函数
    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, [callback, options, targetIds]);
}

export default useIntersectionObserver; 