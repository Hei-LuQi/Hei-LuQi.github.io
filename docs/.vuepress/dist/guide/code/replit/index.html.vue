<template><div><Badge type="danger" text="弃用" /><p><s>主题支持在 Markdown 文件中嵌入 <a href="https://replit.com/" target="_blank" rel="noopener noreferrer">Replit</a>。</s></p>
<h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h2>
<p>此功能默认不启用，你可以在配置文件中启用它。</p>
<CodeTabs id="11" :data='[{"id":".vuepress/config.ts"}]'>
<template #title0="{ value, isActive }">.vuepress/config.ts</template>
<template #tab0="{ value, isActive }">
<div class="language-ts line-numbers-mode" data-ext="ts" data-title="ts"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark has-highlighted vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">export</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> default</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> defineUserConfig</span><span style="--shiki-light:#999999;--shiki-dark:#666666">({</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">  theme</span><span style="--shiki-light:#999999;--shiki-dark:#666666">: </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">plumeTheme</span><span style="--shiki-light:#999999;--shiki-dark:#666666">({</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    plugins</span><span style="--shiki-light:#999999;--shiki-dark:#666666">: {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">      markdownPower</span><span style="--shiki-light:#999999;--shiki-dark:#666666">: {</span></span>
<span class="line highlighted"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">        replit</span><span style="--shiki-light:#999999;--shiki-dark:#666666">: </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">true</span><span style="--shiki-light:#999999;--shiki-dark:#666666">, </span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      },</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  })</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">})</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法"><span>语法</span></a></h2>
<p>简单的语法</p>
<div class="language-md line-numbers-mode" data-ext="md" data-title="md"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">@</span><span style="--shiki-light:#999999;--shiki-dark:#666666">[</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">replit</span><span style="--shiki-light:#999999;--shiki-dark:#666666">](</span><span style="--shiki-light:#393A3490;--shiki-dark:#DEDCD590;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline">user/repl-name</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>更多选项</p>
<div class="language-md line-numbers-mode" data-ext="md" data-title="md"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">@</span><span style="--shiki-light:#999999;--shiki-dark:#666666">[</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">replit title="" width="100%" height="450px" theme="dark"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">](</span><span style="--shiki-light:#393A3490;--shiki-dark:#DEDCD590;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline">user/repl-name#filepath</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><code v-pre>title</code>: 标题</li>
<li><code v-pre>width</code>: 容器宽度</li>
<li><code v-pre>height</code>: 容器高度</li>
<li><code v-pre>theme</code>: 主题， 可选值 <code v-pre>dark</code> 和 <code v-pre>light</code></li>
<li><code v-pre>user</code>: Replit 用户名</li>
<li><code v-pre>repl-name</code>: Replit repl 名称</li>
<li><code v-pre>filepath</code>: Replit 默认打开的文件路径</li>
</ul>
<h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2>
<p>输入：</p>
<div class="language-md line-numbers-mode" data-ext="md" data-title="md"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">@</span><span style="--shiki-light:#999999;--shiki-dark:#666666">[</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">replit</span><span style="--shiki-light:#999999;--shiki-dark:#666666">](</span><span style="--shiki-light:#393A3490;--shiki-dark:#DEDCD590;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline">@TechPandaPro/Cursor-Hangout#package.json</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>输出：</p>
<ReplitViewer title="" height="450px" width="100%" source="@TechPandaPro/Cursor-Hangout#package.json" theme="" /></div></template>


