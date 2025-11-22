---
title: "HeteroSTA: A CPU-GPU Heterogeneous Static Timing Analysis Engine with Holistic Industrial Design Support"
collection: publications
category: conferences
permalink: /publication/2026-01-19-heterosta
excerpt: ''
date: 2026-01-19
venue: 'IEEE/ACM Asia and South Pacific Design Automation Conference (ASPDAC), Hong Kong, Jan, 2026.'
authors: "Zizheng Guo, Haichuan Liu, Xizhe Shi, Shenglu Hua, Zuodong Zhang, Chunyuan Zhao, Runsheng Wang and Yibo Lin*"
# slidesurl: 'http://academicpages.github.io/files/slides1.pdf'
paperurl: 'https://arxiv.org/pdf/2511.11660v1'
# bibtexurl: 'http://academicpages.github.io/files/bibtex1.bib'
# citation: 'Your Name, You. (2024). &quot;Paper Title Number 3.&quot; <i>GitHub Journal of Bugs</i>. 1(3).'
---

We introduce in this paper, HeteroSTA, the first CPU-GPU heterogeneous timing analysis engine that efficiently supports: (1) a set of delay calculation models providing versatile accuracy-speed choices without relying on an external golden tool, (2) robust support for industry formats, including especially the .sdc constraints containing all common timing exceptions, clock domains, and case analysis modes, and (3) end-to-end GPU-acceleration for both graph-based and path-based timing queries, all exposed as a zero-overhead flattened heterogeneous application programming interface (API). HeteroSTA is publicly available with both a standalone binary executable and an embeddable shared library targeting ubiquitous academic and industry applications. Example use cases as a standalone tool, a timing-driven DREAMPlace 4.0 integration, and a timing-driven global routing integration have all demonstrated remarkable runtime speed-up and comparable quality.