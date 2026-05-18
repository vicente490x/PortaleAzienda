const SediModule = (() => {

  let _data = [];

  // ── LOAD ──
  async function load() {
    setLoading('tbody-sedi', 5);
    await _loadAziendeSelects();
    try {
      const filtroAzienda = document.getElementById('filter-sedi-azienda').value;
      if (filtroAzienda) {
        _data = await SedeAPI.byAzienda(filtroAzienda);
      } else {
        _data = await SedeAPI.lista();
      }
      render();
      updateStatCard('stat-sedi', _data.length);
    } catch (e) {
      showToast('Errore nel caricamento delle sedi', 'error');
    }
  }

  // ── POPOLA SELECT AZIENDE ──
  async function _loadAziendeSelects() {
    try {
      const aziende = await AziendaAPI.lista();
      const opts = aziende.map(a => `<option value="${a.id}">${a.nome}</option>`).join('');

      document.getElementById('sede-azienda-select').innerHTML =
        '<option value="" disabled selected>Seleziona azienda</option>' + opts;

      document.getElementById('filter-sedi-azienda').innerHTML =
        '<option value="">Tutte le aziende</option>' + opts;
    } catch (e) {}
  }

  // ── RENDER TABLE ──
  function render() {
    const tbody = document.getElementById('tbody-sedi');
    if (!_data.length) {
      setEmpty('tbody-sedi', 5, 'Nessuna sede presente');
      return;
    }
    tbody.innerHTML = _data.map(s => `
      <tr>
        <td><span class="badge-id">#${s.id}</span></td>
        <td><strong>${s.citta}</strong></td>
        <td>${s.via}</td>
        <td><span class="badge-tag">${s.aziendaNome}</span></td>
        <td>
          <button class="btn btn-outline-primary btn-sm me-1" onclick="SediModule.edit(${s.id})">
            <i class="bi bi-pencil"></i> Modifica
          </button>
          <button class="btn btn-outline-danger btn-sm" onclick="SediModule.remove(${s.id})">
            <i class="bi bi-trash"></i> Elimina
          </button>
        </td>
      </tr>`).join('');
  }

  // ── SAVE ──
  async function save() {
    const id        = document.getElementById('sede-id').value;
    const citta     = document.getElementById('sede-citta').value.trim();
    const via       = document.getElementById('sede-via').value.trim();
    const aziendaId = parseInt(document.getElementById('sede-azienda-select').value);

    if (!citta || !via || !aziendaId) {
      showToast('Compila tutti i campi', 'error');
      return;
    }

    try {
      if (id) {
        await SedeAPI.update({ id: parseInt(id), citta, via, aziendaId });
        showToast('Sede aggiornata con successo');
      } else {
        await SedeAPI.insert({ citta, via, aziendaId });
        showToast('Sede creata con successo');
      }
      reset();
      load();
    } catch (e) {
      showToast(e.message, 'error');
    }
  }

  // ── EDIT ──
  function edit(id) {
    const s = _data.find(x => x.id === id);
    if (!s) return;

    document.getElementById('sede-id').value             = s.id;
    document.getElementById('sede-citta').value          = s.citta;
    document.getElementById('sede-via').value            = s.via;
    document.getElementById('sede-azienda-select').value = s.aziendaId;
    document.getElementById('sede-form-title').textContent = `Modifica Sede #${s.id}`;
    document.getElementById('sede-citta').focus();
  }

  // ── DELETE ──
  async function remove(id) {
    const ok = await showConfirm('Sei sicuro di voler eliminare questa sede?');
    if (!ok) return;
    try {
      await SedeAPI.delete(id);
      showToast('Sede eliminata');
      load();
    } catch (e) {
      showToast(e.message, 'error');
    }
  }

  // ── RESET ──
  function reset() {
    document.getElementById('sede-id').value             = '';
    document.getElementById('sede-citta').value          = '';
    document.getElementById('sede-via').value            = '';
    document.getElementById('sede-azienda-select').value = '';
    document.getElementById('sede-form-title').textContent = 'Nuova Sede';
  }

  return { load, save, edit, remove, reset };
})();
