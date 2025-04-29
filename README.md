# GitHub Pages 自动部署配置

这个仓库包含了使用 GitHub Actions 自动部署到 GitHub Pages 的配置。

## 配置说明

### GitHub Actions 工作流

`.github/workflows/deploy.yml` 文件配置了自动部署工作流，包括：

- 在 push 到 main 分支时触发
- 使用 Node.js 环境
- 安装依赖并构建项目
- 将构建结果部署到 GitHub Pages

### GitHub Pages 配置

`.github/pages.yml` 文件配置了 GitHub Pages 的设置，包括：

- 部署分支：gh-pages
- 部署路径：根目录
- 启用 HTTPS
- 构建和部署命令

## 使用方法

1. 确保你的项目根目录中有 `package.json` 文件，并包含必要的构建脚本
2. 将这两个配置文件放在对应的目录中
3. 在 GitHub 仓库设置中启用 GitHub Pages
4. 推送代码到 main 分支，GitHub Actions 将自动触发部署流程

## 注意事项

- 确保你的项目有正确的构建脚本
- 如果需要自定义域名，取消 `.github/pages.yml` 中 cname 的注释并设置你的域名
- 部署过程可能需要几分钟时间
- 首次部署后，可以通过 `https://<username>.github.io/<repository-name>` 访问你的网站 