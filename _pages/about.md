---
permalink: /
title: "About Me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

<canvas class="home-network" aria-hidden="true"></canvas>

<div class="home-atmosphere" aria-hidden="true">
  <span class="home-atmosphere__orb home-atmosphere__orb--one"></span>
  <span class="home-atmosphere__orb home-atmosphere__orb--two"></span>
  <svg class="home-atmosphere__traces" viewBox="0 0 960 420" focusable="false">
    <path d="M64 82 H218 L272 136 H430 L486 80 H650 L704 132 H884" />
    <path d="M118 326 H244 L300 270 H448 L512 332 H676 L728 284 H900" />
    <path d="M386 34 V118 L444 176 V254 L506 316 V388" />
    <path d="M752 46 V118 L704 166 V246 L756 298 V376" />
    <circle cx="218" cy="82" r="4" />
    <circle cx="430" cy="136" r="4" />
    <circle cx="650" cy="80" r="4" />
    <circle cx="300" cy="270" r="4" />
    <circle cx="676" cy="332" r="4" />
    <circle cx="704" cy="166" r="4" />
  </svg>
</div>

<section class="home-hero home-hero--quiet">
  <svg class="home-hero__circuit" viewBox="0 0 720 260" aria-hidden="true" focusable="false">
    <path d="M48 64 H158 L206 112 H324 L374 62 H514 L568 116 H672" />
    <path d="M84 202 H198 L246 154 H392 L444 206 H558 L614 150" />
    <path d="M514 62 V26 M206 112 V166 M444 206 V238" />
    <circle cx="158" cy="64" r="5" />
    <circle cx="324" cy="112" r="5" />
    <circle cx="514" cy="62" r="5" />
    <circle cx="246" cy="154" r="5" />
    <circle cx="558" cy="202" r="5" />
  </svg>
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
