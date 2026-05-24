# Site Page Cleanup Notes

本文件记录这个 Academic Pages/Jekyll 站点中哪些页面是当前真实使用的，哪些模板页面被临时屏蔽，以及以后如何恢复或彻底删除。

## 当前保留的真实页面

入口页：

- `/`：个人主页，对应 `_pages/about.md`
- `/publications/`：论文列表，对应 `_pages/publications.html`
- `/year-archive/`：News & Awards，对应 `_pages/year-archive.html`
- `/cv/`：简历页，对应 `_pages/cv.md`
- `/sitemap/`：人工站点地图，对应 `_pages/sitemap.md`
- `/404.html`：404 页面，对应 `_pages/404.md`

真实内容：

- `_publications/`：当前论文详情页，会输出到 publication URL
- `_posts/`：当前 News & Awards 详情页，会输出到 posts URL

搜索引擎：

- `/sitemap.xml`：由 `jekyll-sitemap` 自动生成，继续保留
- `/feed.xml`：由 `jekyll-feed` 自动生成，继续保留

## 已临时屏蔽的模板页面和目录

这些内容目前没有删除，只是在 `_config.yml` 中通过 `exclude` 或 `collections.output: false` 阻止 Jekyll 输出，并在各自 front matter 中标记 `sitemap: false` / `published: false`，避免人工 sitemap 或 `jekyll-sitemap` 再收录死链：

页面：

- `_pages/archive-layout-with-content.md`：模板排版示例
- `_pages/category-archive.html`：分类归档页
- `_pages/collection-archive.html`：集合归档页
- `_pages/cv-json.md`：JSON CV 版本
- `_pages/markdown.md`：Academic Pages Markdown 使用指南
- `_pages/non-menu-page.md`：非菜单示例页
- `_pages/page-archive.html`：全部页面归档页
- `_pages/portfolio.html`：Portfolio 入口页
- `_pages/tag-archive.html`：标签归档页
- `_pages/talkmap.html`：Talk map 页面
- `_pages/talks.html`：Talks 入口页
- `_pages/teaching.html`：Teaching 入口页
- `_pages/terms.md`：模板隐私条款页

集合和工具目录：

- `_portfolio/`：Portfolio 示例内容
- `_talks/`：Talks 示例内容
- `_teaching/`：Teaching 示例内容
- `talkmap/`：Talk map 静态输出
- `markdown_generator/`：模板自带的 Markdown 生成工具
- `scripts/`：当前未用于站点输出的辅助脚本

## 恢复方法

如果以后需要恢复某个页面：

1. 从 `_config.yml` 的 `exclude` 列表中删除对应路径。
2. 从对应文件 front matter 中删除 `sitemap: false` 和 `published: false`。
3. 如果恢复的是 `talks`、`teaching` 或 `portfolio` 集合，把 `_config.yml` 中对应 collection 的 `output` 改回 `true`。
4. 如果希望页面出现在顶部导航，更新 `_data/navigation.yml`。
5. 运行 `bundle exec jekyll build` 验证输出。

例如恢复 Talks：

```yaml
collections:
  talks:
    output: true
    permalink: /:collection/:path/
```

并从 `exclude` 中移除：

```yaml
- _pages/talks.html
- _pages/talkmap.html
- _talks/
- talkmap/
```

## 彻底删除建议

确认线上部署正常、并且不再需要恢复模板示例后，可以删除以下内容：

- `_pages/archive-layout-with-content.md`
- `_pages/category-archive.html`
- `_pages/collection-archive.html`
- `_pages/cv-json.md`
- `_pages/markdown.md`
- `_pages/non-menu-page.md`
- `_pages/page-archive.html`
- `_pages/portfolio.html`
- `_pages/tag-archive.html`
- `_pages/talkmap.html`
- `_pages/talks.html`
- `_pages/teaching.html`
- `_pages/terms.md`
- `_portfolio/`
- `_talks/`
- `_teaching/`
- `talkmap/`
- `markdown_generator/`

暂时不要删除这些主题运行依赖，除非逐个确认没有引用：

- `_layouts/`
- `_includes/`
- `_sass/`
- `assets/`
- `_data/`
- `images/`
- `files/`

`scripts/` 目前被屏蔽输出，但其中有 CV 数据生成脚本；如果以后仍要从 Markdown/JSON 生成 CV，不建议删除。

## 验证方法

推荐验证命令：

```bash
bundle exec jekyll build
```

构建后应存在：

- `_site/index.html`
- `_site/publications/index.html`
- `_site/year-archive/index.html`
- `_site/cv/index.html`
- `_site/sitemap/index.html`
- `_site/sitemap.xml`

构建后不应存在：

- `_site/markdown/`
- `_site/talks/`
- `_site/teaching/`
- `_site/portfolio/`
- `_site/talkmap.html`
- `_site/categories/`
- `_site/tags/`
- `_site/page-archive/`
- `_site/collection-archive/`
- `_site/non-menu-page/`
- `_site/terms/`

当前环境如果没有 Ruby/Jekyll，只能先做静态检查，最终以 GitHub Pages 或本机安装 Ruby 后的构建结果为准。
