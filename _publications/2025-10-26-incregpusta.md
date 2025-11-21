---
title: "IncreGPUSTA: GPU-Accelerated Incremental Static Timing Analysis for Iterative Design Flows"
collection: publications
category: conferences
permalink: /publication/2025-10-26-incregpusta
# excerpt: 'This paper is about a famous math equation, $$E=mc^2$$'
date: 2025-10-26
venue: 'IEEE/ACM International Conference on Computer-Aided Design (ICCAD), Munich, Germany, Oct, 2025.'
authors: "Haichuan Liu<sup>#</sup>, Zizheng Guo<sup>#</sup>, Runsheng Wang and Yibo Lin<sup>*</sup>"
# slidesurl: 'http://academicpages.github.io/files/slides1.pdf'
paperurl: 'http://academicpages.github.io/files/ICCAD2025_IncreGPUSTA.pdf'
# bibtexurl: 'http://academicpages.github.io/files/bibtex1.bib'
# citation: 'Your Name, You. (2024). &quot;Paper Title Number 3.&quot; <i>GitHub Journal of Bugs</i>. 1(3).'
---

Static timing analysis (STA) plays an essential role in VLSI design optimization. While CPU-based incremental STA methods reduce computational overhead by selectively updating affected circuit regions, and GPU-accelerated engines improve full-circuit analysis throughput, effectively combining these approaches has remained challenging. Existing solutions offer only partial incrementality, either switching to CPU processing for small modifications or handling solely delay value changes without supporting structural updates. We introduce IncreGPUSTA, a novel GPU-accelerated incremental STA algorithm with dual-CSR data structures and incremental levelization that efficiently processes timing updates for both localized and structural modifications. Experimental results on industrial benchmarks demonstrate speedups of up to 3.06$\times$ over GPU full Timer and up to 72.50$\times$ over CPU incremental Timer for million-scale designs.