// ── TOAST ──
function toast(msg, type = 'ok') {
  const icon = type === 'ok' ? '✓' : '✕';
  const el = document.createElement('div');
  el.className = `toast-item${type === 'err' ? ' err' : ''}`;
  el.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  document.getElementById('toast-wrap').appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

// ── CONFIRM MODAL ──
function confirm(msg) {
  return new Promise(resolve => {
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    document.getElementById('confirmMsg').textContent = msg;
    const btn = document.getElementById('confirmYes');
    const handler = () => { resolve(true); modal.hide(); btn.removeEventListener('click', handler); };
    btn.addEventListener('click', handler);
    document.getElementById('confirmModal').addEventListener('hidden.bs.modal', () => {
      resolve(false); btn.removeEventListener('click', handler);
    }, { once: true });
    modal.show();
  });
}

// ── NAVIGATION ──
const PAGE_TITLES = {
  aziende:    ['🏢', 'Aziende'],
  sedi:       ['📍', 'Sedi'],
  dipendenti: ['👤', 'Dipendenti'],
  progetti:   ['📁', 'Progetti']
};

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelector(`[data-page="${name}"]`).classList.add('active');
  const [icon, title] = PAGE_TITLES[name];
  document.getElementById('topbar-title').textContent = `${icon}  ${title}`;

  if (name === 'aziende')    AziendeModule.load();
  if (name === 'sedi')       SediModule.load();
  if (name === 'dipendenti') DipendentiModule.load();
  if (name === 'progetti')   ProgettiModule.load();
}

// ── HELPERS ──
function loading(tbodyId, cols) {
  document.getElementById(tbodyId).innerHTML =
    `<tr><td colspan="${cols}" class="empty">
      <div class="empty-icon">⏳</div>Caricamento...
    </td></tr>`;
}

function empty(tbodyId, cols, label) {
  document.getElementById(tbodyId).innerHTML =
    `<tr><td colspan="${cols}">
      <div class="empty"><div class="empty-icon">📭</div>${label}</div>
    </td></tr>`;
}

function stat(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
