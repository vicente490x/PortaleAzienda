const DipendentiModule = (() => {

  let _data = [];

  // ── LOAD ──
  async function load() {
    setLoading('tbody-dipendenti', 6);
    await _loadSediSelects();
    try {
      const filtroSede = document.getElementById('filter-dip-sede').value;
      if (filtroSede) {
        _data = await DipendenteAPI.bySede(filtroSede);
      } else {
        _data = await DipendenteAPI.lista();
      }
      render();
      updateStatCard('stat-dipendenti', _data.length);
    } catch (e) {
      showToast('Errore nel caricamento dei dipendenti', 'error');
    }
  }

  // ── POPOLA SELECT SEDI ──
  async function _loadSediSelects() {
    try {
      const sedi = await SedeAPI.lista();
      const opts = sedi.map(s => `<option value="${s.id}">${s.citta} — ${s.via}</option>`).join('');

      document.getElementById('dip-sede-select').innerHTML =
        '<option value="" disabled selected>Seleziona sede</option>' + opts;

      document.getElementById('filter-dip-sede').innerHTML =
        '<option value="">Tutte le sedi</option>' +
        sedi.map(s => `<option value="${s.id}">${s.citta}</option>`).join('');
    } catch (e) {}
  }

  // ── RENDER TABLE ──
  function render() {
    const tbody = document.getElementById('tbody-dipendenti');
    if (!_data.length) {
      setEmpty('tbody-dipendenti', 6, 'Nessun dipendente presente');
      return;
    }
    tbody.innerHTML = _data.map(d => `
      <tr>
        <td><span class="badge-id">#${d.id}</span></td>
        <td><strong>${d.nome}</strong></td>
        <td>${d.cognome}</td>
        <td><span class="badge-anni">${d.anniEsperienza} anni</span></td>
        <td><span class="badge-tag">${d.sedeCitta}</span></td>
        <td>
          <button class="btn btn-outline-primary btn-sm me-1" onclick="DipendentiModule.edit(${d.id})">
            <i class="bi bi-pencil"></i> Modifica
          </button>
          <button class="btn btn-outline-danger btn-sm" onclick="DipendentiModule.remove(${d.id})">
            <i class="bi bi-trash"></i> Elimina
          </button>
        </td>
      </tr>`).join('');
  }

  // ── SAVE ──
  async function save() {
    const id             = document.getElementById('dip-id').value;
    const nome           = document.getElementById('dip-nome').value.trim();
    const cognome        = document.getElementById('dip-cognome').value.trim();
    const anniEsperienza = parseInt(document.getElementById('dip-anni').value);
    const sedeId         = parseInt(document.getElementById('dip-sede-select').value);

    if (!nome || !cognome || isNaN(anniEsperienza) || !sedeId) {
      showToast('Compila tutti i campi', 'error');
      return;
    }

    try {
      if (id) {
        await DipendenteAPI.update({ id: parseInt(id), nome, cognome, anniEsperienza, sedeId });
        showToast('Dipendente aggiornato con successo');
      } else {
        await DipendenteAPI.insert({ nome, cognome, anniEsperienza, sedeId });
        showToast('Dipendente creato con successo');
      }
      reset();
      load();
    } catch (e) {
      showToast(e.message, 'error');
    }
  }

  // ── EDIT ──
  function edit(id) {
    const d = _data.find(x => x.id === id);
    if (!d) return;

    document.getElementById('dip-id').value          = d.id;
    document.getElementById('dip-nome').value        = d.nome;
    document.getElementById('dip-cognome').value     = d.cognome;
    document.getElementById('dip-anni').value        = d.anniEsperienza;
    document.getElementById('dip-sede-select').value = d.sedeId;
    document.getElementById('dip-form-title').textContent = `Modifica Dipendente #${d.id}`;
    document.getElementById('dip-nome').focus();
  }

  // ── DELETE ──
  async function remove(id) {
    const ok = await showConfirm('Sei sicuro di voler eliminare questo dipendente?');
    if (!ok) return;
    try {
      await DipendenteAPI.delete(id);
      showToast('Dipendente eliminato');
      load();
    } catch (e) {
      showToast(e.message, 'error');
    }
  }

  // ── RESET ──
  function reset() {
    document.getElementById('dip-id').value          = '';
    document.getElementById('dip-nome').value        = '';
    document.getElementById('dip-cognome').value     = '';
    document.getElementById('dip-anni').value        = '';
    document.getElementById('dip-sede-select').value = '';
    document.getElementById('dip-form-title').textContent = 'Nuovo Dipendente';
  }

  return { load, save, edit, remove, reset };
})();
