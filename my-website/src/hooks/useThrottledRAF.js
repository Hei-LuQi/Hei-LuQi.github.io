import { useRef, useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

/**
 * 创建一个使用requestAnimationFrame限流的钩子函数
 * @param {Function} callback 需要限流的回调函数
 * @param {Array} deps 依赖数组，类似于useEffect
 */
export function useThrottledRAF(callback, deps = []) {
  const requestRef = useRef(null);
  const previousTimeRef = useRef(0);
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  useEffect(() => {
    // 确保只在浏览器环境执行
    if (!ExecutionEnvironment.canUseDOM) return;
    
    // 确保requestAnimationFrame API可用
    if (typeof requestAnimationFrame === 'undefined') {
      console.warn('requestAnimationFrame API is not supported in this environment');
      return;
    }
    
    const animate = time => {
      if (previousTimeRef.current !== 0) {
        const deltaTime = time - previousTimeRef.current;
        callbackRef.current(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, deps);
}

export default useThrottledRAF; 