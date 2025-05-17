import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// 博客文章缓存
let postsCache = null;

/**
 * 获取所有博客文章
 * 使用缓存和批处理优化性能
 * @param {Object} PerformanceMonitor 性能监控对象
 * @returns {Array} 博客文章数组
 */
export function getAllPosts(PerformanceMonitor) {
  if (postsCache) {
    return postsCache;
  }

  try {
    const blogDir = require.context('../../../blog/', true, /.*\.md$|.*\.mdx$/);
    const blogFiles = blogDir.keys();
    const posts = [];
    
    // 优化：使用批量处理而不是每个文件单独处理
    const batchSize = 20;
    let processedCount = 0;
    let batchCount = 0;
    
    function processBatch() {
      batchCount++;
      // 处理开始和结束指针
      const startIdx = processedCount;
      const endIdx = Math.min(processedCount + batchSize, blogFiles.length);
      
      // 记录批处理开始时间，用于性能监控
      const batchStartTime = performance.now();
      
      let itemsProcessed = 0;
      for (let i = startIdx; i < endIdx; i++) {
        const relativePath = blogFiles[i];
        try {
          const content = blogDir(relativePath);
          if (content.metadata) {
            const metadata = content.metadata;
            posts.push({
              title: metadata.title,
              permalink: metadata.permalink,
              date: new Date(metadata.date),
              tags: metadata.tags || [],
              formattedDate: metadata.formattedDate
            });
            itemsProcessed++;
          }
        } catch (e) {
          console.error(`Error processing blog file ${relativePath}:`, e);
        }
      }
      
      processedCount = endIdx;
      
      // 计算批处理耗时，优化下一批处理的调度
      const batchEndTime = performance.now();
      const batchDuration = batchEndTime - batchStartTime;
      
      // 记录性能数据
      PerformanceMonitor.trackBatchProcessing(batchCount, batchDuration, itemsProcessed);
      
      // 如果批处理时间过长，增加延迟以避免阻塞主线程
      const nextBatchDelay = batchDuration > 50 ? 10 : 0;
      
      // 如果还有未处理的批次，安排下一个批次
      if (processedCount < blogFiles.length && ExecutionEnvironment.canUseDOM) {
        // 动态调整批处理暂停频率
        if ((processedCount / batchSize) % 5 === 0 || batchDuration > 50) {
          setTimeout(processBatch, nextBatchDelay);
        } else {
          processBatch();
        }
      } else {
        // 所有批次处理完毕，排序并缓存结果
        postsCache = posts.sort((a, b) => b.date - a.date);
        
        // 打印最终性能报告
        if (process.env.NODE_ENV === 'development') {
          console.debug('[PerformanceMonitor] Blog post processing complete:', PerformanceMonitor.getReport());
        }
      }
    }
    
    // 开始处理第一批
    processBatch();
    
    // 返回当前结果（如果是异步处理，下次调用会获取更完整的缓存）
    return posts.sort((a, b) => b.date - a.date);
  } catch (e) {
    console.error('Failed to load blog posts using require.context:', e);
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

/**
 * 格式化日期为中文短格式
 * @param {Date} date 需要格式化的日期
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date) {
  const options = { month: 'short', day: '2-digit' };
  return date.toLocaleDateString('zh-CN', options);
}

export default {
  getAllPosts,
  formatDate
}; 