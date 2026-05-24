---
permalink: /
title: "About Me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

<section class="home-hero">
  <p class="eyebrow">Peking University · Electronic Design Automation</p>
  <h1>Haichuan Liu <span>刘海川</span></h1>
  <p class="home-hero__lead">I work on GPU-accelerated EDA systems, with a focus on static timing analysis and timing-driven optimization for modern VLSI design flows.</p>
  <div class="home-hero__actions">
    <a class="btn btn--primary" href="/publications/">View Publications</a>
    <a class="btn btn--inverse" href="/cv/">View CV</a>
  </div>
</section>

<section class="research-focus" aria-label="Research focus">
  <div class="focus-card">
    <span>01</span>
    <h2>GPU-Accelerated EDA</h2>
    <p>Designing heterogeneous CPU-GPU data structures and execution flows for scalable electronic design automation.</p>
  </div>
  <div class="focus-card">
    <span>02</span>
    <h2>Static Timing Analysis</h2>
    <p>Developing timing engines and incremental analysis techniques for iterative design closure.</p>
  </div>
  <div class="focus-card">
    <span>03</span>
    <h2>Timing-Driven Optimization</h2>
    <p>Connecting efficient timing models with downstream placement, routing, and optimization loops.</p>
  </div>
</section>

## Biography

I am **Haichuan Liu (刘海川)**, an undergraduate student majoring in **Microelectronics Science and Engineering** at the School of Electronics Engineering and Computer Science, Peking University. I am advised by Prof. [Yibo Lin](https://yibolin.com/).

My work centers on the intersection of semiconductor technology, Electronic Design Automation (EDA), and high-performance computing. Lately I have also been reading [The Art of HPC](https://theartofhpc.com/) textbooks by Victor Eijkhout of TACC, which I highly recommend for anyone interested in scientific computing.

## Selected Publications

<div class="home-publications">
{% assign selected_publications = site.publications | sort: "date" | reverse %}
{% for post in selected_publications limit:3 %}
  <article class="mini-publication">
    <p class="mini-publication__venue">{{ post.venue }}</p>
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    {% if post.authors %}<p class="mini-publication__authors">{{ post.authors | replace: 'Haichuan Liu', '<strong>Haichuan Liu</strong>' | markdownify | remove: '<p>' | remove: '</p>' }}</p>{% endif %}
  </article>
{% endfor %}
</div>

## Recent News

<div class="news-list">
{% for post in site.posts limit:3 %}
  <article class="news-item">
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %Y" }}</time>
    <a href="{{ post.url }}">{{ post.title }}</a>
  </article>
{% endfor %}
</div>
