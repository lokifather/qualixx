/* Qualixx demo app – Login → Dashboard → Work Process → Risk Management (ISO 14971)
 * Front-end prototype without a server. Data is stored only in this browser (localStorage).
 */
(function () {
  'use strict';
  const QX = window.QX;
  const ORG = window.QX_ORG || null; // optional organization pack: logo, documents, process map, people
  if (ORG) ORG.liveProcesses = Object.assign({ PDR: 'doc-control' }, ORG.liveProcesses || {});
  // Korean UI: show the organization's own Korean document and process titles
  if (ORG && window.QX_I18N && window.QX_I18N.extend) {
    const ko = {};
    ORG.documents.forEach((d) => { if (d.kr) { ko[d.en] = d.kr; ko[d.en.replace('Procedure for ', '')] = d.kr.replace(/\s*절차서$/, ''); } });
    window.QX_I18N.extend('ko', ko);
  }
  const STORE_KEY = 'qx-demo-data-v2' + (ORG ? '-' + ORG.short.toLowerCase() : '');
  const MSG_KEY = STORE_KEY + '-messages';
  function DEMO_USERS() {
    if (!ORG) return QX.DEMO_USERS;
    const p = ORG.people.find((x) => x.id === ORG.demoUser.personId) || {};
    return [{ email: ORG.demoUser.email, password: ORG.demoUser.password, name: p.name, role: ORG.demoUser.role, personId: p.id }];
  }
  const I18N = window.QX_I18N || { t: (x) => x, tr() {}, date: null, set() {}, lang: 'en', LANGS: [] };
  const SESSION_KEY = 'qx-demo-session';
  const app = document.getElementById('app');
  const modalRoot = document.getElementById('modal-root');
  const toastEl = document.getElementById('toast');

  /* ---------- utilities ---------- */
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const nowISO = () => new Date().toISOString();
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fmt = (iso, withTime) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (I18N.date) return I18N.date(d, withTime);
    const p = (n) => String(n).padStart(2, '0');
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` + (withTime ? ` ${p(d.getHours())}:${p(d.getMinutes())}` : '');
  };
  // In-app routing that does not depend on the browser hash (works on GitHub Pages and inside sandboxed viewers)
  let currentPath = (location.hash || '').replace(/^#/, '') || '/login';
  const go = (path) => {
    currentPath = path;
    try { if (location.hash !== '#' + path) history.replaceState(null, '', '#' + path); } catch (e) { /* hash not available */ }
    render();
  };
  function toast(msg) {
    toastEl.textContent = I18N.t(msg);
    toastEl.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }
  const initials = (name) => String(name || '?').split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  const ICONS = {
    dashboard: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
    process: '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="m3 13 9 5 9-5"/>',
    risk: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z"/><path d="M12 8v5M12 16h.01"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    training: '<path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
    capa: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5Z"/>',
    change: '<path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5"/>',
    pms: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6l3.5-7Z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    open: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    print: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    send: '<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
    check: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="m3 8 9 5 9-5M12 13v8"/>'
  };
  const icon = (n, cls) => `<svg class="ic ${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;

  /* ---------- storage ---------- */
  let memoryStore = null;
  let memorySession = null;
  function load() {
    try { const raw = localStorage.getItem(STORE_KEY); if (raw) return JSON.parse(raw); } catch (e) { /* storage unavailable */ }
    return memoryStore || { products: [] };
  }
  let db = load();
  function save() {
    memoryStore = db;
    try { localStorage.setItem(STORE_KEY, JSON.stringify(db)); } catch (e) { /* keep in memory only */ }
  }
  function getSession() {
    try { const s = sessionStorage.getItem(SESSION_KEY); if (s) return JSON.parse(s); } catch (e) { }
    return memorySession;
  }
  function setSession(s) {
    memorySession = s;
    try { s ? sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)) : sessionStorage.removeItem(SESSION_KEY); } catch (e) { }
  }
  const findProduct = (id) => db.products.find((p) => p.id === id);
  const findHazard = (p, hid) => p.hazards.find((h) => h.id === hid);

  /** change + audit trail + approval invalidation */
  function mutate(p, action, fn, opts) {
    fn(p);
    const user = (getSession() || {}).name || 'Unknown';
    p.audit.unshift({ t: nowISO(), user, action });
    if (!(opts && opts.keepApproval) && p.review.status === 'Approved') {
      p.review.status = 'Draft';
      p.audit.unshift({ t: nowISO(), user: 'System', action: 'Changed after approval → status reset to Draft (re-review required)' });
    }
    p.updatedAt = nowISO();
    save();
  }

  /* ---------- risk evaluation ---------- */
  function judge(p, s, pr) {
    if (!s || !pr) return null;
    return p.matrix.accept[`${s}-${pr}`] ? 'acc' : 'unacc';
  }
  function badge(p, s, pr) {
    const j = judge(p, s, pr);
    if (!j) return '<span class="badge none">Not rated</span>';
    return `<span class="badge ${j}">${j === 'acc' ? 'Acceptable' : 'Unacceptable'} <small>S${s}·P${pr}</small></span>`;
  }
  const ctlTypeName = (id) => (QX.CONTROL_TYPES.find((t) => t.id === id) || {}).name || id;
  const ctlOrder = (id) => (QX.CONTROL_TYPES.find((t) => t.id === id) || {}).order || 9;

  function stats(p) {
    const hz = p.hazards;
    const all = hz.flatMap((h) => h.controls);
    return {
      hazards: hz.length,
      initUnacc: hz.filter((h) => judge(p, h.s, h.p) === 'unacc').length,
      resUnacc: hz.filter((h) => h.controls.length && judge(p, h.rs, h.rp) === 'unacc').length,
      ctl: all.length,
      ctlImpl: all.filter((c) => c.verified).length,
      ctlEff: all.filter((c) => c.effective).length,
      ctlDone: all.filter((c) => c.verified && c.effective).length
    };
  }

  /** completion conditions before the ISO 14971 clause 9 review */
  function checks(p) {
    const hz = p.hazards;
    const needCtl = hz.filter((h) => judge(p, h.s, h.p) === 'unacc');
    const withCtl = hz.filter((h) => h.controls.length);
    const allCtl = hz.flatMap((h) => h.controls);
    return [
      { ok: !!(p.name && p.intendedUse), clause: '5.2', text: 'Product name and intended use recorded' },
      { ok: !!(p.plan.owner && p.plan.acceptPolicy), clause: '4.4', text: 'Risk management plan recorded (owner, acceptability policy)' },
      { ok: hz.length > 0, clause: '5.4', text: 'At least one hazard identified' },
      { ok: hz.every((h) => h.s && h.p), clause: '5.5', text: 'Risk estimated for every hazardous situation' },
      { ok: needCtl.every((h) => h.controls.length > 0), clause: '7.1', text: 'Every unacceptable initial risk has a control measure' },
      { ok: allCtl.every((c) => c.verified), clause: '7.2', text: 'Implementation verified for all control measures' },
      { ok: allCtl.every((c) => c.effective), clause: '7.2', text: 'Effectiveness verified for all control measures' },
      { ok: withCtl.every((h) => h.rs && h.rp), clause: '7.3', text: 'Residual risk evaluated after control' },
      { ok: withCtl.filter((h) => judge(p, h.rs, h.rp) === 'unacc').every((h) => (h.bra || '').trim()), clause: '7.4', text: 'Benefit-risk analysis recorded for unacceptable residual risks' },
      { ok: withCtl.every((h) => h.newRiskReviewed), clause: '7.5', text: 'Risks arising from control measures reviewed' },
      { ok: !!((p.overall.conclusion || '').trim() && p.overall.acceptable), clause: '8', text: 'Overall residual risk conclusion recorded' }
    ];
  }

  /* ---------- layout ---------- */
  const PROCESSES = [
    { id: 'risk', name: 'Risk Management', std: 'ISO 14971:2019', icon: 'risk', desc: 'Hazard analysis, risk control, residual risk evaluation and automatic report generation.', live: true },
    { id: 'doc', name: 'Document Control', std: 'ISO 13485 §4.2.4', icon: 'doc', desc: 'Review, approval and revision history — built into Risk Management first.', tag: 'In progress' },
    { id: 'training', name: 'Training', std: 'ISO 13485 §6.2', icon: 'training', desc: 'Role-based training assignment and records.', tag: 'Phase 2' },
    { id: 'capa', name: 'Nonconformity & CAPA', std: 'ISO 13485 §8.3, §8.5', icon: 'capa', desc: 'Nonconformity handling, corrective and preventive action, linked to risk re-evaluation.', tag: 'Phase 2' },
    { id: 'change', name: 'Change Control', std: 'ISO 13485 §7.3.9', icon: 'change', desc: 'Change impact assessment with risk file re-review.', tag: 'Phase 2' },
    { id: 'pms', name: 'Complaints & PMS', std: 'ISO 14971 §10', icon: 'pms', desc: 'Feed complaints and post-market data back into risk management.', tag: 'Phase 2' }
  ];

  function shell(content, active) {
    const s = getSession();
    const nav = (href, ic, label, key, extra) => `<a href="${href}" class="nav-item ${active === key ? 'on' : ''}">${icon(ic)}<span>${label}</span>${extra || ''}</a>`;
    return `
    <div class="layout">
      <aside class="sidebar" id="sidebar">
        ${orgBrand()}
        <div class="profile-card">
          <span class="avatar">${esc(initials(s.name))}</span>
          <span class="profile-text"><strong>${esc(s.name)}</strong><small>${esc(s.role)}</small></span>
        </div>
        <button class="side-search" data-action="open-search" aria-label="Search (Ctrl+K)">${icon('search')}<span>Search</span><kbd>Ctrl K</kbd></button>
        <nav class="side-nav" aria-label="Main">
          ${nav('#/dashboard', 'dashboard', 'My Dashboard', 'dashboard')}
          ${(() => { const n = myTasks().length; return nav('#/tasks', 'check', 'My Tasks', 'tasks', n ? `<em class="count alert-count">${n}</em>` : ''); })()}
          ${navSection('products', 'box', 'Products', catalog().length, [
            ['#/products', 'All Products', 'products', catalog().length],
            ['#/products/registrations', 'Authorizations', 'products:registrations', catalog().flatMap(regsOf).filter(renewSoon).length || '', true],
            ['#/products/standards', 'Product Standards', 'products:standards'],
            ['#/products/labels', 'Labels & UDI', 'products:labels'],
            ['#/process/risk', 'Risk Files', 'risk', db.products.length]
          ], active)}
          ${ORG ? docSection(active) : ''}
          <p class="side-label">Work Process</p>
          ${nav('#/process', 'process', ORG ? 'Process Map' : 'All Processes', 'process')}
          ${ORG ? processNav(active) : nav('#/process/risk', 'risk', 'Risk Management', 'risk')}
          ${ORG ? '' : PROCESSES.filter((x) => !x.live).map((x) => `<span class="nav-item disabled" aria-disabled="true">${icon(x.icon)}<span>${x.name}</span><em>Soon</em></span>`).join('')}
          ${ORG ? `<p class="side-label">Team</p>${nav('#/people', 'users', 'People', 'people')}${nav('#/messages', 'chat', 'Messages', 'messages')}` : ''}
          <p class="side-label">Other Menu</p>
          <a class="nav-item ${active === 'settings' ? 'on' : ''}" href="#/settings">${icon('settings')}<span>Settings</span><em class="count lang-chip no-tr">${esc(I18N.lang.toUpperCase())}</em></a>
          <a class="nav-item ${active === 'help' ? 'on' : ''}" href="#/help">${icon('help')}<span>Help</span></a>
          <a class="nav-item ${active === 'about' ? 'on' : ''}" href="#/about">${icon('info')}<span>About Qualixx</span></a>
          <button class="nav-item" data-action="logout">${icon('logout')}<span>Sign out</span></button>
        </nav>
        <a class="app-version" href="#/about" title="About Qualixx">${esc(QX.APP.product)} v${esc(QX.APP.version)}<small>Build ${esc(QX.APP.build)} · ${esc(QX.APP.channel)}</small></a>
        ${ORG && ORG.short === 'Qualixx' ? '' : `<a class="side-brand ${ORG && ORG.short !== 'Qualixx' ? 'powered' : ''}" href="https://qualixx.ai" title="qualixx.ai"><span class="logo">Q</span>${ORG && ORG.short !== 'Qualixx' ? '<span>Powered by <b>Qualixx</b></span>' : 'Qualixx'}</a>`}
      </aside>
      <div class="content">
        <div class="mobilebar"><button class="icon-btn" data-action="toggle-menu" aria-label="Open menu">${icon('menu')}</button><span class="side-brand"><span class="logo">Q</span>Qualixx</span></div>
        <main class="main">${content}</main>
        <p class="demo-note">${esc(QX.APP.product)} v${esc(QX.APP.version)} (${esc(QX.APP.channel)}) · data is stored only in this browser.</p>
      </div>
    </div>`;
  }

  function pageHead(title, sub, crumbs, actionsHtml) {
    return `<div class="page-head">
      <div>${crumbs ? `<p class="crumb">${crumbs}</p>` : ''}<h1>${title}</h1>${sub ? `<p class="muted">${sub}</p>` : ''}</div>
      ${actionsHtml ? `<div class="head-actions">${actionsHtml}</div>` : ''}
    </div>`;
  }


  /* ---------- organization pack ---------- */
  function orgBrand() {
    if (!ORG) return '';
    const mark = ORG.logo ? `<img src="${esc(ORG.logo)}" alt="${esc(ORG.name)} logo">` : `<span class="org-logo">${esc(ORG.short.slice(0, 2).toUpperCase())}</span>`;
    return `<a class="org-brand" href="#/dashboard">${mark}<span><strong>${esc(ORG.name)}</strong><small>${esc(ORG.nameKr || '')}</small></span></a>`;
  }
  const docById = (id) => allDocs().find((d) => d.id === id);
  const deptName = (code) => (ORG.departments && ORG.departments[code]) || code;
  const groupOf = (code) => ORG.groups.find((g) => g.codes.includes(code));
  let docType = 'All';

  function docRow(d) {
    const parent = d.parent ? docById(d.parent) : null;
    const st = docState(d); const e = effRev(d);
    return `<tr class="clickable" data-href="#/documents/${esc(d.id)}" data-search="${esc((d.id + ' ' + d.en + ' ' + d.kr + ' ' + d.parent).toLowerCase())}">
      <td class="code">${esc(d.id)}</td>
      <td><strong>${esc(d.en)}</strong><br><small class="muted kr-sub">${esc(d.kr)}</small></td>
      <td><span class="dtype t-${esc(d.type.toLowerCase())}">${esc(d.type)}</span></td>
      <td>${parent ? `<small>${esc(parent.id)}</small>` : '—'}</td>
      <td>${e ? 'Rev.' + esc(e.rev) : '—'}</td>
      <td><small>${e ? fmt(e.effective) : '—'}</small></td>
      <td><span class="pill">${esc(d.owner)}</span></td>
      <td><span class="status ${st.cls}">${esc(st.label)}</span>${st.change ? `<br><small class="muted">Rev.${esc(st.change.rev)} ${esc(st.change.status.toLowerCase())}</small>` : ''}</td>
    </tr>`;
  }

  function viewDocuments() {
    settleDocs();
    const types = ['All', 'Manual', 'Procedure', 'Instruction', 'Form', 'Changes', 'Obsolete'];
    const obs = (d) => !!(dcRec(d.id) || {}).obsolete;
    const inT = (d, t) => t === 'Obsolete' ? obs(d) : !obs(d) && (t === 'All' || (t === 'Changes' ? !!openRev(d) : d.type === t));
    const count = (t) => allDocs().filter((d) => inT(d, t)).length;
    const list = allDocs().filter((d) => inT(d, docType));
    return shell(`
      ${pageHead('Quality Documents', `${esc(ORG.name)} controlled documents — current effective revisions. Source: ${esc(ORG.docListRef || '')}.`, '<a href="#/dashboard">My Dashboard</a> / Quality Documents',
      `<a class="btn outline" href="#/process/doc-control">${icon('process')}Document Control</a><button class="btn primary" data-action="dc-new">${icon('plus')}New document</button>`)}
      <section class="card table-card">
        <div class="table-top">
          <div class="seg" role="tablist">${types.filter((t) => t === 'All' || t === docType || count(t)).map((t) => `<button role="tab" aria-selected="${docType === t}" class="${docType === t ? 'on' : ''}" data-action="doc-type" data-t="${t}">${t === 'All' ? 'All' : t === 'Changes' ? 'In change' : t === 'Obsolete' ? 'Obsolete' : t + 's'} <span>${count(t)}</span></button>`).join('')}</div>
          <label class="inline-search">${icon('search')}<input id="doc-q" type="search" placeholder="Search ID or title" aria-label="Search documents"></label>
        </div>
        ${list.length ? `<div class="table-wrap"><table class="table">
          <thead><tr><th>Doc ID</th><th>Title</th><th>Type</th><th>Parent</th><th>Rev.</th><th>Effective</th><th>Owner</th><th>Status</th></tr></thead>
          <tbody>${list.map(docRow).join('')}</tbody></table></div>` : `<div class="empty"><p class="muted">${docType === 'Changes' ? 'No documents are being changed.' : docType === 'Obsolete' ? 'No obsolete documents.' : `No ${docType.toLowerCase()} documents have been issued yet.`}</p></div>`}
      </section>`, 'documents:' + docKeyOf(docType));
  }

  function viewDocument(id) {
    const d = docById(id);
    if (!d) return null;
    settleDocs();
    const parent = d.parent ? docById(d.parent) : null;
    const children = allDocs().filter((x) => x.parent === d.id);
    const g = groupOf(d.id);
    const live = ORG.liveProcesses && ORG.liveProcesses[d.id];
    const r = dcRec(d.id);
    const st = docState(d); const e = effRev(d); const v = openRev(d);
    const obsolete = r && r.obsolete;
    const acts = [
      live ? `<a class="btn outline" href="#/process/${live}">${icon(live === 'risk' ? 'risk' : 'process')}Open workflow</a>` : '',
      !obsolete && !v ? `<button class="btn primary" data-action="dc-start" data-id="${esc(d.id)}">${icon('edit')}Start revision</button>` : '',
      !obsolete && !v && e ? `<button class="btn outline" data-action="dc-obsolete" data-id="${esc(d.id)}">Make obsolete</button>` : ''
    ].join('');
    const history = [];
    if (!isAdded(d)) history.push({ rev: d.rev, eff: d.effective, change: 'Initial issue', status: r && r.revs.some((x) => x.status === 'Effective' || x.status === 'Superseded') ? 'Superseded' : (obsolete ? 'Obsolete' : 'Effective'), by: '' });
    (r ? r.revs : []).filter((x) => x.status !== 'Withdrawn').forEach((x) => history.push({ rev: x.rev, eff: x.effective || '', change: x.change, status: obsolete && x.status === 'Effective' ? 'Obsolete' : x.status, by: x.approvedBy || '' }));
    const content = e && e.content;
    return shell(`
      ${pageHead(`${esc(d.id)} · ${esc(d.en)}`, `${esc(d.kr)} · <span class="dtype t-${esc(d.type.toLowerCase())}">${esc(d.type)}</span> · <span class="status ${st.cls}">${esc(st.label)}</span>${e ? ` · Rev.${esc(e.rev)}` : ''}`,
        `<a href="#/dashboard">My Dashboard</a> / <a href="#/documents">Quality Documents</a> / ${esc(d.id)}`, acts)}
      ${obsolete ? `<p class="alert">Obsolete since ${fmt(obsolete.at)} · ${esc(obsolete.by)} · ${esc(obsolete.reason)}. Kept for reference only — do not use.</p>` : ''}
      ${v ? changePanel(d, v) : ''}
      <section class="doc-grid">
        <article class="card panel">
          <div class="panel-title"><h2>Document information</h2></div>
          <table class="kv">
            <tr><th>Document ID</th><td>${esc(d.id)}</td></tr>
            <tr><th>Title</th><td>${esc(d.en)}<br><small class="muted">${esc(d.kr)}</small></td></tr>
            <tr><th>Type</th><td>${esc(d.type)}</td></tr>
            <tr><th>Current revision</th><td>${e ? `Rev.${esc(e.rev)}` : 'Not yet effective'}</td></tr>
            <tr><th>Effective</th><td>${e ? fmt(e.effective) : '—'}</td></tr>
            <tr><th>Owner</th><td>${esc(deptName(d.owner))} (${esc(d.owner)})</td></tr>
            ${parent ? `<tr><th>Parent document</th><td><a href="#/documents/${esc(parent.id)}">${esc(parent.id)} · ${esc(parent.en)}</a></td></tr>` : ''}
            ${g ? `<tr><th>Process group</th><td><a href="#/process">${esc(g.name)}</a></td></tr>` : ''}
            ${d.clauses && d.clauses.length ? `<tr><th>ISO 13485 clauses</th><td>${d.clauses.map((c) => `<span class="chip">§${esc(c)}</span>`).join(' ')}</td></tr>` : ''}
          </table>
          <h3>Revision history</h3>
          <div class="table-wrap"><table class="table compact"><thead><tr><th>Rev.</th><th>Effective</th><th>Change</th><th>Approved by</th><th>Status</th></tr></thead>
          <tbody>${history.map((h) => `<tr><td>Rev.${esc(h.rev)}</td><td>${h.eff ? fmt(h.eff) : '—'}</td><td>${esc(h.change)}</td><td>${esc(h.by) || '—'}</td><td><span class="status s-${h.status.replace(' ', '')}">${esc(h.status)}</span></td></tr>`).join('')}</tbody></table></div>
        </article>
        ${content ? `<article class="card panel"><div class="panel-title"><h2>Content · Rev.${esc(e.rev)}</h2></div><pre class="doc-text">${esc(content)}</pre></article>`
        : `<article class="card panel file-card">
          <div class="file-icon">${icon('doc')}</div>
          <h3>Controlled copy</h3>
          <p class="muted">In the live service, the approved PDF/Word file is attached by Qualixx in the Console and opened here. Revisions made in Qualixx show their content here.</p>
          <button class="btn outline" disabled>Open file</button>
        </article>`}
      </section>
      ${ackPanel(d, e)}
      ${children.length ? `<h2 class="section-title">${d.type === 'Manual' ? 'Procedures under this manual' : 'Forms under this procedure'} <small class="muted">${children.length}</small></h2>
      <section class="card table-card"><div class="table-wrap"><table class="table">
        <thead><tr><th>Doc ID</th><th>Title</th><th>Type</th><th>Parent</th><th>Rev.</th><th>Effective</th><th>Owner</th><th>Status</th></tr></thead>
        <tbody>${children.map(docRow).join('')}</tbody></table></div></section>` : ''}
      ${r && r.audit.length ? `<h2 class="section-title">Audit trail</h2>
      <section class="card table-card"><div class="table-wrap"><table class="table compact"><thead><tr><th>Time</th><th>User</th><th>Activity</th></tr></thead>
      <tbody>${r.audit.map((a) => `<tr><td><small>${fmt(a.t, true)}</small></td><td>${esc(a.user)}</td><td>${esc(a.action)}</td></tr>`).join('')}</tbody></table></div></section>` : ''}`, d.type === 'Manual' ? 'documents:manual' : 'documents');
  }

  function viewProcessMap() {
    const groups = ORG.groups.map((g) => `
      <section class="pm-group">
        <h3>${esc(g.name)} <small class="muted">${g.codes.length}</small></h3>
        <div class="pm-grid">${g.codes.map((code) => {
          const d = docById(code) || { en: code, kr: '', owner: '' };
          const forms = allDocs().filter((x) => x.parent === code).length;
          const live = ORG.liveProcesses && ORG.liveProcesses[code];
          return `<a class="card pm ${live ? 'live' : ''}" href="${procHref(code)}">
            <span class="pm-head"><span class="code">${esc(code)}</span>${live ? '<span class="status s-Approved">Workflow live</span>' : `<span class="status s-Soon">${pins().includes(code) ? '★ ' : ''}Phase 2</span>`}</span>
            <strong>${esc(d.en.replace('Procedure for ', ''))}</strong>
            <small class="muted">${esc(d.kr)}</small>
            <span class="pm-meta"><span class="pill">${esc(d.owner)}</span><span class="pill">${forms} forms</span>${(d.clauses || []).slice(0, 2).map((c) => `<span class="pill">§${esc(c)}</span>`).join('')}</span>
          </a>`;
        }).join('')}</div>
      </section>`).join('');
    return shell(`
      ${pageHead('Process Map', `${esc(ORG.name)} QMS processes from the Quality Manual (MMS). Measurement & improvement outputs feed management review, whose decisions change the core and support processes.`, '<a href="#/dashboard">My Dashboard</a> / Work Process')}
      ${groups}`, 'process');
  }

  function viewPeople() {
    const me = (getSession() || {}).personId;
    return shell(`
      ${pageHead('People', `${esc(ORG.name)} team and QMS responsibilities.`, '<a href="#/dashboard">My Dashboard</a> / People')}
      <section class="people-grid">${ORG.people.map((p) => `
        <article class="card person">
          <span class="avatar lg">${esc(initials(p.name))}</span>
          <strong>${esc(p.name)} ${p.id === me ? '<span class="chip">You</span>' : ''}</strong>
          <small class="muted">${esc(p.nameKr || '')}</small>
          <span class="person-title">${esc(p.title)}</span>
          <span class="pill">${esc(deptName(p.dept))}</span>
          ${p.clauses ? `<small class="muted">ISO 13485 §${esc(p.clauses)}</small>` : ''}
          <a class="email" href="mailto:${esc(p.email)}">${esc(p.email)}</a>
          <div class="btn-row">${p.id === me ? '' : `<a class="btn primary sm" href="#/messages/${p.id}">${icon('chat')}Chat</a>`}<a class="btn outline sm" href="mailto:${esc(p.email)}?subject=${encodeURIComponent('[QMS] ')}">${icon('mail')}Email</a></div>
        </article>`).join('')}</section>`, 'people');
  }

  function loadMsgs() { try { return JSON.parse(localStorage.getItem(MSG_KEY)) || {}; } catch (e) { return loadMsgs._mem || {}; } }
  function saveMsgs(m) { loadMsgs._mem = m; try { localStorage.setItem(MSG_KEY, JSON.stringify(m)); } catch (e) { } }

  function viewMessages(pid) {
    const me = (getSession() || {}).personId;
    const others = ORG.people.filter((p) => p.id !== me);
    const msgs = loadMsgs();
    const cur = others.find((p) => p.id === pid) || null;
    const thread = cur ? (msgs[cur.id] || []) : [];
    return shell(`
      ${pageHead('Messages', 'Direct messages with your team. Demo: messages stay in this browser and are not delivered.', '<a href="#/dashboard">My Dashboard</a> / Messages')}
      <section class="card chat">
        <aside class="chat-list">${others.map((p) => {
          const last = (msgs[p.id] || []).slice(-1)[0];
          return `<a class="chat-item ${cur && cur.id === p.id ? 'on' : ''}" href="#/messages/${p.id}"><span class="avatar">${esc(initials(p.name))}</span><span><strong>${esc(p.name)}</strong><small class="muted">${last ? esc(last.text.slice(0, 40)) : esc(p.title)}</small></span></a>`;
        }).join('')}</aside>
        <div class="chat-pane">
          ${cur ? `<header class="chat-head"><span class="avatar">${esc(initials(cur.name))}</span><span><strong>${esc(cur.name)}</strong><small class="muted">${esc(cur.title)}</small></span><a class="btn outline sm" href="mailto:${esc(cur.email)}">${icon('mail')}Email</a></header>
          <div class="chat-body" id="chat-body">${thread.length ? thread.map((m) => `<div class="bubble ${m.from === 'me' ? 'me' : ''}"><p>${esc(m.text)}</p><small>${fmt(m.t, true)}</small></div>`).join('') : '<p class="muted center-text">No messages yet.</p>'}</div>
          <form data-form="message" data-pid="${cur.id}" class="chat-compose"><input name="text" placeholder="Write a message…" autocomplete="off" required aria-label="Message"><button class="btn primary" type="submit">${icon('send')}Send</button></form>`
          : '<div class="empty"><p class="muted">Select a person to start a conversation.</p></div>'}
        </div>
      </section>`, 'messages');
  }

  function orgSample() {
    const now = nowISO();
    const base = QX.sampleProduct(uid, now);
    const prod = ORG.products[ORG.products.length - 1];
    const c = (type, desc, verifyRef, verified, effective) => ({ id: uid(), type, desc, verifyRef, verified, effective });
    return Object.assign(base, {
      name: prod.name, model: prod.model, version: '1.0', deviceClass: prod.deviceClass,
      intendedUse: ORG.intendedUse, users: 'Interventional cardiologists', environment: 'Hospital catheterization lab (angiography system / PACS)',
      misuse: 'Using interpolated frames alone for quantitative stenosis measurement',
      characteristics: { q1: 'AI-based frame interpolation of coronary angiography cine images', q2: 'No patient contact (software)', q5: 'Provides image information used during coronary angiography', q6: 'Standalone digital medical device software', q7: 'Receives DICOM XA from angiography system / PACS', q8: 'Includes a deep-learning video frame interpolation model' },
      hazards: [
        { id: uid(), code: 'H-001', category: 'AI & data', hazard: 'Artifact or false structure in interpolated frames', sequence: 'VFI model generates a frame with a spurious narrowing or missing vessel segment → physician interprets the interpolated frame as real anatomy', situation: 'Stenosis severity is misjudged during CAG', harm: 'Inappropriate intervention decision', s: 4, p: 3,
          controls: [c('design', 'Interpolated frames are visually marked and the original frames can be shown at any time with one click', 'FUE-04 UI specification, FAI-08 performance report', true, true), c('info', 'IFU states that measurements must be made on original frames, not interpolated frames', 'IFU draft', true, false)],
          rs: 4, rp: 1, newRiskReviewed: true, newRiskNote: 'Frame marking does not obscure diagnostic area', bra: '' },
        { id: uid(), code: 'H-002', category: 'Information', hazard: 'Interpolated series mixed with original series', sequence: 'Output stored to PACS without derived-image identification → series later viewed as original acquisition', situation: 'Interpolated images reviewed as acquired data', harm: 'Misdiagnosis at follow-up review', s: 3, p: 3,
          controls: [c('design', 'DICOM output marked as DERIVED (Image Type) with series description "AngioFilm interpolated"', 'FDD-02 traceability, test report (TBD)', false, false)], rs: null, rp: null, newRiskReviewed: false, newRiskNote: '', bra: '' },
        { id: uid(), code: 'H-003', category: 'Software', hazard: 'Processing delay or no response', sequence: 'GPU overload delays processing during the procedure → interpolated cine not available in time', situation: 'Physician waits or proceeds with original frames', harm: 'Prolonged procedure', s: 2, p: 3, controls: [], rs: null, rp: null, newRiskReviewed: false, newRiskNote: '', bra: '' },
        { id: uid(), code: 'H-004', category: 'Cybersecurity', hazard: 'Unauthorized access', sequence: 'On-premise server exposed on hospital network → attacker accesses stored images', situation: 'Patient images disclosed', harm: 'Privacy breach (non-physical harm)', s: 2, p: 2, controls: [], rs: null, rp: null, newRiskReviewed: false, newRiskNote: '', bra: '' }
      ],
      audit: [{ t: now, user: 'System', action: `Example draft risk file created for ${prod.name} ${prod.model} (to be reviewed — not the approved risk analysis)` }]
    });
  }


  /* ---------- product registry ---------- */
  const PRODUCT_STATUS = ['In development', 'Released', 'Retired'];
  function catalog() {
    if (!db.catalog) {
      const t = nowISO();
      const seed = ORG && ORG.products && ORG.products.length
        ? ORG.products.map((x) => ({ name: x.name, model: x.model, version: '1.0', productCode: x.code || '', deviceClass: x.deviceClass || '', intendedUse: ORG.intendedUse || '', users: '', environment: '', swClass: '', udi: '', markets: 'KR', status: 'In development', swVersion: '1.0.0', manufacturer: ORG.name, manufacturerAddress: '', licenseNo: '', labelRef: '', warnings: '' }))
        : [{ name: 'AI Chest X-ray Reading Assistant', model: 'QX-CXR', version: '1.0', productCode: '', deviceClass: 'Class II', intendedUse: 'Marks suspected lung-nodule regions on chest X-ray images to assist radiologists in reading.', users: 'Radiologists', environment: 'Hospital reading room (PACS integration)', swClass: 'Class B (IEC 62304)', udi: '(01)08801234567890', markets: 'KR (planned), US (planned)', status: 'In development', example: true, swVersion: '1.0.3 (build 240)', manufacturer: 'Example Medical Inc.', manufacturerAddress: '123 Example-ro, Seongnam, Republic of Korea', licenseNo: 'Example-2026-0001', labelRef: 'LBL-QX-CXR Rev.00', warnings: 'Reading aid only. Not for standalone diagnosis. Review all findings on the original images.' }];
      db.catalog = seed.map((x) => Object.assign({ id: uid(), createdAt: t, updatedAt: t }, x));
      save();
    }
    if (!db.examplesV2 && !(ORG && ORG.products && ORG.products.length)) {
      const t = nowISO(); const d = (n) => new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);
      const reg = (market, authority, pathway, status, number, approved, expiry, notes) => ({ id: uid(), market, authority, pathway, status, number, submitted: '', approved, expiry, holder: 'Example Medical Inc.', notes: notes || '' });
      [{ name: 'Wearable ECG Patch Monitor', model: 'QX-ECG', version: '2.0', productCode: '', deviceClass: 'Class II', swClass: 'Class B (IEC 62304)', udi: '(01)08801234567906', markets: 'KR, US, EU', status: 'Released', swVersion: '2.1.0 (build 512)',
          intendedUse: 'Records single-lead ECG continuously for up to 7 days and detects arrhythmia episodes for review by a physician.', users: 'Cardiologists, trained nurses; patients wear the patch', environment: 'Home and hospital',
          manufacturer: 'Example Medical Inc.', manufacturerAddress: '123 Example-ro, Seongnam, Republic of Korea', licenseNo: 'Example-2025-0102', labelRef: 'LBL-QX-ECG Rev.02', warnings: 'Not for real-time monitoring or alarm. Remove the patch before MRI. Do not use on broken skin.',
          registrations: [reg('KR', 'MFDS', 'Class 2/3/4 approval (허가)', 'Approved', 'EX-KR-25-0102', d(-420), ''), reg('US', 'FDA', '510(k)', 'Approved', 'K25EX01', d(-300), '', 'Example clearance number'), reg('EU', 'Notified Body (CE)', 'MDR Class IIa', 'Submitted', '', '', '', 'Technical documentation under NB review')] },
        { name: 'AI Diabetic Retinopathy Screening', model: 'QX-DRS', version: '1.0', productCode: '', deviceClass: 'Class III', swClass: 'Class C (IEC 62304)', udi: '', markets: 'KR (planned), US (planned)', status: 'In development', swVersion: '0.9.2 (beta)',
          intendedUse: 'Analyses fundus photographs to identify referable diabetic retinopathy and recommend referral to an ophthalmologist.', users: 'Primary care physicians, ophthalmologists', environment: 'Primary care clinics, health screening centres',
          manufacturer: 'Example Medical Inc.', manufacturerAddress: '123 Example-ro, Seongnam, Republic of Korea', licenseNo: '', labelRef: 'LBL-QX-DRS (draft)', warnings: 'Screening aid only. A negative result does not exclude other eye diseases.',
          registrations: [reg('KR', 'MFDS', 'Innovative medical device', 'In preparation', '', '', '', 'Clinical trial plan in preparation'), reg('US', 'FDA', 'De Novo', 'Planned', '', '', '', 'Pre-Sub meeting planned')] }
      ].forEach((x) => db.catalog.push(Object.assign({ id: uid(), createdAt: t, updatedAt: t, example: true }, x)));
      db.examplesV2 = true; save();
    }
    return db.catalog;
  }
  const findCatalog = (id) => catalog().find((x) => x.id === id);
  const riskFilesFor = (prd) => db.products.filter((r) => (r.model || '').toLowerCase() === (prd.model || '').toLowerCase() && (r.name || '').toLowerCase() === (prd.name || '').toLowerCase());

  function viewProducts() {
    const list = catalog();
    const rows = list.map((x) => {
      const rf = riskFilesFor(x);
      const st = rf.map(stats);
      const res = st.reduce((n, v) => n + v.resUnacc, 0);
      return `<tr class="clickable" data-href="#/products/${x.id}">
        <td><span class="prod"><span class="thumb">${esc(initials(x.model || x.name))}</span><span><strong>${esc(x.name)}</strong><small>${esc(x.model)}${x.version ? ' · v' + esc(x.version) : ''}${x.example ? ' · Example' : ''}</small></span></span></td>
        <td>${x.swVersion ? `<span class="pill mono">v${esc(x.swVersion)}</span>` : '—'}</td>
        <td>${esc(x.deviceClass) || '—'}</td>
        <td>${esc(x.swClass) || '—'}</td>
        <td><small>${esc(x.markets) || '—'}</small></td>
        <td><span class="status ${x.status === 'Released' ? 's-Approved' : x.status === 'Retired' ? 's-Soon' : 's-Draft'}">${esc(x.status)}</span></td>
        <td><span class="pill">${icon('risk')}${rf.length}</span> ${res ? `<span class="pill bad">${res} residual</span>` : ''}</td>
        <td><small>${fmt(x.updatedAt)}</small></td>
        <td class="actions"><a class="btn outline sm" href="#/products/${x.id}/label">${icon('doc')}Label</a></td>
      </tr>`;
    }).join('');
    return shell(`
      ${pageHead('Products', 'Medical devices your organization manufactures, with their regulatory information and linked risk management files.', '<a href="#/dashboard">My Dashboard</a> / Products',
        `<button class="btn primary" data-action="new-catalog">${icon('plus')}Add product</button>`)}
      <section class="card table-card">
        ${list.length ? `<div class="table-wrap"><table class="table">
          <thead><tr><th>Product</th><th>Software version</th><th>Device class</th><th>SW safety class</th><th>Markets</th><th>Status</th><th>Risk files</th><th>Updated</th><th class="actions">Label</th></tr></thead>
          <tbody>${rows}</tbody></table></div>` : `<div class="empty"><p class="muted">No products yet. Add your first product.</p><button class="btn primary sm" data-action="new-catalog">${icon('plus')}Add product</button></div>`}
      </section>`, 'products');
  }

  function viewProduct2(id, tab) {
    const x = findCatalog(id);
    if (!x) return null;
    tab = ['label', 'registrations', 'standard'].includes(tab) ? tab : 'info';
    const tabs = `<nav class="steps" aria-label="Product sections"><a href="#/products/${x.id}" class="${tab === 'info' ? 'on' : ''}">${icon('box')}Product information</a><a href="#/products/${x.id}/label" class="${tab === 'label' ? 'on' : ''}">${icon('doc')}Label</a><a href="#/products/${x.id}/standard" class="${tab === 'standard' ? 'on' : ''}">${icon('doc')}Product standard</a><a href="#/products/${x.id}/registrations" class="${tab === 'registrations' ? 'on' : ''}">${icon('process')}Market authorizations <small>${regsOf(x).length}</small></a></nav>`;
    const rf = riskFilesFor(x);
    const row = (k, v) => `<tr><th>${k}</th><td>${esc(v) || '<span class="muted">—</span>'}</td></tr>`;
    return shell(`
      ${pageHead(esc(x.name), `${esc(x.model)}${x.version ? ' · v' + esc(x.version) : ''} · <span class="status ${x.status === 'Released' ? 's-Approved' : x.status === 'Retired' ? 's-Soon' : 's-Draft'}">${esc(x.status)}</span>${x.example ? ' · <span class="chip">Example</span>' : ''}`,
        '<a href="#/dashboard">My Dashboard</a> / <a href="#/products">Products</a> / ' + esc(x.model || x.name),
        `<button class="btn outline" data-action="edit-catalog" data-id="${x.id}">${icon('edit')}Edit</button><button class="btn primary" data-action="risk-for-product" data-id="${x.id}">${icon('plus')}New risk file</button>`)}
      ${tabs}
      ${tab === 'standard' ? psTab(x) : tab === 'registrations' ? regTab(x) : tab === 'info' ? `<section class="doc-grid">
        <article class="card panel">
          <div class="panel-title"><h2>Product information</h2></div>
          <table class="kv">
            ${row('Product name', x.name)}${row('Model', x.model)}${row('Product version', x.version)}${row('Software version', x.swVersion)}
            ${row('Product code', x.productCode)}${row('Device class', x.deviceClass)}${row('SW safety class (IEC 62304)', x.swClass)}
            ${row('UDI-DI', x.udi)}<tr><th>Market authorizations</th><td>${regsOf(x).length ? regsOf(x).map((r) => `<a class="chip link" href="#/products/${x.id}/registrations"><b>${esc(r.market)}</b> ${esc(r.status)}</a>`).join(' ') : '<span class="muted">None recorded</span>'}</td></tr>
            ${row('Intended use', x.intendedUse)}${row('Intended users', x.users)}${row('Use environment', x.environment)}
          </table>
        </article>
        <article class="card panel">
          <div class="panel-title"><h2>Risk management files</h2><p class="muted">ISO 14971 files for this product.</p></div>
          ${rf.length ? `<div class="linked">${rf.map((r) => { const st = stats(r); return `<a class="linked-item" href="#/process/risk/${r.id}/overview"><span><strong>${esc(r.model)}${r.version ? ' v' + esc(r.version) : ''}</strong><small class="muted">${st.hazards} hazards · ${st.resUnacc} unacceptable residual</small></span><span class="status s-${esc(r.review.status)}">${esc(r.review.status)}</span></a>`; }).join('')}</div>`
            : `<p class="muted">No risk management file yet.</p>`}
          <button class="btn outline sm" data-action="risk-for-product" data-id="${x.id}">${icon('plus')}Start a risk management file</button>
          <button class="btn ghost sm danger-link" data-action="delete-catalog" data-id="${x.id}">${icon('trash')}Delete product</button>
        </article>
      </section>` : `<section class="doc-grid">
        <article class="card panel">
          <div class="panel-title"><h2>Label information</h2><p class="muted">For software, the label is shown on the product's About screen and in the IFU.</p></div>
          <table class="kv">
            ${row('Manufacturer', x.manufacturer)}${row('Manufacturer address', x.manufacturerAddress)}
            ${row('Licence / certification no.', x.licenseNo)}${row('UDI-DI', x.udi)}
            ${row('Software version shown', x.swVersion)}${row('Label document', x.labelRef)}
            ${row('Warnings and precautions', x.warnings)}
          </table>
        </article>
        <article class="card label-preview" aria-label="Label preview">
          <p class="lp-tag">Label preview · About screen</p>
          <strong class="lp-name">${esc(x.name)}</strong>
          <span class="lp-model">Model ${esc(x.model)} · Software version ${esc(x.swVersion || '—')}</span>
          <dl>
            <dt>Manufacturer</dt><dd>${esc(x.manufacturer || '—')}<br><small>${esc(x.manufacturerAddress || '')}</small></dd>
            <dt>Licence no.</dt><dd>${esc(x.licenseNo || '—')}</dd>
            <dt>UDI</dt><dd class="mono">${esc(x.udi || '—')}</dd>
            <dt>Intended use</dt><dd>${esc(x.intendedUse || '—')}</dd>
          </dl>
          ${x.warnings ? `<p class="lp-warn">⚠ ${esc(x.warnings)}</p>` : ''}
          <p class="lp-foot">Read the instructions for use (eIFU) before use.</p>
        </article>
      </section>`}`, 'products');
  }

  function catalogModal(x) {
    const opt = (v) => PRODUCT_STATUS.map((o) => `<option ${o === v ? 'selected' : ''}>${o}</option>`).join('');
    openModal(x ? `Edit product · ${x.model || x.name}` : 'Add product', `
      <form data-form="catalog" data-id="${x ? x.id : ''}" class="form grid2">
        ${field('Product name', 'name', x ? x.name : '', { required: true })}
        ${field('Model', 'model', x ? x.model : '', { required: true })}
        ${field('Product version', 'version', x ? x.version : '')}
        ${field('Software version', 'swVersion', x ? x.swVersion : '', { ph: 'e.g. 1.0.3 (build 240)' })}
        ${field('Product code', 'productCode', x ? x.productCode : '', { ph: 'e.g. KR digital device code' })}
        ${field('Device class', 'deviceClass', x ? x.deviceClass : '', { ph: 'e.g. Class II' })}
        ${field('SW safety class (IEC 62304)', 'swClass', x ? x.swClass : '', { ph: 'Class A / B / C' })}
        ${field('UDI-DI', 'udi', x ? x.udi : '')}
        ${field('Markets', 'markets', x ? x.markets : '', { ph: 'e.g. KR, US (planned)' })}
        <label>Status<select name="status">${opt(x ? x.status : 'In development')}</select></label>
        ${field('Intended use', 'intendedUse', x ? x.intendedUse : '', { area: true, wide: true })}
        ${field('Intended users', 'users', x ? x.users : '')}
        ${field('Use environment', 'environment', x ? x.environment : '')}
        <p class="form-sep wide">Label</p>
        ${field('Manufacturer', 'manufacturer', x ? x.manufacturer : (ORG ? ORG.name : ''))}
        ${field('Manufacturer address', 'manufacturerAddress', x ? x.manufacturerAddress : '')}
        ${field('Licence / certification no.', 'licenseNo', x ? x.licenseNo : '')}
        ${field('Label document', 'labelRef', x ? x.labelRef : '', { ph: 'e.g. LBL-001 Rev.00' })}
        ${field('Warnings and precautions', 'warnings', x ? x.warnings : '', { area: true, wide: true })}
        <div class="form-actions wide"><button type="button" class="btn outline" data-action="close-modal">Cancel</button><button class="btn primary" type="submit">Save</button></div>
      </form>`);
  }



  /* ---------- process navigation: My Processes, collapsible groups ---------- */
  const PROC_KEY = STORE_KEY + '-nav';
  function navState() { try { return JSON.parse(localStorage.getItem(PROC_KEY)) || {}; } catch (e) { return navState._m || {}; } }
  function saveNavState(v) { navState._m = v; try { localStorage.setItem(PROC_KEY, JSON.stringify(v)); } catch (e) { } }
  function defaultPins() {
    const role = ((getSession() || {}).role || '').toLowerCase();
    if (/rq|quality|regulatory/.test(role)) return ['PRM', 'PCH', 'PCP', 'PIA'];
    if (/cto|develop|mdt|engineer/.test(role)) return ['PRM', 'PDD', 'PSW', 'PEI'];
    return ['PRM', 'PMR', 'PCP'];
  }
  function pins() {
    const st = navState(); const email = (getSession() || {}).email || '';
    return (st.pins && st.pins[email]) || defaultPins();
  }
  function togglePin(code) {
    const st = navState(); const email = (getSession() || {}).email || '';
    const cur = pins().slice();
    const i = cur.indexOf(code); if (i >= 0) cur.splice(i, 1); else cur.push(code);
    st.pins = st.pins || {}; st.pins[email] = cur; saveNavState(st);
    return i < 0;
  }
  const procHref = (code) => (ORG.liveProcesses && ORG.liveProcesses[code]) ? `#/process/${ORG.liveProcesses[code]}` : `#/process/p/${code}`;
  const procName = (code) => { const d = docById(code); return d ? d.en.replace('Procedure for ', '') : code; };
  function processNav(active) {
    const st = navState(); const open = st.open || {};
    const item = (code) => {
      const on = active === 'proc:' + code || (code === (Object.keys(ORG.liveProcesses || {}).find((k) => ORG.liveProcesses[k] === 'risk')) && active === 'risk');
      const live = ORG.liveProcesses && ORG.liveProcesses[code];
      return `<a href="${procHref(code)}" class="nav-item sub ${on ? 'on' : ''}"><span class="nav-code">${esc(code)}</span><span>${esc(procName(code))}</span>${live ? '<i class="live-dot" title="Workflow live"></i>' : ''}</a>`;
    };
    const my = pins().filter((c) => docById(c));
    return `
      <p class="side-sub">${icon('star')}My Processes</p>
      ${my.length ? my.map(item).join('') : '<p class="side-empty">Star a process to pin it here.</p>'}
      ${ORG.groups.map((g) => {
        const isOpen = !!open[g.id] || g.codes.some((c) => active === 'proc:' + c);
        return `<button class="nav-group ${isOpen ? 'open' : ''}" data-action="toggle-group" data-g="${g.id}" aria-expanded="${isOpen}">${icon('chevron')}<span>${esc(g.name)}</span><em>${g.codes.length}</em></button>
        ${isOpen ? `<div class="nav-group-items">${g.codes.map(item).join('')}</div>` : ''}`;
      }).join('')}`;
  }

  /* ---------- process workspace ---------- */
  const GROUP_IO = {
    management: { inputs: 'Feedback, complaints, regulatory reports, audit results, data analysis, regulatory changes', outputs: 'Quality policy and objectives, improvement decisions, resources, change approvals' },
    core: { inputs: 'Customer requirements, regulatory requirements, risk management outputs', outputs: 'Design and development file, released product, installation and service records' },
    support: { inputs: 'Needs of each process', outputs: 'Documents and records, qualified people, infrastructure, purchased product, identification data, risk management file' },
    improvement: { inputs: 'Product and process performance, post-market information', outputs: 'Nonconformities, corrective and preventive actions, analysis results, management review input' }
  };
  function viewProcessWorkspace(code) {
    const d = docById(code);
    if (!d || d.type !== 'Procedure') return null;
    const g = groupOf(code) || {};
    const io = GROUP_IO[g.id] || {};
    const forms = allDocs().filter((x) => x.parent === code);
    const people = ORG.people.filter((x) => x.dept === d.owner);
    const pinned = pins().includes(code);
    const siblings = (g.codes || []).filter((c) => c !== code);
    return shell(`
      ${pageHead(`<span class="code-badge">${esc(code)}</span> ${esc(procName(code))}`, `${esc(d.kr)} · ${esc(g.name || '')} · Owner ${esc(deptName(d.owner))}`,
        `<a href="#/dashboard">My Dashboard</a> / <a href="#/process">Work Process</a> / ${esc(code)}`,
        `<button class="btn outline ${pinned ? 'pinned' : ''}" data-action="pin" data-code="${esc(code)}" aria-pressed="${pinned}">${icon('star')}${pinned ? 'Pinned' : 'Pin to My Processes'}</button>`)}
      <section class="ws-grid">
        <article class="card panel">
          <div class="panel-title"><h2>Process at a glance</h2></div>
          <table class="kv">
            <tr><th>Procedure</th><td><a href="#/documents/${esc(code)}">${esc(code)} · ${esc(d.en)}</a> <small class="muted">Rev.${esc(d.rev)}</small></td></tr>
            <tr><th>Owner</th><td>${esc(deptName(d.owner))}${people.length ? `<br><small class="muted">${people.map((x) => esc(x.name)).join(', ')}</small>` : ''}</td></tr>
            <tr><th>ISO 13485</th><td>${(d.clauses || []).map((c) => `<span class="chip">§${esc(c)}</span>`).join(' ') || '—'}</td></tr>
            <tr><th>Inputs</th><td>${esc(io.inputs || '—')}</td></tr>
            <tr><th>Outputs</th><td>${esc(io.outputs || '—')}</td></tr>
          </table>
        </article>
        <article class="card panel ws-status">
          <div class="panel-title"><h2>Workflow</h2></div>
          <p class="muted">The guided workflow for this process is planned for phase 2. Until then, use the procedure and forms below; records are kept with the forms.</p>
          <div class="ws-kpis"><span><strong>${forms.length}</strong><small>forms</small></span><span><strong>0</strong><small>open records</small></span><span><strong>—</strong><small>KPI</small></span></div>
          <button class="btn primary sm" disabled>${icon('plus')}New record (phase 2)</button>
        </article>
      </section>
      <h2 class="section-title">Forms and records <small class="muted">${forms.length}</small></h2>
      <section class="card table-card">${forms.length ? `<div class="table-wrap"><table class="table">
        <thead><tr><th>Doc ID</th><th>Title</th><th>Type</th><th>Parent</th><th>Rev.</th><th>Effective</th><th>Owner</th><th>Status</th></tr></thead>
        <tbody>${forms.map(docRow).join('')}</tbody></table></div>` : '<div class="empty"><p class="muted">No forms under this procedure.</p></div>'}</section>
      ${siblings.length ? `<h2 class="section-title">Other ${esc((g.name || '').toLowerCase())}</h2>
      <section class="chip-row">${siblings.map((c) => `<a class="chip link" href="${procHref(c)}"><b>${esc(c)}</b> ${esc(procName(c))}</a>`).join('')}</section>` : ''}`, 'proc:' + code);
  }

  /* ---------- document control (ISO 13485 §4.2.4) + My Tasks ---------- */
  const DAY = 86400000;
  const todayStr = () => new Date().toISOString().slice(0, 10);
  const addDays = (n) => new Date(Date.now() + n * DAY).toISOString().slice(0, 10);
  const OPEN_ST = ['Draft', 'In Review', 'Approval', 'Approved'];
  const personById = (pid) => (ORG ? ORG.people.find((x) => x.id === pid) : null);
  const personName = (pid) => (personById(pid) || {}).name || '—';
  const myPid = () => { const s = getSession() || {}; return s.personId || 'me'; };
  const pad2 = (n) => String(n).padStart(2, '0');

  function dcStore() {
    if (!db.dc) { db.dc = { docs: {}, added: [] }; if (ORG) seedDocControl(); save(); }
    return db.dc;
  }
  function allDocs() { return ORG ? ORG.documents.concat((db.dc && db.dc.added) || []) : []; }
  function dcRec(id, create) {
    const st = dcStore();
    if (!st.docs[id] && create) st.docs[id] = { revs: [], audit: [], baseContent: '', obsolete: null };
    return st.docs[id] || null;
  }
  function mutateDoc(id, action, fn) {
    const r = dcRec(id, true);
    fn(r);
    r.audit.unshift({ t: nowISO(), user: (getSession() || {}).name || 'System', action });
    save();
  }
  function docTemplate(d) {
    const name = d.en.replace(/^(Procedure|Manual) for /, '');
    const forms = allDocs().filter((x) => x.parent === d.id).map((x) => `- ${x.id} ${x.en}`).join('\n') || '- (none)';
    if (d.type === 'Form') return `${d.id} ${d.en}\n\nHeader\n- Document / record number\n- Date\n- Prepared by\n\nContent\n- Item\n- Result\n- Remarks\n\nSign-off\n- Reviewed by / date\n- Approved by / date`;
    if (d.type === 'Manual') return `1. Scope of the quality management system\n2. Quality policy and objectives\n3. Organization and responsibilities\n4. Process interaction (process map)\n5. Documented procedures\n6. Exclusions and non-applications\n7. References\n- ISO 13485:2016\n- KGMP, 21 CFR 820 (QMSR)`;
    return `1. Purpose\nThis procedure defines how ${name.toLowerCase()} is planned, performed and recorded.\n\n2. Scope\nAll products and activities within the quality management system.\n\n3. Responsibilities\n- ${deptName(d.owner)}: owns and maintains this procedure.\n- Management representative: approves this procedure.\n\n4. Procedure\n4.1 Planning\n4.2 Execution\n4.3 Review and approval\n\n5. Records\n${forms}\n\n6. References\n- ISO 13485:2016 ${(d.clauses || []).map((c) => '§' + c).join(', ')}`;
  }
  function seedDocControl() {
    const st = db.dc; const ppl = ORG.people; const me = (ppl.find((x) => x.id === ORG.demoUser.personId) || ppl[0]).id;
    const other = (i) => (ppl.filter((x) => x.id !== me)[i] || ppl[0]).id;
    const t = nowISO(); const ago = (n) => new Date(Date.now() - n * DAY).toISOString();
    const mk = (id, base, rev, extra, log) => {
      const d = ORG.documents.find((x) => x.id === id); if (!d) return;
      const baseContent = docTemplate(d);
      st.docs[id] = { revs: [Object.assign({ rev, content: base(baseContent), createdAt: ago(5), reviews: [], acks: [], training: false }, extra)], audit: log.map((a) => ({ t: a[0], user: a[1], action: a[2] })), baseContent, obsolete: null };
    };
    const firstForm = (ORG.documents.find((x) => x.parent === 'PDR' && x.type === 'Form') || {}).id;
    if (firstForm) mk(firstForm, (c) => c.replace('- Approved by / date', '- Approved by / date\n- Electronic signature (name, date/time, meaning)'), '01',
      { status: 'In Review', change: 'Add electronic signature block (21 CFR Part 11)', reason: 'Prepare for electronic records in Qualixx', authorId: other(0), reviewerId: me, approverId: me, due: addDays(3) },
      [[ago(2), personName(other(0)), 'Submitted Rev.01 for review'], [ago(5), personName(other(0)), 'Revision Rev.01 started']]);
    mk('PDD', (c) => c.replace('4.3 Review and approval', '4.3 Review and approval\n4.4 Design transfer checklist (new)'), '01',
      { status: 'Approval', change: 'Add design transfer checklist step', reason: 'Internal audit finding IA-2026-03', authorId: other(1), reviewerId: other(0), approverId: me, due: addDays(-1), training: true,
        reviews: [{ by: personName(other(0)), at: ago(1), decision: 'Accepted', comment: 'Clear. OK to approve.' }] },
      [[ago(1), personName(other(0)), 'Review: Accepted'], [ago(3), personName(other(1)), 'Submitted Rev.01 for review'], [ago(6), personName(other(1)), 'Revision Rev.01 started']]);
    mk('MMS', (c) => c.replace('6. Exclusions and non-applications', '6. Exclusions and non-applications\n- 7.5.5 Sterile medical devices: not applicable (software only)'), '01',
      { status: 'Effective', change: 'Clarify non-applicable clauses for software products', reason: 'Management review 2026-09', authorId: me, reviewerId: other(0), approverId: me, due: ago(8).slice(0, 10), training: true,
        reviews: [{ by: personName(other(0)), at: ago(9), decision: 'Accepted', comment: '' }], approvedBy: personName(me), approvedAt: ago(7), effective: ago(7).slice(0, 10),
        acks: ppl.filter((x) => x.id !== me).slice(0, 1).map((x) => ({ pid: x.id, name: x.name, at: ago(6) })) },
      [[ago(7), personName(me), 'Electronically signed: approval of Rev.01 · effective ' + ago(7).slice(0, 10)], [ago(9), personName(other(0)), 'Review: Accepted'], [ago(10), personName(me), 'Revision Rev.01 started']]);
    st.seededAt = t;
  }
  /** promote approved revisions whose effective date has arrived */
  function settleDocs() {
    if (!ORG) return;
    const st = dcStore(); let changed = false;
    Object.values(st.docs).forEach((r) => r.revs.forEach((v) => {
      if (v.status === 'Approved' && v.effective <= todayStr()) {
        r.revs.forEach((o) => { if (o !== v && o.status === 'Effective') o.status = 'Superseded'; });
        v.status = 'Effective';
        r.audit.unshift({ t: nowISO(), user: 'System', action: `Rev.${v.rev} became effective; previous revision superseded` });
        changed = true;
      }
    }));
    if (changed) save();
  }
  const isAdded = (d) => !!d.added;
  function effRev(d) {
    const r = dcRec(d.id);
    const v = r && [...r.revs].reverse().find((x) => x.status === 'Effective');
    if (v) return v;
    return isAdded(d) ? null : { rev: d.rev, effective: d.effective, status: 'Effective', base: true, content: (r && r.baseContent) || '' };
  }
  function openRev(d) { const r = dcRec(d.id); return r ? r.revs.find((x) => OPEN_ST.includes(x.status)) : null; }
  function docState(d) {
    const r = dcRec(d.id);
    if (r && r.obsolete) return { label: 'Obsolete', cls: 's-Obsolete' };
    const e = effRev(d); const o = openRev(d);
    if (e) return { label: 'Effective', cls: 's-Approved', change: o };
    return { label: o ? o.status : 'Draft', cls: 's-Draft', change: null };
  }
  function nextRevNo(d) {
    const r = dcRec(d.id);
    const nums = [isAdded(d) ? -1 : Number(d.rev)].concat(r ? r.revs.map((x) => Number(x.rev)) : []);
    return pad2(Math.max(...nums) + 1);
  }
  function lineDiff(a, b) {
    const A = a.split('\n'); const B = b.split('\n'); const n = A.length; const m = B.length;
    const L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const out = []; let i = 0; let j = 0;
    while (i < n && j < m) { if (A[i] === B[j]) { out.push([' ', A[i]]); i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) out.push(['-', A[i++]]); else out.push(['+', B[j++]]); }
    while (i < n) out.push(['-', A[i++]]); while (j < m) out.push(['+', B[j++]]);
    return out;
  }
  function diffHtml(a, b) {
    const d = lineDiff(a || '', b || '');
    const add = d.filter((x) => x[0] === '+').length; const del = d.filter((x) => x[0] === '-').length;
    return `<p class="muted small"><span class="diff-add-n">+${add}</span> added · <span class="diff-del-n">−${del}</span> removed lines</p>
      <pre class="diff">${d.map(([k, l]) => `<span class="${k === '+' ? 'add' : k === '-' ? 'del' : ''}">${k === ' ' ? '  ' : k + ' '}${esc(l) || ' '}</span>`).join('')}</pre>`;
  }
  const STEP_LIST = ['Draft', 'In Review', 'Approval', 'Effective'];
  function stepper(status) {
    const idx = status === 'Approved' ? 3 : STEP_LIST.indexOf(status);
    return `<ol class="dc-steps">${STEP_LIST.map((s, i) => `<li class="${i < idx ? 'done' : i === idx ? 'cur' : ''}"><span>${i < idx ? '✓' : i + 1}</span>${s === 'In Review' ? 'Review' : s}</li>`).join('')}</ol>`;
  }
  const peopleOptions = (sel) => ORG.people.map((x) => `<option value="${x.id}" ${x.id === sel ? 'selected' : ''}>${esc(x.name)} — ${esc(x.title)}</option>`).join('');
  const dueChip = (due) => { if (!due) return ''; const late = due < todayStr(); return `<span class="due ${late ? 'late' : due === todayStr() ? 'today' : ''}">${late ? 'Overdue · ' : 'Due '}${fmt(due)}</span>`; };

  function changePanel(d, v) {
    const me = myPid(); const r = dcRec(d.id);
    const e = effRev(d); const prev = (e && e.content) || r.baseContent || '';
    const meta = `<table class="kv">
      <tr><th>Change</th><td>${esc(v.change)}</td></tr>
      <tr><th>Reason</th><td>${esc(v.reason) || '—'}</td></tr>
      <tr><th>Author</th><td>${esc(personName(v.authorId))}</td></tr>
      <tr><th>Reviewer / approver</th><td>${esc(personName(v.reviewerId))} / ${esc(personName(v.approverId))}</td></tr>
      <tr><th>Due</th><td>${dueChip(v.due) || '—'}</td></tr>
      <tr><th>Training</th><td>${v.training ? 'Read &amp; acknowledge required when effective' : 'Not required'}</td></tr>
    </table>`;
    let body = '';
    if (v.status === 'Draft') {
      body = `${v.returned ? `<p class="alert soft"><b>Returned:</b> ${esc(v.returned)}</p>` : ''}
        <form class="form" data-form="dc-draft" data-id="${esc(d.id)}">
          <label>Document content (Rev.${esc(v.rev)})<textarea name="content" rows="14" class="mono">${esc(v.content)}</textarea></label>
          <div class="grid2">
            <label>Reviewer<select name="reviewerId">${peopleOptions(v.reviewerId || me)}</select></label>
            <label>Approver<select name="approverId">${peopleOptions(v.approverId || me)}</select></label>
            <label>Due date<input type="date" name="due" value="${esc(v.due || addDays(7))}"></label>
            <label class="check"><input type="checkbox" name="training" ${v.training ? 'checked' : ''}> Require read &amp; acknowledge (training)</label>
          </div>
          <p class="muted small">Demo: you can assign yourself to try every step. In the live service an author cannot approve their own revision.</p>
          <div class="form-actions"><button class="btn outline" type="submit" name="op" value="withdraw">Withdraw change</button><button class="btn outline" type="submit" name="op" value="save">Save draft</button><button class="btn primary" type="submit" name="op" value="submit">${icon('send')}Submit for review</button></div>
        </form>`;
    } else if (v.status === 'In Review') {
      body = v.reviewerId === me ? `<form class="form" data-form="dc-review" data-id="${esc(d.id)}">
          <h3>Your review</h3>
          <fieldset class="radios"><legend>Decision</legend><label><input type="radio" name="decision" value="Accepted" checked> Accept</label><label><input type="radio" name="decision" value="Returned"> Return to author</label></fieldset>
          <label>Comment<textarea name="comment" rows="3" placeholder="Required when returning"></textarea></label>
          <div class="form-actions"><button class="btn primary" type="submit">Submit review</button></div></form>`
        : `<p class="muted">Waiting for review by ${esc(personName(v.reviewerId))}.</p>`;
    } else if (v.status === 'Approval') {
      const s = getSession();
      body = v.approverId === me ? `<form class="form approve-form" data-form="dc-approve" data-id="${esc(d.id)}">
          <h3>Approve with electronic signature</h3>
          <p class="muted">Signer: ${esc(s.name)} (${esc(s.role)}) · Meaning: approval of ${esc(d.id)} Rev.${esc(v.rev)}</p>
          <fieldset class="radios"><legend>Decision</legend><label><input type="radio" name="decision" value="approve" checked> Approve</label><label><input type="radio" name="decision" value="return"> Return to author</label></fieldset>
          <div class="grid2"><label>Effective date<input type="date" name="effective" value="${todayStr()}" min="${todayStr()}"></label>
          <label>Re-enter password<input name="password" type="password" autocomplete="current-password"></label></div>
          <label>Comment<input name="comment" placeholder="Optional (required when returning)"></label>
          <div class="form-actions"><button class="btn primary" type="submit">Sign</button></div></form>`
        : `<p class="muted">Waiting for approval by ${esc(personName(v.approverId))}.</p>`;
    } else if (v.status === 'Approved') {
      body = `<div class="approved"><div><strong>Approved</strong> · ${esc(v.approvedBy)} · ${fmt(v.approvedAt, true)}<br><small>Becomes effective on ${fmt(v.effective)}. The current revision stays in use until then.</small></div></div>`;
    }
    const reviews = v.reviews.length ? `<h3>Review comments</h3><ul class="plain">${v.reviews.map((x) => `<li><b>${esc(x.decision)}</b> · ${esc(x.by)} · <small class="muted">${fmt(x.at, true)}</small>${x.comment ? `<br>${esc(x.comment)}` : ''}</li>`).join('')}</ul>` : '';
    return `<section class="card panel dc-change">
      <div class="panel-head"><div class="panel-title"><h2>Change in progress · Rev.${esc(v.rev)} <span class="status s-${v.status.replace(' ', '')}">${esc(v.status)}</span></h2></div>${stepper(v.status)}</div>
      <div class="doc-grid"><div>${body}${v.status !== 'Draft' ? `<details class="diff-box" open><summary>Changes vs current revision</summary>${diffHtml(prev, v.content)}</details>` : `<details class="diff-box"><summary>Compare with current revision</summary>${diffHtml(prev, v.content)}</details>`}</div>
      <div>${meta}${reviews}</div></div>
    </section>`;
  }

  function ackPanel(d, e) {
    if (!e || e.base || !e.training) return '';
    const me = myPid(); const done = new Set(e.acks.map((a) => a.pid));
    return `<section class="card panel">
      <div class="panel-head"><div class="panel-title"><h2>Read &amp; acknowledge <small>${done.size} / ${ORG.people.length}</small></h2><p class="muted">Rev.${esc(e.rev)} requires every user to confirm they have read and understood the change.</p></div>
      ${done.has(me) ? '<span class="status s-Approved">You acknowledged</span>' : `<button class="btn primary" data-action="dc-ack" data-id="${esc(d.id)}">I have read and understood</button>`}</div>
      <div class="ack-list">${ORG.people.map((x) => { const a = e.acks.find((k) => k.pid === x.id); return `<span class="ack ${a ? 'ok' : ''}"><span class="avatar sm">${esc(initials(x.name))}</span>${esc(x.name)}<small>${a ? '✓ ' + fmt(a.at) : 'Pending'}</small></span>`; }).join('')}</div>
    </section>`;
  }

  /* ---------- My Tasks ---------- */
  function myTasks() {
    const me = myPid(); const out = [];
    if (ORG) {
      settleDocs();
      allDocs().forEach((d) => {
        const r = dcRec(d.id); if (!r || r.obsolete) return;
        const v = openRev(d);
        const href = `#/documents/${d.id}`;
        const base = { item: `${d.id} Rev.${v ? v.rev : ''}`, title2: d.en, process: 'Document Control', href };
        if (v && v.status === 'Draft' && v.authorId === me) out.push(Object.assign({}, base, { kind: 'Draft', action: v.returned ? 'Revise returned draft' : 'Complete draft and submit', due: v.due, from: v.returned ? 'Returned by reviewer' : 'You started this change' }));
        if (v && v.status === 'In Review' && v.reviewerId === me) out.push(Object.assign({}, base, { kind: 'Review', action: 'Review document change', due: v.due, from: personName(v.authorId) }));
        if (v && v.status === 'Approval' && v.approverId === me) out.push(Object.assign({}, base, { kind: 'Approve', action: 'Approve with e-signature', due: v.due, from: personName(v.authorId) }));
        const e = effRev(d);
        if (e && !e.base && e.training && !e.acks.some((a) => a.pid === me)) {
          const due = new Date(new Date(e.effective).getTime() + 14 * DAY).toISOString().slice(0, 10);
          out.push({ kind: 'Training', action: 'Read & acknowledge', item: `${d.id} Rev.${e.rev}`, title2: d.en, process: 'Training', href, due, from: e.approvedBy || '' });
        }
      });
    }
    db.products.forEach((p) => {
      if (p.review.status === 'Approved') return;
      const ok = checks(p).every((c) => c.ok);
      out.push({ kind: ok ? 'Approve' : 'Draft', action: ok ? 'Approve risk management review' : 'Complete risk management file', item: p.model || p.name, title2: p.name, process: 'Risk Management', href: `#/process/risk/${p.id}/${ok ? 'review' : 'overview'}`, due: '', from: '' });
    });
    catalog().forEach((x) => regsOf(x).filter(renewSoon).forEach((r) => out.push({ kind: 'Renew', action: `Renew ${r.market} authorization`, item: `${x.model || x.name} · ${r.authority}`, title2: r.pathway, process: 'Regulatory', href: `#/products/${x.id}/registrations`, due: r.expiry, from: 'Expiry tracking' })));
    return out.sort((a, b) => (a.due || '9999').localeCompare(b.due || '9999'));
  }
  let taskFilter = 'All';
  const TASK_KIND = { Review: 'Review', Approve: 'Approve', Draft: 'Draft', Training: 'Training', Renew: 'Renew' };
  function taskRows(list) {
    return list.map((t) => `<tr class="clickable" data-href="${t.href}">
      <td><span class="tkind k-${t.kind}">${esc(TASK_KIND[t.kind])}</span></td>
      <td><strong>${esc(t.action)}</strong><br><small class="muted">${esc(t.item)} · ${esc(t.title2)}</small></td>
      <td>${esc(t.process)}</td>
      <td><small>${esc(t.from) || '—'}</small></td>
      <td>${dueChip(t.due) || '<small class="muted">—</small>'}</td>
      <td><a class="btn outline sm" href="${t.href}">Open</a></td></tr>`).join('');
  }
  function viewTasks() {
    const all = myTasks();
    const kinds = ['All', 'Review', 'Approve', 'Draft', 'Training', 'Renew'];
    const n = (k) => all.filter((t) => k === 'All' || t.kind === k).length;
    const list = all.filter((t) => taskFilter === 'All' || t.kind === taskFilter);
    const late = all.filter((t) => t.due && t.due < todayStr()).length;
    return shell(`
      ${pageHead('My Tasks', `Everything assigned to you across processes${late ? ` · <b class="late-text">${late} overdue</b>` : ''}.`, '<a href="#/dashboard">My Dashboard</a> / My Tasks')}
      <section class="card table-card">
        <div class="table-top"><div class="seg" role="tablist">${kinds.map((k) => `<button role="tab" aria-selected="${taskFilter === k}" class="${taskFilter === k ? 'on' : ''}" data-action="task-filter" data-k="${k}">${k} <span>${n(k)}</span></button>`).join('')}</div></div>
        ${list.length ? `<div class="table-wrap"><table class="table"><thead><tr><th>Type</th><th>Task</th><th>Process</th><th>From</th><th>Due</th><th></th></tr></thead><tbody>${taskRows(list)}</tbody></table></div>`
          : `<div class="empty"><p><strong>You're all caught up.</strong></p><p class="muted">New reviews, approvals and acknowledgements assigned to you will appear here.</p></div>`}
      </section>
      <p class="muted small">Phase 2 adds CAPA, training, change control and audit tasks to this same list.</p>`, 'tasks');
  }
  function tasksCard() {
    const all = myTasks(); const top = all.slice(0, 4);
    return `<section class="card panel tasks-card">
      <div class="panel-head"><div class="panel-title"><h2>My tasks <small>${all.length}</small></h2></div><a class="btn outline sm" href="#/tasks">View all</a></div>
      ${top.length ? `<ul class="task-list">${top.map((t) => `<li><a href="${t.href}"><span class="tkind k-${t.kind}">${esc(TASK_KIND[t.kind])}</span><span class="tl-main"><strong>${esc(t.action)}</strong><small class="muted">${esc(t.item)} · ${esc(t.title2)}</small></span>${dueChip(t.due)}</a></li>`).join('')}</ul>` : '<p class="muted">You\'re all caught up.</p>'}
    </section>`;
  }

  /* ---------- Document Control workspace (PDR) ---------- */
  function viewDocControl() {
    settleDocs();
    const docs = allDocs();
    const open = docs.map((d) => ({ d, v: openRev(d) })).filter((x) => x.v);
    const recent = docs.map((d) => ({ d, v: effRev(d) })).filter((x) => x.v && !x.v.base).sort((a, b) => b.v.effective.localeCompare(a.v.effective)).slice(0, 6);
    const obs = docs.filter((d) => (dcRec(d.id) || {}).obsolete).length;
    const ackPending = recent.filter((x) => x.v.training).reduce((n, x) => n + ORG.people.length - x.v.acks.length, 0);
    const nextOwner = (v) => v.status === 'Draft' ? v.authorId : v.status === 'In Review' ? v.reviewerId : v.status === 'Approval' ? v.approverId : '';
    const pinned = pins().includes('PDR');
    return shell(`
      ${pageHead('<span class="code-badge">PDR</span> Document Control', 'Create, review, approve, distribute and withdraw controlled documents (ISO 13485 §4.2.4).',
        '<a href="#/dashboard">My Dashboard</a> / <a href="#/process">Work Process</a> / PDR',
        `<button class="btn outline ${pinned ? 'pinned' : ''}" data-action="pin" data-code="PDR" aria-pressed="${pinned}">${icon('star')}${pinned ? 'Pinned' : 'Pin'}</button><button class="btn primary" data-action="dc-new">${icon('plus')}New document</button>`)}
      <section class="ws-kpis big card panel">
        <span><strong>${docs.length - obs}</strong><small>controlled documents</small></span>
        <span><strong>${open.length}</strong><small>changes in progress</small></span>
        <span><strong>${open.filter((x) => x.v.status === 'Approval').length}</strong><small>awaiting approval</small></span>
        <span><strong>${ackPending}</strong><small>acknowledgements pending</small></span>
      </section>
      <h2 class="section-title">Changes in progress <small class="muted">${open.length}</small></h2>
      <section class="card table-card">${open.length ? `<div class="table-wrap"><table class="table">
        <thead><tr><th>Document</th><th>Change</th><th>Stage</th><th>Next action by</th><th>Due</th></tr></thead>
        <tbody>${open.map(({ d, v }) => `<tr class="clickable" data-href="#/documents/${esc(d.id)}"><td class="code">${esc(d.id)} <small>Rev.${esc(v.rev)}</small><br><small class="muted">${esc(d.en)}</small></td><td>${esc(v.change)}</td><td>${stepper(v.status)}</td><td>${esc(personName(nextOwner(v)))}</td><td>${dueChip(v.due) || '—'}</td></tr>`).join('')}</tbody></table></div>`
        : '<div class="empty"><p class="muted">No open changes. Open any document and choose “Start revision”.</p></div>'}</section>
      <h2 class="section-title">Recently effective</h2>
      <section class="card table-card">${recent.length ? `<div class="table-wrap"><table class="table">
        <thead><tr><th>Document</th><th>Change</th><th>Effective</th><th>Approved by</th><th>Acknowledged</th></tr></thead>
        <tbody>${recent.map(({ d, v }) => `<tr class="clickable" data-href="#/documents/${esc(d.id)}"><td class="code">${esc(d.id)} <small>Rev.${esc(v.rev)}</small><br><small class="muted">${esc(d.en)}</small></td><td>${esc(v.change)}</td><td>${fmt(v.effective)}</td><td>${esc(v.approvedBy)}</td><td>${v.training ? `${v.acks.length} / ${ORG.people.length}` : '—'}</td></tr>`).join('')}</tbody></table></div>`
        : '<div class="empty"><p class="muted">Nothing yet.</p></div>'}</section>`, 'proc:PDR');
  }

  /* ---------- document control modals ---------- */
  function dcStartModal(d) {
    openModal(`Start revision · ${d.id} Rev.${nextRevNo(d)}`, `<form class="form" data-form="dc-start" data-id="${esc(d.id)}">
      <label>What changes?<input name="change" required placeholder="e.g. Add design transfer checklist step"></label>
      <label>Reason for change<input name="reason" placeholder="e.g. CAPA-2026-012, audit finding, regulation update"></label>
      <label class="check"><input type="checkbox" name="training"> Users must read &amp; acknowledge the new revision</label>
      <div class="form-actions"><button class="btn outline" type="button" data-action="close-modal">Cancel</button><button class="btn primary" type="submit">Start draft</button></div></form>`);
  }
  function dcNewModal() {
    const parents = allDocs().filter((x) => x.type === 'Manual' || x.type === 'Procedure');
    openModal('New controlled document', `<form class="form" data-form="dc-new">
      <div class="grid2">
        <label>Type<select name="type"><option>Form</option><option>Instruction</option><option>Procedure</option></select></label>
        <label>Parent<select name="parent">${parents.map((p) => `<option value="${esc(p.id)}" ${p.id === 'PDR' ? 'selected' : ''}>${esc(p.id)} · ${esc(p.en)}</option>`).join('')}</select></label>
      </div>
      <label>Document ID <small class="hint">Leave blank to number automatically (e.g. FDR-09)</small><input name="id" placeholder="Auto"></label>
      <label>Title (English)<input name="en" required></label>
      <label>Title (Korean)<input name="kr"></label>
      <label>Owner<select name="owner">${Object.keys(ORG.departments || {}).map((k) => `<option value="${esc(k)}">${esc(ORG.departments[k])}</option>`).join('')}</select></label>
      <div class="form-actions"><button class="btn outline" type="button" data-action="close-modal">Cancel</button><button class="btn primary" type="submit">Create draft Rev.00</button></div></form>`);
  }
  function dcObsoleteModal(d) {
    openModal(`Make obsolete · ${d.id}`, `<form class="form" data-form="dc-obsolete" data-id="${esc(d.id)}">
      <p class="muted">The document is withdrawn from use and kept as an obsolete record (§4.2.4 g). It can no longer be revised.</p>
      <label>Reason<input name="reason" required></label>
      <label>Re-enter password<input name="password" type="password" required autocomplete="current-password"></label>
      <div class="form-actions"><button class="btn outline" type="button" data-action="close-modal">Cancel</button><button class="btn danger" type="submit">Sign &amp; make obsolete</button></div></form>`);
  }
  const checkPw = (pw) => { const s = getSession(); const u = DEMO_USERS().find((x) => x.email === s.email); return u && pw === u.password; };


  /* ---------- sidebar sections (Products, Quality Documents) ---------- */
  function secOpen(k, active) { const st = navState(); const o = (st.sec || {})[k]; return String(active || '').split(':')[0] === k || o !== false; }
  function navSection(k, ic, label, count, items, active) {
    const open = secOpen(k, active);
    const on = (key) => active === key;
    return `<button class="nav-item nav-sec ${open ? 'open' : ''}" data-action="toggle-sec" data-k="${k}" aria-expanded="${open}">${icon(ic)}<span>${label}</span>${count != null && !open ? `<em class="count">${count}</em>` : ''}${icon('chevron', 'sec-chev')}</button>
      ${open ? `<div class="nav-sec-items">${items.filter(Boolean).map(([href, l, key, n, alert]) => `<a href="${href}" class="nav-item sub ${on(key) ? 'on' : ''}"><span class="dot-ic"></span><span>${l}</span>${n != null && n !== '' ? `<em class="count ${alert ? 'alert-count' : ''}">${n}</em>` : ''}</a>`).join('')}</div>` : ''}`;
  }
  const DOC_KEYS = { all: 'All', manual: 'Manual', procedures: 'Procedure', instructions: 'Instruction', forms: 'Form', changes: 'Changes', obsolete: 'Obsolete' };
  const docKeyOf = (t) => Object.keys(DOC_KEYS).find((k) => DOC_KEYS[k] === t) || 'all';
  function docSection(active) {
    const docs = allDocs();
    const isObs = (d) => !!(dcRec(d.id) || {}).obsolete;
    const n = (t) => docs.filter((d) => !isObs(d) && d.type === t).length;
    const manual = docs.find((d) => d.type === 'Manual');
    const changes = docs.filter((d) => openRev(d)).length;
    const obs = docs.filter(isObs).length;
    return navSection('documents', 'doc', 'Quality Documents', docs.length - obs, [
      ['#/quality/policy', 'Quality Policy', 'documents:policy'],
      ['#/quality/objectives', 'Quality Objectives', 'documents:objectives', qms().objectives.filter((o) => objOk(o) === false).length || '', true],
      manual ? [`#/documents/${manual.id}`, 'Quality Manual', 'documents:manual'] : null,
      ['#/documents/type/procedures', 'Procedures', 'documents:procedures', n('Procedure')],
      n('Instruction') ? ['#/documents/type/instructions', 'Instructions', 'documents:instructions', n('Instruction')] : null,
      ['#/documents/type/forms', 'Forms', 'documents:forms', n('Form')],
      ['#/documents/type/changes', 'In Change', 'documents:changes', changes || '', true],
      ['#/documents/type/obsolete', 'Obsolete', 'documents:obsolete', obs || ''],
      ['#/documents/type/all', 'All Documents', 'documents:all']
    ], active);
  }

  /* ---------- Products: labels and software versions ---------- */
  function viewLabels() {
    const list = catalog();
    return shell(`
      ${pageHead('Labels &amp; UDI', 'Label content and unique device identification for every product. Open a product to edit its label.', '<a href="#/dashboard">My Dashboard</a> / <a href="#/products">Products</a> / Labels &amp; UDI')}
      <section class="label-grid">${list.length ? list.map((x) => `
        <a class="card label-card" href="#/products/${x.id}/label">
          <div class="lc-top"><span class="thumb">${esc(initials(x.model || x.name))}</span><span><strong>${esc(x.name)}</strong><small class="muted">${esc(x.model)}${x.swVersion ? ' · SW v' + esc(x.swVersion) : ''}</small></span></div>
          <dl class="lc-dl">
            <dt>UDI-DI</dt><dd class="mono">${esc(x.udi) || '<span class="muted">Not assigned</span>'}</dd>
            <dt>Label document</dt><dd>${esc(x.labelRef) || '<span class="muted">—</span>'}</dd>
            <dt>Licence / clearance</dt><dd>${esc(x.licenseNo) || '<span class="muted">—</span>'}</dd>
            <dt>Manufacturer</dt><dd>${esc(x.manufacturer) || '—'}</dd>
            <dt>Markets</dt><dd>${regsOf(x).length ? regsOf(x).map((r) => `<span class="mk ${r.status === 'Approved' ? 'ok' : ''}" title="${esc(r.status)}">${esc(r.market)}</span>`).join(' ') : '—'}</dd>
          </dl>
          ${x.warnings ? `<p class="lc-warn">⚠ ${esc(x.warnings)}</p>` : ''}
          <span class="lc-open">Open label ${icon('chevron')}</span>
        </a>`).join('') : '<div class="card empty"><p class="muted">No products yet.</p></div>'}
      </section>`, 'products:labels');
  }

  /* ---------- market authorizations (registrations by country / region) ---------- */
  const MARKETS = [
    { id: 'KR', name: 'Korea', authority: 'MFDS', paths: ['Class 1 notification (신고)', 'Class 2 certification (인증)', 'Class 2/3/4 approval (허가)', 'Innovative medical device'] },
    { id: 'US', name: 'United States', authority: 'FDA', paths: ['510(k)', 'De Novo', 'PMA', 'Class I exempt (registration & listing)'] },
    { id: 'EU', name: 'European Union', authority: 'Notified Body (CE)', paths: ['MDR Class I (self-declared)', 'MDR Class IIa', 'MDR Class IIb', 'MDR Class III', 'IVDR'] },
    { id: 'UK', name: 'United Kingdom', authority: 'MHRA', paths: ['UKCA', 'CE recognition'] },
    { id: 'JP', name: 'Japan', authority: 'PMDA / MHLW', paths: ['Todokede (Class I)', 'Ninsho (certification)', 'Shonin (approval)'] },
    { id: 'CN', name: 'China', authority: 'NMPA', paths: ['Class I filing', 'Class II registration', 'Class III registration'] },
    { id: 'AU', name: 'Australia', authority: 'TGA', paths: ['ARTG inclusion'] },
    { id: 'CA', name: 'Canada', authority: 'Health Canada', paths: ['MDL Class I–IV', 'MDEL'] },
    { id: 'BR', name: 'Brazil', authority: 'ANVISA', paths: ['Notificação', 'Registro'] },
    { id: 'OT', name: 'Other', authority: '', paths: ['Other'] }
  ];
  const REG_STATUS = ['Planned', 'In preparation', 'Submitted', 'Approved', 'Suspended', 'Expired', 'Withdrawn'];
  const marketOf = (id) => MARKETS.find((m) => m.id === id) || MARKETS[MARKETS.length - 1];
  function regsOf(x) {
    if (!x.registrations) {
      x.registrations = x.example ? [
        { id: uid(), market: 'KR', authority: 'MFDS', pathway: 'Class 2 certification (인증)', number: '', status: 'Submitted', submitted: addDays(-20), approved: '', expiry: '', holder: x.manufacturer, notes: 'Clinical performance report attached' },
        { id: uid(), market: 'US', authority: 'FDA', pathway: '510(k)', number: '', status: 'In preparation', submitted: '', approved: '', expiry: '', holder: x.manufacturer, notes: 'Predicate selected; Pre-Sub planned' },
        { id: uid(), market: 'EU', authority: 'Notified Body (CE)', pathway: 'MDR Class IIa', number: '', status: 'Planned', submitted: '', approved: '', expiry: '', holder: x.manufacturer, notes: '' },
        { id: uid(), market: 'JP', authority: 'PMDA / MHLW', pathway: 'Ninsho (certification)', number: 'EX-301AABZX0001', status: 'Approved', submitted: addDays(-400), approved: addDays(-300), expiry: addDays(65), holder: 'Example Japan KK (MAH)', notes: 'Example record — renewal due soon' }
      ] : [];
      save();
    }
    return x.registrations;
  }
  const regBadge = (st) => `<span class="status r-${st.replace(/\s/g, '')}">${esc(st)}</span>`;
  const renewSoon = (r) => r.status === 'Approved' && r.expiry && r.expiry <= addDays(90);
  function regTable(x, withProduct) {
    const list = withProduct ? catalog().flatMap((p) => regsOf(p).map((r) => Object.assign({ _p: p }, r))) : regsOf(x).map((r) => Object.assign({ _p: x }, r));
    if (!list.length) return '<div class="empty"><p class="muted">No market authorizations recorded yet.</p></div>';
    return `<div class="table-wrap"><table class="table">
      <thead><tr>${withProduct ? '<th>Product</th>' : ''}<th>Market</th><th>Authority · pathway</th><th>Number</th><th>Status</th><th>Approved</th><th>Expiry</th><th>Holder</th><th></th></tr></thead>
      <tbody>${list.map((r) => `<tr>
        ${withProduct ? `<td><a href="#/products/${r._p.id}/registrations"><strong>${esc(r._p.model || r._p.name)}</strong></a></td>` : ''}
        <td><span class="mk">${esc(r.market)}</span> ${esc(marketOf(r.market).name)}</td>
        <td>${esc(r.authority)}<br><small class="muted">${esc(r.pathway)}</small></td>
        <td class="mono small">${esc(r.number) || '—'}</td>
        <td>${regBadge(r.status)}${r.status === 'Submitted' && r.submitted ? `<br><small class="muted">since ${fmt(r.submitted)}</small>` : ''}</td>
        <td><small>${r.approved ? fmt(r.approved) : '—'}</small></td>
        <td>${r.expiry ? `<span class="due ${renewSoon(r) ? 'late' : ''}">${fmt(r.expiry)}${renewSoon(r) ? ' · renew' : ''}</span>` : '<small class="muted">—</small>'}</td>
        <td><small>${esc(r.holder) || '—'}</small></td>
        <td class="actions"><button class="icon-btn" data-action="edit-reg" data-id="${r._p.id}" data-rid="${r.id}" aria-label="Edit">${icon('edit')}</button></td></tr>`).join('')}</tbody></table></div>`;
  }
  function regMatrix() {
    const prods = catalog();
    const used = MARKETS.filter((m) => m.id !== 'OT' && (['KR', 'US', 'EU'].includes(m.id) || prods.some((p) => regsOf(p).some((r) => r.market === m.id))));
    return `<div class="table-wrap"><table class="table reg-matrix">
      <thead><tr><th>Product</th>${used.map((m) => `<th title="${esc(m.name)} · ${esc(m.authority)}">${m.id}<br><small class="muted">${esc(m.authority)}</small></th>`).join('')}</tr></thead>
      <tbody>${prods.map((p) => `<tr><td><a href="#/products/${p.id}/registrations"><strong>${esc(p.name)}</strong></a><br><small class="muted">${esc(p.model)}</small></td>${used.map((m) => {
        const rs = regsOf(p).filter((r) => r.market === m.id);
        return `<td>${rs.length ? rs.map((r) => `<button class="cell-btn" data-action="edit-reg" data-id="${p.id}" data-rid="${r.id}" title="${esc(r.pathway)}">${regBadge(r.status)}${renewSoon(r) ? '<small class="late-text">renew</small>' : ''}</button>`).join('') : `<button class="cell-add" data-action="new-reg" data-id="${p.id}" data-m="${m.id}" aria-label="Add ${m.id}">+</button>`}</td>`;
      }).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function viewRegistrations() {
    const all = catalog().flatMap(regsOf);
    const n = (st) => all.filter((r) => r.status === st).length;
    const renew = all.filter(renewSoon).length;
    const markets = new Set(all.filter((r) => r.status === 'Approved').map((r) => r.market));
    return shell(`
      ${pageHead('Market Authorizations', 'Registration, certification and clearance status of every product by country and region.', '<a href="#/dashboard">My Dashboard</a> / <a href="#/products">Products</a> / Market Authorizations',
        catalog().length ? `<button class="btn primary" data-action="new-reg" data-id="${catalog()[0].id}">${icon('plus')}Add authorization</button>` : '')}
      <section class="ws-kpis big card panel">
        <span><strong>${markets.size}</strong><small>markets with approval</small></span>
        <span><strong>${n('Approved')}</strong><small>approved</small></span>
        <span><strong>${n('Submitted') + n('In preparation')}</strong><small>submitted / in preparation</small></span>
        <span><strong class="${renew ? 'late-text' : ''}">${renew}</strong><small>renewals due in 90 days</small></span>
      </section>
      <h2 class="section-title">Product × market</h2>
      <section class="card table-card">${regMatrix()}</section>
      <h2 class="section-title">All authorizations</h2>
      <section class="card table-card">${regTable(null, true)}</section>`, 'products:registrations');
  }
  function regTab(x) {
    return `<section class="card table-card">
      <div class="table-top"><div><h2>Market authorizations</h2><p class="muted small">Country / region, authority, pathway, number and validity.</p></div><button class="btn primary sm" data-action="new-reg" data-id="${x.id}">${icon('plus')}Add</button></div>
      ${regTable(x, false)}</section>`;
  }
  function regModal(x, r, market) {
    const m0 = r ? r.market : (market || 'KR');
    const m = marketOf(m0);
    openModal(r ? `Edit authorization · ${x.model || x.name}` : `Add authorization · ${x.model || x.name}`, `<form class="form" data-form="reg" data-id="${x.id}" data-rid="${r ? r.id : ''}">
      <div class="grid2">
        ${r ? '' : `<label>Product<select name="pid">${catalog().map((p) => `<option value="${p.id}" ${p.id === x.id ? 'selected' : ''}>${esc(p.name)} (${esc(p.model)})</option>`).join('')}</select></label>`}
        <label>Market<select name="market" data-change="reg-market">${MARKETS.map((k) => `<option value="${k.id}" ${k.id === m0 ? 'selected' : ''}>${k.id} · ${esc(k.name)}</option>`).join('')}</select></label>
        <label>Authority<input name="authority" value="${esc(r ? r.authority : m.authority)}"></label>
        <label>Pathway<input name="pathway" list="reg-paths" value="${esc(r ? r.pathway : m.paths[0])}"><datalist id="reg-paths">${m.paths.map((p) => `<option value="${esc(p)}">`).join('')}</datalist></label>
        <label>Status<select name="status">${REG_STATUS.map((s) => `<option ${(r ? r.status : 'Planned') === s ? 'selected' : ''}>${s}</option>`).join('')}</select></label>
        <label>Number<input name="number" value="${esc(r ? r.number : '')}" placeholder="Licence / 510(k) / certificate no."></label>
        <label>Submitted<input type="date" name="submitted" value="${esc(r ? r.submitted : '')}"></label>
        <label>Approved<input type="date" name="approved" value="${esc(r ? r.approved : '')}"></label>
        <label>Expiry / renewal<input type="date" name="expiry" value="${esc(r ? r.expiry : '')}"></label>
        <label>Holder<input name="holder" value="${esc(r ? r.holder : x.manufacturer || '')}" placeholder="Manufacturer, MAH, importer…"></label>
      </div>
      <label>Notes<input name="notes" value="${esc(r ? r.notes : '')}"></label>
      <div class="form-actions">${r ? `<button class="btn outline" type="submit" name="op" value="delete">${icon('trash')}Delete</button>` : ''}<button class="btn outline" type="button" data-action="close-modal">Cancel</button><button class="btn primary" type="submit" name="op" value="save">Save</button></div></form>`);
  }

  /* ---------- Quality policy and objectives (ISO 13485 §5.3, §5.4.1) ---------- */
  function qms() {
    if (!db.qms) {
      const org = ORG ? ORG.name : 'our company';
      db.qms = {
        example: true,
        policy: {
          rev: '00', effective: '2026-09-22', approvedBy: ORG ? personName(ORG.demoUser.personId) : 'Top management',
          text: `${org} designs, develops and provides medical device products and services that are safe, effective and meet customer and applicable regulatory requirements.\n\nTo achieve this, we will:\n1. Comply with ISO 13485, KGMP, 21 CFR 820 (QMSR) and the regulations of every market we serve.\n2. Maintain and continually improve the effectiveness of our quality management system.\n3. Manage risk to patients and users throughout the product life cycle.\n4. Set measurable quality objectives and review them at every management review.\n5. Make sure every employee is competent, trained and aware of how their work affects product quality.`,
          history: [{ rev: '00', effective: '2026-09-22', change: 'Initial issue', by: ORG ? personName(ORG.demoUser.personId) : '' }]
        },
        objectives: [
          { id: uid(), title: 'Close customer complaints on time', kpi: 'Complaints closed within 30 days', target: 90, current: 92, unit: '%', dir: 'min', owner: 'RQ', due: '2026-12-31', clause: '8.2.2', freq: 'Monthly' },
          { id: uid(), title: 'Close CAPAs on time', kpi: 'CAPAs closed by due date', target: 85, current: 78, unit: '%', dir: 'min', owner: 'RQ', due: '2026-12-31', clause: '8.5.2', freq: 'Monthly' },
          { id: uid(), title: 'Complete the internal audit programme', kpi: 'Planned audits completed to date', target: 100, current: 100, unit: '%', dir: 'min', owner: 'RQ', due: '2026-12-31', clause: '8.2.4', freq: 'Quarterly' },
          { id: uid(), title: 'Keep people trained on current documents', kpi: 'Read & acknowledge completion', target: 95, current: null, unit: '%', dir: 'min', owner: 'Management', due: '2026-12-31', clause: '6.2', freq: 'Live', auto: 'acks' },
          { id: uid(), title: 'No major nonconformities at certification audit', kpi: 'Major findings', target: 0, current: 0, unit: '', dir: 'max', owner: 'Management', due: '2027-03-31', clause: '5.6', freq: 'Per audit' },
          { id: uid(), title: 'Release software on schedule', kpi: 'Releases shipped on planned date', target: 80, current: 83, unit: '%', dir: 'min', owner: Object.keys((ORG && ORG.departments) || { MDT: 1 }).find((k) => k !== 'RQ' && k !== 'Management') || 'MDT', due: '2026-12-31', clause: '7.3', freq: 'Per release' }
        ]
      };
      save();
    }
    return db.qms;
  }
  function objCurrent(o) {
    if (o.auto === 'acks' && ORG) {
      const revs = allDocs().map((d) => effRev(d)).filter((e) => e && !e.base && e.training);
      const need = revs.length * ORG.people.length; const done = revs.reduce((n, e) => n + e.acks.length, 0);
      return need ? Math.round(done / need * 100) : 100;
    }
    return o.current;
  }
  const objOk = (o) => { const c = objCurrent(o); if (c == null || c === '') return null; return o.dir === 'max' ? Number(c) <= Number(o.target) : Number(c) >= Number(o.target); };
  function viewPolicy() {
    const q = qms(); const p = q.policy;
    return shell(`
      ${pageHead('Quality Policy', `Rev.${esc(p.rev)} · effective ${fmt(p.effective)} · approved by ${esc(p.approvedBy)}${q.example ? ' · <span class="chip">Example text</span>' : ''}`,
        '<a href="#/dashboard">My Dashboard</a> / <a href="#/documents">Quality Documents</a> / Quality Policy',
        `<a class="btn outline" href="#/quality/objectives">${icon('star')}Quality Objectives</a><button class="btn primary" data-action="edit-policy">${icon('edit')}Revise policy</button>`)}
      <section class="doc-grid">
        <article class="card panel policy-card">
          <p class="lp-tag">${esc(ORG ? ORG.name : 'Quality policy')} · ISO 13485 §5.3</p>
          <div class="policy-text">${esc(p.text).split('\n').map((l) => l ? `<p>${l}</p>` : '').join('')}</div>
          <p class="policy-sign">— ${esc(p.approvedBy)}, ${fmt(p.effective)}</p>
        </article>
        <article class="card panel">
          <div class="panel-title"><h2>Revision history</h2></div>
          <ul class="plain">${p.history.map((h) => `<li><b>Rev.${esc(h.rev)}</b> · ${fmt(h.effective)} · ${esc(h.by)}<br><small class="muted">${esc(h.change)}</small></li>`).join('')}</ul>
          <h3>Linked</h3>
          <div class="chip-row">${(ORG ? allDocs().filter((d) => d.type === 'Manual').map((d) => `<a class="chip link" href="#/documents/${esc(d.id)}"><b>${esc(d.id)}</b> Quality manual</a>`) : []).join('')}<a class="chip link" href="#/quality/objectives"><b>§5.4.1</b> Quality objectives</a>${ORG && docById('PMR') ? '<a class="chip link" href="#/process/p/PMR"><b>PMR</b> Management review</a>' : ''}</div>
        </article>
      </section>`, 'documents:policy');
  }
  function viewObjectives() {
    const q = qms();
    const ok = q.objectives.filter((o) => objOk(o) === true).length;
    const risk = q.objectives.filter((o) => objOk(o) === false).length;
    const cards = q.objectives.map((o) => {
      const c = objCurrent(o); const st = objOk(o);
      const pct = o.dir === 'max' ? (Number(c) <= Number(o.target) ? 100 : 40) : Math.max(0, Math.min(100, Number(o.target) ? Number(c) / Number(o.target) * 100 : 100));
      return `<article class="card obj-card">
        <div class="obj-top"><span class="chip">§${esc(o.clause)}</span>${st == null ? '<span class="status s-Soon">No data</span>' : st ? '<span class="status r-Approved">On track</span>' : '<span class="status r-Suspended">At risk</span>'}</div>
        <h3>${esc(o.title)}</h3>
        <p class="muted small">${esc(o.kpi)}</p>
        <div class="obj-num"><strong>${c == null ? '—' : esc(c)}${esc(o.unit)}</strong><span class="muted">target ${o.dir === 'max' ? '≤' : '≥'} ${esc(o.target)}${esc(o.unit)}</span></div>
        <div class="obj-bar ${st === false ? 'bad' : ''}"><i style="width:${pct}%"></i></div>
        <p class="obj-meta"><span>${esc(deptName(o.owner))}</span><span>Due ${fmt(o.due)}</span><span>${o.auto ? 'Live from Qualixx' : esc(o.freq)}</span></p>
        <button class="btn outline sm" data-action="edit-obj" data-id="${o.id}">${icon('edit')}${o.auto ? 'Edit' : 'Update'}</button>
      </article>`;
    }).join('');
    return shell(`
      ${pageHead('Quality Objectives', `Measurable objectives consistent with the quality policy, reviewed at management review (ISO 13485 §5.4.1, §5.6).${q.example ? ' <span class="chip">Example objectives</span>' : ''}`,
        '<a href="#/dashboard">My Dashboard</a> / <a href="#/documents">Quality Documents</a> / Quality Objectives',
        `<a class="btn outline" href="#/quality/policy">Quality Policy</a><button class="btn primary" data-action="new-obj">${icon('plus')}Add objective</button>`)}
      <section class="ws-kpis big card panel">
        <span><strong>${q.objectives.length}</strong><small>objectives</small></span>
        <span><strong class="ok-text">${ok}</strong><small>on track</small></span>
        <span><strong class="${risk ? 'late-text' : ''}">${risk}</strong><small>at risk</small></span>
        <span><strong>${fmt(q.objectives.map((o) => o.due).sort()[0])}</strong><small>next due</small></span>
      </section>
      <section class="obj-grid">${cards || '<div class="card empty"><p class="muted">No objectives yet.</p></div>'}</section>`, 'documents:objectives');
  }
  function objModal(o) {
    const depts = Object.keys((ORG && ORG.departments) || { RQ: 'Regulatory & Quality', Management: 'Management' });
    if (!depts.includes('Management')) depts.push('Management');
    openModal(o ? 'Update objective' : 'Add objective', `<form class="form" data-form="obj" data-id="${o ? o.id : ''}">
      <label>Objective<input name="title" required value="${esc(o ? o.title : '')}"></label>
      <label>KPI (how it is measured)<input name="kpi" required value="${esc(o ? o.kpi : '')}"></label>
      <div class="grid2">
        <label>Direction<select name="dir"><option value="min" ${!o || o.dir === 'min' ? 'selected' : ''}>At least (≥)</option><option value="max" ${o && o.dir === 'max' ? 'selected' : ''}>At most (≤)</option></select></label>
        <label>Unit<input name="unit" value="${esc(o ? o.unit : '%')}"></label>
        <label>Target<input name="target" type="number" step="any" required value="${esc(o ? o.target : '')}"></label>
        <label>Current value${o && o.auto ? ' <small class="hint">calculated automatically</small>' : ''}<input name="current" type="number" step="any" value="${esc(o ? (o.auto ? objCurrent(o) : o.current) : '')}" ${o && o.auto ? 'disabled' : ''}></label>
        <label>Owner<select name="owner">${depts.map((k) => `<option value="${esc(k)}" ${o && o.owner === k ? 'selected' : ''}>${esc(deptName(k))}</option>`).join('')}</select></label>
        <label>Due<input name="due" type="date" value="${esc(o ? o.due : addDays(90))}"></label>
        <label>ISO 13485 clause<input name="clause" value="${esc(o ? o.clause : '5.4.1')}"></label>
        <label>Measured<input name="freq" value="${esc(o ? o.freq : 'Monthly')}"></label>
      </div>
      <div class="form-actions">${o ? `<button class="btn outline" type="submit" name="op" value="delete">${icon('trash')}Delete</button>` : ''}<button class="btn outline" type="button" data-action="close-modal">Cancel</button><button class="btn primary" type="submit" name="op" value="save">Save</button></div></form>`);
  }
  function policyModal() {
    const p = qms().policy; const next = pad2(Number(p.rev) + 1);
    openModal(`Revise quality policy · Rev.${next}`, `<form class="form" data-form="policy">
      <label>Policy text<textarea name="text" rows="12">${esc(p.text)}</textarea></label>
      <label>What changed<input name="change" required placeholder="e.g. Add cybersecurity commitment"></label>
      <div class="grid2"><label>Effective date<input type="date" name="effective" value="${todayStr()}"></label>
      <label>Re-enter password (top management sign-off)<input name="password" type="password" required autocomplete="current-password"></label></div>
      <div class="form-actions"><button class="btn outline" type="button" data-action="close-modal">Cancel</button><button class="btn primary" type="submit">Sign &amp; issue Rev.${next}</button></div></form>`);
  }

  /* ---------- product standard (제품표준서 · KGMP / ISO 13485 §4.2.3 medical device file) ---------- */
  const PS_SECTIONS = [
    ['description', 'Description and structure', '모양 및 구조'],
    ['components', 'Components and configuration', '구성 (부품·소프트웨어 모듈·SOUP)'],
    ['materials', 'Raw materials', '원자재'],
    ['specs', 'Performance and safety specifications', '성능 및 안전 기준'],
    ['environment', 'Operating environment', '사용·운영 환경'],
    ['process', 'Manufacturing method', '제조 방법'],
    ['inspection', 'Inspection and test method', '시험 검사 방법'],
    ['storage', 'Storage and shelf life', '저장 방법 및 사용 기간'],
    ['packaging', 'Packaging and labelling', '포장 및 표시기재'],
    ['service', 'Installation and servicing', '설치 및 서비스']
  ];
  const PS_SEED = {
    'QX-CXR': { status: 'Approved', rev: '01', approvedBy: 'MinYong Choi', approvedAt: '2026-09-30T09:00:00.000Z',
      description: 'Standalone software (SaMD) installed on a hospital server. It receives chest X-ray images from PACS via DICOM and returns suspected nodule regions as overlay marks with a confidence score.',
      components: '- Analysis engine (deep-learning detection model v3.2)\n- DICOM gateway (receive / send)\n- Web viewer\n- Administration console\nSOUP: Python 3.11, PyTorch 2.x, DCMTK 3.6, PostgreSQL 15',
      materials: 'Not applicable (software only).',
      specs: [['Sensitivity (nodule detection)', '≥ 90 % (95 % CI lower bound ≥ 85 %)', 'Clinical performance test VR-001'], ['Specificity', '≥ 80 %', 'VR-001'], ['Processing time', '≤ 20 s per image', 'Performance test PT-02'], ['DICOM conformance', 'DICOM 3.0 Storage SCP/SCU', 'Conformance test DC-01'], ['Cybersecurity', 'TLS 1.2+, role-based access, audit log', 'Security test SEC-TR-01']],
      environment: 'Server: Ubuntu 22.04 LTS, NVIDIA GPU with 16 GB+, 32 GB RAM. Viewer: Chrome 120 or later. Hospital LAN connected to PACS.',
      process: 'Source code under version control → automated build → unit and integration tests → release review (IEC 62304 §5.8) → signed installation package with SHA-256 checksum.',
      inspection: 'Release test per version: installation verification, regression suite 100 % pass, checksum verification, label (About screen) check.',
      storage: 'Not applicable (no physical product). Each major version is supported for 5 years after release.',
      packaging: 'Electronic delivery (download). Label shown on the About screen and in the electronic IFU.',
      service: 'Installation and validation on site by a trained engineer. Updates delivered through the validated update procedure.' },
    'QX-ECG': { status: 'Approved', rev: '02', approvedBy: 'MinYong Choi', approvedAt: '2026-06-15T09:00:00.000Z',
      description: 'Single-use adhesive patch (95 × 45 × 8 mm, 18 g) with an integrated recorder, worn on the chest for up to 7 days. Recordings are uploaded through the companion app and analysed by the arrhythmia detection software.',
      components: '- Patch recorder (electrodes, analogue front end, MCU, Bluetooth LE, battery)\n- Companion mobile app (iOS / Android)\n- Analysis server software v2.1\nSOUP: FreeRTOS 10, Nordic SoftDevice S140',
      materials: '- Electrode: Ag/AgCl with hydrogel (ISO 10993-5, -10 tested)\n- Housing: polycarbonate\n- Adhesive layer: medical-grade acrylic on polyurethane film\n- Battery: Li-MnO2 coin cell 3 V',
      specs: [['ECG frequency response', '0.67–40 Hz', 'IEC 60601-2-47'], ['Recording duration', '≥ 7 days continuous', 'Battery life test BT-01'], ['Arrhythmia detection (AF)', 'Sensitivity ≥ 95 %, PPV ≥ 90 %', 'Database test (MIT-BIH AF)'], ['Ingress protection', 'IP24', 'IEC 60529'], ['Electrical safety / EMC', 'Type CF, battery powered', 'IEC 60601-1, IEC 60601-1-2'], ['Biocompatibility', 'Surface device, skin, ≤ 30 days', 'ISO 10993-1, -5, -10']],
      environment: 'Home or hospital, 5–40 °C, 15–93 % RH. Companion app on iOS 16+ / Android 12+.',
      process: 'SMT assembly → firmware programming → functional test → patch lamination → pouch sealing → labelling (UDI, LOT, expiry) → final inspection.',
      inspection: '100 % functional test (signal, Bluetooth, battery voltage). Lot sampling per ISO 2859-1 (AQL 0.65) for adhesion and seal strength.',
      storage: '15–30 °C, 30–85 % RH, away from direct sunlight. Shelf life 18 months in the sealed pouch.',
      packaging: 'Individually sealed pouch; 10 pouches per box. Label shows product name, model, UDI, LOT, expiry date, manufacturer and symbols (ISO 15223-1).',
      service: 'Single use; no servicing. Software updates for the app and server through the validated update procedure.' },
    'QX-DRS': { status: 'Draft', rev: '00',
      description: 'Standalone software (SaMD) that analyses colour fundus photographs and classifies them as referable or non-referable diabetic retinopathy.',
      components: '- Image quality gate\n- Classification model v0.9 (convolutional neural network)\n- Report generator (PDF)\n- Cloud API',
      materials: 'Not applicable (software only).',
      specs: [['Sensitivity (referable DR)', '≥ 87 %', 'Clinical trial CT-DRS-01 (planned)'], ['Specificity', '≥ 90 %', 'CT-DRS-01 (planned)'], ['Ungradable image detection', '≥ 95 % agreement with graders', 'Image quality study IQ-01'], ['Processing time', '≤ 30 s per eye', 'Performance test PT-01']],
      environment: 'Cloud service (Republic of Korea region). Supported fundus cameras listed in the IFU. Browser: Chrome 120+.',
      process: 'Model training and locking under the AI development procedure (PAI) → build → verification → release review.',
      inspection: 'To be defined before design verification.',
      storage: 'Not applicable (software only).',
      packaging: 'Electronic delivery. Label on the About screen and in the report footer.',
      service: 'Hosted service; updates through the change control procedure.' }
  };
  function stdOf(x) {
    if (!x.standard) {
      const seed = PS_SEED[x.example ? x.model : ''] || {};
      const st = { docNo: `PS-${x.model || 'PRODUCT'}`, rev: seed.rev || '00', status: seed.status || 'Draft', approvedBy: seed.approvedBy || '', approvedAt: seed.approvedAt || '', history: [] };
      PS_SECTIONS.forEach(([k]) => { st[k] = seed[k] || (k === 'specs' ? [] : ''); });
      if (seed.status === 'Approved') st.history.push({ rev: st.rev, at: st.approvedAt, by: st.approvedBy, change: st.rev === '00' ? 'Initial issue' : 'Revision (example)' });
      x.standard = st; save();
    }
    return x.standard;
  }
  const psBadge = (st) => `<span class="status ${st.status === 'Approved' ? 's-Approved' : st.status === 'In Review' ? 's-InReview' : 's-Draft'}">${esc(st.status)}</span>`;
  const todo = '<span class="muted">To be completed</span>';
  const para = (t) => t ? esc(t).split('\n').map((l) => `<p>${l}</p>`).join('') : todo;
  function psTab(x) {
    const st = stdOf(x);
    const rf = riskFilesFor(x);
    const sec = PS_SECTIONS.map(([k, en, kr], i) => {
      const n = i + 2;
      if (k === 'specs') return `<h3>${n}. ${en} <small>${kr}</small></h3>${st.specs.length ? `<div class="table-wrap"><table class="table compact"><thead><tr><th>Item</th><th>Specification</th><th>Test method / standard</th></tr></thead><tbody>${st.specs.map((r) => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('')}</tbody></table></div>` : todo}`;
      if (k === 'packaging') return `<h3>${n}. ${en} <small>${kr}</small></h3>${para(st[k])}<p class="muted small">Label content: <a href="#/products/${x.id}/label">${esc(x.labelRef || 'Label tab')}</a></p>`;
      return `<h3>${n}. ${en} <small>${kr}</small></h3>${para(st[k])}`;
    }).join('');
    return `<div class="panel-head no-print"><p class="muted">Product standard (제품표준서) — the device master record required by KGMP and ISO 13485 §4.2.3.</p>
      <div class="head-actions"><button class="btn outline sm" data-action="print">${icon('print')}Print / PDF</button><button class="btn outline sm" data-action="edit-ps" data-id="${x.id}">${icon('edit')}Edit</button>${st.status !== 'Approved' ? `<button class="btn primary sm" data-action="approve-ps" data-id="${x.id}">Approve</button>` : ''}</div></div>
      <article class="card panel report ps-doc">
        <header class="report-head"><h1>Product Standard <small>제품표준서</small></h1>
          <table class="kv"><tr><th>Document no.</th><td>${esc(st.docNo)}</td><th>Revision</th><td>Rev.${esc(st.rev)} ${psBadge(st)}</td></tr>
          <tr><th>Approved by</th><td>${esc(st.approvedBy) || '—'}</td><th>Approved</th><td>${st.approvedAt ? fmt(st.approvedAt) : '—'}</td></tr></table></header>
        <h3>1. General information <small>일반 정보</small></h3>
        <table class="kv">
          <tr><th>Product name</th><td>${esc(x.name)}</td></tr><tr><th>Model</th><td>${esc(x.model)}</td></tr>
          <tr><th>Device class / SW safety class</th><td>${esc(x.deviceClass) || '—'} / ${esc(x.swClass) || '—'}</td></tr>
          <tr><th>Software version</th><td>${esc(x.swVersion) || '—'}</td></tr><tr><th>UDI-DI</th><td>${esc(x.udi) || '—'}</td></tr>
          <tr><th>Licence / certification no.</th><td>${esc(x.licenseNo) || '—'}</td></tr>
          <tr><th>Manufacturer</th><td>${esc(x.manufacturer) || '—'}</td></tr>
          <tr><th>Intended use</th><td>${esc(x.intendedUse) || '—'}</td></tr>
        </table>
        <p class="muted small">Section 1 is taken from the product information and label, so it is always in step with them.</p>
        ${sec}
        <h3>${PS_SECTIONS.length + 2}. Related records <small>관련 문서</small></h3>
        <ul class="plain">
          <li>Risk management file: ${rf.length ? rf.map((r) => `<a href="#/process/risk/${r.id}/overview">${esc(r.model)} (${esc(r.review.status)})</a>`).join(', ') : '<span class="muted">none yet</span>'}</li>
          <li>Market authorizations: ${regsOf(x).map((r) => `${esc(r.market)} ${esc(r.status)}`).join(' · ') || '<span class="muted">none</span>'}</li>
          ${ORG && docById('PDD') ? '<li>Design and development procedure: <a href="#/documents/PDD">PDD</a></li>' : ''}
        </ul>
        ${st.history.length ? `<h3>Revision history</h3><div class="table-wrap"><table class="table compact"><thead><tr><th>Rev.</th><th>Approved</th><th>By</th><th>Change</th></tr></thead><tbody>${st.history.map((h) => `<tr><td>Rev.${esc(h.rev)}</td><td>${fmt(h.at)}</td><td>${esc(h.by)}</td><td>${esc(h.change)}</td></tr>`).join('')}</tbody></table></div>` : ''}
      </article>`;
  }
  function viewStandards() {
    const list = catalog();
    return shell(`
      ${pageHead('Product Standards', 'Product standard (제품표준서 / device master record) for every product.', '<a href="#/dashboard">My Dashboard</a> / <a href="#/products">Products</a> / Product Standards')}
      <section class="card table-card">${list.length ? `<div class="table-wrap"><table class="table">
        <thead><tr><th>Product</th><th>Document no.</th><th>Revision</th><th>Status</th><th>Approved</th><th>Completeness</th></tr></thead>
        <tbody>${list.map((x) => { const st = stdOf(x); const done = PS_SECTIONS.filter(([k]) => k === 'specs' ? st.specs.length : (st[k] || '').trim()).length;
          return `<tr class="clickable" data-href="#/products/${x.id}/standard"><td><span class="prod"><span class="thumb">${esc(initials(x.model || x.name))}</span><span><strong>${esc(x.name)}</strong><small>${esc(x.model)}</small></span></span></td>
          <td class="mono small">${esc(st.docNo)}</td><td>Rev.${esc(st.rev)}</td><td>${psBadge(st)}</td><td><small>${st.approvedAt ? fmt(st.approvedAt) : '—'}</small></td>
          <td><div class="obj-bar"><i style="width:${Math.round(done / PS_SECTIONS.length * 100)}%"></i></div><small class="muted">${done} / ${PS_SECTIONS.length} sections</small></td></tr>`; }).join('')}</tbody></table></div>`
        : '<div class="empty"><p class="muted">No products yet.</p></div>'}</section>`, 'products:standards');
  }
  function psModal(x) {
    const st = stdOf(x);
    openModal(`Edit product standard · ${x.model}`, `<form class="form" data-form="ps" data-id="${x.id}">
      <p class="muted small">Section 1 (general information) comes from the product information. Saving an approved standard starts a new draft revision.</p>
      ${PS_SECTIONS.map(([k, en, kr]) => k === 'specs'
        ? `<label>${en} <small class="hint">${kr} · one per line: item | specification | test method</small><textarea name="specs" rows="6" class="mono">${esc(st.specs.map((r) => r.join(' | ')).join('\n'))}</textarea></label>`
        : `<label>${en} <small class="hint">${kr}</small><textarea name="${k}" rows="3">${esc(st[k])}</textarea></label>`).join('')}
      <div class="form-actions"><button class="btn outline" type="button" data-action="close-modal">Cancel</button><button class="btn primary" type="submit">Save draft</button></div></form>`);
  }
  function psApproveModal(x) {
    const st = stdOf(x);
    openModal(`Approve product standard · ${st.docNo} Rev.${st.rev}`, `<form class="form" data-form="ps-approve" data-id="${x.id}">
      <label>What changed<input name="change" required value="${st.history.length ? '' : 'Initial issue'}"></label>
      <label>Re-enter password<input name="password" type="password" required autocomplete="current-password"></label>
      <div class="form-actions"><button class="btn outline" type="button" data-action="close-modal">Cancel</button><button class="btn primary" type="submit">Sign &amp; approve</button></div></form>`);
  }

  /* ---------- settings ---------- */
  function viewSettings() {
    const s2 = getSession();
    return shell(`
      ${pageHead('Settings', 'Preferences for your account.', '<a href="#/dashboard">My Dashboard</a> / Settings')}
      <section class="card panel">
        <div class="panel-title"><h2>Display language</h2><p class="muted">Choose the language for menus, buttons and messages. Content you enter — documents, products and records — stays in the language it was written in.</p></div>
        <div class="lang-grid" role="radiogroup" aria-label="Display language">${I18N.LANGS.map((l) => `<button class="lang-card ${I18N.lang === l.id ? 'on' : ''}" role="radio" aria-checked="${I18N.lang === l.id}" data-action="set-lang" data-l="${l.id}"><span class="lc-check">${I18N.lang === l.id ? '✓' : ''}</span><span class="no-tr"><strong>${esc(l.native)}</strong><small>${esc(l.name)}</small></span></button>`).join('')}</div>
        <p class="muted small">Dates follow the selected language.</p>
        <p class="muted small">Demo: the choice is saved in this browser. In the live service it is saved to your account and your organization can set a default.</p>
      </section>
      <section class="card panel" style="margin-top:16px">
        <div class="panel-title"><h2>Account</h2></div>
        <table class="kv">
          <tr><th>Name</th><td class="no-tr">${esc(s2.name)}</td></tr>
          <tr><th>Role</th><td class="no-tr">${esc(s2.role)}</td></tr>
          <tr><th>Email</th><td class="no-tr">${esc(s2.email)}</td></tr>
          ${ORG ? `<tr><th>Organization</th><td class="no-tr">${esc(ORG.name)} ${ORG.nameKr ? '· ' + esc(ORG.nameKr) : ''}</td></tr>` : ''}
        </table>
      </section>`, 'settings');
  }

  /* ---------- quick search (Ctrl+K) ---------- */
  function searchIndex() {
    const out = [];
    if (ORG) {
      ORG.groups.forEach((g) => g.codes.forEach((c) => out.push({ kind: 'Process', label: `${c} · ${procName(c)}`, sub: (docById(c) || {}).kr || '', href: procHref(c) })));
      allDocs().filter((d) => d.type !== 'Procedure').forEach((d) => out.push({ kind: d.type, label: `${d.id} · ${d.en}`, sub: d.kr, href: `#/documents/${d.id}` }));
      ORG.people.forEach((x) => out.push({ kind: 'Person', label: x.name, sub: x.title, href: '#/people' }));
    }
    catalog().forEach((x) => out.push({ kind: 'Product', label: `${x.name} ${x.model}`, sub: x.swVersion ? 'v' + x.swVersion : '', href: `#/products/${x.id}` }));
    db.products.forEach((r) => out.push({ kind: 'Risk file', label: `${r.name} ${r.model}`, sub: r.review.status, href: `#/process/risk/${r.id}/overview` }));
    [['My Dashboard', '#/dashboard'], ['Quality Policy', '#/quality/policy'], ['Quality Objectives', '#/quality/objectives'], ['My Tasks', '#/tasks'], ['Document Control', '#/process/doc-control'], ['Products', '#/products'], ['Market Authorizations', '#/products/registrations'], ['Product Standards', '#/products/standards'], ['Labels & UDI', '#/products/labels'],  ['Quality Documents', '#/documents'], ['Process Map', '#/process'], ['Risk Management', '#/process/risk'], ['People', '#/people'], ['Messages', '#/messages'], ['Settings', '#/settings'], ['About Qualixx', '#/about']]
      .forEach(([l, h]) => out.push({ kind: 'Page', label: l, sub: '', href: h }));
    return out;
  }
  let searchSel = 0;
  function openSearch() {
    modalRoot.innerHTML = `<div class="modal-bg" data-action="close-modal"></div>
      <div class="modal palette" role="dialog" aria-modal="true" aria-label="Search">
        <label class="palette-input">${icon('search')}<input id="palette-q" placeholder="Search processes, documents, forms, products, people…" autocomplete="off" aria-label="Search"><kbd>Esc</kbd></label>
        <div id="palette-results" class="palette-results"></div>
      </div>`;
    I18N.tr(modalRoot); searchSel = 0; renderSearch('');
    const i = document.getElementById('palette-q'); if (i) i.focus();
  }
  function renderSearch(q) {
    const box = document.getElementById('palette-results'); if (!box) return;
    q = q.trim().toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    let res = searchIndex().filter((r) => terms.every((t) => (r.label + ' ' + r.sub + ' ' + r.kind).toLowerCase().includes(t)));
    if (!q) res = res.filter((r) => r.kind === 'Page' || r.kind === 'Process').slice(0, 12); else res = res.slice(0, 30);
    searchSel = Math.min(searchSel, Math.max(0, res.length - 1));
    box.innerHTML = res.length ? res.map((r, i) => `<a class="palette-item ${i === searchSel ? 'sel' : ''}" href="${r.href}" data-i="${i}"><span class="pk">${esc(r.kind)}</span><span><strong>${esc(r.label)}</strong>${r.sub ? `<small class="muted">${esc(r.sub)}</small>` : ''}</span></a>`).join('')
      : '<p class="muted palette-empty">No matches.</p>';
    I18N.tr(box);
  }

  /* ---------- About Qualixx (the software's own label) ---------- */
  function viewAbout() {
    const a = QX.APP;
    return shell(`
      ${pageHead('About Qualixx', 'Identification of this software. Use it in your software validation and when contacting support.', '<a href="#/dashboard">My Dashboard</a> / About Qualixx')}
      <section class="doc-grid">
        <article class="card app-label" aria-label="Qualixx software label">
          <div class="al-head"><img src="logo.svg" alt="" width="44" height="44"><span><strong>${esc(a.product)}</strong><small>Version ${esc(a.version)} · Build ${esc(a.build)}</small></span><span class="status s-Draft">${esc(a.channel)}</span></div>
          <dl>
            <dt>Software version</dt><dd class="mono">${esc(a.version)} (build ${esc(a.build)})</dd>
            <dt>Release date</dt><dd>${fmt(a.releaseDate)}</dd>
            <dt>Manufacturer</dt><dd>${esc(a.manufacturer)}<br><small class="muted">${esc(a.address)}</small></dd>
            <dt>Intended use</dt><dd>${esc(a.intendedUse)}</dd>
            <dt>Regulatory status</dt><dd>${esc(a.notMedicalDevice)}</dd>
            <dt>Supported standards</dt><dd>${a.standards.map((x) => `<span class="chip">${esc(x)}</span>`).join(' ')}</dd>
            <dt>Website</dt><dd><a href="${esc(a.website)}" target="_blank" rel="noopener">${esc(a.website.replace('https://', ''))}</a></dd>
            <dt>Support</dt><dd><span class="mono">${esc(a.support)}</span></dd>
          </dl>
        </article>
        <article class="card panel">
          <div class="panel-title"><h2>Validation</h2></div>
          <p class="muted">${esc(a.validation)}</p>
          <div class="panel-title"><h2>Release notes</h2></div>
          <ul class="releases">${a.releases.map((r) => `<li><span class="mono">v${esc(r.version)}</span><small class="muted">${fmt(r.date)}</small><p>${esc(r.notes)}</p></li>`).join('')}</ul>
        </article>
      </section>`, 'about');
  }

  /* ---------- login ---------- */
  function viewLogin() {
    const u = DEMO_USERS()[0];
    return `
    <div class="login-wrap">
      <section class="login-card card">
        ${ORG ? orgBrand().replace('class="org-brand"', 'class="org-brand big"') : '<div class="side-brand big"><span class="logo">Q</span>Qualixx</div>'}
        <h1>Sign in to your workspace</h1>
        <p class="muted">Medical device QMS automation — starting with Risk Management (ISO 14971).</p>
        <form data-form="login" class="form" autocomplete="on">
          <label>Email<input name="email" type="email" required autocomplete="username" placeholder="name@company.com"></label>
          <label>Password<input name="password" type="password" required autocomplete="current-password"></label>
          <p class="error" id="login-error" hidden>Incorrect email or password.</p>
          <button class="btn primary block" type="submit">Sign in</button>
        </form>
        <div class="demo-account">
          <span><strong>Demo account</strong><br>${esc(u.email)} · ${esc(u.password)}</span>
          <button class="btn outline sm" data-action="fill-demo">Fill in</button>
        </div>
      </section>
      <div class="lang-switch no-tr" role="group" aria-label="Language">${I18N.LANGS.map((l) => `<button class="${I18N.lang === l.id ? 'on' : ''}" data-action="set-lang" data-l="${l.id}">${esc(l.native)}</button>`).join('')}</div>
      <p class="foot muted">${esc(QX.APP.product)} v${esc(QX.APP.version)} · Build ${esc(QX.APP.build)} · © Qualixx · <a href="https://qualixx.ai">qualixx.ai</a></p>
    </div>`;
  }

  /* ---------- dashboard ---------- */
  let tableFilter = 'All';
  let searchText = '';

  function miniBars(values, highlight) {
    const max = Math.max(1, ...values);
    const any = values.some((v) => v > 0);
    return `<div class="minibars" aria-hidden="true">${values.map((v, i) => `<i class="${any && i === highlight ? 'hi' : ''}" style="height:${Math.max(6, Math.round(v / max * 100))}%"></i>`).join('')}</div>`;
  }

  function filesTable(limit) {
    let list = db.products.slice().sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
    if (tableFilter !== 'All') list = list.filter((p) => p.review.status === tableFilter);
    if (searchText) list = list.filter((p) => (p.name + ' ' + p.model).toLowerCase().includes(searchText.toLowerCase()));
    const count = (st) => db.products.filter((p) => st === 'All' || p.review.status === st).length;
    const rows = list.slice(0, limit || 999).map((p) => {
      const st = stats(p);
      const ck = checks(p);
      const done = ck.filter((c) => c.ok).length;
      return `<tr>
        <td class="cb"><input type="checkbox" aria-label="Select ${esc(p.name)}"></td>
        <td><a href="#/process/risk/${p.id}/overview" class="prod"><span class="thumb">${esc(initials(p.model || p.name))}</span><span><strong>${esc(p.name)}</strong><small>${esc(p.model)}${p.version ? ' · v' + esc(p.version) : ''}</small></span></a></td>
        <td><span class="pill">${icon('risk')}${st.hazards}</span></td>
        <td><span class="pill">${st.initUnacc}</span></td>
        <td><span class="pill ${st.resUnacc ? 'bad' : 'good'}">${st.resUnacc}</span></td>
        <td><div class="mini-progress"><i style="width:${Math.round(done / ck.length * 100)}%"></i></div><small>${done}/${ck.length}</small></td>
        <td><span class="status s-${esc(p.review.status)}">${esc(p.review.status)}</span></td>
        <td><small>${fmt(p.updatedAt)}</small></td>
        <td class="actions"><a class="icon-btn" href="#/process/risk/${p.id}/overview" title="Open">${icon('open')}</a><button class="icon-btn" data-action="delete-product" data-id="${p.id}" title="Delete">${icon('trash')}</button></td>
      </tr>`;
    }).join('');
    return `
      <section class="card table-card">
        <div class="table-top">
          <div class="seg" role="tablist">
            ${['All', 'Draft', 'Approved'].map((t) => `<button role="tab" aria-selected="${tableFilter === t}" class="${tableFilter === t ? 'on' : ''}" data-action="filter" data-f="${t}">${t} <span>${count(t)}</span></button>`).join('')}
          </div>
          <button class="btn primary sm" data-action="new-product">${icon('plus')}New File</button>
        </div>
        ${list.length ? `<div class="table-wrap"><table class="table">
          <thead><tr><th class="cb"></th><th>Product</th><th>Hazards</th><th>Initial unacc.</th><th>Residual unacc.</th><th>Completion</th><th>Status</th><th>Updated</th><th class="actions">Action</th></tr></thead>
          <tbody>${rows}</tbody></table></div>` : `<div class="empty"><p class="muted">${db.products.length ? 'No files match this view.' : 'No risk management files yet. Create one or load the sample.'}</p>${db.products.length ? '' : `<button class="btn outline sm" data-action="load-sample">Load sample</button>`}</div>`}
      </section>`;
  }

  function orgStrip() {
    const n = (t) => allDocs().filter((d) => d.type === t).length;
    return `<section class="org-strip">
      <a class="card strip-item" href="#/documents"><span class="process-ic">${icon('doc')}</span><span><strong>${allDocs().length} quality documents</strong><small class="muted">${n('Manual')} manual · ${n('Procedure')} procedures · ${n('Form')} forms</small></span></a>
      <a class="card strip-item" href="#/process"><span class="process-ic">${icon('process')}</span><span><strong>${ORG.groups.reduce((a, g) => a + g.codes.length, 0)} processes</strong><small class="muted">${ORG.groups.length} groups · Risk Management live</small></span></a>
      <a class="card strip-item" href="#/people"><span class="process-ic">${icon('users')}</span><span><strong>${ORG.people.length} people</strong><small class="muted">Chat or email your team</small></span></a>
    </section>`;
  }
  function viewDashboard() {
    const all = db.products.map(stats);
    const sum = (k) => all.reduce((n, x) => n + x[k], 0);
    const hazards = db.products.flatMap((p) => p.hazards);
    const bySev = [1, 2, 3, 4, 5].map((s) => hazards.filter((h) => h.s === s).length);
    const byCat = {};
    hazards.forEach((h) => { byCat[h.category] = (byCat[h.category] || 0) + 1; });
    const topCats = Object.entries(byCat).sort((a, b) => b[1] - a[1]).slice(0, 2);
    const unaccPct = sum('hazards') ? Math.round(sum('initUnacc') / sum('hazards') * 100) : 0;
    const byFile = db.products.map((p) => stats(p).ctlDone);
    const s = getSession();
    return shell(`
      ${pageHead('My Dashboard', `Welcome back, ${esc(s.name)}. This view shows what your role (${esc(s.role)}) can access.`)}
      ${tasksCard()}
      <section class="dash-grid">
        <article class="card report-card">
          <h2>Risk Management</h2>
          <p class="muted">Build ISO 14971 risk files step by step — from hazard analysis to an approved report.</p>
          <div class="btn-row">
            <a class="btn primary" href="#/process/risk">Open Risk Management ${icon('open')}</a>
            <button class="btn outline" data-action="load-sample">Load sample</button>
          </div>
        </article>
        <article class="card kpi-card">
          <div class="kpi-top"><span>Hazards identified</span>${icon('more', 'muted')}</div>
          <strong class="kpi-num">${sum('hazards')}</strong>
          <div class="chips">${topCats.length ? topCats.map(([c, n]) => `<span class="chip"><b>${n}</b> ${esc(c)}</span>`).join('') : '<span class="chip">No data yet</span>'}</div>
          ${miniBars(bySev, bySev.indexOf(Math.max(...bySev)))}
          <div class="kpi-foot"><span class="delta ${unaccPct ? 'down' : 'up'}">${unaccPct}%</span><small class="muted">initially unacceptable</small></div>
        </article>
        <article class="card kpi-card">
          <div class="kpi-top"><span>Controls verified</span>${icon('more', 'muted')}</div>
          <strong class="kpi-num">${sum('ctlDone')}<small> / ${sum('ctl')}</small></strong>
          <div class="chips"><span class="chip"><b>${sum('ctlImpl')}</b> Implementation</span><span class="chip"><b>${sum('ctlEff')}</b> Effectiveness</span></div>
          ${miniBars(byFile.length ? byFile : [0], byFile.length - 1)}
          <div class="kpi-foot"><span class="delta ${sum('resUnacc') ? 'down' : 'up'}">${sum('resUnacc')} residual</span><small class="muted">unacceptable residual risks</small></div>
        </article>
      </section>
      ${ORG ? orgStrip() : ''}
      <h2 class="section-title">Risk management files</h2>
      ${filesTable(8)}`, 'dashboard');
  }

  /* ---------- work process ---------- */
  function viewProcess() {
    if (ORG) return viewProcessMap();
    return shell(`
      ${pageHead('Work Process', 'Choose a quality process to work in.', '<a href="#/dashboard">My Dashboard</a> / Work Process')}
      <section class="process-grid">
        ${PROCESSES.map((m) => `
          <${m.live ? `a href="#/process/${m.id}"` : 'div aria-disabled="true"'} class="card process ${m.live ? 'live' : 'off'}">
            <span class="process-ic">${icon(m.icon)}</span>
            <span class="process-head"><strong>${m.name}</strong>${m.live ? '<span class="status s-Approved">Available</span>' : `<span class="status s-Soon">${m.tag}</span>`}</span>
            <small class="std">${m.std}</small>
            <span class="desc">${m.desc}</span>
          </${m.live ? 'a' : 'div'}>`).join('')}
      </section>`, 'process');
  }

  function viewHelp() {
    return shell(`
      ${pageHead('Help', 'How this demo works.', '<a href="#/dashboard">My Dashboard</a> / Help')}
      <section class="card panel prose">
        <h3>Flow</h3>
        <ol><li>Dashboard → Work Process → Risk Management.</li><li>Create a risk management file (or load the sample) and follow the steps: Overview → Plan → Safety characteristics → Risk analysis → Risk control → Review &amp; approval.</li><li>Open Report to print or save the risk management report as PDF.</li></ol>
        <h3>Data</h3>
        <p>This is a front-end demo. Everything is stored only in this browser's local storage. Clearing browser data removes it. Do not enter confidential information.</p>
        <h3>Standards</h3>
        <p>Steps follow ISO 14971:2019 clauses 4–9. Question and hazard lists are short summaries written for this demo, not the standard text.</p>
      </section>`, 'help');
  }

  function viewRiskList() {
    return shell(`
      ${pageHead('Risk Management', 'Create and manage ISO 14971 risk management files per product.', '<a href="#/dashboard">My Dashboard</a> / <a href="#/process">Work Process</a> / Risk Management',
        `<button class="btn outline" data-action="load-sample">Load sample</button><button class="btn primary" data-action="new-product">${icon('plus')}New File</button>`)}
      ${filesTable()}`, 'risk');
  }

  /* ---------- risk file detail ---------- */
  const TABS = [
    { id: 'overview', name: 'Overview', clause: '5.2' },
    { id: 'plan', name: 'Plan', clause: '4.4' },
    { id: 'char', name: 'Safety Characteristics', clause: '5.3' },
    { id: 'analysis', name: 'Risk Analysis', clause: '5.4–6' },
    { id: 'control', name: 'Risk Control', clause: '7' },
    { id: 'review', name: 'Review & Approval', clause: '8–9' },
    { id: 'report', name: 'Report', clause: '' },
    { id: 'audit', name: 'Audit Trail', clause: '' }
  ];

  function viewProduct(p, tab) {
    const st = stats(p);
    const ck = checks(p);
    const done = ck.filter((c) => c.ok).length;
    const body = ({ overview: tabOverview, plan: tabPlan, char: tabChar, analysis: tabAnalysis, control: tabControl, review: tabReview, report: tabReport, audit: tabAudit }[tab] || tabOverview)(p);
    return shell(`
      ${pageHead(esc(p.name), `${esc(p.model)}${p.version ? ' · v' + esc(p.version) : ''}${p.deviceClass ? ' · ' + esc(p.deviceClass) : ''} · <span class="status s-${esc(p.review.status)}">${esc(p.review.status)}</span>`,
        `<a href="#/dashboard">My Dashboard</a> / <a href="#/process">Work Process</a> / <a href="#/process/risk">Risk Management</a> / ${esc(p.model || p.name)}`,
        `<div class="progress-box" title="ISO 14971 completion conditions"><span>Completion <b>${done}/${ck.length}</b></span><div class="bar"><i style="width:${Math.round(done / ck.length * 100)}%"></i></div><small class="muted">${st.hazards} hazards · ${st.ctlDone}/${st.ctl} controls verified</small></div>`)}
      <nav class="steps" aria-label="Risk management steps">
        ${TABS.map((t, i) => `<a href="#/process/risk/${p.id}/${t.id}" class="${t.id === tab ? 'on' : ''}">${i < 6 ? `<span class="num">${i + 1}</span>` : ''}${t.name}${t.clause ? `<small>§${t.clause}</small>` : ''}</a>`).join('')}
      </nav>
      <section class="card panel">${body}</section>`, 'risk');
  }

  function field(label, name, value, opts) {
    opts = opts || {};
    const req = opts.required ? 'required' : '';
    const input = opts.area
      ? `<textarea name="${name}" rows="${opts.rows || 3}" ${req} placeholder="${esc(opts.ph || '')}">${esc(value)}</textarea>`
      : `<input name="${name}" value="${esc(value)}" ${req} placeholder="${esc(opts.ph || '')}">`;
    return `<label class="${opts.wide ? 'wide' : ''}">${label}${opts.hint ? `<small class="hint">${opts.hint}</small>` : ''}${input}</label>`;
  }
  const h2 = (t, clause, sub) => `<div class="panel-title"><h2>${t}${clause ? ` <small>ISO 14971 §${clause}</small>` : ''}</h2>${sub ? `<p class="muted">${sub}</p>` : ''}</div>`;

  function tabOverview(p) {
    return `
      ${h2('Overview & intended use', '5.2', 'Record the intended use and reasonably foreseeable misuse — the starting point for hazard identification.')}
      <form data-form="overview" data-id="${p.id}" class="form grid2">
        ${field('Product name', 'name', p.name, { required: true })}
        ${field('Model', 'model', p.model)}
        ${field('Version', 'version', p.version)}
        ${field('Device class', 'deviceClass', p.deviceClass, { ph: 'e.g. Class II' })}
        ${field('Intended use', 'intendedUse', p.intendedUse, { area: true, wide: true, required: true })}
        ${field('Intended users', 'users', p.users)}
        ${field('Use environment', 'environment', p.environment)}
        ${field('Reasonably foreseeable misuse', 'misuse', p.misuse, { area: true, wide: true })}
        <div class="form-actions wide"><button class="btn primary" type="submit">Save</button></div>
      </form>`;
  }

  function matrixTable(p, editable) {
    const rows = QX.SEVERITY.slice().reverse().map((sv) => `
      <tr><th class="axis"><b>${sv.lv}</b> ${sv.name}</th>
      ${QX.PROBABILITY.map((pr) => {
        const k = `${sv.lv}-${pr.lv}`;
        const acc = p.matrix.accept[k];
        const n = p.hazards.filter((h) => h.s === sv.lv && h.p === pr.lv).length;
        return `<td><button type="button" class="cell ${acc ? 'acc' : 'unacc'}" ${editable ? `data-action="toggle-cell" data-id="${p.id}" data-key="${k}"` : 'disabled'} aria-label="Severity ${sv.lv}, probability ${pr.lv}: ${acc ? 'acceptable' : 'unacceptable'}">${acc ? 'Acceptable' : 'Unacceptable'}${n ? `<b>${n}</b>` : ''}</button></td>`;
      }).join('')}</tr>`).join('');
    return `<div class="table-wrap"><table class="matrix">
      <thead><tr><th class="axis">Severity \\ Probability</th>${QX.PROBABILITY.map((pr) => `<th><b>${pr.lv}</b> ${pr.name}<br><small>${pr.desc}</small></th>`).join('')}</tr></thead>
      <tbody>${rows}</tbody></table></div>`;
  }

  function tabPlan(p) {
    const pl = p.plan;
    return `
      ${h2('Risk management plan', '4.4')}
      <form data-form="plan" data-id="${p.id}" class="form grid2">
        ${field('Scope', 'scope', pl.scope, { area: true, wide: true })}
        ${field('Life-cycle phases', 'lifecycle', pl.lifecycle, { wide: true })}
        ${field('Risk management owner', 'owner', pl.owner, { required: true })}
        ${field('Team', 'team', pl.team)}
        ${field('Risk acceptability policy', 'acceptPolicy', pl.acceptPolicy, { area: true, wide: true, required: true, hint: 'Keep consistent with the matrix below' })}
        ${field('Verification activities', 'verification', pl.verification, { area: true, wide: true })}
        ${field('Production & post-production information', 'pms', pl.pms, { area: true, wide: true, hint: 'ISO 14971 §10' })}
        <div class="form-actions wide"><button class="btn primary" type="submit">Save plan</button></div>
      </form>
      <h3>Risk acceptability matrix</h3>
      <p class="muted">Click a cell to switch acceptable / unacceptable. The default (severity × probability ≤ 6) is an example — align it with your policy. Numbers show initial risks in each cell.</p>
      ${matrixTable(p, true)}
      <div class="defs">
        <div><h4>Severity</h4><ul>${QX.SEVERITY.map((s) => `<li><b>${s.lv} ${s.name}</b> ${s.desc}</li>`).join('')}</ul></div>
        <div><h4>Probability</h4><ul>${QX.PROBABILITY.map((s) => `<li><b>${s.lv} ${s.name}</b> ${s.desc}</li>`).join('')}</ul></div>
      </div>`;
  }

  function tabChar(p) {
    return `
      ${h2('Safety characteristics', '5.3', 'Answer the questions to capture characteristics that could affect safety. (Questions summarised from the ISO/TR 24971 Annex A categories.)')}
      <form data-form="char" data-id="${p.id}" class="form">
        ${QX.CHAR_QUESTIONS.map((q, i) => `<label>${i + 1}. ${esc(q.text)}<textarea name="${q.id}" rows="2" placeholder="Leave blank if not applicable">${esc(p.characteristics[q.id] || '')}</textarea></label>`).join('')}
        <div class="form-actions"><button class="btn primary" type="submit">Save</button></div>
      </form>`;
  }

  function tabAnalysis(p) {
    const rows = p.hazards.map((h) => `
      <tr>
        <td class="code">${esc(h.code)}</td>
        <td><span class="cat">${esc(h.category)}</span><br><strong>${esc(h.hazard)}</strong></td>
        <td><small>${esc(h.sequence)}</small></td>
        <td>${esc(h.situation)}</td>
        <td>${esc(h.harm)}</td>
        <td>${badge(p, h.s, h.p)}</td>
        <td class="actions"><button class="icon-btn" data-action="edit-hazard" data-id="${p.id}" data-hid="${h.id}" title="Edit">${icon('edit')}</button><button class="icon-btn" data-action="delete-hazard" data-id="${p.id}" data-hid="${h.id}" title="Delete">${icon('trash')}</button></td>
      </tr>`).join('');
    return `
      <div class="panel-head">${h2('Risk analysis & evaluation', '5.4, 5.5, 6', 'Record hazard → sequence of events → hazardous situation → harm, then estimate severity and probability. Acceptability is judged automatically from the plan matrix.')}
      <button class="btn primary" data-action="new-hazard" data-id="${p.id}">${icon('plus')}Add hazard</button></div>
      ${p.hazards.length ? `<div class="table-wrap"><table class="table">
        <thead><tr><th>ID</th><th>Hazard</th><th>Sequence of events</th><th>Hazardous situation</th><th>Harm</th><th>Initial risk</th><th class="actions">Action</th></tr></thead>
        <tbody>${rows}</tbody></table></div>
        <h3>Initial risk distribution</h3>${matrixTable(p, false)}` : `<div class="empty"><p class="muted">No hazards yet. Start from the hazard library.</p></div>`}`;
  }

  const sevOptions = (sel) => `<option value="">Select</option>` + QX.SEVERITY.map((s) => `<option value="${s.lv}" ${Number(sel) === s.lv ? 'selected' : ''}>${s.lv} ${s.name}</option>`).join('');
  const probOptions = (sel) => `<option value="">Select</option>` + QX.PROBABILITY.map((s) => `<option value="${s.lv}" ${Number(sel) === s.lv ? 'selected' : ''}>${s.lv} ${s.name}</option>`).join('');

  function tabControl(p) {
    if (!p.hazards.length) return `${h2('Risk control', '7')}<div class="empty"><p class="muted">Add hazards in Risk Analysis first.</p><a class="btn primary" href="#/process/risk/${p.id}/analysis">Go to Risk Analysis</a></div>`;
    const cards = p.hazards.map((h) => {
      const init = judge(p, h.s, h.p);
      const res = judge(p, h.rs, h.rp);
      const onlyInfo = h.controls.length && h.controls.every((c) => c.type === 'info');
      const ctlRows = h.controls.slice().sort((a, b) => ctlOrder(a.type) - ctlOrder(b.type)).map((c) => `
        <tr>
          <td><span class="ctype t-${c.type}">${ctlTypeName(c.type)}</span></td>
          <td>${esc(c.desc)}<br><small class="muted">Evidence: ${esc(c.verifyRef) || '—'}</small></td>
          <td class="center"><input type="checkbox" data-change="ctl-verified" data-id="${p.id}" data-hid="${h.id}" data-cid="${c.id}" ${c.verified ? 'checked' : ''} aria-label="Implementation verified"></td>
          <td class="center"><input type="checkbox" data-change="ctl-effective" data-id="${p.id}" data-hid="${h.id}" data-cid="${c.id}" ${c.effective ? 'checked' : ''} aria-label="Effectiveness verified"></td>
          <td class="actions"><button class="icon-btn" data-action="edit-control" data-id="${p.id}" data-hid="${h.id}" data-cid="${c.id}" title="Edit">${icon('edit')}</button><button class="icon-btn" data-action="delete-control" data-id="${p.id}" data-hid="${h.id}" data-cid="${c.id}" title="Delete">${icon('trash')}</button></td>
        </tr>`).join('');
      return `
      <article class="hz-card ${init === 'unacc' ? 'need' : ''}">
        <header>
          <div><span class="code">${esc(h.code)}</span> <strong>${esc(h.hazard)}</strong> <span class="muted">→ ${esc(h.harm)}</span></div>
          <div class="hz-badges"><span class="muted">Initial</span> ${badge(p, h.s, h.p)} ${h.controls.length ? `<span class="muted">Residual</span> ${badge(p, h.rs, h.rp)}` : ''}</div>
        </header>
        ${init === 'unacc' && !h.controls.length ? '<p class="alert">Unacceptable risk — a control measure is required.</p>' : ''}
        ${onlyInfo ? '<p class="alert soft">Controlled by information for safety only. Confirm that inherently safe design and protective measures were considered first (§7.1 priority).</p>' : ''}
        ${h.controls.length ? `<div class="table-wrap"><table class="table compact">
          <thead><tr><th>Type</th><th>Control measure</th><th class="center">Implementation</th><th class="center">Effectiveness</th><th class="actions">Action</th></tr></thead>
          <tbody>${ctlRows}</tbody></table></div>` : ''}
        <button class="btn outline sm" data-action="new-control" data-id="${p.id}" data-hid="${h.id}">${icon('plus')}Add control measure</button>
        ${h.controls.length ? `
        <div class="residual">
          <h4>Residual risk evaluation <small>§7.3</small></h4>
          <div class="inline">
            <label>Severity<select data-change="res-s" data-id="${p.id}" data-hid="${h.id}">${sevOptions(h.rs)}</select></label>
            <label>Probability<select data-change="res-p" data-id="${p.id}" data-hid="${h.id}">${probOptions(h.rp)}</select></label>
            <label class="check"><input type="checkbox" data-change="new-risk" data-id="${p.id}" data-hid="${h.id}" ${h.newRiskReviewed ? 'checked' : ''}> Risks from control measures reviewed <small>§7.5</small></label>
          </div>
          <label class="block-label">Review note<textarea rows="2" data-change="new-risk-note" data-id="${p.id}" data-hid="${h.id}" placeholder="e.g. No new risk introduced by the warning">${esc(h.newRiskNote)}</textarea></label>
          ${res === 'unacc' ? `<label class="block-label warn-text">Benefit-risk analysis <small>§7.4 · required for unacceptable residual risk</small><textarea rows="3" data-change="bra" data-id="${p.id}" data-hid="${h.id}" placeholder="Explain why the medical benefit outweighs this residual risk">${esc(h.bra)}</textarea></label>` : ''}
        </div>` : ''}
      </article>`;
    }).join('');
    return `${h2('Risk control', '7', 'Consider control options in priority order: inherently safe design → protective measures → information for safety. Link verification evidence and re-evaluate residual risk.')}${cards}`;
  }

  function tabReview(p) {
    const ck = checks(p);
    const allOk = ck.every((c) => c.ok);
    const o = p.overall;
    const s = getSession();
    return `
      ${h2('Overall residual risk', '8')}
      <form data-form="overall" data-id="${p.id}" class="form">
        ${field('Conclusion', 'conclusion', o.conclusion, { area: true, rows: 4, ph: 'Considering all residual risks together, is the overall residual risk acceptable relative to the medical benefit?' })}
        <fieldset class="radios"><legend>Overall residual risk</legend>
          <label><input type="radio" name="acceptable" value="Acceptable" ${o.acceptable === 'Acceptable' ? 'checked' : ''}> Acceptable</label>
          <label><input type="radio" name="acceptable" value="Not acceptable" ${o.acceptable === 'Not acceptable' ? 'checked' : ''}> Not acceptable</label>
        </fieldset>
        ${field('Significant residual risks to disclose', 'disclosure', o.disclosure, { area: true, ph: 'Residual risks to disclose in the IFU' })}
        <div class="form-actions"><button class="btn primary" type="submit">Save</button></div>
      </form>
      ${h2('Risk management review', '9', 'All conditions must be met before approval.')}
      <ul class="checks">${ck.map((c) => `<li class="${c.ok ? 'ok' : 'no'}"><span class="mark">${c.ok ? '✓' : '!'}</span><span>${esc(c.text)}</span><small>§${c.clause}</small></li>`).join('')}</ul>
      ${p.review.status === 'Approved' ? `
        <div class="approved"><div><strong>Approved</strong> · ${esc(p.review.approver)} · ${fmt(p.review.approvedAt, true)}${p.review.comment ? `<br><small>${esc(p.review.comment)}</small>` : ''}</div>
        <button class="btn outline sm" data-action="reopen" data-id="${p.id}">Start revision</button></div>` : `
        <form data-form="approve" data-id="${p.id}" class="form approve-form ${allOk ? '' : 'disabled'}">
          <h3>Approve with electronic signature</h3>
          <p class="muted">Signer: ${esc(s.name)} (${esc(s.role)}) · Meaning: approval of the risk management review</p>
          <label>Comment<input name="comment" placeholder="Optional"></label>
          <label>Re-enter password<input name="password" type="password" required autocomplete="current-password" ${allOk ? '' : 'disabled'}></label>
          <button class="btn primary" type="submit" ${allOk ? '' : 'disabled'}>Sign &amp; approve</button>
          ${allOk ? '' : '<p class="muted small">Resolve the open conditions first.</p>'}
        </form>`}`;
  }

  function tabReport(p) {
    const st = stats(p);
    const ck = checks(p);
    const verdict = (s, pr) => judge(p, s, pr) === 'acc' ? 'Acceptable' : 'Unacceptable';
    const hzRows = p.hazards.map((h) => `
      <tr><td>${esc(h.code)}</td><td>${esc(h.category)}<br>${esc(h.hazard)}</td><td>${esc(h.sequence)}</td><td>${esc(h.situation)}</td><td>${esc(h.harm)}</td>
      <td>${h.s ? `S${h.s}·P${h.p}<br>${verdict(h.s, h.p)}` : '—'}</td>
      <td>${h.controls.map((c) => `[${ctlTypeName(c.type)}] ${esc(c.desc)}<br><small>Evidence: ${esc(c.verifyRef) || '—'} · Impl. ${c.verified ? '✓' : '✗'} · Eff. ${c.effective ? '✓' : '✗'}</small>`).join('<hr>') || '—'}</td>
      <td>${h.controls.length && h.rs ? `S${h.rs}·P${h.rp}<br>${verdict(h.rs, h.rp)}` : '—'}</td></tr>`).join('');
    const charRows = QX.CHAR_QUESTIONS.filter((q) => (p.characteristics[q.id] || '').trim()).map((q) => `<tr><td>${esc(q.text)}</td><td>${esc(p.characteristics[q.id])}</td></tr>`).join('');
    return `
      <div class="panel-head no-print">${h2('Risk management report', '', 'Generated from your entries. Use Print to save as PDF.')}
      <div class="head-actions"><button class="btn outline sm" data-action="export-json" data-id="${p.id}">${icon('download')}JSON</button><button class="btn outline sm" data-action="export-csv" data-id="${p.id}">${icon('download')}Risk table CSV</button><button class="btn primary sm" data-action="print">${icon('print')}Print / PDF</button></div></div>
      <article class="report">
        <header class="report-head"><h1>Risk Management Report</h1>
          <table class="kv"><tr><th>Product</th><td>${esc(p.name)}</td><th>Model / version</th><td>${esc(p.model)} / ${esc(p.version)}</td></tr>
          <tr><th>Device class</th><td>${esc(p.deviceClass)}</td><th>Status</th><td>${esc(p.review.status)}${p.review.status === 'Approved' ? ` (${esc(p.review.approver)}, ${fmt(p.review.approvedAt, true)})` : ''}</td></tr>
          <tr><th>Standard</th><td colspan="3">ISO 14971:2019</td></tr></table></header>
        <h2>1. Overview and intended use</h2>
        <table class="kv"><tr><th>Intended use</th><td>${esc(p.intendedUse)}</td></tr><tr><th>Users / environment</th><td>${esc(p.users)} / ${esc(p.environment)}</td></tr><tr><th>Foreseeable misuse</th><td>${esc(p.misuse)}</td></tr></table>
        <h2>2. Risk management plan</h2>
        <table class="kv"><tr><th>Scope</th><td>${esc(p.plan.scope)}</td></tr><tr><th>Owner / team</th><td>${esc(p.plan.owner)} / ${esc(p.plan.team)}</td></tr><tr><th>Acceptability policy</th><td>${esc(p.plan.acceptPolicy)}</td></tr><tr><th>Verification</th><td>${esc(p.plan.verification)}</td></tr><tr><th>Production & post-production</th><td>${esc(p.plan.pms)}</td></tr></table>
        <h3>Risk acceptability matrix</h3>${matrixTable(p, false)}
        <h2>3. Safety characteristics</h2>
        ${charRows ? `<table class="table compact"><thead><tr><th>Question</th><th>Answer</th></tr></thead><tbody>${charRows}</tbody></table>` : '<p class="muted">None recorded</p>'}
        <h2>4. Risk analysis, evaluation and control</h2>
        <p>${st.hazards} hazards · ${st.initUnacc} initially unacceptable · ${st.ctl} control measures (${st.ctlDone} fully verified) · ${st.resUnacc} unacceptable residual</p>
        <div class="table-wrap"><table class="table compact report-table"><thead><tr><th>ID</th><th>Hazard</th><th>Sequence of events</th><th>Hazardous situation</th><th>Harm</th><th>Initial risk</th><th>Risk control & verification</th><th>Residual risk</th></tr></thead><tbody>${hzRows || '<tr><td colspan="8">None recorded</td></tr>'}</tbody></table></div>
        <h2>5. Benefit-risk analysis</h2>
        ${p.hazards.filter((h) => (h.bra || '').trim()).map((h) => `<p><b>${esc(h.code)}</b> ${esc(h.bra)}</p>`).join('') || '<p class="muted">Not applicable (no unacceptable residual risk)</p>'}
        <h2>6. Overall residual risk</h2>
        <table class="kv"><tr><th>Conclusion</th><td>${esc(p.overall.conclusion) || '—'}</td></tr><tr><th>Verdict</th><td>${esc(p.overall.acceptable) || '—'}</td></tr><tr><th>Disclosed residual risks</th><td>${esc(p.overall.disclosure) || '—'}</td></tr></table>
        <h2>7. Risk management review</h2>
        <ul class="checks print">${ck.map((c) => `<li class="${c.ok ? 'ok' : 'no'}"><span class="mark">${c.ok ? '✓' : '✗'}</span><span>${esc(c.text)}</span><small>§${c.clause}</small></li>`).join('')}</ul>
        <p class="muted small">Generated ${fmt(nowISO(), true)} · Qualixx demo</p>
      </article>`;
  }

  function tabAudit(p) {
    return `
      ${h2('Audit trail', '', 'Every save and approval is recorded in time order. In the demo the trail stays in this browser.')}
      <div class="table-wrap"><table class="table compact"><thead><tr><th>Time</th><th>User</th><th>Activity</th></tr></thead>
      <tbody>${p.audit.map((a) => `<tr><td><small>${fmt(a.t, true)}</small></td><td>${esc(a.user)}</td><td>${esc(a.action)}</td></tr>`).join('')}</tbody></table></div>`;
  }

  /* ---------- modals ---------- */
  function openModal(title, inner) {
    modalRoot.innerHTML = `<div class="modal-bg" data-action="close-modal"></div>
      <div class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}"><header><h3>${esc(title)}</h3><button class="icon-btn" data-action="close-modal" aria-label="Close">×</button></header>${inner}</div>`;
    I18N.tr(modalRoot);
    const f = modalRoot.querySelector('input, select, textarea');
    if (f) f.focus();
  }
  function closeModal() { modalRoot.innerHTML = ''; }
  function confirmModal(text, onYes) {
    openModal('Confirm', `<p>${esc(text)}</p><div class="form-actions"><button class="btn outline" data-action="close-modal">Cancel</button><button class="btn danger" data-action="confirm-yes">Delete</button></div>`);
    confirmModal.cb = onYes;
  }

  function hazardModal(p, h) {
    const cats = Object.keys(QX.LIBRARY);
    const cat = (h && h.category) || cats[0];
    openModal(h ? `Edit hazard · ${h.code}` : 'Add hazard', `
      <form data-form="hazard" data-id="${p.id}" data-hid="${h ? h.id : ''}" class="form grid2">
        <label>Category<select name="category" data-change="lib-cat">${cats.map((c) => `<option ${c === cat ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></label>
        <label>Pick from library<select data-change="lib-pick"><option value="">Type my own</option>${QX.LIBRARY[cat].map((x) => `<option>${esc(x)}</option>`).join('')}</select></label>
        ${field('Hazard', 'hazard', h ? h.hazard : '', { required: true, wide: true })}
        ${field('Sequence of events', 'sequence', h ? h.sequence : '', { area: true, wide: true, ph: 'How the hazard leads to a hazardous situation' })}
        ${field('Hazardous situation', 'situation', h ? h.situation : '', { wide: true })}
        ${field('Harm', 'harm', h ? h.harm : '', { wide: true, required: true })}
        <label>Severity<select name="s" required>${sevOptions(h && h.s)}</select></label>
        <label>Probability<select name="p" required>${probOptions(h && h.p)}</select></label>
        <div class="form-actions wide"><button type="button" class="btn outline" data-action="close-modal">Cancel</button><button class="btn primary" type="submit">Save</button></div>
      </form>`);
  }

  function controlModal(p, h, c) {
    openModal(c ? 'Edit control measure' : `Add control measure · ${h.code}`, `
      <form data-form="control" data-id="${p.id}" data-hid="${h.id}" data-cid="${c ? c.id : ''}" class="form">
        <label>Type <small class="hint">Priority: inherently safe design → protective measure → information for safety</small><select name="type">${QX.CONTROL_TYPES.map((t) => `<option value="${t.id}" ${c && c.type === t.id ? 'selected' : ''}>${t.order}. ${t.name}</option>`).join('')}</select></label>
        ${field('Control measure', 'desc', c ? c.desc : '', { area: true, required: true })}
        ${field('Verification evidence (document no.)', 'verifyRef', c ? c.verifyRef : '', { ph: 'e.g. VR-001 Test report' })}
        <label class="check"><input type="checkbox" name="verified" ${c && c.verified ? 'checked' : ''}> Implementation verified</label>
        <label class="check"><input type="checkbox" name="effective" ${c && c.effective ? 'checked' : ''}> Effectiveness verified</label>
        <div class="form-actions"><button type="button" class="btn outline" data-action="close-modal">Cancel</button><button class="btn primary" type="submit">Save</button></div>
      </form>`);
  }

  function newProductModal() {
    openModal('New risk management file', `
      <form data-form="new-product" class="form">
        ${field('Product name', 'name', '', { required: true })}
        ${field('Model', 'model', '')}
        ${field('Intended use', 'intendedUse', '', { area: true, required: true })}
        <div class="form-actions"><button type="button" class="btn outline" data-action="close-modal">Cancel</button><button class="btn primary" type="submit">Create</button></div>
      </form>`);
  }

  /* ---------- downloads ---------- */
  function download(name, text, type) {
    const blob = new Blob([text], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  const csvCell = (v) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';

  /* ---------- events: clicks ---------- */
  const actions = {
    'fill-demo': () => {
      const u = DEMO_USERS()[0];
      app.querySelector('[name=email]').value = u.email;
      app.querySelector('[name=password]').value = u.password;
    },
    logout: () => { setSession(null); go('/login'); },
    'toggle-menu': () => document.getElementById('sidebar').classList.toggle('open'),
    filter: (el) => { tableFilter = el.dataset.f; render(); },
    'doc-type': (el) => go('/documents/type/' + docKeyOf(el.dataset.t)),
    'toggle-sec': (el) => { const st = navState(); st.sec = st.sec || {}; const k = el.dataset.k; st.sec[k] = !(st.sec[k] !== false); saveNavState(st); render(); },
    'task-filter': (el) => { taskFilter = el.dataset.k; render(); },
    'set-lang': (el) => { I18N.set(el.dataset.l); render(); toast('Language changed'); },
    'new-obj': () => objModal(null),
    'edit-ps': (el) => psModal(findCatalog(el.dataset.id)),
    'approve-ps': (el) => psApproveModal(findCatalog(el.dataset.id)),
    'edit-obj': (el) => objModal(qms().objectives.find((o) => o.id === el.dataset.id)),
    'edit-policy': () => policyModal(),
    'new-reg': (el) => regModal(findCatalog(el.dataset.id), null, el.dataset.m),
    'edit-reg': (el) => { const x = findCatalog(el.dataset.id); regModal(x, regsOf(x).find((r) => r.id === el.dataset.rid)); },
    'dc-start': (el) => dcStartModal(docById(el.dataset.id)),
    'dc-new': () => dcNewModal(),
    'dc-obsolete': (el) => dcObsoleteModal(docById(el.dataset.id)),
    'dc-ack': (el) => {
      const d = docById(el.dataset.id); const e = effRev(d); const s = getSession();
      mutateDoc(d.id, `Read & acknowledged Rev.${e.rev}`, () => { e.acks.push({ pid: myPid(), name: s.name, at: nowISO() }); });
      toast('Acknowledgement recorded'); render();
    },
    'open-search': () => openSearch(),
    'toggle-group': (el) => { const st = navState(); st.open = st.open || {}; st.open[el.dataset.g] = !st.open[el.dataset.g]; saveNavState(st); render(); },
    pin: (el) => { const added = togglePin(el.dataset.code); toast(added ? 'Pinned to My Processes' : 'Removed from My Processes'); render(); },
    'new-catalog': () => catalogModal(),
    'edit-catalog': (el) => catalogModal(findCatalog(el.dataset.id)),
    'delete-catalog': (el) => {
      const x = findCatalog(el.dataset.id);
      confirmModal(`Delete the product "${x.name} ${x.model}"? Its risk management files are kept.`, () => {
        db.catalog = catalog().filter((y) => y.id !== x.id); save(); toast('Product deleted'); go('/products');
      });
    },
    'risk-for-product': (el) => {
      const x = findCatalog(el.dataset.id); const t = nowISO(); const sess = getSession();
      const r = {
        id: uid(), createdAt: t, updatedAt: t, name: x.name, model: x.model, version: x.version, deviceClass: x.deviceClass,
        intendedUse: x.intendedUse, users: x.users, environment: x.environment, misuse: '',
        plan: { scope: '', lifecycle: '', owner: sess.name, team: '', acceptPolicy: '', verification: '', pms: '' },
        matrix: { accept: QX.defaultAccept() }, characteristics: {}, hazards: [],
        overall: { conclusion: '', acceptable: '', disclosure: '' },
        review: { status: 'Draft', approver: '', approvedAt: '', comment: '' },
        audit: [{ t, user: sess.name, action: `Risk management file created from product ${x.name} ${x.model}` }]
      };
      db.products.push(r); save(); toast('Risk management file created'); go(`/process/risk/${r.id}/plan`);
    },
    'new-product': () => newProductModal(),
    'load-sample': () => {
      const p = ORG && ORG.products && ORG.products.length ? orgSample() : QX.sampleProduct(uid, nowISO());
      db.products.push(p);
      if (!catalog().some((x) => x.model === p.model && x.name === p.name)) catalog().push({ id: uid(), createdAt: nowISO(), updatedAt: nowISO(), name: p.name, model: p.model, version: p.version, productCode: '', deviceClass: p.deviceClass, swClass: '', udi: '', markets: '', status: 'In development', intendedUse: p.intendedUse, users: p.users, environment: p.environment });
      save(); toast('Sample risk management file loaded');
      go(`/process/risk/${p.id}/overview`);
    },
    'delete-product': (el) => {
      const p = findProduct(el.dataset.id);
      confirmModal(`Delete the risk management file "${p.name}"? This cannot be undone.`, () => {
        db.products = db.products.filter((x) => x.id !== p.id); save(); toast('File deleted'); render();
      });
    },
    'confirm-yes': () => { const cb = confirmModal.cb; closeModal(); if (cb) cb(); },
    'close-modal': () => closeModal(),
    'toggle-cell': (el) => {
      const p = findProduct(el.dataset.id); const k = el.dataset.key; const [s, pr] = k.split('-');
      mutate(p, `Acceptability changed: S${s}·P${pr} → ${p.matrix.accept[k] ? 'unacceptable' : 'acceptable'}`, (x) => { x.matrix.accept[k] = !x.matrix.accept[k]; });
      render();
    },
    'new-hazard': (el) => hazardModal(findProduct(el.dataset.id)),
    'edit-hazard': (el) => { const p = findProduct(el.dataset.id); hazardModal(p, findHazard(p, el.dataset.hid)); },
    'delete-hazard': (el) => {
      const p = findProduct(el.dataset.id); const h = findHazard(p, el.dataset.hid);
      confirmModal(`Delete ${h.code} "${h.hazard}"? Its control measures will be deleted too.`, () => {
        mutate(p, `Hazard deleted: ${h.code} ${h.hazard}`, (x) => { x.hazards = x.hazards.filter((y) => y.id !== h.id); });
        render();
      });
    },
    'new-control': (el) => { const p = findProduct(el.dataset.id); controlModal(p, findHazard(p, el.dataset.hid)); },
    'edit-control': (el) => { const p = findProduct(el.dataset.id); const h = findHazard(p, el.dataset.hid); controlModal(p, h, h.controls.find((c) => c.id === el.dataset.cid)); },
    'delete-control': (el) => {
      const p = findProduct(el.dataset.id); const h = findHazard(p, el.dataset.hid);
      confirmModal('Delete this control measure?', () => {
        mutate(p, `Control measure deleted: ${h.code}`, () => { h.controls = h.controls.filter((c) => c.id !== el.dataset.cid); if (!h.controls.length) { h.rs = null; h.rp = null; } });
        render();
      });
    },
    reopen: (el) => {
      const p = findProduct(el.dataset.id);
      mutate(p, 'Revision started (approval withdrawn)', (x) => { x.review.status = 'Draft'; }, { keepApproval: true });
      render();
    },
    print: () => window.print(),
    'export-json': (el) => { const p = findProduct(el.dataset.id); download(`${p.model || 'risk'}_risk-management-file.json`, JSON.stringify(p, null, 2), 'application/json'); },
    'export-csv': (el) => {
      const p = findProduct(el.dataset.id);
      const v = (s, pr) => (s ? (judge(p, s, pr) === 'acc' ? 'Acceptable' : 'Unacceptable') : '');
      const head = ['ID', 'Category', 'Hazard', 'Sequence of events', 'Hazardous situation', 'Harm', 'Initial S', 'Initial P', 'Initial verdict', 'Control measures', 'Residual S', 'Residual P', 'Residual verdict'];
      const lines = p.hazards.map((h) => [h.code, h.category, h.hazard, h.sequence, h.situation, h.harm, h.s, h.p, v(h.s, h.p),
        h.controls.map((c) => `[${ctlTypeName(c.type)}] ${c.desc}`).join(' / '), h.rs || '', h.rp || '', v(h.rs, h.rp)].map(csvCell).join(','));
      download(`${p.model || 'risk'}_risk-table.csv`, '﻿' + [head.map(csvCell).join(','), ...lines].join('\r\n'), 'text/csv');
    }
  };
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el || el.disabled) return;
    const fn = actions[el.dataset.action];
    if (fn) { e.preventDefault(); fn(el); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalRoot.innerHTML) { closeModal(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k' && getSession()) { e.preventDefault(); openSearch(); return; }
    if (e.target && e.target.id === 'palette-q') {
      const items = modalRoot.querySelectorAll('.palette-item');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); searchSel = (searchSel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % Math.max(1, items.length);
        items.forEach((x, i) => x.classList.toggle('sel', i === searchSel));
        if (items[searchSel]) items[searchSel].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter' && items[searchSel]) { e.preventDefault(); const h = items[searchSel].getAttribute('href'); closeModal(); go(h.slice(1)); }
    }
  });
  document.addEventListener('input', (e) => { if (e.target && e.target.id === 'palette-q') { searchSel = 0; renderSearch(e.target.value); } });
  document.addEventListener('click', (e) => {
    const row = e.target.closest('tr[data-href]');
    if (row && !e.target.closest('a, button, input')) go(row.dataset.href.replace(/^#/, ''));
  });
  document.addEventListener('input', (e) => {
    if (e.target.id !== 'doc-q') return;
    const q = e.target.value.trim().toLowerCase();
    app.querySelectorAll('tr[data-search]').forEach((tr) => { tr.style.display = !q || tr.dataset.search.includes(q) ? '' : 'none'; });
  });

  /* ---------- events: instant-save fields ---------- */
  const changes = {
    'ctl-verified': (el, p, h) => { const c = h.controls.find((x) => x.id === el.dataset.cid); mutate(p, `${h.code} implementation verification ${el.checked ? 'completed' : 'cleared'}`, () => { c.verified = el.checked; }); },
    'ctl-effective': (el, p, h) => { const c = h.controls.find((x) => x.id === el.dataset.cid); mutate(p, `${h.code} effectiveness verification ${el.checked ? 'completed' : 'cleared'}`, () => { c.effective = el.checked; }); },
    'res-s': (el, p, h) => mutate(p, `${h.code} residual severity → ${el.value || 'not rated'}`, () => { h.rs = el.value ? Number(el.value) : null; }),
    'res-p': (el, p, h) => mutate(p, `${h.code} residual probability → ${el.value || 'not rated'}`, () => { h.rp = el.value ? Number(el.value) : null; }),
    'new-risk': (el, p, h) => mutate(p, `${h.code} review of risks from controls ${el.checked ? 'completed' : 'cleared'}`, () => { h.newRiskReviewed = el.checked; }),
    'new-risk-note': (el, p, h) => mutate(p, `${h.code} review note updated`, () => { h.newRiskNote = el.value; }),
    bra: (el, p, h) => mutate(p, `${h.code} benefit-risk analysis recorded`, () => { h.bra = el.value; })
  };
  document.addEventListener('change', (e) => {
    const el = e.target;
    const kind = el.dataset && el.dataset.change;
    if (!kind) return;
    if (kind === 'search') return;
    if (kind === 'reg-market') {
      const m = marketOf(el.value); const f = el.form;
      f.querySelector('[name=authority]').value = m.authority;
      f.querySelector('[name=pathway]').value = m.paths[0];
      f.querySelector('#reg-paths').innerHTML = m.paths.map((p) => `<option value="${esc(p)}">`).join('');
      return;
    }
    if (kind === 'lib-cat') {
      const pick = el.form.querySelector('[data-change=lib-pick]');
      pick.innerHTML = '<option value="">Type my own</option>' + QX.LIBRARY[el.value].map((x) => `<option>${esc(x)}</option>`).join('');
      return;
    }
    if (kind === 'lib-pick') { if (el.value) el.form.querySelector('[name=hazard]').value = el.value; return; }
    const p = findProduct(el.dataset.id); if (!p) return;
    const h = findHazard(p, el.dataset.hid);
    changes[kind](el, p, h);
    if (kind !== 'new-risk-note' && kind !== 'bra') render(); else toast('Saved');
  });
  // sidebar search: filter risk files and jump to the list
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.dataset && e.target.dataset.change === 'search') {
      searchText = e.target.value.trim();
      tableFilter = 'All';
      go('/process/risk');
    }
  });

  /* ---------- events: form submit ---------- */
  const forms = {
    login: (fd) => {
      const u = DEMO_USERS().find((x) => x.email === String(fd.get('email')).trim().toLowerCase() && x.password === fd.get('password'));
      if (!u) { document.getElementById('login-error').hidden = false; return; }
      setSession({ email: u.email, name: u.name, role: u.role, personId: u.personId || '', at: nowISO() });
      go('/dashboard');
    },
    'new-product': (fd) => {
      const t = nowISO();
      const p = {
        id: uid(), createdAt: t, updatedAt: t, name: fd.get('name').trim(), model: fd.get('model').trim(), version: '', deviceClass: '',
        intendedUse: fd.get('intendedUse').trim(), users: '', environment: '', misuse: '',
        plan: { scope: '', lifecycle: '', owner: getSession().name, team: '', acceptPolicy: '', verification: '', pms: '' },
        matrix: { accept: QX.defaultAccept() }, characteristics: {}, hazards: [],
        overall: { conclusion: '', acceptable: '', disclosure: '' },
        review: { status: 'Draft', approver: '', approvedAt: '', comment: '' },
        audit: [{ t, user: getSession().name, action: 'Risk management file created' }]
      };
      db.products.push(p); save(); closeModal(); toast('Risk management file created');
      go(`/process/risk/${p.id}/plan`);
    },
    overview: (fd, form) => {
      const p = findProduct(form.dataset.id);
      mutate(p, 'Overview & intended use saved', (x) => { ['name', 'model', 'version', 'deviceClass', 'intendedUse', 'users', 'environment', 'misuse'].forEach((k) => { x[k] = (fd.get(k) || '').trim(); }); });
      toast('Saved'); render();
    },
    plan: (fd, form) => {
      const p = findProduct(form.dataset.id);
      mutate(p, 'Risk management plan saved', (x) => { Object.keys(x.plan).forEach((k) => { x.plan[k] = (fd.get(k) || '').trim(); }); });
      toast('Saved'); render();
    },
    char: (fd, form) => {
      const p = findProduct(form.dataset.id);
      mutate(p, 'Safety characteristics saved', (x) => { QX.CHAR_QUESTIONS.forEach((q) => { x.characteristics[q.id] = (fd.get(q.id) || '').trim(); }); });
      toast('Saved'); render();
    },
    hazard: (fd, form) => {
      const p = findProduct(form.dataset.id);
      const vals = { category: fd.get('category'), hazard: fd.get('hazard').trim(), sequence: fd.get('sequence').trim(), situation: fd.get('situation').trim(), harm: fd.get('harm').trim(), s: Number(fd.get('s')), p: Number(fd.get('p')) };
      if (form.dataset.hid) {
        const h = findHazard(p, form.dataset.hid);
        mutate(p, `Hazard edited: ${h.code}`, () => Object.assign(h, vals));
      } else {
        const n = p.hazards.reduce((m, h) => Math.max(m, parseInt(String(h.code).replace(/\D/g, ''), 10) || 0), 0) + 1;
        const code = 'H-' + String(n).padStart(3, '0');
        mutate(p, `Hazard added: ${code} ${vals.hazard}`, (x) => { x.hazards.push(Object.assign({ id: uid(), code, controls: [], rs: null, rp: null, newRiskReviewed: false, newRiskNote: '', bra: '' }, vals)); });
      }
      closeModal(); toast('Saved'); render();
    },
    control: (fd, form) => {
      const p = findProduct(form.dataset.id); const h = findHazard(p, form.dataset.hid);
      const vals = { type: fd.get('type'), desc: fd.get('desc').trim(), verifyRef: fd.get('verifyRef').trim(), verified: fd.get('verified') === 'on', effective: fd.get('effective') === 'on' };
      if (form.dataset.cid) {
        const c = h.controls.find((x) => x.id === form.dataset.cid);
        mutate(p, `Control measure edited: ${h.code}`, () => Object.assign(c, vals));
      } else {
        mutate(p, `Control measure added: ${h.code} [${ctlTypeName(vals.type)}]`, () => {
          h.controls.push(Object.assign({ id: uid() }, vals));
          if (!h.rs) { h.rs = h.s; h.rp = h.p; } // residual starts at the initial risk; the user re-evaluates
        });
      }
      closeModal(); toast('Saved'); render();
    },
    overall: (fd, form) => {
      const p = findProduct(form.dataset.id);
      mutate(p, 'Overall residual risk saved', (x) => { x.overall = { conclusion: fd.get('conclusion').trim(), acceptable: fd.get('acceptable') || '', disclosure: fd.get('disclosure').trim() }; });
      toast('Saved'); render();
    },
    approve: (fd, form) => {
      const p = findProduct(form.dataset.id);
      const s = getSession();
      const u = DEMO_USERS().find((x) => x.email === s.email);
      if (!u || fd.get('password') !== u.password) { toast('Incorrect password'); return; }
      if (!checks(p).every((c) => c.ok)) { toast('Complete all conditions first'); return; }
      mutate(p, `Electronically signed: ${s.name} (${s.role}) · meaning: approval of risk management review`, (x) => {
        x.review = { status: 'Approved', approver: `${s.name} (${s.role})`, approvedAt: nowISO(), comment: (fd.get('comment') || '').trim() };
      }, { keepApproval: true });
      toast('Approved'); render();
    }
  };

  forms['dc-start'] = (fd, form) => {
    const d = docById(form.dataset.id); const e = effRev(d); const r = dcRec(d.id, true);
    if (!r.baseContent) r.baseContent = docTemplate(d);
    const rev = nextRevNo(d); const me = myPid();
    mutateDoc(d.id, `Revision Rev.${rev} started: ${fd.get('change').trim()}`, (x) => {
      x.revs.push({ rev, status: 'Draft', change: fd.get('change').trim(), reason: (fd.get('reason') || '').trim(), training: !!fd.get('training'),
        content: (e && e.content) || x.baseContent, authorId: me, reviewerId: me, approverId: me, due: addDays(7), createdAt: nowISO(), reviews: [], acks: [] });
    });
    closeModal(); toast(`Draft Rev.${rev} created`); render();
  };
  forms['dc-draft'] = (fd, form, sub) => {
    const d = docById(form.dataset.id); const v = openRev(d); const op = sub ? sub.value : 'save';
    const vals = { content: fd.get('content'), reviewerId: fd.get('reviewerId'), approverId: fd.get('approverId'), due: fd.get('due'), training: !!fd.get('training') };
    if (op === 'withdraw') { mutateDoc(d.id, `Change Rev.${v.rev} withdrawn`, () => { v.status = 'Withdrawn'; }); toast('Change withdrawn'); render(); return; }
    if (op === 'submit') {
      mutateDoc(d.id, `Submitted Rev.${v.rev} for review → ${personName(vals.reviewerId)}`, () => { Object.assign(v, vals, { status: 'In Review', returned: '' }); });
      toast('Submitted for review'); render(); return;
    }
    mutateDoc(d.id, `Draft Rev.${v.rev} saved`, () => Object.assign(v, vals)); toast('Draft saved'); render();
  };
  forms['dc-review'] = (fd, form) => {
    const d = docById(form.dataset.id); const v = openRev(d); const dec = fd.get('decision'); const c = (fd.get('comment') || '').trim();
    if (dec === 'Returned' && !c) { toast('Add a comment when returning'); return; }
    mutateDoc(d.id, `Review of Rev.${v.rev}: ${dec}${c ? ' — ' + c : ''}`, () => {
      v.reviews.push({ by: getSession().name, at: nowISO(), decision: dec, comment: c });
      if (dec === 'Returned') { v.status = 'Draft'; v.returned = c; } else v.status = 'Approval';
    });
    toast(dec === 'Returned' ? 'Returned to author' : 'Sent for approval'); render();
  };
  forms['dc-approve'] = (fd, form) => {
    const d = docById(form.dataset.id); const v = openRev(d); const s = getSession(); const c = (fd.get('comment') || '').trim();
    if (fd.get('decision') === 'return') {
      if (!c) { toast('Add a comment when returning'); return; }
      mutateDoc(d.id, `Approval of Rev.${v.rev} declined — ${c}`, () => { v.reviews.push({ by: s.name, at: nowISO(), decision: 'Returned by approver', comment: c }); v.status = 'Draft'; v.returned = c; });
      toast('Returned to author'); render(); return;
    }
    if (!checkPw(fd.get('password'))) { toast('Incorrect password'); return; }
    const eff = fd.get('effective') || todayStr();
    mutateDoc(d.id, `Electronically signed: ${s.name} (${s.role}) · meaning: approval of Rev.${v.rev} · effective ${eff}${c ? ' · ' + c : ''}`, () => {
      Object.assign(v, { status: 'Approved', approvedBy: `${s.name}`, approvedAt: nowISO(), effective: eff });
    });
    settleDocs(); toast(eff <= todayStr() ? `Rev.${v.rev} is now effective` : `Approved · effective ${eff}`); render();
  };
  forms['dc-obsolete'] = (fd, form) => {
    const d = docById(form.dataset.id); const s = getSession();
    if (!checkPw(fd.get('password'))) { toast('Incorrect password'); return; }
    mutateDoc(d.id, `Electronically signed: ${s.name} · meaning: document made obsolete — ${fd.get('reason').trim()}`, (r) => { r.obsolete = { by: s.name, at: nowISO(), reason: fd.get('reason').trim() }; });
    closeModal(); toast('Document made obsolete'); render();
  };
  forms['dc-new'] = (fd) => {
    const type = fd.get('type'); const parent = fd.get('parent');
    let id = String(fd.get('id') || '').trim().toUpperCase();
    if (!id) {
      const stem = (type === 'Form' ? 'F' : type === 'Instruction' ? 'W' : 'P') + parent.replace(/^[A-Z]/, '');
      if (type === 'Procedure') { let k = 1; while (docById('P' + 'NEW' + k)) k++; id = 'PNEW' + k; }
      else { let k = 1; while (docById(`${stem}-${pad2(k)}`)) k++; id = `${stem}-${pad2(k)}`; }
    }
    if (docById(id)) { toast(`${id} already exists`); return; }
    const me = myPid();
    dcStore().added.push({ id, type, kr: (fd.get('kr') || '').trim(), en: fd.get('en').trim(), owner: fd.get('owner'), parent, clauses: [], rev: '', issued: '', effective: '', status: 'Draft', added: true });
    const d = docById(id);
    mutateDoc(id, `New document created: ${id} Rev.00 draft`, (r) => {
      r.revs.push({ rev: '00', status: 'Draft', change: 'Initial issue', reason: 'New document', training: false, content: docTemplate(d), authorId: me, reviewerId: me, approverId: me, due: addDays(7), createdAt: nowISO(), reviews: [], acks: [] });
    });
    closeModal(); toast(`${id} created`); go('/documents/' + encodeURIComponent(id));
  };
  forms.ps = (fd, form) => {
    const x = findCatalog(form.dataset.id); const st = stdOf(x);
    if (st.status === 'Approved') { st.rev = pad2(Number(st.rev) + 1); st.approvedBy = ''; st.approvedAt = ''; }
    PS_SECTIONS.forEach(([k]) => {
      const v = String(fd.get(k) || '');
      st[k] = k === 'specs' ? v.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => { const c = l.split('|').map((y) => y.trim()); return [c[0] || '', c[1] || '', c[2] || '']; }) : v.trim();
    });
    st.status = 'Draft'; x.updatedAt = nowISO(); save(); closeModal(); toast(`Saved as draft Rev.${st.rev}`); render();
  };
  forms['ps-approve'] = (fd, form) => {
    if (!checkPw(fd.get('password'))) { toast('Incorrect password'); return; }
    const x = findCatalog(form.dataset.id); const st = stdOf(x); const s2 = getSession();
    Object.assign(st, { status: 'Approved', approvedBy: s2.name, approvedAt: nowISO() });
    st.history.unshift({ rev: st.rev, at: st.approvedAt, by: `${s2.name} (e-signature)`, change: fd.get('change').trim() });
    save(); closeModal(); toast(`${st.docNo} Rev.${st.rev} approved`); render();
  };
  forms.obj = (fd, form, sub) => {
    const q = qms(); const id = form.dataset.id; const o = q.objectives.find((x) => x.id === id);
    if (sub && sub.value === 'delete') { q.objectives = q.objectives.filter((x) => x.id !== id); save(); closeModal(); toast('Objective deleted'); render(); return; }
    const vals = {}; ['title', 'kpi', 'dir', 'unit', 'owner', 'due', 'clause', 'freq'].forEach((k) => { vals[k] = String(fd.get(k) || '').trim(); });
    vals.target = Number(fd.get('target'));
    if (!(o && o.auto)) vals.current = fd.get('current') === '' || fd.get('current') == null ? null : Number(fd.get('current'));
    if (o) Object.assign(o, vals); else q.objectives.push(Object.assign({ id: uid() }, vals));
    q.example = false; save(); closeModal(); toast('Saved'); render();
  };
  forms.policy = (fd) => {
    if (!checkPw(fd.get('password'))) { toast('Incorrect password'); return; }
    const p = qms().policy; const s2 = getSession(); const rev = pad2(Number(p.rev) + 1); const eff = fd.get('effective') || todayStr();
    Object.assign(p, { text: fd.get('text').trim(), rev, effective: eff, approvedBy: s2.name });
    p.history.unshift({ rev, effective: eff, change: fd.get('change').trim(), by: `${s2.name} (e-signature)` });
    qms().example = false; save(); closeModal(); toast(`Quality policy Rev.${rev} issued`); render();
  };
  forms.reg = (fd, form, sub) => {
    let x = findCatalog(form.dataset.id);
    if (fd.get('pid')) x = findCatalog(fd.get('pid'));
    const list = regsOf(x);
    const rid = form.dataset.rid;
    if (sub && sub.value === 'delete') { x.registrations = list.filter((r) => r.id !== rid); x.updatedAt = nowISO(); save(); closeModal(); toast('Authorization deleted'); render(); return; }
    const keys = ['market', 'authority', 'pathway', 'status', 'number', 'submitted', 'approved', 'expiry', 'holder', 'notes'];
    const vals = {}; keys.forEach((k) => { vals[k] = String(fd.get(k) || '').trim(); });
    const r = list.find((y) => y.id === rid);
    if (r) Object.assign(r, vals); else list.push(Object.assign({ id: uid() }, vals));
    x.updatedAt = nowISO(); save(); closeModal(); toast('Saved'); render();
  };
  forms.catalog = (fd, form) => {
    const keys = ['name', 'model', 'version', 'swVersion', 'productCode', 'deviceClass', 'swClass', 'udi', 'markets', 'status', 'intendedUse', 'users', 'environment', 'manufacturer', 'manufacturerAddress', 'licenseNo', 'labelRef', 'warnings'];
    const vals = {}; keys.forEach((k) => { vals[k] = String(fd.get(k) || '').trim(); });
    const t = nowISO();
    let x = form.dataset.id ? findCatalog(form.dataset.id) : null;
    if (x) { Object.assign(x, vals, { updatedAt: t }); delete x.example; }
    else { x = Object.assign({ id: uid(), createdAt: t, updatedAt: t }, vals); catalog().push(x); }
    save(); closeModal(); toast('Product saved'); go(`/products/${x.id}`);
  };
  forms.message = (fd, form) => {
    const text = String(fd.get('text') || '').trim();
    if (!text) return;
    const m = loadMsgs();
    (m[form.dataset.pid] = m[form.dataset.pid] || []).push({ from: 'me', text, t: nowISO() });
    saveMsgs(m); render();
    const b = document.getElementById('chat-body'); if (b) b.scrollTop = b.scrollHeight;
    const i = app.querySelector('.chat-compose input'); if (i) i.focus();
  };
  document.addEventListener('submit', (e) => {
    const form = e.target;
    const fn = forms[form.dataset.form];
    if (!fn) return;
    e.preventDefault();
    fn(new FormData(form), form, e.submitter);
  });

  /* ---------- router ---------- */
  function render() {
    const path = currentPath || '/login';
    const parts = path.split('/').filter(Boolean);
    const session = getSession();
    closeModal();
    if (!session && parts[0] !== 'login') { go('/login'); return; }
    if (session && (parts[0] === 'login' || !parts.length)) { go('/dashboard'); return; }
    let html; let title = 'My Dashboard';
    if (parts[0] === 'login') { html = viewLogin(); title = 'Sign in'; }
    else if (parts[0] === 'dashboard') html = viewDashboard();
    else if (parts[0] === 'help') { html = viewHelp(); title = 'Help'; }
    else if (parts[0] === 'settings') { html = viewSettings(); title = 'Settings'; }
    else if (parts[0] === 'tasks') { html = viewTasks(); title = 'My Tasks'; }
    else if (ORG && parts[0] === 'process' && parts[1] === 'doc-control') { html = viewDocControl(); title = 'Document Control'; }
    else if (parts[0] === 'about') { html = viewAbout(); title = 'About Qualixx'; }
    else if (ORG && parts[0] === 'documents' && parts[1] === 'type') { docType = DOC_KEYS[parts[2]] || 'All'; html = viewDocuments(); title = 'Quality Documents'; }
    else if (ORG && parts[0] === 'quality' && parts[1] === 'policy') { html = viewPolicy(); title = 'Quality Policy'; }
    else if (ORG && parts[0] === 'quality' && parts[1] === 'objectives') { html = viewObjectives(); title = 'Quality Objectives'; }
    else if (parts[0] === 'products' && parts[1] === 'registrations') { html = viewRegistrations(); title = 'Market Authorizations'; }
    else if (parts[0] === 'products' && parts[1] === 'standards') { html = viewStandards(); title = 'Product Standards'; }
    else if (parts[0] === 'products' && parts[1] === 'labels') { html = viewLabels(); title = 'Labels & UDI'; }
    else if (parts[0] === 'products' && parts[1] === 'versions') { go('/products'); return; }
    else if (ORG && parts[0] === 'documents' && parts[1]) { html = viewDocument(decodeURIComponent(parts[1])); if (!html) { go('/documents'); return; } title = parts[1]; }
    else if (ORG && parts[0] === 'documents') { docType = 'All'; html = viewDocuments(); title = 'Quality Documents'; }
    else if (ORG && parts[0] === 'people') { html = viewPeople(); title = 'People'; }
    else if (parts[0] === 'products' && parts[1]) { html = viewProduct2(parts[1], parts[2]); if (!html) { go('/products'); return; } title = 'Product'; }
    else if (parts[0] === 'products') { html = viewProducts(); title = 'Products'; }
    else if (ORG && parts[0] === 'messages') { html = viewMessages(parts[1]); title = 'Messages'; }
    else if (ORG && parts[0] === 'process' && parts[1] === 'p' && parts[2]) {
      const code = decodeURIComponent(parts[2]);
      if (ORG.liveProcesses && ORG.liveProcesses[code]) { go('/process/' + ORG.liveProcesses[code]); return; }
      html = viewProcessWorkspace(code); if (!html) { go('/process'); return; } title = code;
    }
    else if (parts[0] === 'process' && parts[1] === 'risk' && parts[2]) {
      const p = findProduct(parts[2]);
      if (!p) { go('/process/risk'); return; }
      html = viewProduct(p, parts[3] || 'overview'); title = p.name;
    } else if (parts[0] === 'process' && parts[1] === 'risk') { html = viewRiskList(); title = 'Risk Management'; }
    else if (parts[0] === 'process') { html = viewProcess(); title = 'Work Process'; }
    else { go('/dashboard'); return; }
    const y = window.scrollY;
    const same = render._last === path;
    app.innerHTML = html;
    I18N.tr(app);
    document.title = `${I18N.t(title)} · Qualixx`;
    const search = app.querySelector('[data-change=search]');
    if (search) search.value = searchText;
    window.scrollTo(0, same ? y : 0);
    render._last = path;
  }
  window.addEventListener('hashchange', () => {
    const h = (location.hash || '').replace(/^#/, '');
    if (!h.startsWith('/') || h === currentPath) return;
    currentPath = h; if (h !== '/process/risk') searchText = ''; render();
  });
  // route internal links ourselves
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    if (a.closest('#modal-root')) closeModal();
    const path = a.getAttribute('href').slice(1);
    if (path !== '/process/risk') searchText = '';
    if (window.innerWidth <= 820) { const sb = document.getElementById('sidebar'); if (sb) sb.classList.remove('open'); }
    go(path);
  });
  render();
})();
