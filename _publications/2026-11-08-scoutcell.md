---
title: "ScoutCell: Sensitivity-Guided Coupling Optimization for Timing-Driven Standard Cell Synthesis"
collection: publications
category: conferences
permalink: /publication/2026-11-08-scoutcell
excerpt: ''
date: 2026-11-08
venue: 'IEEE/ACM International Conference on Computer-Aided Design (ICCAD), San Jose, CA, USA, Nov, 2026.'
venue_short: "ICCAD'26"
venue_url: 'https://iccad.com/2026'
authors: "Kairong Guo, Haoyi Zhang, Haichuan Liu, Chunyuan Zhao and Yibo Lin*"
# slidesurl: 'http://academicpages.github.io/files/slides1.pdf'
paperurl: 'https://www.haichuanliu.top/files/ICCAD2026_ScoutCell.pdf'
# bibtexurl: 'http://academicpages.github.io/files/bibtex1.bib'
# citation: 'Your Name, You. (2024). &quot;Paper Title Number 3.&quot; <i>GitHub Journal of Bugs</i>. 1(3).'
---

In advanced-node standard cell synthesis, timing optimization is increasingly limited by parasitic coupling effects that are not well captured by wirelength-centric heuristics alone. While recent timing-driven approaches improve delay by shortening critical paths, they often overlook the disproportionate impact of parasitic coupling on specific delay-critical net pairs. In this work, we propose ScoutCell, a sensitivity-guided standard-cell synthesis framework that follows a characterize-then-optimize flow. ScoutCell first extracts a reusable pairwise sensitivity prior from an anchor layout, and then uses this prior to guide coupling-aware placement candidate screening and routing refinement toward isolating delay-critical net-pair interactions. Experiments on the ASAP7 predictive process design kit show that ScoutCell consistently outperforms both the area/wirelength-driven baseline and a state-of-the-art timing-driven cell synthesis method, reducing the average cell delay by 0.6%/1.2% and 0.2%/0.5% on combinational/sequential cells, respectively. Under a full logic-synthesis and physical-implementation flow, ScoutCell further improves the average post-route achievable frequency by 8.5% and 4.7% over the two baselines, demonstrating that its cell-level timing benefits remain visible at the design level.
