---
permalink: /
title: "About Me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% include lhc-wordmark.html %}

I am **Haichuan Liu (刘海川)**, a Ph.D. student at the School of Integrated Circuits, Peking University. I am advised by Prof. [Yibo Lin](https://yibolin.com/).

My research focuses on high-performance electronic design automation (EDA), with particular interests in:

*   **Hardware Acceleration:** Leveraging CPU-GPU heterogeneous computing architectures to accelerate various EDA flows.
*   **VLSI Timing Analysis:** Developing efficient Static Timing Analysis (STA) methodologies to achieve timing closure in advanced nodes.
*   **Timing-Driven Optimization:** Connecting efficient timing models with placement, routing, and optimization loops.

## Recent News

<div class="news-list">
{% for post in site.posts limit:3 %}
  <article class="news-item">
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %Y" }}</time>
    <a href="{{ post.url }}">{{ post.title }}</a>
  </article>
{% endfor %}
</div>

## Recommended

- [The Art of HPC](https://theartofhpc.com/) — Victor Eijkhout of TACC
- [The Modern Algorithmic Toolbox](https://web.stanford.edu/class/cs168/) — Gregory Valiant, Stanford University
