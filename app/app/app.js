/* Qualixx demo app – Login → Dashboard → Work Process → Risk Management (ISO 14971)
 * Front-end prototype without a server. Data is stored only in this browser (localStorage).
 */
(function () {
  'use strict';
  const QX = window.QX;
  const ORG = window.QX_ORG || null; // optional organization pack: logo, documents, process map, people
  const STORE_KEY = 'qx-demo-data-v2' + (ORG ? '-' + ORG.short.toLowerCase() : '');
  const MSG_KEY = STORE_KEY + '-messages';
  function DEMO_USERS() {
    if (!ORG) return QX.DEMO_USERS;
    const p = ORG.people.find((x) => x.id === ORG.demoUser.personId) || {};
    return [{ email: ORG.demoUser.email, password: ORG.demoUser.password, name: p.name, role: ORG.demoUser.role, personId: p.id }];
  }
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
    const p = (n) => String(n).padStart(2, '0');
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` + (withTime ? ` ${p(d.getHours())}:${p(d.getMinutes())}` : '');
  };
  const go = (path) => { if (location.hash !== '#' + path) location.hash = path; else render(); };
  function toast(msg) {
    toastEl.textContent = msg;
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
    send: '<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>'
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
        <label class="side-search">${icon('search')}<input type="search" placeholder="Search" aria-label="Search risk files" data-change="search"></label>
        <nav class="side-nav" aria-label="Main">
          ${nav('#/dashboard', 'dashboard', 'Dashboard', 'dashboard')}
          ${ORG ? nav('#/documents', 'doc', 'Quality Documents', 'documents', `<em class="count">${ORG.documents.length}</em>`) : ''}
          <p class="side-label">Work Process</p>
          ${nav('#/process', 'process', ORG ? 'Process Map' : 'All Processes', 'process')}
          ${nav('#/process/risk', 'risk', 'Risk Management', 'risk')}
          ${ORG ? '' : PROCESSES.filter((x) => !x.live).map((x) => `<span class="nav-item disabled" aria-disabled="true">${icon(x.icon)}<span>${x.name}</span><em>Soon</em></span>`).join('')}
          ${ORG ? `<p class="side-label">Team</p>${nav('#/people', 'users', 'People', 'people')}${nav('#/messages', 'chat', 'Messages', 'messages')}` : ''}
          <p class="side-label">Other Menu</p>
          <span class="nav-item disabled" aria-disabled="true">${icon('settings')}<span>Settings</span></span>
          <a class="nav-item" href="#/help">${icon('help')}<span>Help</span></a>
          <button class="nav-item" data-action="logout">${icon('logout')}<span>Sign out</span></button>
        </nav>
        <a class="side-brand ${ORG ? 'powered' : ''}" href="${ORG ? 'https://qualixx.ai' : '../'}" title="qualixx.ai"><span class="logo">Q</span>${ORG ? '<span>Powered by <b>Qualixx</b></span>' : 'Qualixx'}</a>
      </aside>
      <div class="content">
        <div class="mobilebar"><button class="icon-btn" data-action="toggle-menu" aria-label="Open menu">${icon('menu')}</button><span class="side-brand"><span class="logo">Q</span>Qualixx</span></div>
        <main class="main">${content}</main>
        <p class="demo-note">Demo version · data is stored only in this browser.</p>
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
  const docById = (id) => ORG.documents.find((d) => d.id === id);
  const deptName = (code) => (ORG.departments && ORG.departments[code]) || code;
  const groupOf = (code) => ORG.groups.find((g) => g.codes.includes(code));
  let docType = 'All';

  function docRow(d) {
    const parent = d.parent ? docById(d.parent) : null;
    return `<tr class="clickable" data-href="#/documents/${esc(d.id)}" data-search="${esc((d.id + ' ' + d.en + ' ' + d.kr + ' ' + d.parent).toLowerCase())}">
      <td class="code">${esc(d.id)}</td>
      <td><strong>${esc(d.en)}</strong><br><small class="muted">${esc(d.kr)}</small></td>
      <td><span class="dtype t-${esc(d.type.toLowerCase())}">${esc(d.type)}</span></td>
      <td>${parent ? `<small>${esc(parent.id)}</small>` : '—'}</td>
      <td>Rev.${esc(d.rev)}</td>
      <td><small>${fmt(d.effective)}</small></td>
      <td><span class="pill">${esc(d.owner)}</span></td>
      <td><span class="status s-Approved">${esc(d.status)}</span></td>
    </tr>`;
  }

  function viewDocuments() {
    const types = ['All', 'Manual', 'Procedure', 'Instruction', 'Form'];
    const count = (t) => ORG.documents.filter((d) => t === 'All' || d.type === t).length;
    const list = ORG.documents.filter((d) => docType === 'All' || d.type === docType);
    return shell(`
      ${pageHead('Quality Documents', `${esc(ORG.name)} controlled documents — current effective revisions. Source: ${esc(ORG.docListRef || '')}.`, '<a href="#/dashboard">Dashboard</a> / Quality Documents')}
      <section class="card table-card">
        <div class="table-top">
          <div class="seg" role="tablist">${types.map((t) => `<button role="tab" aria-selected="${docType === t}" class="${docType === t ? 'on' : ''}" data-action="doc-type" data-t="${t}">${t === 'All' ? 'All' : t + 's'} <span>${count(t)}</span></button>`).join('')}</div>
          <label class="inline-search">${icon('search')}<input id="doc-q" type="search" placeholder="Search ID or title" aria-label="Search documents"></label>
        </div>
        ${list.length ? `<div class="table-wrap"><table class="table">
          <thead><tr><th>Doc ID</th><th>Title</th><th>Type</th><th>Parent</th><th>Rev.</th><th>Effective</th><th>Owner</th><th>Status</th></tr></thead>
          <tbody>${list.map(docRow).join('')}</tbody></table></div>` : `<div class="empty"><p class="muted">No ${docType.toLowerCase()} documents have been issued yet.</p></div>`}
      </section>`, 'documents');
  }

  function viewDocument(id) {
    const d = docById(id);
    if (!d) return null;
    const parent = d.parent ? docById(d.parent) : null;
    const children = ORG.documents.filter((x) => x.parent === d.id);
    const g = groupOf(d.id);
    const live = ORG.liveProcesses && ORG.liveProcesses[d.id];
    return shell(`
      ${pageHead(`${esc(d.id)} · ${esc(d.en)}`, `${esc(d.kr)} · <span class="dtype t-${esc(d.type.toLowerCase())}">${esc(d.type)}</span> · <span class="status s-Approved">${esc(d.status)}</span>`,
        `<a href="#/dashboard">Dashboard</a> / <a href="#/documents">Quality Documents</a> / ${esc(d.id)}`,
        live ? `<a class="btn primary" href="#/process/${live}">${icon('risk')}Open ${esc(d.en.replace('Procedure for ', ''))} workflow</a>` : '')}
      <section class="doc-grid">
        <article class="card panel">
          <div class="panel-title"><h2>Document information</h2></div>
          <table class="kv">
            <tr><th>Document ID</th><td>${esc(d.id)}</td></tr>
            <tr><th>Title</th><td>${esc(d.en)}<br><small class="muted">${esc(d.kr)}</small></td></tr>
            <tr><th>Type</th><td>${esc(d.type)}</td></tr>
            <tr><th>Current revision</th><td>Rev.${esc(d.rev)}</td></tr>
            <tr><th>Issued / effective</th><td>${fmt(d.issued)} / ${fmt(d.effective)}</td></tr>
            <tr><th>Owner</th><td>${esc(deptName(d.owner))} (${esc(d.owner)})</td></tr>
            ${parent ? `<tr><th>Parent document</th><td><a href="#/documents/${esc(parent.id)}">${esc(parent.id)} · ${esc(parent.en)}</a></td></tr>` : ''}
            ${g ? `<tr><th>Process group</th><td><a href="#/process">${esc(g.name)}</a></td></tr>` : ''}
            ${d.clauses && d.clauses.length ? `<tr><th>ISO 13485 clauses</th><td>${d.clauses.map((c) => `<span class="chip">§${esc(c)}</span>`).join(' ')}</td></tr>` : ''}
          </table>
          <h3>Revision history</h3>
          <div class="table-wrap"><table class="table compact"><thead><tr><th>Rev.</th><th>Effective</th><th>Change</th><th>Status</th></tr></thead>
          <tbody><tr><td>Rev.${esc(d.rev)}</td><td>${fmt(d.effective)}</td><td>Initial issue</td><td><span class="status s-Approved">${esc(d.status)}</span></td></tr></tbody></table></div>
        </article>
        <article class="card panel file-card">
          <div class="file-icon">${icon('doc')}</div>
          <h3>Controlled copy</h3>
          <p class="muted">In the live service, the approved PDF/Word file is attached by Qualixx in the Console and opened here. This demo shows document metadata only.</p>
          <button class="btn outline" disabled>Open file</button>
        </article>
      </section>
      ${children.length ? `<h2 class="section-title">${d.type === 'Manual' ? 'Procedures under this manual' : 'Forms under this procedure'} <small class="muted">${children.length}</small></h2>
      <section class="card table-card"><div class="table-wrap"><table class="table">
        <thead><tr><th>Doc ID</th><th>Title</th><th>Type</th><th>Parent</th><th>Rev.</th><th>Effective</th><th>Owner</th><th>Status</th></tr></thead>
        <tbody>${children.map(docRow).join('')}</tbody></table></div></section>` : ''}`, 'documents');
  }

  function viewProcessMap() {
    const groups = ORG.groups.map((g) => `
      <section class="pm-group">
        <h3>${esc(g.name)} <small class="muted">${g.codes.length}</small></h3>
        <div class="pm-grid">${g.codes.map((code) => {
          const d = docById(code) || { en: code, kr: '', owner: '' };
          const forms = ORG.documents.filter((x) => x.parent === code).length;
          const live = ORG.liveProcesses && ORG.liveProcesses[code];
          return `<a class="card pm ${live ? 'live' : ''}" href="${live ? `#/process/${live}` : `#/documents/${esc(code)}`}">
            <span class="pm-head"><span class="code">${esc(code)}</span>${live ? '<span class="status s-Approved">Workflow live</span>' : '<span class="status s-Soon">Documents</span>'}</span>
            <strong>${esc(d.en.replace('Procedure for ', ''))}</strong>
            <small class="muted">${esc(d.kr)}</small>
            <span class="pm-meta"><span class="pill">${esc(d.owner)}</span><span class="pill">${forms} forms</span>${(d.clauses || []).slice(0, 2).map((c) => `<span class="pill">§${esc(c)}</span>`).join('')}</span>
          </a>`;
        }).join('')}</div>
      </section>`).join('');
    return shell(`
      ${pageHead('Process Map', `${esc(ORG.name)} QMS processes from the Quality Manual (MMS). Measurement & improvement outputs feed management review, whose decisions change the core and support processes.`, '<a href="#/dashboard">Dashboard</a> / Work Process')}
      ${groups}`, 'process');
  }

  function viewPeople() {
    const me = (getSession() || {}).personId;
    return shell(`
      ${pageHead('People', `${esc(ORG.name)} team and QMS responsibilities.`, '<a href="#/dashboard">Dashboard</a> / People')}
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
      ${pageHead('Messages', 'Direct messages with your team. Demo: messages stay in this browser and are not delivered.', '<a href="#/dashboard">Dashboard</a> / Messages')}
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
      <p class="foot muted">© Qualixx · <a href="../">qualixx.ai</a></p>
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
    const n = (t) => ORG.documents.filter((d) => d.type === t).length;
    return `<section class="org-strip">
      <a class="card strip-item" href="#/documents"><span class="process-ic">${icon('doc')}</span><span><strong>${ORG.documents.length} quality documents</strong><small class="muted">${n('Manual')} manual · ${n('Procedure')} procedures · ${n('Form')} forms</small></span></a>
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
      ${pageHead('Dashboard', `Welcome back, ${esc(s.name)}. All your quality information appears in this field.`)}
      <section class="dash-grid">
        <article class="card report-card">
          <div class="report-art" aria-hidden="true">
            <svg viewBox="0 0 120 90"><g fill="var(--grid-dot)">${Array.from({ length: 6 }, (_, r) => Array.from({ length: 9 }, (_, c) => `<circle cx="${8 + c * 13}" cy="${8 + r * 14}" r="1.4"/>`).join('')).join('')}</g>
            <path d="M60 14 38 22v16c0 13 9.5 24 22 26 12.5-2 22-13 22-26V22L60 14Z" fill="var(--accent)"/><path d="M60 30v14M60 51h.01" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>
          </div>
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
      ${pageHead('Work Process', 'Choose a quality process to work in.', '<a href="#/dashboard">Dashboard</a> / Work Process')}
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
      ${pageHead('Help', 'How this demo works.', '<a href="#/dashboard">Dashboard</a> / Help')}
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
      ${pageHead('Risk Management', 'Create and manage ISO 14971 risk management files per product.', '<a href="#/dashboard">Dashboard</a> / <a href="#/process">Work Process</a> / Risk Management',
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
        `<a href="#/dashboard">Dashboard</a> / <a href="#/process">Work Process</a> / <a href="#/process/risk">Risk Management</a> / ${esc(p.model || p.name)}`,
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
    'doc-type': (el) => { docType = el.dataset.t; render(); },
    'new-product': () => newProductModal(),
    'load-sample': () => {
      const p = ORG ? orgSample() : QX.sampleProduct(uid, nowISO());
      db.products.push(p); save(); toast('Sample risk management file loaded');
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
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modalRoot.innerHTML) closeModal(); });
  document.addEventListener('click', (e) => {
    const row = e.target.closest('tr[data-href]');
    if (row && !e.target.closest('a, button, input')) location.hash = row.dataset.href;
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
    fn(new FormData(form), form);
  });

  /* ---------- router ---------- */
  function render() {
    const path = (location.hash || '#/login').slice(1);
    const parts = path.split('/').filter(Boolean);
    const session = getSession();
    closeModal();
    if (!session && parts[0] !== 'login') { go('/login'); return; }
    if (session && (parts[0] === 'login' || !parts.length)) { go('/dashboard'); return; }
    let html; let title = 'Dashboard';
    if (parts[0] === 'login') { html = viewLogin(); title = 'Sign in'; }
    else if (parts[0] === 'dashboard') html = viewDashboard();
    else if (parts[0] === 'help') { html = viewHelp(); title = 'Help'; }
    else if (ORG && parts[0] === 'documents' && parts[1]) { html = viewDocument(decodeURIComponent(parts[1])); if (!html) { go('/documents'); return; } title = parts[1]; }
    else if (ORG && parts[0] === 'documents') { html = viewDocuments(); title = 'Quality Documents'; }
    else if (ORG && parts[0] === 'people') { html = viewPeople(); title = 'People'; }
    else if (ORG && parts[0] === 'messages') { html = viewMessages(parts[1]); title = 'Messages'; }
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
    document.title = `${title} · Qualixx`;
    const search = app.querySelector('[data-change=search]');
    if (search) search.value = searchText;
    window.scrollTo(0, same ? y : 0);
    render._last = path;
  }
  window.addEventListener('hashchange', () => { if (!/^#\/process\/risk$/.test(location.hash)) searchText = ''; render(); });
  render();
})();
