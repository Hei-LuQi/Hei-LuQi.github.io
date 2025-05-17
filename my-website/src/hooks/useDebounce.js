import { useState, useEffect } from 'react';

/**
 * 创建一个防抖值，在指定的延迟时间后才更新
 * @param {any} value 需要防抖的值
 * @param {number} delay 延迟时间（毫秒）
 * @returns {any} 防抖后的值
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

export default useDebounce; 