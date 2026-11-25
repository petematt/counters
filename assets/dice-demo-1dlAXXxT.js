import{a as e,b as t,f as n,l as r,r as i,u as a}from"./palettes-Bg6VGpQG.js";import{n as o,s}from"./palettes-candidates-EAccjPlP.js";var c=e=>document.querySelector(e),l=e=>document.querySelectorAll(e),u=[{sides:2,label:`d2`,name:`Coin (d2)`},{sides:4,label:`d4`,name:`d4`},{sides:6,label:`d6`,name:`d6`},{sides:8,label:`d8`,name:`d8`},{sides:10,label:`d10`,name:`d10`},{sides:12,label:`d12`,name:`d12`},{sides:20,label:`d20`,name:`d20`},{sides:100,label:`d100`,name:`d100`}],d=[{id:`current`,name:`Current implementation`,badge:`Current`,badgeClass:`is-current`,desc:`The 3D faceted SVG polyhedra currently implemented in the Dice tab.`},{id:`minimalist-flat`,name:`Minimalist flat`,badge:`Proposed`,badgeClass:`is-proposed`,desc:`Clean Swiss geometric silhouettes matching Counters' minimalist cards with zero visual clutter.`},{id:`faceted-gem`,name:`Faceted gem`,desc:`Unified top-down orthographic polyhedra with lit top-left bevels, shaded lower planes, and inner seams.`},{id:`matte-clay`,name:`Matte clay`,desc:`Soft, pillowy board-game polyhedra with warm radial depth and a subtle specular sheen.`},{id:`wireframe-neon`,name:`Wireframe neon`,desc:`Architectural isometric wireframes with luminous colored edges and translucent tinted interiors.`},{id:`frosted-glass`,name:`Frosted glass`,desc:`Translucent acrylic resin dice with a diagonal glossy reflection and crisp etched numerals.`},{id:`ink-paper`,name:`Ink & paper`,desc:`Editorial tabletop zine style with bold ink outlines, offset hard shadows, and hatched facets.`},{id:`metallic-enamel`,name:`Metallic enamel`,desc:`Heavy RPG metal frames with brushed bevel rims and recessed colored enamel faces.`},{id:`chiseled-stone`,name:`Chiseled stone`,desc:`Sharp split-plane lighting across carved bevel silhouettes for dramatic tabletop contrast.`},{id:`classic-pips`,name:`Classic pips & glyphs`,desc:`Traditional tactile feel: true recessed pips on rolled d6, medallion coin rim, and notched corners.`},{id:`soft-tint`,name:`Soft tint`,desc:`Airy, low-fatigue tinted surfaces with colored ink and crisp outlines that blend softly into the UI.`}],f=(e,t,n)=>`#`+[1,3,5].map(r=>{let i=parseInt(e.slice(r,r+2),16),a=parseInt(t.slice(r,r+2),16);return Math.round(i+(a-i)*n).toString(16).padStart(2,`0`)}).join(``),p=(e,t)=>{let[n,r,i]=[1,3,5].map(t=>parseInt(e.slice(t,t+2),16));return`rgba(${n}, ${r}, ${i}, ${t})`},m=e=>Math.floor(Math.random()*e)+1,h=(e,t)=>t==null?e===2?`H/T`:`d${e}`:e===2?t===2?`H/2`:`T/1`:String(t),g={2:{outer:`<circle cx="32" cy="32" r="24" />`,inner:`<circle cx="32" cy="32" r="19" />`,textX:32,textY:32},4:{outer:`<polygon points="32,7 57,53 7,53" />`,inner:`<polygon points="32,15 50,49 14,49" />`,textX:32,textY:40},6:{outer:`<rect x="9" y="9" width="46" height="46" rx="10" />`,inner:`<rect x="14" y="14" width="36" height="36" rx="7" />`,textX:32,textY:32.5},8:{outer:`<polygon points="32,5 56,32 32,59 8,32" />`,inner:`<polygon points="32,12 49,32 32,52 15,32" />`,textX:32,textY:32.5},10:{outer:`<polygon points="32,5 56,28 50,44 32,59 14,44 8,28" />`,inner:`<polygon points="32,12 48,31 32,50 16,31" />`,textX:32,textY:32},12:{outer:`<polygon points="32,6 54,18 57,41 42,57 22,57 7,41 10,18" />`,inner:`<polygon points="32,14 48,26 42,46 22,46 16,26" />`,textX:32,textY:33},20:{outer:`<polygon points="32,5 56,19 56,45 32,59 8,45 8,19" />`,inner:`<polygon points="32,14 50,45 14,45" />`,textX:32,textY:35},100:{outer:`<polygon points="32,5 48,10 58,23 58,41 48,54 32,59 16,54 6,41 6,23 16,10" />`,inner:`<polygon points="32,13 44,18 50,32 44,46 32,51 20,46 14,32 20,18" />`,textX:32,textY:32.5}},_={1:[[32,32]],2:[[22,22],[42,42]],3:[[21,21],[32,32],[43,43]],4:[[22,22],[42,22],[22,42],[42,42]],5:[[21,21],[43,21],[32,32],[21,43],[43,43]],6:[[22,20],[42,20],[22,32],[42,32],[22,44],[42,44]]},v={paletteId:`bold`,theme:`dark`,themeHue:205,faceMode:`rolled`,activeStyleId:`current`,sampleValues:{2:2,4:3,6:5,8:7,10:9,12:11,20:20,100:84},previewMode:`exact`,previewNextId:4,previewPool:[{id:1,sides:2,rollA:2,rollB:1},{id:2,sides:6,rollA:5,rollB:3},{id:3,sides:20,rollA:17,rollB:11}]},y=()=>{let e=i[v.paletteId];return e?e.colors:s(v.paletteId,{themeHue:v.themeHue})?.colors||i.bold.colors},b=1,x=(e,t,i,o)=>{let s=v.theme===`dark`,c=`d${b++}`,l=h(t,i),u=String(l).length,d=u>=4?13:u===3?15:u===2?18:21,m=f(o,`#ffffff`,.28),y=f(o,`#000000`,.3),x=f(o,`#000000`,.5),S=n(o),C=s?r(o):a(o),w=g[t]||g[6],T=(e,t)=>e.replace(/ \/>$/,` ${t} />`),E=(e,t,n,r)=>`<text x="${e}" y="${t}" font-size="${n}" fill="${r}" style="fill:${r}" class="die-face-text">${l}</text>`;if(e===`current`){let e,n=32,r,i=f(o,`#000000`,.42);return t===2?(e=`
        <circle cx="32" cy="34" r="24" fill="${y}" />
        <circle cx="32" cy="30" r="24" fill="${m}" />
        <circle cx="32" cy="31" r="20" fill="${o}" />
        <circle cx="32" cy="30" r="24" fill="none" stroke="${i}" stroke-width="2" />
        <circle cx="32" cy="31" r="19" fill="none" stroke="${i}" stroke-width="1.25" opacity="0.55" />
      `,r=31):t===4?(e=`
        <polygon points="32,7 57,52 32,57" fill="${y}" />
        <polygon points="32,7 7,52 32,57" fill="${m}" />
        <polygon points="32,14 51,50 13,50" fill="${o}" />
        <line x1="32" y1="7" x2="32" y2="14" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <line x1="7" y1="52" x2="13" y2="50" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <line x1="57" y1="52" x2="51" y2="50" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <polygon points="32,7 57,52 32,57 7,52" fill="none" stroke="${i}" stroke-width="2" stroke-linejoin="round" />
      `,r=39):t===6?(e=`
        <polygon points="11,20 21,10 54,10 45,20" fill="${m}" />
        <polygon points="45,20 54,10 54,45 45,55" fill="${y}" />
        <rect x="9" y="19" width="37" height="37" rx="5" fill="${o}" stroke="${i}" stroke-width="2" />
        <polyline points="11,20 21,10 54,10 54,45 45,55" fill="none" stroke="${i}" stroke-width="2" stroke-linejoin="round" />
        <line x1="45" y1="20" x2="54" y2="10" stroke="${i}" stroke-width="1.25" opacity="0.55" />
      `,n=27.5,r=38):t===8?(e=`
        <polygon points="32,5 56,32 32,59 8,32" fill="${y}" />
        <polygon points="32,5 8,32 32,20" fill="${m}" />
        <polygon points="32,5 56,32 32,20" fill="${m}" />
        <polygon points="32,12 50,41 14,41" fill="${o}" />
        <line x1="32" y1="5" x2="32" y2="12" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <line x1="8" y1="32" x2="14" y2="41" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <line x1="56" y1="32" x2="50" y2="41" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <polygon points="32,5 56,32 32,59 8,32" fill="none" stroke="${i}" stroke-width="2" stroke-linejoin="round" />
      `,r=33):t===10?(e=`
        <polygon points="32,5 56,28 50,44 32,59 14,44 8,28" fill="${y}" />
        <polygon points="32,5 8,28 18,35 32,15" fill="${m}" />
        <polygon points="32,5 56,28 46,35 32,15" fill="${m}" />
        <polygon points="32,12 49,33 32,49 15,33" fill="${o}" />
        <line x1="32" y1="5" x2="32" y2="12" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <line x1="32" y1="49" x2="32" y2="59" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <polygon points="32,5 56,28 50,44 32,59 14,44 8,28" fill="none" stroke="${i}" stroke-width="2" stroke-linejoin="round" />
      `,r=32):t===12?(e=`
        <polygon points="32,6 54,18 57,41 42,57 22,57 7,41 10,18" fill="${y}" />
        <polygon points="32,6 54,18 46,27 18,27 10,18" fill="${m}" />
        <polygon points="32,15 48,27 42,46 22,46 16,27" fill="${o}" />
        <line x1="32" y1="6" x2="32" y2="15" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <line x1="54" y1="18" x2="48" y2="27" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <line x1="10" y1="18" x2="16" y2="27" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <line x1="42" y1="46" x2="42" y2="57" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <line x1="22" y1="46" x2="22" y2="57" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <polygon points="32,6 54,18 57,41 42,57 22,57 7,41 10,18" fill="none" stroke="${i}" stroke-width="2" stroke-linejoin="round" />
      `,r=33):t===20?(e=`
        <polygon points="32,5 56,19 56,45 32,59 8,45 8,19" fill="${y}" />
        <polygon points="32,5 56,19 32,16 8,19" fill="${m}" />
        <polygon points="8,19 16,44 8,45" fill="${m}" />
        <polygon points="32,14 50,45 14,45" fill="${o}" />
        <line x1="32" y1="5" x2="32" y2="14" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <line x1="56" y1="19" x2="50" y2="45" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <line x1="8" y1="19" x2="14" y2="45" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <line x1="56" y1="45" x2="50" y2="45" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <line x1="8" y1="45" x2="14" y2="45" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <polygon points="32,5 56,19 56,45 32,59 8,45 8,19" fill="none" stroke="${i}" stroke-width="2" stroke-linejoin="round" />
      `,r=35):(e=`
        <polygon points="32,5 48,10 58,23 58,41 48,54 32,59 16,54 6,41 6,23 16,10" fill="${y}" />
        <polygon points="32,5 48,10 58,23 47,25 17,25 6,23 16,10" fill="${m}" />
        <polygon points="32,13 44,18 50,32 44,46 32,51 20,46 14,32 20,18" fill="${o}" />
        <polygon points="32,13 44,18 50,32 44,46 32,51 20,46 14,32 20,18" fill="none" stroke="${i}" stroke-width="1.25" opacity="0.55" />
        <polygon points="32,5 48,10 58,23 58,41 48,54 32,59 16,54 6,41 6,23 16,10" fill="none" stroke="${i}" stroke-width="2" stroke-linejoin="round" />
      `,r=32),`<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${e}${E(n,r,d,S)}</svg>`}if(e===`faceted-gem`){let e=`
      <defs>
        <linearGradient id="${c}-bevel" x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stop-color="${m}" />
          <stop offset="48%" stop-color="${o}" />
          <stop offset="100%" stop-color="${y}" />
        </linearGradient>
      </defs>
    `,n={2:`<circle cx="32" cy="32" r="19" fill="none" stroke="${x}" stroke-width="1.25" opacity="0.45" />`,4:`<line x1="32" y1="7" x2="32" y2="15" stroke="${x}" stroke-width="1.25" opacity="0.55" />
          <line x1="57" y1="53" x2="50" y2="49" stroke="${x}" stroke-width="1.25" opacity="0.55" />
          <line x1="7" y1="53" x2="14" y2="49" stroke="${x}" stroke-width="1.25" opacity="0.55" />`,6:`<line x1="12" y1="12" x2="16" y2="16" stroke="${x}" stroke-width="1.25" opacity="0.5" />
          <line x1="52" y1="12" x2="48" y2="16" stroke="${x}" stroke-width="1.25" opacity="0.5" />
          <line x1="12" y1="52" x2="16" y2="48" stroke="${x}" stroke-width="1.25" opacity="0.5" />
          <line x1="52" y1="52" x2="48" y2="48" stroke="${x}" stroke-width="1.25" opacity="0.5" />`,8:`<line x1="32" y1="5" x2="32" y2="12" stroke="${x}" stroke-width="1.25" opacity="0.5" />
          <line x1="56" y1="32" x2="49" y2="32" stroke="${x}" stroke-width="1.25" opacity="0.5" />
          <line x1="32" y1="59" x2="32" y2="52" stroke="${x}" stroke-width="1.25" opacity="0.5" />
          <line x1="8" y1="32" x2="15" y2="32" stroke="${x}" stroke-width="1.25" opacity="0.5" />`,10:`<line x1="32" y1="5" x2="32" y2="12" stroke="${x}" stroke-width="1.25" opacity="0.5" />
           <line x1="56" y1="28" x2="48" y2="31" stroke="${x}" stroke-width="1.25" opacity="0.5" />
           <line x1="8" y1="28" x2="16" y2="31" stroke="${x}" stroke-width="1.25" opacity="0.5" />
           <line x1="32" y1="59" x2="32" y2="50" stroke="${x}" stroke-width="1.25" opacity="0.5" />`,12:`<line x1="32" y1="6" x2="32" y2="14" stroke="${x}" stroke-width="1.25" opacity="0.5" />
           <line x1="54" y1="18" x2="48" y2="26" stroke="${x}" stroke-width="1.25" opacity="0.5" />
           <line x1="10" y1="18" x2="16" y2="26" stroke="${x}" stroke-width="1.25" opacity="0.5" />
           <line x1="42" y1="57" x2="42" y2="46" stroke="${x}" stroke-width="1.25" opacity="0.5" />
           <line x1="22" y1="57" x2="22" y2="46" stroke="${x}" stroke-width="1.25" opacity="0.5" />`,20:`<line x1="32" y1="5" x2="32" y2="14" stroke="${x}" stroke-width="1.25" opacity="0.5" />
           <line x1="56" y1="19" x2="50" y2="45" stroke="${x}" stroke-width="1.25" opacity="0.5" />
           <line x1="8" y1="19" x2="14" y2="45" stroke="${x}" stroke-width="1.25" opacity="0.5" />
           <line x1="56" y1="45" x2="50" y2="45" stroke="${x}" stroke-width="1.25" opacity="0.5" />
           <line x1="8" y1="45" x2="14" y2="45" stroke="${x}" stroke-width="1.25" opacity="0.5" />`,100:`<line x1="32" y1="5" x2="32" y2="13" stroke="${x}" stroke-width="1.25" opacity="0.5" />
            <line x1="58" y1="32" x2="50" y2="32" stroke="${x}" stroke-width="1.25" opacity="0.5" />
            <line x1="6" y1="32" x2="14" y2="32" stroke="${x}" stroke-width="1.25" opacity="0.5" />
            <line x1="32" y1="59" x2="32" y2="51" stroke="${x}" stroke-width="1.25" opacity="0.5" />`},r=T(w.outer,`fill="url(#${c}-bevel)"`),i=T(w.inner,`fill="${o}" stroke="${m}" stroke-opacity="0.55" stroke-width="1.25" stroke-linejoin="round"`),a=T(w.outer,`fill="none" stroke="${x}" stroke-width="2" stroke-linejoin="round"`);return`<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${e}${r}${i}${n[t]||``}${a}${E(w.textX,w.textY,d,S)}</svg>`}if(e===`matte-clay`)return`<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${`
      <defs>
        <radialGradient id="${c}-clay" cx="30%" cy="22%" r="78%">
          <stop offset="0%" stop-color="${m}" />
          <stop offset="48%" stop-color="${o}" />
          <stop offset="100%" stop-color="${y}" />
        </radialGradient>
      </defs>
    `}${T(w.outer,`fill="url(#${c}-clay)" stroke="${f(o,`#ffffff`,.35)}" stroke-width="2.2" stroke-linejoin="round"`)}${t===4?`<ellipse cx="32" cy="21" rx="4.5" ry="2.2" fill="#ffffff" opacity="0.22" />`:`<ellipse cx="24" cy="17" rx="8" ry="3.2" transform="rotate(-20 24 17)" fill="#ffffff" opacity="0.24" />`}${E(w.textX,w.textY,d,S)}</svg>`;if(e===`wireframe-neon`){let e=s?m:C,t=p(o,s?.16:.12),n=T(w.outer,`fill="${t}" stroke="${e}" stroke-width="2.4" stroke-linejoin="round"`),r=T(w.inner,`fill="none" stroke="${e}" stroke-width="1.15" stroke-linejoin="round" opacity="0.45"`);return`<svg class="die-svg" style="--die-glow: ${p(o,.55)}" viewBox="0 0 64 64" aria-hidden="true">${n}${r}${E(w.textX,w.textY,d,C)}</svg>`}if(e===`minimalist-flat`)return`<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${T(w.outer,`fill="${o}" stroke="${f(o,`#000000`,.18)}" stroke-width="1.5" stroke-linejoin="round"`)}${E(w.textX,w.textY,d+1,S)}</svg>`;if(e===`frosted-glass`)return`<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${`
      <defs>
        <linearGradient id="${c}-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${m}" stop-opacity="0.92" />
          <stop offset="50%" stop-color="${o}" stop-opacity="0.86" />
          <stop offset="100%" stop-color="${y}" stop-opacity="0.94" />
        </linearGradient>
        <clipPath id="${c}-clip">${w.outer}</clipPath>
      </defs>
    `}${T(w.outer,`fill="url(#${c}-glass)" stroke="#ffffff" stroke-opacity="${s?.52:.72}" stroke-width="2" stroke-linejoin="round"`)}${`<polygon points="-4,20 34,-8 44,2 6,28" fill="#ffffff" opacity="0.22" clip-path="url(#${c}-clip)" />`}${T(w.inner,`fill="none" stroke="#ffffff" stroke-opacity="0.28" stroke-width="1.1"`)}${E(w.textX,w.textY,d,S)}</svg>`;if(e===`ink-paper`){let e=s?`#0b0d12`:`#0f172a`;return`<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${`
      <defs>
        <pattern id="${c}-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="${e}" stroke-width="1.2" opacity="0.24" />
        </pattern>
        <clipPath id="${c}-clip">${w.outer}</clipPath>
      </defs>
    `}${T(w.outer,`fill="${o}"`)}${`<rect x="42" y="0" width="24" height="64" fill="url(#${c}-hatch)" clip-path="url(#${c}-clip)" />`}${T(w.outer,`fill="none" stroke="${e}" stroke-width="2.8" stroke-linejoin="round"`)}${E(w.textX,w.textY,d,S)}</svg>`}if(e===`metallic-enamel`){let e=s?`#e2e8f0`:`#f8fafc`,t=s?`#94a3b8`:`#cbd5e1`,n=s?`#475569`:`#64748b`;return`<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${`
      <defs>
        <linearGradient id="${c}-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${e}" />
          <stop offset="48%" stop-color="${t}" />
          <stop offset="100%" stop-color="${n}" />
        </linearGradient>
      </defs>
    `}${T(w.outer,`fill="url(#${c}-metal)" stroke="${n}" stroke-width="1.5" stroke-linejoin="round"`)}${T(w.inner,`fill="${o}" stroke="${x}" stroke-width="1.4" stroke-linejoin="round"`)}${E(w.textX,w.textY,Math.max(12,d-2),S)}</svg>`}if(e===`chiseled-stone`)return`<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${`
      <defs>
        <clipPath id="${c}-clip">${w.outer}</clipPath>
      </defs>
    `}${T(w.outer,`fill="${y}"`)}${`<polygon points="0,0 64,0 0,64" fill="${m}" opacity="0.72" clip-path="url(#${c}-clip)" />`}${T(w.inner,`fill="${o}" stroke="${x}" stroke-width="1.2"`)}${T(w.outer,`fill="none" stroke="${x}" stroke-width="2.2" stroke-linejoin="round"`)}${E(w.textX,w.textY,d,S)}</svg>`;if(e===`classic-pips`){let e=`
      <defs>
        <linearGradient id="${c}-pipbg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${m}" />
          <stop offset="100%" stop-color="${y}" />
        </linearGradient>
      </defs>
    `,n=T(w.outer,`fill="url(#${c}-pipbg)" stroke="${x}" stroke-width="2" stroke-linejoin="round"`);return t===6&&i!=null&&_[i]?`<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${e}${n}<rect x="13" y="13" width="38" height="38" rx="7" fill="${o}" />${_[i].map(([e,t])=>`<circle cx="${e}" cy="${t}" r="4.2" fill="${S}" />`).join(``)}</svg>`:`<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${e}${n}${t===2?`<circle cx="32" cy="32" r="20" fill="${o}" stroke="${S}" stroke-width="1.3" stroke-dasharray="3 2.5" opacity="0.85" />`:T(w.inner,`fill="${o}"`)}${E(w.textX,w.textY,d,S)}</svg>`}let D=p(o,s?.2:.16),O=p(o,s?.72:.65);return`<svg class="die-svg" viewBox="0 0 64 64" aria-hidden="true">${T(w.outer,`fill="${D}" stroke="${O}" stroke-width="2" stroke-linejoin="round"`)}${E(w.textX,w.textY,d,C)}</svg>`},S=null,C=e=>{let t=c(`#studio-toast`);t&&(t.textContent=e,t.hidden=!1,clearTimeout(S),S=setTimeout(()=>{t.hidden=!0},2200))},w=()=>{let t=v.theme===`light`;document.documentElement.classList.toggle(`light-mode`,t),document.documentElement.classList.toggle(`dark-mode`,!t),e(v.themeHue);let n=c(`#theme-hue-readout`);n&&(n.textContent=`${v.themeHue}°`);let r=c(`#demo-theme-hue`);r&&(r.value=String(v.themeHue)),l(`#theme-mode-group .segment-btn`).forEach(e=>{let t=e.dataset.themeMode===v.theme;e.classList.toggle(`active`,t),e.setAttribute(`aria-pressed`,t?`true`:`false`)})},T=()=>{let e=c(`#dice-slot-strip`);if(!e)return;let t=y();e.innerHTML=u.map((e,r)=>{let i=t[r%t.length];return`<span class="dice-slot-chip" style="background:${i};color:${n(i)}" title="Slot ${r}: ${e.label} (${i})">${e.label}</span>`}).join(``)},E=()=>{let e=c(`#palette-catalog-grid`);if(!e)return;let n=Object.keys(i),r=o.filter(e=>!n.includes(e)&&![`tonal`,`shuffle`,`sky`].includes(e));e.innerHTML=[...n,...r].map(e=>{let n=i[e]||s(e,{themeHue:v.themeHue});if(!n)return``;let r=e===v.paletteId,a=t(n.colors);return`
        <button
          type="button"
          class="palette-option-card${r?` active`:``}"
          role="radio"
          aria-checked="${r?`true`:`false`}"
          data-palette-opt="${e}"
        >
          <span class="palette-option-name">${n.label}</span>
          <span class="palette-preview" aria-hidden="true">${a.map(e=>`<span style="background:${e}"></span>`).join(``)}</span>
        </button>
      `}).join(``)},D=({tumbleStyleId:e=null,tumbleSides:t=null}={})=>{let n=c(`#dice-styles-grid`);if(!n)return;let r=y();n.innerHTML=d.map((n,i)=>{let a=n.id===v.activeStyleId,o=u.map((i,a)=>{let o=r[a%r.length],s=v.faceMode===`rolled`?v.sampleValues[i.sides]:null;return`
        <button
          type="button"
          class="dice-sample-btn${(e===`all`||e===n.id)&&(t==null||t===i.sides)?` is-tumbling`:``}"
          data-style-id="${n.id}"
          data-sides="${i.sides}"
          aria-label="Roll ${i.name} in ${n.name} style"
        >
          <span class="dice-sample-svg-wrap">${x(n.id,i.sides,s,o)}</span>
          <span class="dice-sample-caption">${i.label}</span>
        </button>
      `}).join(``);return`
      <article
        class="dice-style-card dice-style-${n.id}${a?` active`:``}"
        data-card-style="${n.id}"
      >
        <div class="dice-style-card-head">
          <div>
            <div class="dice-style-card-title-row">
              <span class="dice-style-num">${i+1}</span>
              <h2 class="dice-style-title">${n.name}</h2>
              ${n.badge?`<span class="dice-style-badge ${n.badgeClass||``}">${n.badge}</span>`:``}
            </div>
            <p class="dice-style-desc">${n.desc}</p>
          </div>
          <div class="dice-style-card-actions">
            <button
              type="button"
              class="dice-style-mini-btn"
              data-action="roll-card"
              data-style-id="${n.id}"
            >
              Roll
            </button>
          </div>
        </div>
        <div class="dice-style-showcase">${o}</div>
      </article>
    `}).join(``)},O=e=>e<=3?`lg`:e<=6?`md`:e<=12?`sm`:`xs`,k=e=>{let t=new Map;return e.forEach(e=>t.set(e.sides,(t.get(e.sides)||0)+1)),u.filter(e=>t.has(e.sides)).map(e=>`${t.get(e.sides)}d${e.sides}`).join(` + `)},A=({animateIds:e=null}={})=>{let t=c(`#preview-workspace`),n=c(`#preview-dice-tray`),r=c(`#preview-dice-arena`),i=c(`#preview-result-card`),a=c(`#preview-result-total`),o=c(`#preview-pool-notation`),s=c(`#preview-empty-hint`),f=c(`#preview-style-name`),p=c(`#preview-btn-reroll`),m=c(`#preview-btn-clear`);if(!t||!n||!r)return;let h=d.find(e=>e.id===v.activeStyleId)||d[0];f&&(f.textContent=h.name),t.className=`dice-workspace phone-dice-workspace dice-style-${h.id}`;let g=y(),_=new Map(u.map((e,t)=>[e.sides,g[t%g.length]]));n.innerHTML=u.map(e=>{let t=_.get(e.sides);return`
      <button
        type="button"
        class="dice-tray-btn"
        data-sides="${e.sides}"
        aria-label="Roll ${e.name}"
        ${v.previewPool.length>=20?`disabled`:``}
      >
        <span class="die-svg-wrap">${x(h.id,e.sides,null,t)}</span>
        <span class="dice-tray-label">${e.label}</span>
      </button>
    `}).join(``),l(`#preview-mode-group .dice-mode-btn`).forEach(e=>{let t=e.dataset.diceMode===v.previewMode;e.classList.toggle(`active`,t),e.setAttribute(`aria-checked`,t?`true`:`false`)}),r.querySelectorAll(`.dice-roll-set`).forEach(e=>e.remove());let b=v.previewPool.length>0;if(p&&(p.disabled=!b),m&&(m.disabled=!b),o&&(o.textContent=b?k(v.previewPool):``),!b){r.classList.remove(`is-dual`),s&&(s.hidden=!1),a&&(a.textContent=`—`),i&&i.classList.remove(`rolled`);return}s&&(s.hidden=!0),i&&i.classList.add(`rolled`);let S=v.previewMode!==`exact`;r.classList.toggle(`is-dual`,S);let C=v.previewPool.reduce((e,t)=>e+t.rollA,0),w=v.previewPool.reduce((e,t)=>e+(t.rollB??t.rollA),0),T=v.previewMode===`exact`?!0:v.previewMode===`best`?C>=w:C<=w,E=(t,n,r,i,a,o)=>{let s=document.createElement(`div`);s.className=`dice-roll-set ${a}`,o&&(s.innerHTML=`<div class="dice-roll-set-header"><span class="dice-roll-set-label">${n}</span><span class="dice-roll-set-sum">${r}</span></div>`);let c=document.createElement(`div`);return c.className=`dice-area`,c.dataset.countTier=O(v.previewPool.length),v.previewPool.forEach((t,n)=>{let r=_.get(t.sides),a=document.createElement(`button`);a.type=`button`,a.className=`die-chip${e?.has(t.id)?` is-tumbling`:``}`,a.dataset.dieId=String(t.id),a.setAttribute(`aria-label`,`Remove d${t.sides}`),a.innerHTML=x(h.id,t.sides,i[n],r),c.appendChild(a)}),s.appendChild(c),s};S?(r.appendChild(E(`A`,`Roll 1`,C,v.previewPool.map(e=>e.rollA),T?`is-selected`:`is-discarded`,!0)),r.appendChild(E(`B`,`Roll 2`,w,v.previewPool.map(e=>e.rollB??e.rollA),T?`is-discarded`:`is-selected`,!0))):r.appendChild(E(`A`,`Roll 1`,C,v.previewPool.map(e=>e.rollA),`is-selected`,!1)),a&&(a.textContent=String(T?C:w))},j=()=>{let e=new URLSearchParams(window.location.hash.replace(/^#/,``)),t=e.get(`style`),n=e.get(`palette`),r=e.get(`theme`),a=e.get(`hue`);t&&d.some(e=>e.id===t)&&(v.activeStyleId=t),n&&(i[n]||o.includes(n))&&(v.paletteId=n),(r===`dark`||r===`light`)&&(v.theme=r),a!=null&&!Number.isNaN(Number(a))&&(v.themeHue=Math.max(0,Math.min(360,parseInt(a,10))))},M=()=>{let e=new URLSearchParams({style:v.activeStyleId,palette:v.paletteId,theme:v.theme,hue:String(v.themeHue)});window.history.replaceState(null,``,`#${e.toString()}`)},N=(e={})=>{w(),T(),E(),D(e),A(),M()};j(),c(`#face-mode-group`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-face-mode]`);t&&(v.faceMode=t.dataset.faceMode,l(`#face-mode-group .segment-btn`).forEach(e=>{let n=e===t;e.classList.toggle(`active`,n),e.setAttribute(`aria-pressed`,n?`true`:`false`)}),D())}),c(`#theme-mode-group`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-theme-mode]`);t&&(v.theme=t.dataset.themeMode,N())}),c(`#demo-theme-hue`)?.addEventListener(`input`,e=>{v.themeHue=parseInt(e.target.value,10)||205,w(),M()}),c(`#palette-catalog-grid`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-palette-opt]`);t&&(v.paletteId=t.dataset.paletteOpt,N())}),c(`#btn-roll-all-samples`)?.addEventListener(`click`,()=>{u.forEach(e=>{v.sampleValues[e.sides]=m(e.sides)}),v.faceMode=`rolled`,l(`#face-mode-group .segment-btn`).forEach(e=>{let t=e.dataset.faceMode===`rolled`;e.classList.toggle(`active`,t),e.setAttribute(`aria-pressed`,t?`true`:`false`)}),D({tumbleStyleId:`all`})}),c(`#dice-styles-grid`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-action="roll-card"]`);if(t){e.stopPropagation();let n=t.dataset.styleId;u.forEach(e=>{v.sampleValues[e.sides]=m(e.sides)}),v.faceMode=`rolled`,D({tumbleStyleId:n});return}let n=e.target.closest(`.dice-sample-btn`);if(n){e.stopPropagation();let t=n.dataset.styleId,r=parseInt(n.dataset.sides,10);v.activeStyleId=t,v.sampleValues[r]=m(r),v.faceMode=`rolled`,D({tumbleStyleId:t,tumbleSides:r}),A(),M();return}let r=e.target.closest(`.dice-style-card`);r&&(v.activeStyleId=r.dataset.cardStyle,D(),A(),M())}),c(`#preview-dice-tray`)?.addEventListener(`click`,e=>{let t=e.target.closest(`.dice-tray-btn`);if(!t||v.previewPool.length>=20)return;let n=parseInt(t.dataset.sides,10)||6,r={id:v.previewNextId++,sides:n,rollA:m(n),rollB:m(n)};v.previewPool.push(r),A({animateIds:new Set([r.id])})}),c(`#preview-dice-arena`)?.addEventListener(`click`,e=>{let t=e.target.closest(`.die-chip`);if(!t)return;let n=parseInt(t.dataset.dieId,10);v.previewPool=v.previewPool.filter(e=>e.id!==n),A()}),c(`#preview-mode-group`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-dice-mode]`);t&&(v.previewMode=t.dataset.diceMode,A())}),c(`#preview-btn-reroll`)?.addEventListener(`click`,()=>{v.previewPool.length!==0&&(v.previewPool=v.previewPool.map(e=>({...e,rollA:m(e.sides),rollB:m(e.sides)})),A({animateIds:new Set(v.previewPool.map(e=>e.id))}))}),c(`#preview-btn-clear`)?.addEventListener(`click`,()=>{v.previewPool=[],A()}),c(`#btn-copy-link`)?.addEventListener(`click`,async()=>{M();try{await navigator.clipboard.writeText(window.location.href),C(`Link copied to clipboard`)}catch{C(`Copy the URL from the address bar`)}}),N();