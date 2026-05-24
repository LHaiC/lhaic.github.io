---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<div class="cv-summary">
  <p>Undergraduate researcher at Peking University working on GPU-accelerated EDA, static timing analysis, and timing-driven optimization.</p>
</div>

<section class="resume-section">
  <h2>Education</h2>
  <div class="resume-item">
    <div>
      <strong>B.S. in Microelectronics Science and Engineering</strong>
      <span>Peking University</span>
    </div>
    <time>Expected 2026</time>
  </div>
</section>

<section class="resume-section">
  <h2>Skills</h2>
  <div class="skill-grid">
    <div>
      <h3>Programming</h3>
      <p>C/C++/CUDA · Rust · Python · Verilog</p>
    </div>
    <div>
      <h3>EDA Tools</h3>
      <p>Cadence Virtuoso · Synopsys PrimeTime</p>
    </div>
    <div>
      <h3>Research Areas</h3>
      <p>GPU acceleration · Static timing analysis · Timing-driven optimization</p>
    </div>
  </div>
</section>

<section class="resume-section">
  <h2>Publications</h2>
  <div class="cv-publications">
  {% for post in site.publications reversed %}
    <article class="cv-publication">
      <h3><a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a></h3>
      {% if post.authors %}<p>{% include linked-authors.html authors=post.authors %}</p>{% endif %}
      {% if post.venue %}<span>{{ post.venue }}</span>{% endif %}
    </article>
  {% endfor %}
  </div>
</section>
