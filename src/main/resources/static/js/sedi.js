const SediModule = (() => {
  let _data = [];

  async function load() {
    loading('tb-sedi', 5);
    await _fillAziende();
    try {
      const filtro = document.getElementById('fl-sede-az').value;
      _data = filtro ? await SedeAPI.byAzienda(filtro) : await SedeAPI.lista();
      render(); stat('st-sedi', _data.length);
    } catch(e) { toast('Errore sedi', 'err'); }
  }

  async function _fillAziende() {
    try {
      const list = await AziendaAPI.lista();
      const opts = list.map(a => `<option value="${a.id}">${a.nome}</option>`).join('');
      document.getElementById('sede-az-sel').innerHTML  = '<option value="" disabled selected>Seleziona...</option>' + opts;
      document.getElementById('fl-sede-az').innerHTML   = '<option value="">Tutte le aziende</option>' + opts;
    } catch(e) {}
  }

  function render() {
    const tb = document.getElementById('tb-sedi');
    if (!_data.length) { empty('tb-sedi', 5, 'Nessuna sede'); return; }
    tb.innerHTML = _data.map(s => `
      <tr>
        <td><span class="tag tag-id">#${s.id}</span></td>
        <td class="td-main">${s.citta}</td>
        <td>${s.via}</td>
        <td><span class="tag tag-neon">${s.aziendaNome}</span></td>
        <td>
          <button class="btn btn-sky btn-sm me-1" onclick="SediModule.edit(${s.id})">✎ modifica</button>
          <button class="btn btn-coral btn-sm" onclick="SediModule.remove(${s.id})">✕ elimina</button>
        </td>
      </tr>`).join('');
  }

  async function save() {
    const id        = document.getElementById('sede-id').value;
    const citta     = document.getElementById('sede-citta').value.trim();
    const via       = document.getElementById('sede-via').value.trim();
    const aziendaId = +document.getElementById('sede-az-sel').value;
    if (!citta || !via || !aziendaId) { toast('Compila tutti i campi', 'err'); return; }
    try {
      if (id) { await SedeAPI.update({ id: +id, citta, via, aziendaId }); toast('Sede aggiornata'); }
      else    { await SedeAPI.insert({ citta, via, aziendaId }); toast('Sede creata'); }
      reset(); load();
    } catch(e) { toast(e.message, 'err'); }
  }

  function edit(id) {
    const s = _data.find(x => x.id === id);
    document.getElementById('sede-id').value     = s.id;
    document.getElementById('sede-citta').value  = s.citta;
    document.getElementById('sede-via').value    = s.via;
    document.getElementById('sede-az-sel').value = s.aziendaId;
    document.getElementById('sede-form-title').textContent = `Modifica Sede #${id}`;
  }

  async function remove(id) {
    if (!await confirm('Eliminare questa sede?')) return;
    try { await SedeAPI.delete(id); toast('Sede eliminata'); load(); }
    catch(e) { toast(e.message, 'err'); }
  }

  function reset() {
    ['sede-id','sede-citta','sede-via'].forEach(i => document.getElementById(i).value = '');
    document.getElementById('sede-az-sel').value = '';
    document.getElementById('sede-form-title').textContent = 'Nuova Sede';
  }

  return { load, save, edit, remove, reset };
})();
