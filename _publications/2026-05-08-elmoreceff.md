---
title: "ElmoreCeff: A GPU-Friendly Elmore-Like Delay Calculator with a Closed-Form Effective Capacitance Model"
collection: publications
category: conferences
permalink: /publication/2026-05-08-elmoreceff
excerpt: ''
date: 2026-05-08
venue: 'IEEE/ACM International Symposium of EDA (ISEDA), Singapore, May, 2026.'
authors: "Haichuan Liu†, Zizheng Guo†, Runsheng Wang and Yibo Lin*"
# slidesurl: 'http://academicpages.github.io/files/slides1.pdf'
# paperurl: 'https://arxiv.org/pdf/2511.11660v1'
# bibtexurl: 'http://academicpages.github.io/files/bibtex1.bib'
# citation: 'Your Name, You. (2024). &quot;Paper Title Number 3.&quot; <i>GitHub Journal of Bugs</i>. 1(3).'
---

Accurate and efficient delay calculation is critical for timing-driven optimization, yet existing methods require a trade-off between fast but inaccurate Elmore timers and accurate but slow model order reduction (MOR) techniques. To bridge this gap, we introduce ElmoreCeff, a GPU-friendly Elmore-like delay calculator based on a closed-form effective capacitance model. ElmoreCeff can achieve speedups of up to 40.95$$\times$$ and 5.95$$\times$$ over CPU- and GPU-based MOR timers, respectively, while achieving comparable accuracy. This advantage enhances final quality of results (QoR) of timing optimization, improving worst negative slack (WNS) and total negative slack (TNS) by up to 8.4% and 5.4% compared to optimizations guided by the standard Elmore timer. 