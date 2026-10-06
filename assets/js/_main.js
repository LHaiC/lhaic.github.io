/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

// Determine the expected state of the theme toggle, which can be "dark", "light", or
// "system". Default is "system".
let determineThemeSetting = () => {
  let themeSetting = localStorage.getItem("theme");
  return (themeSetting != "dark" && themeSetting != "light" && themeSetting != "system") ? "system" : themeSetting;
};

// Determine the computed theme, which can be "dark" or "light". If the theme setting is
// "system", the computed theme is determined based on the user's system preference.
let determineComputedTheme = () => {
  let themeSetting = determineThemeSetting();
  if (themeSetting != "system") {
    return themeSetting;
  }
  return (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
};

// detect OS/browser preference
const browserPref = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';

// Set the theme on page load or when explicitly called
let setTheme = (theme) => {
  const use_theme =
    theme ||
    localStorage.getItem("theme") ||
    $("html").attr("data-theme") ||
    browserPref;

  if (use_theme === "dark") {
    $("html").attr("data-theme", "dark");
    $("#theme-icon").removeClass("fa-sun").addClass("fa-moon");
  } else if (use_theme === "light") {
    $("html").removeAttr("data-theme");
    $("#theme-icon").removeClass("fa-moon").addClass("fa-sun");
  }
};

// Toggle the theme manually
var toggleTheme = () => {
  const current_theme = $("html").attr("data-theme");
  const new_theme = current_theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", new_theme);
  setTheme(new_theme);
};

/* ==========================================================================
   Plotly integration script so that Markdown codeblocks will be rendered
   ========================================================================== */

// Read the Plotly data from the code block, hide it, and render the chart as new node. This allows for the
// JSON data to be retrieve when the theme is switched. The listener should only be added if the data is
// actually present on the page.
import { plotlyDarkLayout, plotlyLightLayout } from './theme.js';
let plotlyElements = document.querySelectorAll("pre>code.language-plotly");
if (plotlyElements.length > 0) {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      plotlyElements.forEach((elem) => {
        // Parse the Plotly JSON data and hide it
        var jsonData = JSON.parse(elem.textContent);
        elem.parentElement.classList.add("hidden");

        // Add the Plotly node
        let chartElement = document.createElement("div");
        elem.parentElement.after(chartElement);

        // Set the theme for the plot and render it
        const theme = (determineComputedTheme() === "dark") ? plotlyDarkLayout : plotlyLightLayout;
        if (jsonData.layout) {
          jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
        } else {
          jsonData.layout = { template: theme };
        }
        Plotly.react(chartElement, jsonData.data, jsonData.layout);
      });
    }
  });
}


/* ==========================================================================
   Site-wide search overlay (Fuse.js fuzzy search over /search.json)
   Opened by the masthead icon or the "/" key; supports ?q= deep links.
   ========================================================================== */

let fuseIndex = null;
let searchIndexLoading = false;
let searchActiveIndex = -1;
let pendingSearchQuery = null;
let searchDebounce = null;
const SEARCH_LIMIT = 8;

let escapeHtml = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

let renderSearchResults = (items) => {
  const box = document.getElementById("search-results");
  if (!box) return;
  if (!items.length) {
    box.innerHTML = '<li class="search-results__empty">No results found</li>';
    return;
  }
  box.innerHTML = items
    .map((it) => {
      const meta = (it.venue ? it.venue + " · " : "") + (it.date || "");
      const excerpt =
        it.excerpt && it.excerpt.length > 160 ? it.excerpt.slice(0, 160) + "…" : it.excerpt || "";
      return (
        '<li><a class="search-result" href="' + escapeHtml(it.url) + '">' +
        '<span class="search-result__type">' + escapeHtml(it.type) + "</span>" +
        '<span class="search-result__title">' + escapeHtml(it.title) + "</span>" +
        '<span class="search-result__meta">' + escapeHtml(meta) + "</span>" +
        '<span class="search-result__excerpt">' + escapeHtml(excerpt) + "</span></a></li>"
      );
    })
    .join("");
};

let runSearch = (query) => {
  if (!fuseIndex) return;
  const q = (query || "").trim();
  renderSearchResults(q ? fuseIndex.search(q, { limit: SEARCH_LIMIT }).map((r) => r.item) : []);
};

let initSiteSearch = () => {
  if (fuseIndex || searchIndexLoading || typeof Fuse === "undefined") return;
  searchIndexLoading = true;
  const baseurl = document.documentElement.getAttribute("data-baseurl") || "";
  fetch(baseurl + "/search.json")
    .then((r) => r.json())
    .then((items) => {
      fuseIndex = new Fuse(items, {
        keys: [
          { name: "title", weight: 2 },
          { name: "authors", weight: 1.5 },
          "venue",
          "excerpt",
        ],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
      });
      if (pendingSearchQuery) {
        runSearch(pendingSearchQuery);
        pendingSearchQuery = null;
      }
    })
    .catch(() => {});
};

let openSearch = () => {
  initSiteSearch();
  $("#search-overlay").addClass("is-open");
  $("body").addClass("search-open");
  const input = document.getElementById("search-input");
  if (input) input.focus();
};

let closeSearch = () => {
  $("#search-overlay").removeClass("is-open");
  $("body").removeClass("search-open");
  searchActiveIndex = -1;
};

let moveSearchSelection = (delta) => {
  const items = document.querySelectorAll("#search-results li");
  if (!items.length) return;
  searchActiveIndex = (searchActiveIndex + delta + items.length) % items.length;
  items.forEach((el, i) => el.classList.toggle("is-active", i === searchActiveIndex));
  items[searchActiveIndex].scrollIntoView({ block: "nearest" });
};

$(document).ready(function () {
  const overlay = document.getElementById("search-overlay");
  if (!overlay) return;

  $("#search-toggle").on("click", function (e) {
    e.preventDefault();
    openSearch();
  });
  $(".search-overlay__backdrop").on("click", closeSearch);

  document.getElementById("search-input").addEventListener("input", (e) => {
    searchActiveIndex = -1;
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => runSearch(e.target.value), 120);
  });

  overlay.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeSearch();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      moveSearchSelection(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      moveSearchSelection(-1);
    } else if (e.key === "Enter") {
      const items = document.querySelectorAll("#search-results li a");
      const target = items[searchActiveIndex] || items[0];
      if (target && target.href) {
        e.preventDefault();
        window.location.href = target.href;
      }
    }
  });

  // "/" opens the overlay from anywhere (unless typing in a field already)
  document.addEventListener("keydown", (e) => {
    if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select" || e.target.isContentEditable) return;
    e.preventDefault();
    openSearch();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeSearch();
  });

  // Deep link: /?q=term opens the overlay pre-filled and runs the query
  // once the search index has loaded (see initSiteSearch above).
  const q = new URLSearchParams(window.location.search).get("q");
  if (q) {
    pendingSearchQuery = q;
    openSearch();
    document.getElementById("search-input").value = q;
    if (fuseIndex) {
      runSearch(q);
      pendingSearchQuery = null;
    }
  }
});

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  // SCSS SETTINGS - These should be the same as the settings in the relevant files
  const scssLarge = 925;          // pixels, from /_sass/_themes.scss
  const scssMastheadHeight = 70;  // pixels, from the current theme (e.g., /_sass/theme/_default.scss)

  // If the user hasn't chosen a theme, follow the OS preference
  setTheme();
  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleColorSchemeChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    if (colorSchemeQuery.addEventListener) {
      colorSchemeQuery.addEventListener("change", handleColorSchemeChange);
    } else if (colorSchemeQuery.addListener) {
      colorSchemeQuery.addListener(handleColorSchemeChange);
    }
  }

  // Enable the theme toggle
  $('#theme-toggle').on('click', toggleTheme);

  // FitVids init
  fitvids();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast", function () { });
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Restore the follow menu if toggled on a window resize
  jQuery(window).on('resize', function () {
    if ($('.author__urls.social-icons').css('display') == 'none' && $(window).width() >= scssLarge) {
      $(".author__urls").css('display', 'block')
    }
  });

  // Init smooth scroll, this needs to be slightly more than then fixed masthead height
  $("a").smoothScroll({
    offset: -scssMastheadHeight,
    preventDefault: false,
  });

});
