---
permalink: /
title: "About Me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

<section class="home-hero home-hero--quiet">
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
    <h2>GPU-Accelerated EDA</h2>
  </div>
  <div class="focus-card">
    <h2>VLSI Timing Analysis</h2>
  </div>
  <div class="focus-card">
    <h2>Timing-Driven Optimization</h2>
  </div>
</section>

## Biography

I am **Haichuan Liu (刘海川)**, an undergraduate student majoring in **Microelectronics Science and Engineering** at the School of Electronics Engineering and Computer Science, Peking University. I am advised by Prof. [Yibo Lin](https://yibolin.com/).

My work centers on the intersection of semiconductor technology, Electronic Design Automation (EDA), and high-performance computing. My primary research interests include:

*   **Hardware Acceleration:** Leveraging CPU-GPU heterogeneous computing architectures to accelerate various EDA flows.
*   **VLSI Timing Analysis:** Developing Static Timing Analysis (STA) methodologies to achieve timing closure in advanced nodes.
*   **Timing-Driven Optimization:** Connecting efficient timing models with placement, routing, and optimization loops.

Lately I have been reading [The Art of HPC](https://theartofhpc.com/) textbooks by Victor Eijkhout of TACC—highly recommended for anyone interested in scientific computing.

## Selected Publications

<div class="home-publications">
{% assign selected_publications = site.publications | sort: "date" | reverse %}
{% for post in selected_publications limit:3 %}
  <article class="mini-publication">
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    {% if post.authors %}<p class="mini-publication__authors">{% include linked-authors.html authors=post.authors %}</p>{% endif %}
    {% if post.venue %}<p class="mini-publication__venue">{{ post.venue }}</p>{% endif %}
    <div class="publication-card__links publication-card__links--compact">
      <a href="{{ post.url }}">Details</a>
      {% if post.paperurl %}<a href="{{ post.paperurl }}">Paper</a>{% endif %}
    </div>
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
