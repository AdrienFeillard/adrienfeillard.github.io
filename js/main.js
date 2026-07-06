// Portfolio interactions: brick wall, skills wheel, tool→project chips.
import { projects, innerSkills, outerSkills, toolProjects, CONTEXT, FEAT_IDS } from './data.js';

const state = {
  selectedTool: null,
  tutorialDone: false,
  chipTutDone: false,
  activeBrick: null,
  ringZone: null // 'inner' | 'outer' | null
};
let suppressHover = false;

const wallProjects = projects.filter(p => FEAT_IDS.indexOf(p.id) === -1);
const idNum = { 'next': '01', 'yneuro': '02', 'lpsy': '03' };
wallProjects.forEach((p, i) => { idNum[p.id] = String(i + 4).padStart(2, '0'); });
const byId = {};
projects.forEach(p => { byId[p.id] = p; });

function shortLabel(label) {
  if (label.indexOf('Laboratory of Psychophysics') === 0) return 'LPSY Lab';
  if (label.length <= 18) return label;
  if (label.indexOf('(') > -1) return label.slice(0, label.indexOf('(')).trim().slice(0, 18);
  return label.slice(0, 16) + '\u2026';
}
const arrowFor = link => (link.icon || '').indexOf('pdf') > -1 ? '\u2193' : '\u2197';

/* ---------------- brick wall ---------------- */
function buildWall() {
  const host = document.getElementById('wall-rows');
  const specs = [
    { start: true, count: 3, end: true },
    { start: false, count: 4, end: false },
    { start: true, count: 3, end: true }
  ];
  let idx = 0;
  for (const spec of specs) {
    const row = document.createElement('div');
    row.className = 'wall-row';
    if (spec.start) row.appendChild(ghost());
    for (const p of wallProjects.slice(idx, idx + spec.count)) {
      const gi = wallProjects.indexOf(p);
      row.appendChild(brickEl(p, gi));
    }
    idx += spec.count;
    if (spec.end) row.appendChild(ghost());
    host.appendChild(row);
  }
}
function ghost() {
  const g = document.createElement('div');
  g.className = 'ghost';
  return g;
}
function brickEl(p, i) {
  const b = document.createElement('div');
  b.className = 'brick';
  b.id = 'brick-' + p.id;
  b.dataset.pid = p.id;
  b.dataset.side = i % 2 === 0 ? 'left' : 'right';
  const meta = (CONTEXT[p.id] || '') + ' \u00b7 ' + String(p.period).toUpperCase();
  const links = p.links.map(l =>
    '<a href="' + l.href + '" target="_blank" rel="noopener">' + shortLabel(l.label) + ' ' + arrowFor(l) + '</a>'
  ).join('');
  b.innerHTML =
    '<div class="brick-head">' +
      '<div class="brick-num">' + idNum[p.id] + '</div>' +
      '<div class="brick-title">' + p.shortTitle + '</div>' +
    '</div>' +
    '<div class="brick-content">' +
      '<div class="brick-img" role="img" aria-label="' + p.alt + '" style="background-image: url(\'' + p.image + '\')"></div>' +
      '<div class="brick-detail"><div class="brick-detail-inner">' +
        '<div class="brick-meta">' + meta + '</div>' +
        '<p class="brick-desc">' + p.description + '</p>' +
        '<div class="brick-links">' + links + '</div>' +
      '</div></div>' +
    '</div>';
  b.addEventListener('mouseenter', () => { if (!suppressHover) setActiveBrick(p.id); });
  b.addEventListener('mouseleave', () => { if (!suppressHover) setActiveBrick(null); });
  return b;
}
function setActiveBrick(id) {
  state.activeBrick = id;
  document.querySelectorAll('.brick').forEach(el => el.classList.toggle('active', el.dataset.pid === id));
}

/* ---------------- skills wheel ---------------- */
const RADII = { innerBase: 180, innerTight: 168, outerBase: 325, outerTight: 287 };
const nodes = []; // { name, ring, el }

function buildWheel() {
  const wheel = document.getElementById('wheel');
  const mk = (sk, ring) => {
    const n = document.createElement('span');
    n.className = 'node';
    n.dataset.name = sk.name;
    const inner = sk.type === 'icon'
      ? '<i class="' + sk.cls + '"></i>'
      : '<div class="imgico" role="img" aria-label="' + sk.name + '" style="background-image: url(\'' + sk.src + '\')"></div>';
    n.innerHTML = '<span class="bub">' + inner + '</span>';
    n.addEventListener('click', () => selectTool(sk.name));
    wheel.appendChild(n);
    nodes.push({ name: sk.name, ring, el: n });
  };
  innerSkills.forEach(sk => mk(sk, 'in'));
  outerSkills.forEach(sk => mk(sk, 'out'));

  wheel.addEventListener('mousemove', e => {
    const r = wheel.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const d = Math.sqrt(dx * dx + dy * dy);
    const zone = d <= 207 ? 'inner' : (d <= 352 ? 'outer' : null);
    if (zone !== state.ringZone) { state.ringZone = zone; render(); }
  });
  wheel.addEventListener('mouseleave', () => {
    if (state.ringZone !== null) { state.ringZone = null; render(); }
  });
}

function currentRadii() {
  const selInner = !!state.selectedTool && innerSkills.some(sk => sk.name === state.selectedTool);
  const selOuter = !!state.selectedTool && outerSkills.some(sk => sk.name === state.selectedTool);
  const contractOuter = state.ringZone === 'inner' || (!state.ringZone && selInner);
  const contractInner = state.ringZone === 'outer' || (!state.ringZone && selOuter);
  return {
    inner: contractInner ? RADII.innerTight : RADII.innerBase,
    outer: contractOuter ? RADII.outerTight : RADII.outerBase
  };
}

function positionWheel() {
  const r = currentRadii();
  const place = (ringNodes, radius) => {
    const step = (2 * Math.PI) / (ringNodes.length || 1);
    ringNodes.forEach((n, i) => {
      const angle = -Math.PI / 2 + i * step;
      n.el.style.left = 'calc(50% + ' + Math.round(radius * Math.cos(angle)) + 'px)';
      n.el.style.top = 'calc(50% + ' + Math.round(radius * Math.sin(angle)) + 'px)';
    });
  };
  place(nodes.filter(n => n.ring === 'in'), r.inner);
  place(nodes.filter(n => n.ring === 'out'), r.outer);
  const ri = document.getElementById('ring-inner');
  const ro = document.getElementById('ring-outer');
  ri.style.width = ri.style.height = (r.inner * 2) + 'px';
  ro.style.width = ro.style.height = (r.outer * 2) + 'px';
}

function selectTool(name) {
  state.selectedTool = state.selectedTool === name ? null : name;
  state.tutorialDone = true;
  render();
}

/* ---------------- center panel ---------------- */
function renderCenter() {
  const c = document.getElementById('wheel-center');
  const tool = state.selectedTool;
  if (!state.tutorialDone && !tool) {
    c.innerHTML = '<div class="tut-arrow">\u2191</div><div class="tut-text">Click on me</div>';
    return;
  }
  if (!tool) { c.innerHTML = ''; return; }
  let html = '<div class="center-name">' + tool + '</div>';
  const mapping = toolProjects[tool];
  if (Array.isArray(mapping)) {
    const chips = mapping
      .filter(id => byId[id] || id === 'next')
      .map(id => ({ id, num: idNum[id] || '\u2014', title: id === 'next' ? 'Next project' : byId[id].shortTitle }))
      .sort((a, b) => (a.num < b.num ? -1 : 1));
    html += '<div class="center-chips">' + chips.map((ch, ci) =>
      '<span class="chip' + ((!state.chipTutDone && ci === 0) ? ' pulse' : '') + '" data-target="' + ch.id + '" title="' + ch.title + '">' + ch.num + '</span>'
    ).join('') + '</div>';
  } else if (mapping === 'site') {
    html += '<div class="center-caption">this very website \u2014 you are looking at it</div>';
  } else {
    html += '<div class="center-caption">from my wider toolkit \u2014 no project here (yet)</div>';
  }
  c.innerHTML = html;
  c.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.chipTutDone = true;
      chip.classList.remove('pulse');
      goToProject(chip.dataset.target);
    });
  });
}

/* ---------------- text lists + sliding block ---------------- */
function buildTextLists() {
  const fill = (hostId, list) => {
    const host = document.getElementById(hostId);
    list.forEach((sk, i) => {
      const w = document.createElement('span');
      w.className = 'tool-word';
      w.dataset.tool = sk.name;
      w.textContent = sk.name;
      w.addEventListener('click', () => selectTool(sk.name));
      host.appendChild(w);
      if (i < list.length - 1) host.appendChild(document.createTextNode(' \u00b7 '));
    });
  };
  fill('tk-list-exp', innerSkills);
  fill('tk-list-fam', outerSkills);
}

function renderText() {
  document.querySelectorAll('.tool-word').forEach(w =>
    w.classList.toggle('on', w.dataset.tool === state.selectedTool));
  document.getElementById('tk-exp').classList.toggle('dulled', state.ringZone === 'outer');
  document.getElementById('tk-fam').classList.toggle('dulled', state.ringZone === 'inner');
  // sliding highlight block under the selected name
  const block = document.getElementById('slide-block');
  const cont = document.getElementById('toolkit-text');
  const span = state.selectedTool ? cont.querySelector('.tool-word[data-tool="' + state.selectedTool + '"]') : null;
  if (span) {
    const cr = cont.getBoundingClientRect();
    const r = span.getBoundingClientRect();
    block.style.left = (Math.round(r.left - cr.left) - 7) + 'px';
    block.style.top = (Math.round(r.top - cr.top) - 2) + 'px';
    block.style.width = (Math.round(r.width) + 14) + 'px';
    block.style.height = (Math.round(r.height) + 4) + 'px';
    block.style.opacity = '1';
  } else {
    block.style.opacity = '0';
  }
}

/* ---------------- navigation from chips ---------------- */
function onScrollSettle(cb, maxWait) {
  let t;
  const done = () => { window.removeEventListener('scroll', settle); clearTimeout(t); cb(); };
  const settle = () => { clearTimeout(t); t = setTimeout(done, 180); };
  window.addEventListener('scroll', settle);
  t = setTimeout(done, maxWait || 1200);
}
function suppressHoverDuringScroll() {
  suppressHover = true;
  onScrollSettle(() => { suppressHover = false; }, 1200);
}
let hlTimer = null;
function goToProject(id) {
  suppressHoverDuringScroll();
  if (id === 'next' || FEAT_IDS.indexOf(id) > -1) {
    const el = document.getElementById('feat-' + id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
    onScrollSettle(() => {
      const cls = id === 'next' ? 'hl-next' : 'hl';
      el.classList.add(cls);
      clearTimeout(hlTimer);
      hlTimer = setTimeout(() => el.classList.remove(cls), 2600);
    });
  } else {
    setActiveBrick(id);
    const el = document.getElementById('brick-' + id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
  }
}

/* ---------------- render ---------------- */
function render() {
  nodes.forEach(n => {
    const sel = state.selectedTool === n.name;
    const glow = !state.tutorialDone && !state.selectedTool && n.name === 'Python';
    const zoneDim = !sel && !glow &&
      ((state.ringZone === 'inner' && n.ring === 'out') || (state.ringZone === 'outer' && n.ring === 'in'));
    n.el.classList.toggle('selected', sel);
    n.el.classList.toggle('pulse', glow);
    n.el.classList.toggle('dimmed', zoneDim);
  });
  positionWheel();
  renderCenter();
  renderText();
}

buildWall();
buildWheel();
buildTextLists();
render();
