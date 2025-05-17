// 性能监控对象

import React, { useState, useEffect, useMemo, useCallback, useRef, memo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styled from '@emotion/styled';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export const PerformanceMonitor = {
    renderCounts: {},
    batchProcessingTime: [],
    totalPostsProcessed: 0,
    
    // 记录组件渲染
    trackRender: (componentName) => {
      if (!ExecutionEnvironment.canUseDOM) return;
      
      if (!PerformanceMonitor.renderCounts[componentName]) {
        PerformanceMonitor.renderCounts[componentName] = 0;
      }
      PerformanceMonitor.renderCounts[componentName]++;
      
      // 开发环境下打印渲染统计
      if (process.env.NODE_ENV === 'development') {
        console.debug(`[PerformanceMonitor] ${componentName} rendered ${PerformanceMonitor.renderCounts[componentName]} times`);
      }
    },
    
    // 记录批处理性能
    trackBatchProcessing: (batchNumber, duration, itemsProcessed) => {
      if (!ExecutionEnvironment.canUseDOM) return;
      
      PerformanceMonitor.batchProcessingTime.push({ batchNumber, duration, itemsProcessed });
      PerformanceMonitor.totalPostsProcessed += itemsProcessed;
      
      // 开发环境下打印批处理统计
      if (process.env.NODE_ENV === 'development') {
        console.debug(`[PerformanceMonitor] Batch ${batchNumber} processed ${itemsProcessed} items in ${duration.toFixed(2)}ms`);
      }
    },
    
    // 获取性能报告
    getReport: () => {
      if (!ExecutionEnvironment.canUseDOM) return {};
      
      const report = {
        renderCounts: { ...PerformanceMonitor.renderCounts },
        batchProcessing: {
          totalBatches: PerformanceMonitor.batchProcessingTime.length,
          totalItemsProcessed: PerformanceMonitor.totalPostsProcessed,
          averageBatchTime: PerformanceMonitor.batchProcessingTime.length 
            ? PerformanceMonitor.batchProcessingTime.reduce((acc, curr) => acc + curr.duration, 0) / PerformanceMonitor.batchProcessingTime.length
            : 0
        }
      };
      
      return report;
    },
    
    // 重置性能监控
    reset: () => {
      PerformanceMonitor.renderCounts = {};
      PerformanceMonitor.batchProcessingTime = [];
      PerformanceMonitor.totalPostsProcessed = 0;
    }
  };



    // 用于开发环境中显示性能报告的组件
    export const PerformanceReport = ({ showPerformance, onClose }) => {
        if (!showPerformance) return null;
        
        const report = PerformanceMonitor.getReport();
        
        return (
          <div style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            zIndex: 9999,
            maxWidth: '300px',
            maxHeight: '400px',
            overflow: 'auto',
            fontSize: '12px'
          }}>
            <h4 style={{margin: '0 0 10px'}}>Performance Report</h4>
            <div>
              <strong>Render Counts:</strong>
              <ul style={{margin: '5px 0', paddingLeft: '20px'}}>
                {Object.entries(report.renderCounts).map(([comp, count]) => (
                  <li key={comp}>{comp}: {count}</li>
                ))}
              </ul>
              <strong>Batch Processing:</strong>
              <ul style={{margin: '5px 0', paddingLeft: '20px'}}>
                <li>Total batches: {report.batchProcessing.totalBatches}</li>
                <li>Items processed: {report.batchProcessing.totalItemsProcessed}</li>
                <li>Avg batch time: {report.batchProcessing.averageBatchTime.toFixed(2)}ms</li>
              </ul>
            </div>
            <button 
              onClick={onClose}
              style={{
                background: '#4285f4',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '3px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        );
      };
    // withRenderTracking 高阶组件
export function withRenderTracking(Component, componentName) {
    return props => {
      useEffect(() => {
        PerformanceMonitor.trackRender(componentName);
      });
      
      return <Component {...props} />;
    };
  }
  