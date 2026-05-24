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
- [News & Awards]({{ base_path }}/year-archive/)
- [CV]({{ base_path }}/cv/)

## Publications

{% assign publications = site.publications | sort: "date" | reverse %}
{% for post in publications %}
- [{{ post.title }}]({{ base_path }}{{ post.url }}){% if post.venue %}, {{ post.venue }}{% endif %}
{% endfor %}

## News & Awards

{% for post in site.posts %}
- [{{ post.title }}]({{ base_path }}{{ post.url }}){% if post.date %}, {{ post.date | date: "%B %d, %Y" }}{% endif %}
{% endfor %}
