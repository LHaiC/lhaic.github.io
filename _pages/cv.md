---
layout: cv-layout
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<div class="cv-actions" aria-label="CV actions">
  <button type="button" onclick="window.print()">Print / Save as PDF</button>
</div>

<article class="cv-document">
  <header class="cv-heading">
    <h1>Haichuan Liu <span>刘海川</span></h1>
    <p class="cv-subtitle">Curriculum Vitae</p>
    <p class="cv-contact">
      <a href="mailto:{{ site.author.personal_email }}">{{ site.author.personal_email }}</a>
      <span aria-hidden="true">·</span>
      <a href="{{ site.url }}">{{ site.url | remove: "https://" | remove: "http://" }}</a>
      {% if site.author.googlescholar %}
        <span aria-hidden="true">·</span>
        <a href="{{ site.author.googlescholar }}">Google Scholar</a>
      {% endif %}
      {% if site.author.github %}
        <span aria-hidden="true">·</span>
        <a href="https://github.com/{{ site.author.github }}">GitHub</a>
      {% endif %}
    </p>
  </header>

  <section class="resume-section cv-summary">
    <h2>Research Interests</h2>
    <p>High-performance EDA systems, GPU acceleration, static timing analysis, delay modeling, and timing-driven optimization.</p>
  </section>

  <section class="resume-section">
    <h2>Education</h2>
    <div class="resume-item">
      <div>
        <strong>Ph.D. in Integrated Circuit Science and Engineering</strong>
        <span>School of Integrated Circuits, Peking University</span>
      </div>
      <time>Sep 2026&ndash;Present</time>
    </div>
    <div class="resume-item">
      <div>
        <strong>B.S. in Microelectronics Science and Engineering</strong>
        <span>School of Electronics Engineering and Computer Science, Peking University</span>
      </div>
      <time>Sep 2022&ndash;Jun 2026</time>
    </div>
  </section>

  <section class="resume-section">
    <h2>Technical Skills</h2>
    <dl class="cv-skills">
      <div><dt>Programming</dt><dd>C/C++, CUDA, Rust, Python, Verilog</dd></div>
      <div><dt>High-Performance Computing</dt><dd>Parallel algorithms, CPU&ndash;GPU heterogeneous computing, performance optimization</dd></div>
      <!-- <div><dt>Electronic Design Automation</dt><dd>Static timing analysis, delay modeling, timing-driven optimization</dd></div> -->
    </dl>
  </section>

  <section class="resume-section">
    <h2>Honors &amp; Awards</h2>
    {% for post in site.posts %}
      {% if post.tags contains "Award" %}
        <div class="resume-item">
          <div>
            <strong><a href="{{ base_path }}{{ post.url }}">{{ post.award_name }}</a></strong>
            {% if post.award_name_zh %}<span>{{ post.award_name_zh }}</span>{% endif %}
          </div>
          <time>{{ post.date | date: "%b %Y" }}</time>
        </div>
      {% endif %}
    {% endfor %}
  </section>

  <section class="resume-section">
    <h2>Publications</h2>
    <div class="cv-publications">
    {% for post in site.publications reversed %}
      <article class="cv-publication">
        <span class="cv-publication__number">[{{ forloop.rindex }}]</span>
        <div>
          <h3><a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a></h3>
          {% if post.authors %}<p>{% include linked-authors.html authors=post.authors %}</p>{% endif %}
          {% if post.venue %}<p class="cv-publication__venue">{{ post.venue }}</p>{% endif %}
        </div>
      </article>
    {% endfor %}
    </div>
  </section>
</article>
