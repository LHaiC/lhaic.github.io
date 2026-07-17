# Site Page Cleanup Notes

本文件记录这个 Academic Pages/Jekyll 站点中哪些页面是当前真实使用的。模板自带的示例页面、
集合和工具已经在 2026-07 的清理中**彻底删除**（不再用 `exclude` 屏蔽）；如需恢复，
从 git 历史中找回即可（删除前最后一个包含它们的提交之前的版本）。

## 当前保留的真实页面

入口页：

- `/`：个人主页，对应 `_pages/about.md`
- `/publications/`：论文列表，对应 `_pages/publications.html`
- `/activities/`：Activities（获奖与动态），对应 `_pages/activities.html`（旧路径 `/highlights/`、`/news/`、`/year-archive/` 已重定向过来）
- `/cv/`：简历页，对应 `_pages/cv.md`
- `/sitemap/`：人工站点地图，对应 `_pages/sitemap.md`
- `/404.html`：404 页面，对应 `_pages/404.md`

真实内容：

- `_publications/`：论文详情页，输出到 `/publication/<slug>`
- `_posts/`：News & Awards 详情页，输出到 `/posts/YYYY/MM/slug/`

搜索引擎：

- `/sitemap.xml`：由 `jekyll-sitemap` 自动生成
- `/feed.xml`：由 `jekyll-feed` 自动生成

## 已删除的模板内容（2026-07 清理）

以下内容已彻底删除，不再存在于仓库中：

- 模板示例页：`_pages/` 下的 markdown 指南、category/tag/collection/page 归档、
  talks/teaching/portfolio 入口页、talkmap、cv-json、terms、non-menu-page 等 13 个文件
- 示例集合：`_portfolio/`、`_talks/`、`_teaching/`、`_drafts/`
- 工具链：`talkmap/`、`talkmap.py`、`talkmap.ipynb`、`markdown_generator/`、`scripts/`
  （含 CV JSON 生成脚本和 `_data/cv.json`）、`.github/workflows/scrape_talks.yml`
- 未引用的 include/layout：`feature_row`、`gallery`、`paginator`、`cv-template`、
  `archive-single-cv`、`archive-single-talk(-cv)`、评论系统全套（`comments.html`、
  `comment.html`、`comments-providers/`）、`browser-upgrade`、`category-list`、
  `tag-list`、`group-by-array`、`page__taxonomy`、`splash`/`talk`/`archive-taxonomy` 布局
- 未引用的静态资源：模板素材图片（bio-photo、image-alignment 系列等）、
  `assets/css/cv-style.css`、`assets/css/academicons.min.css`
- 配置：`_config.yml` 中的 `comments:`、`staticman:`、`talkmap_link`、
  `category_archive`/`tag_archive`、`jekyll-gist`/`jekyll-paginate` 插件、
  teaching/portfolio/talks 三个 collection

## 恢复方法

```bash
# 找到删除提交
git log --oneline -- _talks/
# 从删除前的提交恢复某个路径
git checkout <删除提交的父提交> -- _talks/ _pages/talks.html
```

恢复 talks/teaching/portfolio 集合时，还需在 `_config.yml` 中重新添加对应 collection
配置，并按需更新 `_data/navigation.yml`。

## 不要删除

以下目录虽然部分内容看似未被引用，但主题运行依赖它们：

- `_layouts/`、`_includes/`、`_sass/`、`assets/`、`_data/`、`images/`、`files/`

## 验证方法

```bash
bundle exec jekyll build
```

构建后应存在：

- `_site/index.html`
- `_site/publications/index.html`
- `_site/activities/index.html`
- `_site/cv/index.html`
- `_site/sitemap/index.html`
- `_site/sitemap.xml`

当前环境如果没有 Ruby/Jekyll，可用 Docker 构建：

```bash
PUID=$(id -u) PGID=$(id -g) docker compose run --rm jekyll-site jekyll build
```
