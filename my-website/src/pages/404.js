import React from 'react';
import Layout from '@theme/Layout';
import { Redirect } from '@docusaurus/router';

export default function NotFound() {
  return (
    <Layout title="页面未找到">
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1 className="hero__title">页面未找到</h1>
            <p>我们找不到您要访问的页面。</p>
            <p>
              这可能是因为：
            </p>
            <ul>
              <li>页面已移动到新位置</li>
              <li>页面不再存在</li>
              <li>您输入的URL有误</li>
            </ul>
            <div className="margin-top--lg">
              <a href="/" className="button button--primary button--lg">
                返回首页
              </a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 