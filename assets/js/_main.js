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

let initHomeGlassMotion = () => {
  const hero = document.querySelector(".home-hero");
  const network = document.querySelector(".home-network");
  const atmosphere = document.querySelector(".home-atmosphere");
  const motionRoot = hero && hero.closest(".page__content");
  if (!hero || !window.matchMedia) {
    return;
  }

  const surfaces = Array.from(document.querySelectorAll(".home-hero, .focus-card"));
  let frame = null;
  let activeSurface = hero;
  let nextX = 50;
  let nextY = 38;
  let atmosphereX = 0;
  let atmosphereY = 0;
  let motionStrength = 0;
  let pointer = { active: false, x: 0, y: 0, intensity: 0 };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const activationRadius = () => (window.innerWidth < 700 ? 120 : 180);

  const distanceToRect = (x, y, rect) => {
    const clampedX = clamp(x, rect.left, rect.right);
    const clampedY = clamp(y, rect.top, rect.bottom);
    return {
      x: clampedX,
      y: clampedY,
      distance: Math.hypot(x - clampedX, y - clampedY),
    };
  };

  const paint = () => {
    frame = null;
    activeSurface.style.setProperty("--pointer-x", `${nextX}%`);
    activeSurface.style.setProperty("--pointer-y", `${nextY}%`);
    hero.classList.toggle("is-motion-active", motionStrength > 0.03);
    if (motionRoot) {
      motionRoot.classList.toggle("is-motion-active", motionStrength > 0.03);
      motionRoot.style.setProperty("--motion-strength", motionStrength.toFixed(3));
    }
    if (atmosphere) {
      atmosphere.style.setProperty("--atmosphere-x", `${atmosphereX}px`);
      atmosphere.style.setProperty("--atmosphere-y", `${atmosphereY}px`);
    }
  };

  const queuePaint = () => {
    if (!frame) {
      frame = window.requestAnimationFrame(paint);
    }
  };

  const updateSurfaceMotion = (event) => {
    let closest = null;
    surfaces.forEach((surface) => {
      const rect = surface.getBoundingClientRect();
      const hit = distanceToRect(event.clientX, event.clientY, rect);
      if (!closest || hit.distance < closest.distance) {
        closest = { surface, rect, ...hit };
      }
    });

    if (!closest) {
      return;
    }

    const radius = activationRadius();
    const strength = clamp(1 - closest.distance / radius, 0, 1);
    activeSurface = closest.surface;
    nextX = clamp(((closest.x - closest.rect.left) / closest.rect.width) * 100, 0, 100);
    nextY = clamp(((closest.y - closest.rect.top) / closest.rect.height) * 100, 0, 100);
    motionStrength = strength;
    atmosphereX = ((event.clientX / window.innerWidth) - 0.5) * 12 * strength;
    atmosphereY = ((event.clientY / window.innerHeight) - 0.5) * 8 * strength;
    queuePaint();
  };

  document.addEventListener("pointermove", updateSurfaceMotion, { passive: true });
  document.addEventListener("pointerleave", () => {
    motionStrength = 0;
    pointer.active = false;
    pointer.intensity = 0;
    queuePaint();
  });
  window.addEventListener("blur", () => {
    motionStrength = 0;
    pointer.active = false;
    pointer.intensity = 0;
    queuePaint();
  });

  if (!network) {
    return;
  }

  const context = network.getContext("2d");
  if (!context) {
    return;
  }

  let width = 0;
  let height = 0;
  let nodes = [];
  let networkFrame = null;

  const readMotionColor = (name, fallback) => {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  };

  const getNodeCount = () => {
    if (window.innerWidth < 640) {
      return 24;
    }
    if (window.innerWidth < 1000) {
      return 30;
    }
    return 36;
  };

  const makeNodes = () => {
    const nodeCount = getNodeCount();
    const columns = window.innerWidth < 640 ? 5 : 6;
    const rows = Math.ceil(nodeCount / columns);
    nodes = Array.from({ length: nodeCount }, (_, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      return {
        x: ((column + 0.3 + ((index * 17) % 23) / 54) / columns) * width,
        y: ((row + 0.26 + ((index * 13) % 19) / 48) / rows) * height,
        phase: index * 0.73,
        speed: 0.55 + (index % 5) * 0.08,
      };
    });
  };

  const resizeNetwork = () => {
    const rect = network.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) {
      return;
    }
    const ratioLimit = window.innerWidth < 700 ? 1.35 : 2;
    const ratio = Math.min(window.devicePixelRatio || 1, ratioLimit);
    width = rect.width;
    height = rect.height;
    network.width = Math.round(width * ratio);
    network.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    makeNodes();
  };

  const drawNetwork = (time) => {
    if (!width || !height) {
      resizeNetwork();
    }
    context.clearRect(0, 0, width, height);

    const trace = readMotionColor("--site-trace", "rgba(143, 29, 44, 0.2)");
    const traceStrong = readMotionColor("--site-trace-strong", "rgba(143, 29, 44, 0.42)");
    const nodeColor = readMotionColor("--site-node", "rgba(143, 29, 44, 0.72)");
    const t = time / 1000;
    const activity = pointer.intensity;
    const maxLinkDistance = window.innerWidth < 700 ? 150 : 220;

    const points = nodes.map((node) => ({
      x: node.x + Math.sin(t * node.speed + node.phase) * 5 * activity,
      y: node.y + Math.cos(t * node.speed * 0.8 + node.phase) * 4 * activity,
    }));

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > maxLinkDistance) {
          continue;
        }
        const pointerBoost = pointer.active
          ? Math.max(0, 1 - Math.hypot((points[i].x + points[j].x) / 2 - pointer.x, (points[i].y + points[j].y) / 2 - pointer.y) / 190)
          : 0;
        context.globalAlpha = Math.min(0.72, (1 - distance / maxLinkDistance) * (0.12 + activity * 0.18) + pointerBoost * 0.42);
        context.strokeStyle = pointerBoost > 0.25 ? traceStrong : trace;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(points[i].x, points[i].y);
        context.lineTo(points[j].x, points[j].y);
        context.stroke();
      }
    }

    points.forEach((point) => {
      const pointerBoost = pointer.active ? Math.max(0, 1 - Math.hypot(point.x - pointer.x, point.y - pointer.y) / 150) : 0;
      context.globalAlpha = 0.26 + activity * 0.22 + pointerBoost * 0.48;
      context.fillStyle = nodeColor;
      context.beginPath();
      context.arc(point.x, point.y, 1.8 + activity * 0.4 + pointerBoost * 2.2, 0, Math.PI * 2);
      context.fill();
    });

    context.globalAlpha = 1;
    networkFrame = window.requestAnimationFrame(drawNetwork);
  };

  const updateNetworkPointer = (event) => {
    const rect = network.getBoundingClientRect();
    const hit = distanceToRect(event.clientX, event.clientY, rect);
    const radius = activationRadius();
    const intensity = clamp(1 - hit.distance / radius, 0, 1);
    pointer = {
      active: intensity > 0.03,
      x: hit.x - rect.left,
      y: hit.y - rect.top,
      intensity,
    };
  };

  document.addEventListener("pointermove", updateNetworkPointer, { passive: true });
  window.addEventListener("resize", resizeNetwork);

  resizeNetwork();
  networkFrame = window.requestAnimationFrame(drawNetwork);
};

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

  // Enable the sticky footer
  var bumpIt = function () {
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  }
  $(window).resize(function () {
    didResize = true;
  });
  setInterval(function () {
    if (didResize) {
      didResize = false;
      bumpIt();
    }}, 250);
  var didResize = false;
  bumpIt();

  // FitVids init
  fitvids();

  // Homepage-only liquid glass highlight
  initHomeGlassMotion();

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
