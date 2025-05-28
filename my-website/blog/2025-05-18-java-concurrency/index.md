---
slug: java-concurrency-programming
title: 深入理解Java并发编程：原理、实践与最佳实践
authors: [default]
tags: [java, concurrency, programming, multithreading]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';

# 深入理解Java并发编程：原理、实践与最佳实践

Java并发编程是构建高性能应用程序的关键技术，特别是在多核处理器时代。本文将全面而深入地探讨Java并发编程的核心概念、常见问题及解决方案。

<!-- truncate -->

<Admonition type="info">
  <p>
    <strong>本文适合人群</strong>：具有Java基础的开发者，希望深入了解并发编程的原理与实践
  </p>
  <p>
    <strong>阅读时间</strong>：约25分钟
  </p>
</Admonition>

## 目录

1. [并发编程基础](#并发编程基础)
2. [Java内存模型](#Java内存模型)
3. [线程安全性](#线程安全性)
4. [同步工具类](#同步工具类)
5. [并发容器](#并发容器)
6. [线程池](#线程池)
7. [并发编程最佳实践](#并发编程最佳实践)
8. [性能优化与调优](#性能优化与调优)

## 并发编程基础

<div className="row" style={{display: 'flex', gap: '20px', margin: '20px 0'}}>
  <div className="column" style={{flex: 1, backgroundColor: '#fcfdfe', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', border: '1px solid #f0f0f0'}}>
    <h3 style={{color: '#2c3e50', marginTop: '0'}}>为什么需要并发？</h3>
    <ul style={{color: '#34495e', fontSize: '15px'}}>
      <li>充分利用多核CPU</li>
      <li>提高响应性能</li>
      <li>优化资源利用</li>
      <li>简化建模与设计</li>
    </ul>
  </div>
  <div className="column" style={{flex: 1, backgroundColor: '#fcfdfe', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', border: '1px solid #f0f0f0'}}>
    <h3 style={{color: '#2c3e50', marginTop: '0'}}>并发的挑战</h3>
    <ul style={{color: '#34495e', fontSize: '15px'}}>
      <li>线程安全问题</li>
      <li>死锁与活锁</li>
      <li>性能开销</li>
      <li>复杂度增加</li>
    </ul>
  </div>
</div>

### 线程与进程

**进程**是操作系统资源分配的基本单位，而**线程**是CPU调度的基本单位。一个进程可以包含多个线程，它们共享进程的内存空间和资源。

<details>
<summary>线程与进程的主要区别</summary>

| 特性 | 进程 | 线程 |
|------|------|------|
| 定义 | 运行中的程序实例 | 进程中的执行单元 |
| 资源 | 拥有独立的内存空间 | 共享所属进程的内存 |
| 通信 | 通过IPC机制（复杂） | 直接访问共享变量（简单） |
| 开销 | 创建和切换开销大 | 创建和切换开销小 |
| 隔离性 | 高度隔离 | 共享资源，隔离度低 |

</details>

Java中创建线程的两种基本方式：

<Tabs>
  <TabItem value="thread" label="继承Thread类" default>
    ```java
    class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println("Thread running: " + Thread.currentThread().getName());
        }
    }
    
    // 使用方式
    MyThread thread = new MyThread();
    thread.start();
    ```
  </TabItem>
  <TabItem value="runnable" label="实现Runnable接口">
    ```java
    class MyRunnable implements Runnable {
        @Override
        public void run() {
            System.out.println("Runnable running: " + Thread.currentThread().getName());
        }
    }
    
    // 使用方式
    Thread thread = new Thread(new MyRunnable());
    thread.start();
    ```
  </TabItem>
  <TabItem value="lambda" label="Lambda表达式（Java 8+）">
    ```java
    // 使用Lambda表达式
    Thread thread = new Thread(() -> {
        System.out.println("Lambda running: " + Thread.currentThread().getName());
    });
    thread.start();
    ```
  </TabItem>
  <TabItem value="callable" label="Callable接口（带返回值）">
    ```java
    import java.util.concurrent.Callable;
    import java.util.concurrent.FutureTask;
    
    // 创建Callable任务
    Callable<String> callable = () -> {
        // 执行一些耗时操作
        Thread.sleep(1000);
        return "任务执行结果";
    };
    
    // 使用FutureTask包装
    FutureTask<String> futureTask = new FutureTask<>(callable);
    
    // 创建线程执行任务
    Thread thread = new Thread(futureTask);
    thread.start();
    
    // 获取结果（会阻塞直到任务完成）
    String result = futureTask.get();
    ```
  </TabItem>
</Tabs>

### 线程状态

Java线程在其生命周期中可能处于以下状态：

<div style={{display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0'}}>
  <div style={{backgroundColor: '#e6f7ff', padding: '12px', borderRadius: '4px', color: '#0050b3', fontSize: '16px', border: '1px solid #91caff'}}>
    <strong>NEW</strong>：新创建但尚未启动的线程
  </div>
  <div style={{backgroundColor: '#f6ffed', padding: '12px', borderRadius: '4px', color: '#135200', fontSize: '16px', border: '1px solid #b7eb8f'}}>
    <strong>RUNNABLE</strong>：可运行状态，包括运行中和就绪
  </div>
  <div style={{backgroundColor: '#fff2f0', padding: '12px', borderRadius: '4px', color: '#820014', fontSize: '16px', border: '1px solid #ffccc7'}}>
    <strong>BLOCKED</strong>：被阻塞等待监视器锁
  </div>
  <div style={{backgroundColor: '#fff7e6', padding: '12px', borderRadius: '4px', color: '#874d00', fontSize: '16px', border: '1px solid #ffd591'}}>
    <strong>WAITING</strong>：无限期等待另一个线程执行特定操作
  </div>
  <div style={{backgroundColor: '#f9f0ff', padding: '12px', borderRadius: '4px', color: '#22075e', fontSize: '16px', border: '1px solid #d3adf7'}}>
    <strong>TIMED_WAITING</strong>：有限期等待另一个线程执行操作
  </div>
  <div style={{backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '4px', color: '#262626', fontSize: '16px', border: '1px solid #d9d9d9'}}>
    <strong>TERMINATED</strong>：已完成执行的线程
  </div>
</div>

线程状态转换图：

```
    NEW → RUNNABLE → TERMINATED
          ↑  ↓
          ↑  ↓
          BLOCKED
          ↑  ↓
          ↑  ↓
      WAITING/TIMED_WAITING
```

## Java内存模型

<Admonition type="note">
Java内存模型（JMM）规定了Java虚拟机如何与计算机内存协同工作。它定义了线程如何与主内存交互，以及多线程程序中变量的可见性、原子性和有序性问题。
</Admonition>

### 主内存与工作内存

<div style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
  <div style={{maxWidth: '600px', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden'}}>
    <div style={{backgroundColor: '#1890ff', color: 'white', padding: '10px', textAlign: 'center'}}>
      <strong>主内存（Main Memory）</strong>
    </div>
    <div style={{display: 'flex', borderTop: '1px solid #eee'}}>
      <div style={{flex: 1, padding: '15px', borderRight: '1px solid #eee'}}>
        <div style={{backgroundColor: '#87e8de', padding: '10px', marginBottom: '10px', textAlign: 'center', borderRadius: '4px'}}>
          <strong>线程1工作内存</strong>
        </div>
        <div style={{textAlign: 'center'}}>线程1本地变量副本</div>
      </div>
      <div style={{flex: 1, padding: '15px'}}>
        <div style={{backgroundColor: '#b7eb8f', padding: '10px', marginBottom: '10px', textAlign: 'center', borderRadius: '4px'}}>
          <strong>线程2工作内存</strong>
        </div>
        <div style={{textAlign: 'center'}}>线程2本地变量副本</div>
      </div>
    </div>
  </div>
</div>

- **主内存**：所有线程共享，存储所有变量的主副本
- **工作内存**：每个线程独有，存储变量的副本

线程对变量的所有操作都必须在工作内存中进行，而不能直接操作主内存中的变量。

### 内存屏障

内存屏障是一种CPU指令，用于控制特定条件下的内存操作顺序，保证可见性。

<details>
<summary><strong>Java中的内存屏障类型</strong></summary>

1. **LoadLoad屏障**：确保load1指令先于load2及之后的指令完成
2. **StoreStore屏障**：确保store1指令的结果对其他处理器可见，先于store2及之后的指令
3. **LoadStore屏障**：确保load1指令先于store2及之后的指令完成
4. **StoreLoad屏障**：确保store1指令的结果对其他处理器可见，先于load2及之后的指令

volatile写操作会在写操作前插入StoreStore屏障，在写操作后插入StoreLoad屏障。
volatile读操作会在读操作后插入LoadLoad屏障和LoadStore屏障。

</details>

### 重排序

编译器和处理器可能会对指令进行重排序以提高性能，只要不改变单线程程序的执行结果。但在多线程环境下，重排序可能导致意想不到的问题。

<Admonition type="warning">
  重排序可能导致多线程程序出现非预期行为！Java内存模型通过happens-before关系保证了一定的有序性，确保重排序不会破坏程序的正确性。
</Admonition>

## 线程安全性

线程安全性是并发编程中最重要的概念之一，它确保多个线程同时访问共享资源时不会导致程序出错。

### 竞态条件

当多个线程以不可预测的顺序访问共享资源并且至少有一个线程修改该资源时，可能出现竞态条件。

<Tabs>
  <TabItem value="unsafe" label="非线程安全示例" default>
    ```java
    public class Counter {
        private int count = 0;
        
        // 非线程安全的方法
        public void increment() {
            count++; // 这实际上是一个非原子操作
        }
        
        public int getCount() {
            return count;
        }
    }
    ```
    <Admonition type="danger">
      <p>count++操作实际包含三个步骤：读取、递增、写回。多线程环境下可能导致计数错误！</p>
    </Admonition>
  </TabItem>
  <TabItem value="fixed-synchronized" label="使用synchronized修复">
    ```java
    public class SynchronizedCounter {
        private int count = 0;
        
        // 使用synchronized确保线程安全
        public synchronized void increment() {
            count++;
        }
        
        public synchronized int getCount() {
            return count;
        }
    }
    ```
  </TabItem>
</Tabs>

### 原子性

Java提供了`java.util.concurrent.atomic`包，包含支持原子操作的类：

```java
import java.util.concurrent.atomic.AtomicInteger;

public class AtomicCounter {
    private AtomicInteger count = new AtomicInteger(0);
    
    public void increment() {
        count.incrementAndGet(); // 原子操作
    }
    
    public int getCount() {
        return count.get();
    }
}
```

<div style={{background: 'linear-gradient(to right, #f0f9ff, #e6f7ff)', padding: '15px', borderRadius: '5px', margin: '10px 0'}}>
  <h4 style={{marginTop: '0'}}>原子类的优势</h4>
  <ul>
    <li>无锁实现，性能更好</li>
    <li>基于CAS（Compare And Swap）操作</li>
    <li>适用于简单的原子操作场景</li>
  </ul>
</div>

### 可见性

`volatile`关键字保证了变量的可见性，但不保证原子性：

```java
public class VolatileExample {
    private volatile boolean flag = false;
    
    public void setFlag() {
        flag = true; // 写操作会立即刷新到主内存
    }
    
    public boolean isFlag() {
        return flag; // 读操作会直接从主内存获取最新值
    }
}
```

<Tabs>
  <TabItem value="use-volatile" label="适合使用volatile场景">
    <ul>
      <li>写入变量不依赖当前值</li>
      <li>变量不会被包含在不变式中</li>
      <li>访问变量不需要加锁</li>
    </ul>
  </TabItem>
  <TabItem value="avoid-volatile" label="不适合使用volatile场景">
    <ul>
      <li>变量值依赖当前值（如count++）</li>
      <li>变量需要与其他状态变量一起参与不变式</li>
    </ul>
  </TabItem>
</Tabs>

### 有序性

通过`synchronized`和`volatile`关键字以及显式锁可以保证有序性。

## 同步工具类

### synchronized

`synchronized`关键字可用于方法或代码块，确保同一时刻只有一个线程执行该代码：

<Tabs>
  <TabItem value="method" label="同步方法" default>
    ```java
    public class SynchronizedCounter {
        private int count = 0;
        
        // 同步实例方法
        public synchronized void increment() {
            count++;
        }
        
        // 同步静态方法
        public static synchronized void staticMethod() {
            // 共享资源访问
        }
    }
    ```
  </TabItem>
  <TabItem value="block" label="同步代码块">
    ```java
    public class SynchronizedCounter {
        private int count = 0;
        private final Object lock = new Object(); // 专用锁对象
        
        public void increment() {
            // 同步代码块，更细粒度的控制
            synchronized(this) { // 使用this作为锁
                count++;
            }
        }
        
        public void otherMethod() {
            synchronized(lock) { // 使用专用对象作为锁
                // 访问共享资源
            }
        }
    }
    ```
  </TabItem>
</Tabs>

<Admonition type="tip">
  <p><strong>最佳实践</strong>：优先使用同步代码块而非同步方法，以减小锁的范围，提高性能。</p>
</Admonition>

### Lock接口

`java.util.concurrent.locks`包提供了比`synchronized`更灵活的锁机制：

```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class LockCounter {
    private final Lock lock = new ReentrantLock();
    private int count = 0;
    
    public void increment() {
        lock.lock(); // 获取锁
        try {
            count++;
        } finally {
            lock.unlock(); // 释放锁
        }
    }
    
    public int getCount() {
        lock.lock();
        try {
            return count;
        } finally {
            lock.unlock();
        }
    }
}
```

<div style={{display: 'flex', gap: '15px', margin: '15px 0'}}>
  <div style={{flex: 1, backgroundColor: '#f6ffed', padding: '15px', borderRadius: '5px'}}>
    <h4 style={{marginTop: '0'}}>Lock接口优势</h4>
    <ul>
      <li>非阻塞地获取锁（tryLock）</li>
      <li>可中断的锁获取过程</li>
      <li>可设置超时的锁获取</li>
      <li>公平锁支持</li>
    </ul>
  </div>
  <div style={{flex: 1, backgroundColor: '#fff2e8', padding: '15px', borderRadius: '5px'}}>
    <h4 style={{marginTop: '0'}}>Lock接口劣势</h4>
    <ul>
      <li>需要手动释放锁</li>
      <li>必须在finally块中释放</li>
      <li>代码更复杂</li>
      <li>无法自动释放（出作用域）</li>
    </ul>
  </div>
</div>

### ReadWriteLock

读写锁允许多个线程同时读取，但写入时需要独占：

```java
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ReadWriteMap<K, V> {
    private final Map<K, V> map = new HashMap<>();
    private final ReadWriteLock lock = new ReentrantReadWriteLock();
    
    public V get(K key) {
        lock.readLock().lock();
        try {
            return map.get(key);
        } finally {
            lock.readLock().unlock();
        }
    }
    
    public V put(K key, V value) {
        lock.writeLock().lock();
        try {
            return map.put(key, value);
        } finally {
            lock.writeLock().unlock();
        }
    }
}
```

<Admonition type="info">
  <p>读写锁非常适合于读多写少的场景，可以显著提高并发性能。</p>
</Admonition>

## 并发容器

Java提供了多种线程安全的容器类：

<div style={{overflowX: 'auto'}}>
  <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '20px'}}>
    <thead>
      <tr style={{backgroundColor: '#f5f5f5'}}>
        <th style={{padding: '10px', border: '1px solid #ddd'}}>并发容器</th>
        <th style={{padding: '10px', border: '1px solid #ddd'}}>对应的非并发容器</th>
        <th style={{padding: '10px', border: '1px solid #ddd'}}>特点</th>
        <th style={{padding: '10px', border: '1px solid #ddd'}}>适用场景</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>ConcurrentHashMap</td>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>HashMap</td>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>分段锁，高并发</td>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>高并发读写Map</td>
      </tr>
      <tr>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>CopyOnWriteArrayList</td>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>ArrayList</td>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>写时复制，读多写少</td>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>读多写少的List</td>
      </tr>
      <tr>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>ConcurrentLinkedQueue</td>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>Queue</td>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>无锁算法，高性能</td>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>高并发队列操作</td>
      </tr>
      <tr>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>BlockingQueue系列</td>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>Queue</td>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>阻塞操作，生产消费</td>
        <td style={{padding: '10px', border: '1px solid #ddd'}}>生产者-消费者模式</td>
      </tr>
    </tbody>
  </table>
</div>

### ConcurrentHashMap

```java
import java.util.concurrent.ConcurrentHashMap;

public class ConcurrentMapExample {
    private final ConcurrentHashMap<String, String> map = new ConcurrentHashMap<>();
    
    public void putIfAbsent(String key, String value) {
        map.putIfAbsent(key, value);
    }
}
```

### CopyOnWriteArrayList

```java
import java.util.concurrent.CopyOnWriteArrayList;

public class CopyOnWriteExample {
    private final CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();
    
    public void add(String item) {
        list.add(item); // 线程安全，但添加操作会复制整个底层数组
    }
}
```

## 线程池

线程池管理一组工作线程，减少了线程创建和销毁的开销：

<Admonition type="tip">
  使用线程池可以有效控制线程数量，复用线程资源，提高响应速度，方便管理。
</Admonition>

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadPoolExample {
    public static void main(String[] args) {
        // 创建固定大小的线程池
        ExecutorService executor = Executors.newFixedThreadPool(5);
        
        for (int i = 0; i < 10; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("Task " + taskId + " executed by " + 
                                  Thread.currentThread().getName());
            });
        }
        
        // 关闭线程池
        executor.shutdown();
    }
}
```

<details>
<summary><strong>Java提供的四种常见线程池</strong></summary>

<Tabs>
  <TabItem value="fixed" label="固定大小线程池">
    ```java
    // 创建包含5个线程的线程池
    ExecutorService fixedPool = Executors.newFixedThreadPool(5);
    ```
    适用于需要限制线程数量的场景，保持CPU不会过载。
  </TabItem>
  <TabItem value="cached" label="缓存线程池">
    ```java
    // 创建按需创建线程的线程池
    ExecutorService cachedPool = Executors.newCachedThreadPool();
    ```
    适用于执行大量短期异步任务的场景，线程池会复用空闲线程。
  </TabItem>
  <TabItem value="single" label="单线程池">
    ```java
    // 创建只有一个工作线程的线程池
    ExecutorService singlePool = Executors.newSingleThreadExecutor();
    ```
    适用于需要保证顺序执行的场景。
  </TabItem>
  <TabItem value="scheduled" label="调度线程池">
    ```java
    // 创建可以执行定时任务的线程池
    ScheduledExecutorService scheduledPool = 
        Executors.newScheduledThreadPool(3);
        
    // 延迟2秒后执行
    scheduledPool.schedule(task, 2, TimeUnit.SECONDS);
    
    // 延迟1秒后，每3秒执行一次
    scheduledPool.scheduleAtFixedRate(task, 1, 3, TimeUnit.SECONDS);
    ```
    适用于需要执行定时任务的场景。
  </TabItem>
</Tabs>
</details>

### 自定义线程池

```java
import java.util.concurrent.*;

public class CustomThreadPoolExample {
    public static void main(String[] args) {
        ThreadPoolExecutor executor = new ThreadPoolExecutor(
            2,                      // 核心线程数
            5,                      // 最大线程数
            60, TimeUnit.SECONDS,   // 空闲线程存活时间
            new ArrayBlockingQueue<>(100), // 工作队列
            Executors.defaultThreadFactory(), // 线程工厂
            new ThreadPoolExecutor.CallerRunsPolicy() // 拒绝策略
        );
        
        // 提交任务...
        
        // 关闭线程池
        executor.shutdown();
    }
}
```

<div style={{backgroundColor: '#fcfdfe', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', border: '1px solid #f0f0f0', marginTop: '20px'}}>
  <h4 style={{marginTop: '0', color: '#2c3e50', fontSize: '18px'}}>线程池参数选择指南</h4>
  <ul style={{color: '#34495e', fontSize: '15px', lineHeight: '1.6'}}>
    <li><strong style={{color: '#1a5276'}}>核心线程数</strong>：通常设置为CPU核心数</li>
    <li><strong style={{color: '#1a5276'}}>最大线程数</strong>：CPU核心数 * (1 + 平均等待时间/平均计算时间)</li>
    <li><strong style={{color: '#1a5276'}}>队列大小</strong>：根据应用场景和内存情况设置</li>
    <li><strong style={{color: '#1a5276'}}>拒绝策略</strong>：根据业务需求选择合适的策略</li>
  </ul>
</div>

## 并发编程最佳实践

<div style={{backgroundColor: '#fcfdfe', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', border: '1px solid #f0f0f0', marginBottom: '25px'}}>
  <h3 style={{marginTop: '0', color: '#2c3e50', fontSize: '20px', borderBottom: '1px solid #eaeaea', paddingBottom: '10px'}}>最佳实践清单</h3>
  <ol style={{color: '#34495e', fontSize: '15px', lineHeight: '1.7', paddingLeft: '20px'}}>
    <li><span style={{color: '#1a5276', fontWeight: '500'}}>尽量减少共享可变状态</span>：使用不可变对象、ThreadLocal变量或方法局部变量</li>
    <li><span style={{color: '#1a5276', fontWeight: '500'}}>减小锁的粒度</span>：锁定必要的代码段而非整个方法</li>
    <li><span style={{color: '#1a5276', fontWeight: '500'}}>避免锁嵌套</span>：防止死锁</li>
    <li><span style={{color: '#1a5276', fontWeight: '500'}}>优先使用并发容器</span>：而非同步包装器</li>
    <li><span style={{color: '#1a5276', fontWeight: '500'}}>优先使用原子变量</span>：而非低级锁</li>
    <li><span style={{color: '#1a5276', fontWeight: '500'}}>使用线程池</span>：而非直接创建线程</li>
    <li><span style={{color: '#1a5276', fontWeight: '500'}}>优先使用高级同步工具</span>：如CountDownLatch、CyclicBarrier、Semaphore</li>
  </ol>
</div>

### 死锁避免

<Tabs>
  <TabItem value="deadlock" label="可能导致死锁的代码" default>
    ```java
    public class DeadlockRisk {
        private final Object resource1 = new Object();
        private final Object resource2 = new Object();
        
        public void method1() {
            synchronized(resource1) {
                System.out.println("Using resource 1");
                // 可能在这里发生死锁
                synchronized(resource2) {
                    System.out.println("Using resource 1 and 2");
                }
            }
        }
        
        public void method2() {
            synchronized(resource2) {
                System.out.println("Using resource 2");
                // 可能在这里发生死锁
                synchronized(resource1) {
                    System.out.println("Using resource 1 and 2");
                }
            }
        }
    }
    ```
  </TabItem>
  <TabItem value="solution" label="死锁避免方案">
    ```java
    public class DeadlockAvoidance {
        private final Object resource1 = new Object();
        private final Object resource2 = new Object();
        
        // 良好实践：总是按照相同的顺序获取锁
        public void method1() {
            synchronized(resource1) {
                System.out.println("Using resource 1");
                synchronized(resource2) {
                    System.out.println("Using resource 1 and 2");
                }
            }
        }
        
        public void method2() {
            synchronized(resource1) {  // 使用相同的获取顺序
                System.out.println("Using resource 1");
                synchronized(resource2) {
                    System.out.println("Using resource 1 and 2");
                }
            }
        }
    }
    ```
  </TabItem>
</Tabs>

<Admonition type="warning">
  <p>死锁是多线程编程中最危险的陷阱之一。检测和修复死锁通常很困难，预防是最佳策略！</p>
</Admonition>

## 性能优化与调优

### 并发程序的性能指标

<div style={{display: 'flex', gap: '15px', margin: '15px 0', flexWrap: 'wrap'}}>
  <div style={{flex: '1 1 200px', backgroundColor: '#e6f7ff', padding: '15px', borderRadius: '5px'}}>
    <h4 style={{marginTop: '0'}}>吞吐量</h4>
    <p>单位时间内完成的工作量</p>
    <p>影响因素：线程数量、锁竞争程度、任务处理速度</p>
  </div>
  <div style={{flex: '1 1 200px', backgroundColor: '#f6ffed', padding: '15px', borderRadius: '5px'}}>
    <h4 style={{marginTop: '0'}}>响应时间</h4>
    <p>从请求到响应的时间</p>
    <p>影响因素：锁等待时间、线程调度、资源竞争</p>
  </div>
  <div style={{flex: '1 1 200px', backgroundColor: '#fff7e6', padding: '15px', borderRadius: '5px'}}>
    <h4 style={{marginTop: '0'}}>可扩展性</h4>
    <p>增加资源时性能的提升程度</p>
    <p>影响因素：并行算法设计、同步开销、资源瓶颈</p>
  </div>
</div>

### 性能优化技巧

1. **适当的并发度**：线程数 = CPU核心数 * (1 + 等待时间/计算时间)
2. **避免过度同步**：确保同步范围尽可能小
3. **批处理**：合并多个小操作为一个大操作
4. **减少上下文切换**：避免频繁的线程切换
5. **使用并行流**：利用多核处理器

```java
// 使用并行流加速操作
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
long sum = numbers.parallelStream()
                 .mapToLong(Integer::longValue)
                 .sum();
```

<Admonition type="danger">
  <p>并不是所有操作都适合使用并行流。对于小规模数据或计算密集度低的操作，并行处理可能因线程开销而降低性能。</p>
</Admonition>

## 总结

Java并发编程是一个复杂而重要的领域，掌握它需要对底层原理有深入的理解。本文介绍了Java并发编程的基本概念、常用工具和最佳实践，希望能帮助读者构建高效、安全的并发应用。

<div style={{backgroundColor: '#f9f0ff', padding: '15px', borderRadius: '5px', marginTop: '15px'}}>
  <h3 style={{marginTop: '0', color: '#722ed1'}}>未来趋势</h3>
  <p>随着Java语言的发展，并发API也在不断优化和增强：</p>
  <ul>
    <li>Java 8引入的CompletableFuture提供了强大的异步编程能力</li>
    <li>Java 9的Flow API带来了响应式编程的支持</li>
    <li>Project Loom将引入虚拟线程，彻底改变Java并发编程模型</li>
  </ul>
  <p>持续学习和实践是掌握并发编程的关键。</p>
</div>

## 参考资料

1. 《Java并发编程实战》- Brian Goetz等
2. 《Effective Java》- Joshua Bloch
3. Oracle Java Documentation
4. Java Concurrency in Practice (JCiP) 