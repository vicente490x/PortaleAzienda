// ══════════════════════════════
//  TOAST
// ══════════════════════════════
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const icon = type === 'success' ? '✓' : '✕';

  const el = document.createElement('div');
  el.className = `toast-custom ${type === 'error' ? 'error' : ''}`;
  el.innerHTML = `<span>${icon}</span><span>${message}</span>`;

  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ══════════════════════════════
//  MODAL CONFIRM
// ══════════════════════════════
function showConfirm(message) {
  return new Promise(resolve => {
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    document.getElementById('confirmMessage').textContent = message;

    const btnYes = document.getElementById('confirmYes');
    const handler = () => {
      resolve(true);
      modal.hide();
      btnYes.removeEventListener('click', handler);
    };
    btnYes.addEventListener('click', handler);

    document.getElementById('confirmModal').addEventListener('hidden.bs.modal', () => {
      resolve(false);
      btnYes.removeEventListener('click', handler);
    }, { once: true });

    modal.show();
  });
}

// ══════════════════════════════
//  NAVIGATION
// ══════════════════════════════
function showPage(name) {
  // nasconde tutte le pagine
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link-item').forEach(b => b.classList.remove('active'));

  // mostra la pagina richiesta
  document.getElementById('page-' + name).classList.add('active');
  document.querySelector(`[data-page="${name}"]`).classList.add('active');

  // aggiorna topbar title
  const titles = { aziende: 'Aziende', sedi: 'Sedi', dipendenti: 'Dipendenti' };
  document.getElementById('topbar-title').textContent = titles[name] || name;

  // carica i dati della pagina
  if (name === 'aziende')    AziendeModule.load();
  if (name === 'sedi')       SediModule.load();
  if (name === 'dipendenti') DipendentiModule.load();
}

// ══════════════════════════════
//  UTILITY
// ══════════════════════════════
function setLoading(tbodyId, colSpan) {
  document.getElementById(tbodyId).innerHTML = `
    <tr>
      <td colspan="${colSpan}" class="text-center py-4 text-muted" style="font-size:.82rem">
        <div class="spinner-border spinner-border-sm me-2" role="status"></div>
        Caricamento...
      </td>
    </tr>`;
}

function setEmpty(tbodyId, colSpan, label) {
  document.getElementById(tbodyId).innerHTML = `
    <tr>
      <td colspan="${colSpan}">
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          <p>${label}</p>
        </div>
      </td>
    </tr>`;
}

function updateStatCard(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}
