<template><div><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2>
<p>有时候，你想在你的文档中嵌入视频，以提高内容的表达能力。</p>
<p>主题提供了 嵌入 Bilibili 视频 的功能。</p>
<p>该功能由 <RouteLink to="/">vuepress-plugin-md-power</RouteLink> 提供支持。</p>
<h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h2>
<p>该功能默认不启用。你需要在主题配置中开启。</p>
<CodeTabs id="18" :data='[{"id":".vuepress/config.ts"}]'>
<template #title0="{ value, isActive }">.vuepress/config.ts</template>
<template #tab0="{ value, isActive }">
<div class="language-ts line-numbers-mode" data-ext="ts" data-title="ts"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">export</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> default</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> defineUserConfig</span><span style="--shiki-light:#999999;--shiki-dark:#666666">({</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">  theme</span><span style="--shiki-light:#999999;--shiki-dark:#666666">: </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">plumeTheme</span><span style="--shiki-light:#999999;--shiki-dark:#666666">({</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    plugins</span><span style="--shiki-light:#999999;--shiki-dark:#666666">: {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">      markdownPower</span><span style="--shiki-light:#999999;--shiki-dark:#666666">: {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">        bilibili</span><span style="--shiki-light:#999999;--shiki-dark:#666666">: </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">true</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      },</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  })</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">})</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法"><span>语法</span></a></h2>
<p>简单的语法：</p>
<div class="language-md line-numbers-mode" data-ext="md" data-title="md"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">@</span><span style="--shiki-light:#999999;--shiki-dark:#666666">[</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">bilibili</span><span style="--shiki-light:#999999;--shiki-dark:#666666">](</span><span style="--shiki-light:#393A3490;--shiki-dark:#DEDCD590;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline">bvid</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>带 分P 的视频，在 <code v-pre>bilibili</code> 后跟随 <code v-pre>p1</code>、<code v-pre>p2</code>、<code v-pre>p3</code> 等选项</p>
<div class="language-md line-numbers-mode" data-ext="md" data-title="md"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">@[bilibili p1](aid cid)</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>更多选项：</p>
<div class="language-md line-numbers-mode" data-ext="md" data-title="md"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">@[bilibili p1 autoplay time="0" width="100%" height="400px" ratio="16:9"](bvid aid cid)</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>选项说明：</strong></p>
<ul>
<li>bvid: 视频 BV ID</li>
<li>aid: 视频 AID</li>
<li>cid: 视频 CID</li>
<li>autoplay: 是否自动播放</li>
<li>time: 视频开始播放时间点，单位为秒， 也可以使用 <code v-pre>mm:ss</code> 或 <code v-pre>hh:mm:ss</code> 格式</li>
<li>width: 视频宽度</li>
<li>height: 视频高度</li>
<li>ratio: 视频比例，默认 <code v-pre>16:9</code></li>
</ul>
<p>对于分P的视频，可以省略传入 <code v-pre>bvid</code>，但需要传入 <code v-pre>aid</code> 和 <code v-pre>cid</code></p>
<h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2>
<h3 id="宽频视频" tabindex="-1"><a class="header-anchor" href="#宽频视频"><span>宽频视频</span></a></h3>
<p>输入：</p>
<div class="language-md line-numbers-mode" data-ext="md" data-title="md"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">@</span><span style="--shiki-light:#999999;--shiki-dark:#666666">[</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">bilibili</span><span style="--shiki-light:#999999;--shiki-dark:#666666">](</span><span style="--shiki-light:#393A3490;--shiki-dark:#DEDCD590;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline">BV1EZ42187Hg</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>输出：</p>
<VideoBilibili src="https://player.bilibili.com/player.html?bvid=BV1EZ42187Hg&p=1&autoplay=0" width="100%" height="" ratio="" title="undefined" /><h3 id="竖屏视频" tabindex="-1"><a class="header-anchor" href="#竖屏视频"><span>竖屏视频</span></a></h3>
<p>输入：</p>
<div class="language-md line-numbers-mode" data-ext="md" data-title="md"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">@</span><span style="--shiki-light:#999999;--shiki-dark:#666666">[</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">bilibili width="320px" ratio="9:16"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">](</span><span style="--shiki-light:#393A3490;--shiki-dark:#DEDCD590;--shiki-light-text-decoration:underline;--shiki-dark-text-decoration:underline">BV1zr42187eg</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>输出：</p>
<VideoBilibili src="https://player.bilibili.com/player.html?bvid=BV1zr42187eg&p=1&autoplay=0" width="320px" height="" ratio="9:16" title="undefined" /></div></template>


