---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

{% include base_path %}

This page lists the real public pages currently maintained on this site. The XML sitemap for search engines remains available at [sitemap.xml]({{ base_path }}/sitemap.xml).

## Main Pages

- [About]({{ base_path }}/)
- [Publications]({{ base_path }}/publications/)
- [Activities]({{ base_path }}/activities/)
- [CV]({{ base_path }}/cv/)

## Publications

{% assign publications = site.publications | sort: "date" | reverse %}
{% for post in publications %}
- [{{ post.title }}]({{ base_path }}{{ post.url }}){% if post.venue %}, {{ post.venue }}{% endif %}
{% endfor %}

## Activities

{% for post in site.posts %}
- [{{ post.title }}]({{ base_path }}{{ post.url }}){% if post.date %}, {{ post.date | date: "%B %d, %Y" }}{% endif %}
{% endfor %}

## Machine-readable

- [publications.bib]({{ base_path }}/publications.bib) — BibTeX for all publications
- [publications.json]({{ base_path }}/publications.json) · [api/publications.json]({{ base_path }}/api/publications.json) — publication records
- [api/profile.json]({{ base_path }}/api/profile.json) — author profile
- [api/posts.json]({{ base_path }}/api/posts.json) — activities (news & awards)
- [search.json]({{ base_path }}/search.json) — site search index
- [llms.txt]({{ base_path }}/llms.txt) — curated site map for LLM agents
- [feed.xml]({{ base_path }}/feed.xml) — Atom feed
