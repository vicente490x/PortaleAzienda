const AziendeModule = (() => {

  let _data = [];

  // ── LOAD ──
  async function load() {
    setLoading('tbody-aziende', 4);
    try {
      _data = await AziendaAPI.lista();
      render();
      updateStatCard('stat-aziende', _data.length);
    } catch (e) {
      showToast('Errore nel caricamento delle aziende', 'error');
    }
  }

  // ── RENDER TABLE ──
  function render() {
    const tbody = document.getElementById('tbody-aziende');
    if (!_data.length) {
      setEmpty('tbody-aziende', 4, 'Nessuna azienda presente');
      return;
    }
    tbody.innerHTML = _data.map(a => `
      <tr>
        <td><span class="badge-id">#${a.id}</span></td>
        <td><strong>${a.nome}</strong></td>
        <td><code style="font-size:.8rem">${a.pIva}</code></td>
        <td>
          <button class="btn btn-outline-primary btn-sm me-1" onclick="AziendeModule.edit(${a.id})">
            <i class="bi bi-pencil"></i> Modifica
          </button>
          <button class="btn btn-outline-danger btn-sm" onclick="AziendeModule.remove(${a.id})">
            <i class="bi bi-trash"></i> Elimina
          </button>
        </td>
      </tr>`).join('');
  }

  // ── SAVE (INSERT / UPDATE) ──
  async function save() {
    const id   = document.getElementById('azienda-id').value;
    const nome = document.getElementById('azienda-nome').value.trim();
    const pIva = document.getElementById('azienda-piva').value.trim();

    if (!nome || !pIva) {
      showToast('Compila tutti i campi', 'error');
      return;
    }

    try {
      if (id) {
        await AziendaAPI.update({ id: parseInt(id), nome, pIva });
        showToast('Azienda aggiornata con successo');
      } else {
        await AziendaAPI.insert({ nome, pIva });
        showToast('Azienda creata con successo');
      }
      reset();
      load();
    } catch (e) {
      showToast(e.message, 'error');
    }
  }

  // ── EDIT (popola il form) ──
  function edit(id) {
    const a = _data.find(x => x.id === id);
    if (!a) return;

    document.getElementById('azienda-id').value      = a.id;
    document.getElementById('azienda-nome').value    = a.nome;
    document.getElementById('azienda-piva').value    = a.pIva;
    document.getElementById('azienda-form-title').textContent = `Modifica Azienda #${a.id}`;
    document.getElementById('azienda-nome').focus();
  }

  // ── DELETE ──
  async function remove(id) {
    const ok = await showConfirm('Sei sicuro di voler eliminare questa azienda?');
    if (!ok) return;
    try {
      await AziendaAPI.delete(id);
      showToast('Azienda eliminata');
      load();
    } catch (e) {
      showToast(e.message, 'error');
    }
  }

  // ── RESET FORM ──
  function reset() {
    document.getElementById('azienda-id').value   = '';
    document.getElementById('azienda-nome').value = '';
    document.getElementById('azienda-piva').value = '';
    document.getElementById('azienda-form-title').textContent = 'Nuova Azienda';
  }

  // ── GETTER pubblico (usato da SediModule) ──
  function getData() { return _data; }

  return { load, save, edit, remove, reset, getData };
})();
