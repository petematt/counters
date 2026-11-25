/* ==========================================================================
   COUNTERS DICE STYLES DEMO CONTROLLER
   Showcases 10 distinct 3D/tactile dice styles across all 8 dice (d2-d100),
   mapped 1:1 to the 8 colors of the active Counters palette, with a live
   in-app phone context preview.
   ========================================================================== */

import {
  PALETTES,
  applyAccentTokens,
  getReadableTextColor,
  getInkOnDarkTint,
  getInkOnLightTint,
  sortColorsByHue,
} from "./palettes.js";
import {
  PALETTE_ORDER,
  resolveLabPalette,
} from "./palettes-candidates.js";

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const DICE_CATALOG = [
  { sides: 2, label: "d2", name: "Coin (d2)" },
  { sides: 4, label: "d4", name: "d4" },
  { sides: 6, label: "d6", name: "d6" },
  { sides: 8, label: "d8", name: "d8" },
  { sides: 10, label: "d10", name: "d10" },
  { sides: 12, label: "d12", name: "d12" },
  { sides: 20, label: "d20", name: "d20" },
  { sides: 100, label: "d100", name: "d100" },
];

const DICE_STYLES = [
  {
    id: "current",
    name: "Current implementation",
    badge: "Current",
    badgeClass: "is-current",
    desc: "The 3D faceted SVG polyhedra currently implemented in the Dice tab.",
  },
  {
    id: "minimalist-flat",
    name: "Minimalist flat",
    badge: "Proposed",
    badgeClass: "is-proposed",
    desc: "Clean Swiss geometric silhouettes matching Counters' minimalist cards with zero visual clutter.",
  },
  {
    id: "faceted-gem",
    name: "Faceted gem",
    desc: "Unified top-down orthographic polyhedra with lit top-left bevels, shaded lower planes, and inner seams.",
  },
  {
    id: "matte-clay",
    name: "Matte clay",
    desc: "Soft, pillowy board-game polyhedra with warm radial depth and a subtle specular sheen.",
  },
  {
    id: "wireframe-neon",
    name: "Wireframe neon",
    desc: "Architectural isometric wireframes with luminous colored edges and translucent tinted interiors.",
  },
  {
    id: "frosted-glass",
    name: "Frosted glass",
    desc: "Translucent acrylic resin dice with a diagonal glossy reflection and crisp etched numerals.",
  },
  {
    id: "ink-paper",
    name: "Ink & paper",
    desc: "Editorial tabletop zine style with bold ink outlines, offset hard shadows, and hatched facets.",
  },
  {
    id: "metallic-enamel",
    name: "Metallic enamel",
    desc: "Heavy RPG metal frames with brushed bevel rims and recessed colored enamel faces.",
  },
  {
    id: "chiseled-stone",
    name: "Chiseled stone",
    desc: "Sharp split-plane lighting across carved bevel silhouettes for dramatic tabletop contrast.",
  },
  {
    id: "classic-pips",
    name: "Classic pips & glyphs",
    desc: "Traditional tactile feel: true recessed pips on rolled d6, medallion coin rim, and notched corners.",
  },
  {
    id: "soft-tint",
    name: "Soft tint",
    desc: "Airy, low-fatigue tinted surfaces with colored ink and crisp outlines that blend softly into the UI.",
  },
];

// Color helpers
const mixHex = (hex, toward, t) =>
  "#" +
  [1, 3, 5]
    .map((i) => {
      const from = parseInt(hex.slice(i, i + 2), 16);
      const to = parseInt(toward.slice(i, i + 2), 16);
      return Math.round(from + (to - from) * t)
        .toString(16)
        .padStart(2, "0");
    })
    .join("");

const hexToRgba = (hex, alpha) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const rollOne = (sides) => Math.floor(Math.random() * sides) + 1;

const formatFaceValue = (sides, value) => {
  if (value == null) return sides === 2 ? "H/T" : `d${sides}`;
  if (sides === 2) return value === 2 ? "H/2" : "T/1";
  return String(value);
};

// Shared SVG geometry definitions per die type (viewBox 0 0 64 64)
const DIE_GEOM = {
  2: {
    outer: `<circle cx="32" cy="32" r="24" />`,
    inner: `<circle cx="32" cy="32" r="19" />`,
    textX: 32,
    textY: 32,
  },
  4: {
    outer: `<polygon points="32,7 57,53 7,53" />`,
    inner: `<polygon points="32,15 50,49 14,49" />`,
    textX: 32,
    textY: 40,
  },
  6: {
    outer: `<rect x="9" y="9" width="46" height="46" rx="10" />`,
    inner: `<rect x="14" y="14" width="36" height="36" rx="7" />`,
    textX: 32,
    textY: 32.5,
  },
  8: {
    outer: `<polygon points="32,5 56,32 32,59 8,32" />`,
    inner: `<polygon points="32,12 49,32 32,52 15,32" />`,
    textX: 32,
    textY: 32.5,
  },
  10: {
    outer: `<polygon points="32,5 56,28 50,44 32,59 14,44 8,28" />`,
    inner: `<polygon points="32,12 48,31 32,50 16,31" />`,
    textX: 32,
    textY: 32,
  },
  12: {
    outer: `<polygon points="32,6 54,18 57,41 42,57 22,57 7,41 10,18" />`,
    inner: `<polygon points="32,14 48,26 42,46 22,46 16,26" />`,
    textX: 32,
    textY: 33,
  },
  20: {
    outer: `<polygon points="32,5 56,19 56,45 32,59 8,45 8,19" />`,
    inner: `<polygon points="32,14 50,45 14,45" />`,
    textX: 32,
    textY: 35,
  },
  100: {
    outer: `<polygon points="32,5 48,10 58,23 58,41 48,54 32,59 16,54 6,41 6,23 16,10" />`,
    inner: `<polygon points="32,13 44,18 50,32 44,46 32,51 20,46 14,32 20,18" />`,
    textX: 32,
    textY: 32.5,
  },
};

// Classic d6 pip coordinates (1..6) inside 64x64 viewBox
const D6_PIPS = {
  1: [[32, 32]],
  2: [
    [22, 22],
    [42, 42],
  ],
  3: [
    [21, 21],
    [32, 32],
    [43, 43],
  ],
  4: [
    [22, 22],
    [42, 22],
    [22, 42],
    [42, 42],
  ],
  5: [
    [21, 21],
    [43, 21],
    [32, 32],
    [21, 43],
    [43, 43],
  ],
  6: [
    [22, 20],
    [42, 20],
    [22, 32],
    [42, 32],
    [22, 44],
    [42, 44],
  ],
};

// State
const state = {
  paletteId: "bold",
  theme: "dark",
  themeHue: 205,
  faceMode: "rolled", // "rolled" | "labels"
  activeStyleId: "current",
  sampleValues: {
    2: 2,
    4: 3,
    6: 5,
    8: 7,
    10: 9,
    12: 11,
    20: 20,
    100: 84,
  },
  previewMode: "exact", // "exact" | "best" | "worst"
  previewNextId: 4,
  previewPool: [
    { id: 1, sides: 2, rollA: 2, rollB: 1 },
    { id: 2, sides: 6, rollA: 5, rollB: 3 },
    { id: 3, sides: 20, rollA: 17, rollB: 11 },
  ],
};

const getActivePaletteColors = () => {
  const shipped = PALETTES[state.paletteId];
  if (shipped) return shipped.colors;
  const resolved = resolveLabPalette(state.paletteId, {
    themeHue: state.themeHue,
  });
  return resolved?.colors || PALETTES.bold.colors;
};

let svgUidCounter = 1;

// Render a die SVG in any of the 10 visual styles
const renderStyledDieSvg = (styleId, sides, value, hex) => {
  const isDark = state.theme === "dark";
  const uid = `d${svgUidCounter++}`;
  const label = formatFaceValue(sides, value);
  const textLen = String(label).length;
  const fontSize =
    textLen >= 4 ? 13 : textLen === 3 ? 15 : textLen === 2 ? 18 : 21;

  const light = mixHex(hex, "#ffffff", 0.28);
  const dark = mixHex(hex, "#000000", 0.3);
  const darker = mixHex(hex, "#000000", 0.5);
  const solidInk = getReadableTextColor(hex);
  const tintInk = isDark ? getInkOnDarkTint(hex) : getInkOnLightTint(hex);
  const g = DIE_GEOM[sides] || DIE_GEOM[6];

  const withAttrs = (shapeHtml, attrs) =>
    shapeHtml.replace(/ \/>$/, ` ${attrs} />`);

  const renderText = (x, y, size, inkColor) =>
    `<text x="${x}" y="${y}" font-size="${size}" fill="${inkColor}" style="fill:${inkColor}" class="die-face-text">${label}</text>`;

  // Style 0: Current implementation (exact SVG geometry currently in app.js)
  if (styleId === "current") {
    let shapes;
    let tx = 32;
    let ty;
    const edge = mixHex(hex, "#000000", 0.42);
    if (sides === 2) {
      shapes = `
        <circle cx="32" cy="34" r="24" fill="${dark}" />
        <circle cx="32" cy="30" r="24" fill="${light}" />
        <circle cx="32" cy="31" r="20" fill="${hex}" />
        <circle cx="32" cy="30" r="24" fill="none" stroke="${edge}" stroke-width="2" />
        <circle cx="32" cy="31" r="19" fill="none" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
      `;
      ty = 31;
    } else if (sides === 4) {
      shapes = `
        <polygon points="32,7 57,52 32,57" fill="${dark}" />
        <polygon points="32,7 7,52 32,57" fill="${light}" />
        <polygon points="32,14 51,50 13,50" fill="${hex}" />
        <line x1="32" y1="7" x2="32" y2="14" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <line x1="7" y1="52" x2="13" y2="50" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <line x1="57" y1="52" x2="51" y2="50" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <polygon points="32,7 57,52 32,57 7,52" fill="none" stroke="${edge}" stroke-width="2" stroke-linejoin="round" />
      `;
      ty = 39;
    } else if (sides === 6) {
      shapes = `
        <polygon points="11,20 21,10 54,10 45,20" fill="${light}" />
        <polygon points="45,20 54,10 54,45 45,55" fill="${dark}" />
        <rect x="9" y="19" width="37" height="37" rx="5" fill="${hex}" stroke="${edge}" stroke-width="2" />
        <polyline points="11,20 21,10 54,10 54,45 45,55" fill="none" stroke="${edge}" stroke-width="2" stroke-linejoin="round" />
        <line x1="45" y1="20" x2="54" y2="10" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
      `;
      tx = 27.5;
      ty = 38;
    } else if (sides === 8) {
      shapes = `
        <polygon points="32,5 56,32 32,59 8,32" fill="${dark}" />
        <polygon points="32,5 8,32 32,20" fill="${light}" />
        <polygon points="32,5 56,32 32,20" fill="${light}" />
        <polygon points="32,12 50,41 14,41" fill="${hex}" />
        <line x1="32" y1="5" x2="32" y2="12" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <line x1="8" y1="32" x2="14" y2="41" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <line x1="56" y1="32" x2="50" y2="41" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <polygon points="32,5 56,32 32,59 8,32" fill="none" stroke="${edge}" stroke-width="2" stroke-linejoin="round" />
      `;
      ty = 33;
    } else if (sides === 10) {
      shapes = `
        <polygon points="32,5 56,28 50,44 32,59 14,44 8,28" fill="${dark}" />
        <polygon points="32,5 8,28 18,35 32,15" fill="${light}" />
        <polygon points="32,5 56,28 46,35 32,15" fill="${light}" />
        <polygon points="32,12 49,33 32,49 15,33" fill="${hex}" />
        <line x1="32" y1="5" x2="32" y2="12" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <line x1="32" y1="49" x2="32" y2="59" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <polygon points="32,5 56,28 50,44 32,59 14,44 8,28" fill="none" stroke="${edge}" stroke-width="2" stroke-linejoin="round" />
      `;
      ty = 32;
    } else if (sides === 12) {
      shapes = `
        <polygon points="32,6 54,18 57,41 42,57 22,57 7,41 10,18" fill="${dark}" />
        <polygon points="32,6 54,18 46,27 18,27 10,18" fill="${light}" />
        <polygon points="32,15 48,27 42,46 22,46 16,27" fill="${hex}" />
        <line x1="32" y1="6" x2="32" y2="15" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <line x1="54" y1="18" x2="48" y2="27" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <line x1="10" y1="18" x2="16" y2="27" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <line x1="42" y1="46" x2="42" y2="57" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <line x1="22" y1="46" x2="22" y2="57" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <polygon points="32,6 54,18 57,41 42,57 22,57 7,41 10,18" fill="none" stroke="${edge}" stroke-width="2" stroke-linejoin="round" />
      `;
      ty = 33;
    } else if (sides === 20) {
      shapes = `
        <polygon points="32,5 56,19 56,45 32,59 8,45 8,19" fill="${dark}" />
        <polygon points="32,5 56,19 32,16 8,19" fill="${light}" />
        <polygon points="8,19 16,44 8,45" fill="${light}" />
        <polygon points="32,14 50,45 14,45" fill="${hex}" />
        <line x1="32" y1="5" x2="32" y2="14" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <line x1="56" y1="19" x2="50" y2="45" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <line x1="8" y1="19" x2="14" y2="45" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <line x1="56" y1="45" x2="50" y2="45" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <line x1="8" y1="45" x2="14" y2="45" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <polygon points="32,5 56,19 56,45 32,59 8,45 8,19" fill="none" stroke="${edge}" stroke-width="2" stroke-linejoin="round" />
      `;
      ty = 35;
    } else {
      shapes = `
        <polygon points="32,5 48,10 58,23 58,41 48,54 32,59 16,54 6,41 6,23 16,10" fill="${dark}" />
        <polygon points="32,5 48,10 58,23 47,25 17,25 6,23 16,10" fill="${light}" />
        <polygon points="32,13 44,18 50,32 44,46 32,51 20,46 14,32 20,18" fill="${hex}" />
        <polygon points="32,13 44,18 50,32 44,46 32,51 20,46 14,32 20,18" fill="none" stroke="${edge}" stroke-width="1.25" opacity="0.55" />
        <polygon points="32,5 48,10 58,23 58,41 48,54 32,59 16,54 6,41 6,23 16,10" fill="none" stroke="${edge}" stroke-width="2" stroke-linejoin="round" />
      `;
      ty = 32;
    }
    return `<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${shapes}${renderText(tx, ty, fontSize, solidInk)}</svg>`;
  }

  // Style 1: Faceted gem (unified top-down orthographic perspective across all 8 dice)
  if (styleId === "faceted-gem") {
    const defs = `
      <defs>
        <linearGradient id="${uid}-bevel" x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stop-color="${light}" />
          <stop offset="48%" stop-color="${hex}" />
          <stop offset="100%" stop-color="${dark}" />
        </linearGradient>
      </defs>
    `;
    const seamsBySides = {
      2: `<circle cx="32" cy="32" r="19" fill="none" stroke="${darker}" stroke-width="1.25" opacity="0.45" />`,
      4: `<line x1="32" y1="7" x2="32" y2="15" stroke="${darker}" stroke-width="1.25" opacity="0.55" />
          <line x1="57" y1="53" x2="50" y2="49" stroke="${darker}" stroke-width="1.25" opacity="0.55" />
          <line x1="7" y1="53" x2="14" y2="49" stroke="${darker}" stroke-width="1.25" opacity="0.55" />`,
      6: `<line x1="12" y1="12" x2="16" y2="16" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
          <line x1="52" y1="12" x2="48" y2="16" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
          <line x1="12" y1="52" x2="16" y2="48" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
          <line x1="52" y1="52" x2="48" y2="48" stroke="${darker}" stroke-width="1.25" opacity="0.5" />`,
      8: `<line x1="32" y1="5" x2="32" y2="12" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
          <line x1="56" y1="32" x2="49" y2="32" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
          <line x1="32" y1="59" x2="32" y2="52" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
          <line x1="8" y1="32" x2="15" y2="32" stroke="${darker}" stroke-width="1.25" opacity="0.5" />`,
      10: `<line x1="32" y1="5" x2="32" y2="12" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
           <line x1="56" y1="28" x2="48" y2="31" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
           <line x1="8" y1="28" x2="16" y2="31" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
           <line x1="32" y1="59" x2="32" y2="50" stroke="${darker}" stroke-width="1.25" opacity="0.5" />`,
      12: `<line x1="32" y1="6" x2="32" y2="14" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
           <line x1="54" y1="18" x2="48" y2="26" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
           <line x1="10" y1="18" x2="16" y2="26" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
           <line x1="42" y1="57" x2="42" y2="46" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
           <line x1="22" y1="57" x2="22" y2="46" stroke="${darker}" stroke-width="1.25" opacity="0.5" />`,
      20: `<line x1="32" y1="5" x2="32" y2="14" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
           <line x1="56" y1="19" x2="50" y2="45" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
           <line x1="8" y1="19" x2="14" y2="45" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
           <line x1="56" y1="45" x2="50" y2="45" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
           <line x1="8" y1="45" x2="14" y2="45" stroke="${darker}" stroke-width="1.25" opacity="0.5" />`,
      100: `<line x1="32" y1="5" x2="32" y2="13" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
            <line x1="58" y1="32" x2="50" y2="32" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
            <line x1="6" y1="32" x2="14" y2="32" stroke="${darker}" stroke-width="1.25" opacity="0.5" />
            <line x1="32" y1="59" x2="32" y2="51" stroke="${darker}" stroke-width="1.25" opacity="0.5" />`,
    };
    const outerFill = withAttrs(g.outer, `fill="url(#${uid}-bevel)"`);
    const innerFace = withAttrs(
      g.inner,
      `fill="${hex}" stroke="${light}" stroke-opacity="0.55" stroke-width="1.25" stroke-linejoin="round"`,
    );
    const outerEdge = withAttrs(
      g.outer,
      `fill="none" stroke="${darker}" stroke-width="2" stroke-linejoin="round"`,
    );
    return `<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${defs}${outerFill}${innerFace}${seamsBySides[sides] || ""}${outerEdge}${renderText(g.textX, g.textY, fontSize, solidInk)}</svg>`;
  }

  // Style 2: Matte clay (soft pillowy radial depth + subtle upper rim sheen)
  if (styleId === "matte-clay") {
    const defs = `
      <defs>
        <radialGradient id="${uid}-clay" cx="30%" cy="22%" r="78%">
          <stop offset="0%" stop-color="${light}" />
          <stop offset="48%" stop-color="${hex}" />
          <stop offset="100%" stop-color="${dark}" />
        </radialGradient>
      </defs>
    `;
    const body = withAttrs(
      g.outer,
      `fill="url(#${uid}-clay)" stroke="${mixHex(hex, "#ffffff", 0.35)}" stroke-width="2.2" stroke-linejoin="round"`,
    );
    const sheen =
      sides === 4
        ? `<ellipse cx="32" cy="21" rx="4.5" ry="2.2" fill="#ffffff" opacity="0.22" />`
        : `<ellipse cx="24" cy="17" rx="8" ry="3.2" transform="rotate(-20 24 17)" fill="#ffffff" opacity="0.24" />`;
    return `<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${defs}${body}${sheen}${renderText(g.textX, g.textY, fontSize, solidInk)}</svg>`;
  }

  // Style 3: Wireframe neon (luminous strokes + translucent tinted glass interior)
  if (styleId === "wireframe-neon") {
    const strokeCol = isDark ? light : tintInk;
    const fillCol = hexToRgba(hex, isDark ? 0.16 : 0.12);
    const outer = withAttrs(
      g.outer,
      `fill="${fillCol}" stroke="${strokeCol}" stroke-width="2.4" stroke-linejoin="round"`,
    );
    const inner = withAttrs(
      g.inner,
      `fill="none" stroke="${strokeCol}" stroke-width="1.15" stroke-linejoin="round" opacity="0.45"`,
    );
    return `<svg class="die-svg" style="--die-glow: ${hexToRgba(hex, 0.55)}" viewBox="0 0 64 64" aria-hidden="true">${outer}${inner}${renderText(g.textX, g.textY, fontSize, tintInk)}</svg>`;
  }

  // Style 4: Minimalist flat (clean Swiss silhouette matching Counters cards)
  if (styleId === "minimalist-flat") {
    const outer = withAttrs(
      g.outer,
      `fill="${hex}" stroke="${mixHex(hex, "#000000", 0.18)}" stroke-width="1.5" stroke-linejoin="round"`,
    );
    return `<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${outer}${renderText(g.textX, g.textY, fontSize + 1, solidInk)}</svg>`;
  }

  // Style 5: Frosted glass (translucent acrylic sheen + upper-left reflection band)
  if (styleId === "frosted-glass") {
    const defs = `
      <defs>
        <linearGradient id="${uid}-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${light}" stop-opacity="0.92" />
          <stop offset="50%" stop-color="${hex}" stop-opacity="0.86" />
          <stop offset="100%" stop-color="${dark}" stop-opacity="0.94" />
        </linearGradient>
        <clipPath id="${uid}-clip">${g.outer}</clipPath>
      </defs>
    `;
    const body = withAttrs(
      g.outer,
      `fill="url(#${uid}-glass)" stroke="#ffffff" stroke-opacity="${isDark ? 0.52 : 0.72}" stroke-width="2" stroke-linejoin="round"`,
    );
    const reflection = `<polygon points="-4,20 34,-8 44,2 6,28" fill="#ffffff" opacity="0.22" clip-path="url(#${uid}-clip)" />`;
    const innerRim = withAttrs(
      g.inner,
      `fill="none" stroke="#ffffff" stroke-opacity="0.28" stroke-width="1.1"`,
    );
    return `<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${defs}${body}${reflection}${innerRim}${renderText(g.textX, g.textY, fontSize, solidInk)}</svg>`;
  }

  // Style 6: Ink & paper (editorial woodblock outline + hatched shading facet)
  if (styleId === "ink-paper") {
    const inkStroke = isDark ? "#0b0d12" : "#0f172a";
    const defs = `
      <defs>
        <pattern id="${uid}-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="${inkStroke}" stroke-width="1.2" opacity="0.24" />
        </pattern>
        <clipPath id="${uid}-clip">${g.outer}</clipPath>
      </defs>
    `;
    const base = withAttrs(g.outer, `fill="${hex}"`);
    const shadeHalf = `<rect x="42" y="0" width="24" height="64" fill="url(#${uid}-hatch)" clip-path="url(#${uid}-clip)" />`;
    const outline = withAttrs(
      g.outer,
      `fill="none" stroke="${inkStroke}" stroke-width="2.8" stroke-linejoin="round"`,
    );
    return `<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${defs}${base}${shadeHalf}${outline}${renderText(g.textX, g.textY, fontSize, solidInk)}</svg>`;
  }

  // Style 7: Metallic enamel (brushed metallic outer bezel + recessed enamel face)
  if (styleId === "metallic-enamel") {
    const rimHi = isDark ? "#e2e8f0" : "#f8fafc";
    const rimMid = isDark ? "#94a3b8" : "#cbd5e1";
    const rimLo = isDark ? "#475569" : "#64748b";
    const defs = `
      <defs>
        <linearGradient id="${uid}-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${rimHi}" />
          <stop offset="48%" stop-color="${rimMid}" />
          <stop offset="100%" stop-color="${rimLo}" />
        </linearGradient>
      </defs>
    `;
    const bezel = withAttrs(
      g.outer,
      `fill="url(#${uid}-metal)" stroke="${rimLo}" stroke-width="1.5" stroke-linejoin="round"`,
    );
    const enamel = withAttrs(
      g.inner,
      `fill="${hex}" stroke="${darker}" stroke-width="1.4" stroke-linejoin="round"`,
    );
    return `<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${defs}${bezel}${enamel}${renderText(g.textX, g.textY, Math.max(12, fontSize - 2), solidInk)}</svg>`;
  }

  // Style 8: Chiseled stone (sharp split-plane diagonal lighting + carved bevel)
  if (styleId === "chiseled-stone") {
    const defs = `
      <defs>
        <clipPath id="${uid}-clip">${g.outer}</clipPath>
      </defs>
    `;
    const base = withAttrs(g.outer, `fill="${dark}"`);
    const litPlane = `<polygon points="0,0 64,0 0,64" fill="${light}" opacity="0.72" clip-path="url(#${uid}-clip)" />`;
    const centerFace = withAttrs(
      g.inner,
      `fill="${hex}" stroke="${darker}" stroke-width="1.2"`,
    );
    const edge = withAttrs(
      g.outer,
      `fill="none" stroke="${darker}" stroke-width="2.2" stroke-linejoin="round"`,
    );
    return `<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${defs}${base}${litPlane}${centerFace}${edge}${renderText(g.textX, g.textY, fontSize, solidInk)}</svg>`;
  }

  // Style 9: Classic pips & glyphs (true recessed pips on rolled d6 + embossed coin rim)
  if (styleId === "classic-pips") {
    const defs = `
      <defs>
        <linearGradient id="${uid}-pipbg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${light}" />
          <stop offset="100%" stop-color="${dark}" />
        </linearGradient>
      </defs>
    `;
    const body = withAttrs(
      g.outer,
      `fill="url(#${uid}-pipbg)" stroke="${darker}" stroke-width="2" stroke-linejoin="round"`,
    );
    if (sides === 6 && value != null && D6_PIPS[value]) {
      const pips = D6_PIPS[value]
        .map(
          ([cx, cy]) =>
            `<circle cx="${cx}" cy="${cy}" r="4.2" fill="${solidInk}" />`,
        )
        .join("");
      return `<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${defs}${body}<rect x="13" y="13" width="38" height="38" rx="7" fill="${hex}" />${pips}</svg>`;
    }
    const dashedRim =
      sides === 2
        ? `<circle cx="32" cy="32" r="20" fill="${hex}" stroke="${solidInk}" stroke-width="1.3" stroke-dasharray="3 2.5" opacity="0.85" />`
        : withAttrs(g.inner, `fill="${hex}"`);
    return `<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${defs}${body}${dashedRim}${renderText(g.textX, g.textY, fontSize, solidInk)}</svg>`;
  }

  // Style 10: Soft tint (low-fatigue translucent tint + WCAG colored ink)
  const tintBg = hexToRgba(hex, isDark ? 0.2 : 0.16);
  const tintStroke = hexToRgba(hex, isDark ? 0.72 : 0.65);
  const body = withAttrs(
    g.outer,
    `fill="${tintBg}" stroke="${tintStroke}" stroke-width="2" stroke-linejoin="round"`,
  );
  return `<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${body}${renderText(g.textX, g.textY, fontSize, tintInk)}</svg>`;
};

// Toast helper
let toastTimer = null;
const showToast = (msg) => {
  const el = $("#studio-toast");
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.hidden = true;
  }, 2200);
};

// Apply Dark / Light + Theme Hue
const applyAppearance = () => {
  const isLight = state.theme === "light";
  document.documentElement.classList.toggle("light-mode", isLight);
  document.documentElement.classList.toggle("dark-mode", !isLight);
  applyAccentTokens(state.themeHue);

  const readout = $("#theme-hue-readout");
  if (readout) readout.textContent = `${state.themeHue}°`;
  const slider = $("#demo-theme-hue");
  if (slider) slider.value = String(state.themeHue);

  $$("#theme-mode-group .segment-btn").forEach((btn) => {
    const active = btn.dataset.themeMode === state.theme;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
};

// Render 8-color slot strip (d2 -> d100)
const renderSlotStrip = () => {
  const strip = $("#dice-slot-strip");
  if (!strip) return;
  const colors = getActivePaletteColors();
  strip.innerHTML = DICE_CATALOG.map((die, idx) => {
    const hex = colors[idx % colors.length];
    const ink = getReadableTextColor(hex);
    return `<span class="dice-slot-chip" style="background:${hex};color:${ink}" title="Slot ${idx}: ${die.label} (${hex})">${die.label}</span>`;
  }).join("");
};

// Render Palette Picker Cards (reusing debug.html's palette catalog)
const renderPaletteCatalog = () => {
  const grid = $("#palette-catalog-grid");
  if (!grid) return;

  const shippedKeys = Object.keys(PALETTES);
  const extraKeys = PALETTE_ORDER.filter(
    (k) => !shippedKeys.includes(k) && !["tonal", "shuffle", "sky"].includes(k),
  );
  const allKeys = [...shippedKeys, ...extraKeys];

  grid.innerHTML = allKeys
    .map((key) => {
      const p = PALETTES[key] || resolveLabPalette(key, { themeHue: state.themeHue });
      if (!p) return "";
      const isActive = key === state.paletteId;
      const sorted = sortColorsByHue(p.colors);
      return `
        <button
          type="button"
          class="palette-option-card${isActive ? " active" : ""}"
          role="radio"
          aria-checked="${isActive ? "true" : "false"}"
          data-palette-opt="${key}"
        >
          <span class="palette-option-name">${p.label}</span>
          <span class="palette-preview" aria-hidden="true">${sorted
            .map((hex) => `<span style="background:${hex}"></span>`)
            .join("")}</span>
        </button>
      `;
    })
    .join("");
};

// Render the 10 Style Cards
const renderStyleGallery = ({ tumbleStyleId = null, tumbleSides = null } = {}) => {
  const grid = $("#dice-styles-grid");
  if (!grid) return;
  const colors = getActivePaletteColors();

  grid.innerHTML = DICE_STYLES.map((style, sIdx) => {
    const isActive = style.id === state.activeStyleId;
    const diceHtml = DICE_CATALOG.map((die, idx) => {
      const hex = colors[idx % colors.length];
      const val = state.faceMode === "rolled" ? state.sampleValues[die.sides] : null;
      const tumbling =
        (tumbleStyleId === "all" || tumbleStyleId === style.id) &&
        (tumbleSides == null || tumbleSides === die.sides);
      return `
        <button
          type="button"
          class="dice-sample-btn${tumbling ? " is-tumbling" : ""}"
          data-style-id="${style.id}"
          data-sides="${die.sides}"
          aria-label="Roll ${die.name} in ${style.name} style"
        >
          <span class="dice-sample-svg-wrap">${renderStyledDieSvg(style.id, die.sides, val, hex)}</span>
          <span class="dice-sample-caption">${die.label}</span>
        </button>
      `;
    }).join("");

    return `
      <article
        class="dice-style-card dice-style-${style.id}${isActive ? " active" : ""}"
        data-card-style="${style.id}"
      >
        <div class="dice-style-card-head">
          <div>
            <div class="dice-style-card-title-row">
              <span class="dice-style-num">${sIdx + 1}</span>
              <h2 class="dice-style-title">${style.name}</h2>
              ${style.badge ? `<span class="dice-style-badge ${style.badgeClass || ""}">${style.badge}</span>` : ""}
            </div>
            <p class="dice-style-desc">${style.desc}</p>
          </div>
          <div class="dice-style-card-actions">
            <button
              type="button"
              class="dice-style-mini-btn"
              data-action="roll-card"
              data-style-id="${style.id}"
            >
              Roll
            </button>
          </div>
        </div>
        <div class="dice-style-showcase">${diceHtml}</div>
      </article>
    `;
  }).join("");
};

// Render the Live Phone App Context Preview
const getCountTier = (count) => {
  if (count <= 3) return "lg";
  if (count <= 6) return "md";
  if (count <= 12) return "sm";
  return "xs";
};

const formatPoolNotation = (pool) => {
  const counts = new Map();
  pool.forEach((d) => counts.set(d.sides, (counts.get(d.sides) || 0) + 1));
  return DICE_CATALOG.filter((c) => counts.has(c.sides))
    .map((c) => `${counts.get(c.sides)}d${c.sides}`)
    .join(" + ");
};

const renderPhonePreview = ({ animateIds = null } = {}) => {
  const workspace = $("#preview-workspace");
  const tray = $("#preview-dice-tray");
  const arena = $("#preview-dice-arena");
  const card = $("#preview-result-card");
  const totalEl = $("#preview-result-total");
  const notationEl = $("#preview-pool-notation");
  const emptyHint = $("#preview-empty-hint");
  const styleNameEl = $("#preview-style-name");
  const rerollBtn = $("#preview-btn-reroll");
  const clearBtn = $("#preview-btn-clear");

  if (!workspace || !tray || !arena) return;

  const activeStyle =
    DICE_STYLES.find((s) => s.id === state.activeStyleId) || DICE_STYLES[0];
  if (styleNameEl) styleNameEl.textContent = activeStyle.name;

  // Apply style class to phone workspace
  workspace.className = `dice-workspace phone-dice-workspace dice-style-${activeStyle.id}`;

  const colors = getActivePaletteColors();
  const colorBySides = new Map(
    DICE_CATALOG.map((d, idx) => [d.sides, colors[idx % colors.length]]),
  );

  // Render top tray
  tray.innerHTML = DICE_CATALOG.map((die) => {
    const hex = colorBySides.get(die.sides);
    return `
      <button
        type="button"
        class="dice-tray-btn"
        data-sides="${die.sides}"
        aria-label="Roll ${die.name}"
        ${state.previewPool.length >= 20 ? "disabled" : ""}
      >
        <span class="die-svg-wrap">${renderStyledDieSvg(activeStyle.id, die.sides, null, hex)}</span>
        <span class="dice-tray-label">${die.label}</span>
      </button>
    `;
  }).join("");

  // Sync mode buttons
  $$("#preview-mode-group .dice-mode-btn").forEach((btn) => {
    const active = btn.dataset.diceMode === state.previewMode;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-checked", active ? "true" : "false");
  });

  // Render middle arena
  arena.querySelectorAll(".dice-roll-set").forEach((el) => el.remove());

  const hasDice = state.previewPool.length > 0;
  if (rerollBtn) rerollBtn.disabled = !hasDice;
  if (clearBtn) clearBtn.disabled = !hasDice;
  if (notationEl) {
    notationEl.textContent = hasDice ? formatPoolNotation(state.previewPool) : "";
  }

  if (!hasDice) {
    arena.classList.remove("is-dual");
    if (emptyHint) emptyHint.hidden = false;
    if (totalEl) totalEl.textContent = "—";
    if (card) card.classList.remove("rolled");
    return;
  }

  if (emptyHint) emptyHint.hidden = true;
  if (card) card.classList.add("rolled");

  const isDual = state.previewMode !== "exact";
  arena.classList.toggle("is-dual", isDual);

  const sumA = state.previewPool.reduce((acc, d) => acc + d.rollA, 0);
  const sumB = state.previewPool.reduce((acc, d) => acc + (d.rollB ?? d.rollA), 0);
  const aWins =
    state.previewMode === "exact"
      ? true
      : state.previewMode === "best"
        ? sumA >= sumB
        : sumA <= sumB;

  const buildSet = (setKey, label, sum, values, statusClass, showHeader) => {
    const wrapper = document.createElement("div");
    wrapper.className = `dice-roll-set ${statusClass}`;
    if (showHeader) {
      wrapper.innerHTML = `<div class="dice-roll-set-header"><span class="dice-roll-set-label">${label}</span><span class="dice-roll-set-sum">${sum}</span></div>`;
    }
    const area = document.createElement("div");
    area.className = "dice-area";
    area.dataset.countTier = getCountTier(state.previewPool.length);

    state.previewPool.forEach((die, i) => {
      const hex = colorBySides.get(die.sides);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `die-chip${animateIds?.has(die.id) ? " is-tumbling" : ""}`;
      btn.dataset.dieId = String(die.id);
      btn.setAttribute("aria-label", `Remove d${die.sides}`);
      btn.innerHTML = renderStyledDieSvg(activeStyle.id, die.sides, values[i], hex);
      area.appendChild(btn);
    });

    wrapper.appendChild(area);
    return wrapper;
  };

  if (!isDual) {
    arena.appendChild(
      buildSet(
        "A",
        "Roll 1",
        sumA,
        state.previewPool.map((d) => d.rollA),
        "is-selected",
        false,
      ),
    );
  } else {
    arena.appendChild(
      buildSet(
        "A",
        "Roll 1",
        sumA,
        state.previewPool.map((d) => d.rollA),
        aWins ? "is-selected" : "is-discarded",
        true,
      ),
    );
    arena.appendChild(
      buildSet(
        "B",
        "Roll 2",
        sumB,
        state.previewPool.map((d) => d.rollB ?? d.rollA),
        aWins ? "is-discarded" : "is-selected",
        true,
      ),
    );
  }

  if (totalEl) totalEl.textContent = String(aWins ? sumA : sumB);
};

// URL hash sync so Jimmy & Pete can share exact style + palette links
const readHashState = () => {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const style = params.get("style");
  const palette = params.get("palette");
  const theme = params.get("theme");
  const hue = params.get("hue");

  if (style && DICE_STYLES.some((s) => s.id === style)) {
    state.activeStyleId = style;
  }
  if (palette && (PALETTES[palette] || PALETTE_ORDER.includes(palette))) {
    state.paletteId = palette;
  }
  if (theme === "dark" || theme === "light") {
    state.theme = theme;
  }
  if (hue != null && !Number.isNaN(Number(hue))) {
    state.themeHue = Math.max(0, Math.min(360, parseInt(hue, 10)));
  }
};

const syncHashState = () => {
  const params = new URLSearchParams({
    style: state.activeStyleId,
    palette: state.paletteId,
    theme: state.theme,
    hue: String(state.themeHue),
  });
  window.history.replaceState(null, "", `#${params.toString()}`);
};

const renderAll = (opts = {}) => {
  applyAppearance();
  renderSlotStrip();
  renderPaletteCatalog();
  renderStyleGallery(opts);
  renderPhonePreview();
  syncHashState();
};

// Event bindings
const bindEvents = () => {
  // Face display toggle (Rolled / Labels)
  $("#face-mode-group")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-face-mode]");
    if (!btn) return;
    state.faceMode = btn.dataset.faceMode;
    $$("#face-mode-group .segment-btn").forEach((b) => {
      const active = b === btn;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
    renderStyleGallery();
  });

  // Dark / Light toggle
  $("#theme-mode-group")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-theme-mode]");
    if (!btn) return;
    state.theme = btn.dataset.themeMode;
    renderAll();
  });

  // Theme hue slider
  $("#demo-theme-hue")?.addEventListener("input", (e) => {
    state.themeHue = parseInt(e.target.value, 10) || 205;
    applyAppearance();
    syncHashState();
  });

  // Palette selection
  $("#palette-catalog-grid")?.addEventListener("click", (e) => {
    const card = e.target.closest("[data-palette-opt]");
    if (!card) return;
    state.paletteId = card.dataset.paletteOpt;
    renderAll();
  });

  // Roll all samples
  $("#btn-roll-all-samples")?.addEventListener("click", () => {
    DICE_CATALOG.forEach((d) => {
      state.sampleValues[d.sides] = rollOne(d.sides);
    });
    state.faceMode = "rolled";
    $$("#face-mode-group .segment-btn").forEach((b) => {
      const active = b.dataset.faceMode === "rolled";
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
    renderStyleGallery({ tumbleStyleId: "all" });
  });

  // Style gallery interactions (select card, roll card, or tap single die)
  $("#dice-styles-grid")?.addEventListener("click", (e) => {
    const rollCardBtn = e.target.closest('[data-action="roll-card"]');
    if (rollCardBtn) {
      e.stopPropagation();
      const styleId = rollCardBtn.dataset.styleId;
      DICE_CATALOG.forEach((d) => {
        state.sampleValues[d.sides] = rollOne(d.sides);
      });
      state.faceMode = "rolled";
      renderStyleGallery({ tumbleStyleId: styleId });
      return;
    }

    const sampleBtn = e.target.closest(".dice-sample-btn");
    if (sampleBtn) {
      e.stopPropagation();
      const styleId = sampleBtn.dataset.styleId;
      const sides = parseInt(sampleBtn.dataset.sides, 10);
      state.activeStyleId = styleId;
      state.sampleValues[sides] = rollOne(sides);
      state.faceMode = "rolled";
      renderStyleGallery({ tumbleStyleId: styleId, tumbleSides: sides });
      renderPhonePreview();
      syncHashState();
      return;
    }

    const card = e.target.closest(".dice-style-card");
    if (card) {
      state.activeStyleId = card.dataset.cardStyle;
      renderStyleGallery();
      renderPhonePreview();
      syncHashState();
    }
  });

  // Live phone preview interactions
  $("#preview-dice-tray")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".dice-tray-btn");
    if (!btn || state.previewPool.length >= 20) return;
    const sides = parseInt(btn.dataset.sides, 10) || 6;
    const newDie = {
      id: state.previewNextId++,
      sides,
      rollA: rollOne(sides),
      rollB: rollOne(sides),
    };
    state.previewPool.push(newDie);
    renderPhonePreview({ animateIds: new Set([newDie.id]) });
  });

  $("#preview-dice-arena")?.addEventListener("click", (e) => {
    const chip = e.target.closest(".die-chip");
    if (!chip) return;
    const id = parseInt(chip.dataset.dieId, 10);
    state.previewPool = state.previewPool.filter((d) => d.id !== id);
    renderPhonePreview();
  });

  $("#preview-mode-group")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-dice-mode]");
    if (!btn) return;
    state.previewMode = btn.dataset.diceMode;
    renderPhonePreview();
  });

  $("#preview-btn-reroll")?.addEventListener("click", () => {
    if (state.previewPool.length === 0) return;
    state.previewPool = state.previewPool.map((d) => ({
      ...d,
      rollA: rollOne(d.sides),
      rollB: rollOne(d.sides),
    }));
    renderPhonePreview({
      animateIds: new Set(state.previewPool.map((d) => d.id)),
    });
  });

  $("#preview-btn-clear")?.addEventListener("click", () => {
    state.previewPool = [];
    renderPhonePreview();
  });

  // Copy shareable link
  $("#btn-copy-link")?.addEventListener("click", async () => {
    syncHashState();
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard");
    } catch {
      showToast("Copy the URL from the address bar");
    }
  });
};

// Boot
readHashState();
bindEvents();
renderAll();
