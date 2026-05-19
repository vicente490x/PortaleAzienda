const DipendentiModule = (() => {
  let _data = [];

  async function load() {
    loading('tb-dip', 6);
    await _fillSedi();
    try {
      const filtro = document.getElementById('fl-dip-sede').value;
      _data = filtro ? await DipendenteAPI.bySede(filtro) : await DipendenteAPI.lista();
      render(); stat('st-dipendenti', _data.length);
    } catch(e) { toast('Errore dipendenti', 'err'); }
  }

  async function _fillSedi() {
    try {
      const list = await SedeAPI.lista();
      const opts = list.map(s => `<option value="${s.id}">${s.citta} — ${s.via}</option>`).join('');
      document.getElementById('dip-sede-sel').innerHTML = '<option value="" disabled selected>Seleziona...</option>' + opts;
      document.getElementById('fl-dip-sede').innerHTML  = '<option value="">Tutte le sedi</option>' +
        list.map(s => `<option value="${s.id}">${s.citta}</option>`).join('');
    } catch(e) {}
  }

  function render() {
    const tb = document.getElementById('tb-dip');
    if (!_data.length) { empty('tb-dip', 6, 'Nessun dipendente'); return; }
    tb.innerHTML = _data.map(d => `
      <tr>
        <td><span class="tag tag-id">#${d.id}</span></td>
        <td class="td-main">${d.nome}</td>
        <td>${d.cognome}</td>
        <td><span class="tag tag-amber">${d.anniEsperienza} yr</span></td>
        <td><span class="tag tag-sky">${d.sedeCitta}</span></td>
        <td>
          <button class="btn btn-sky btn-sm me-1" onclick="DipendentiModule.edit(${d.id})">✎ modifica</button>
          <button class="btn btn-coral btn-sm" onclick="DipendentiModule.remove(${d.id})">✕ elimina</button>
        </td>
      </tr>`).join('');
  }

  async function save() {
    const id             = document.getElementById('dip-id').value;
    const nome           = document.getElementById('dip-nome').value.trim();
    const cognome        = document.getElementById('dip-cognome').value.trim();
    const anniEsperienza = +document.getElementById('dip-anni').value;
    const sedeId         = +document.getElementById('dip-sede-sel').value;
    if (!nome || !cognome || isNaN(anniEsperienza) || !sedeId) { toast('Compila tutti i campi', 'err'); return; }
    try {
      if (id) { await DipendenteAPI.update({ id: +id, nome, cognome, anniEsperienza, sedeId }); toast('Dipendente aggiornato'); }
      else    { await DipendenteAPI.insert({ nome, cognome, anniEsperienza, sedeId }); toast('Dipendente creato'); }
      reset(); load();
    } catch(e) { toast(e.message, 'err'); }
  }

  function edit(id) {
    const d = _data.find(x => x.id === id);
    document.getElementById('dip-id').value       = d.id;
    document.getElementById('dip-nome').value     = d.nome;
    document.getElementById('dip-cognome').value  = d.cognome;
    document.getElementById('dip-anni').value     = d.anniEsperienza;
    document.getElementById('dip-sede-sel').value = d.sedeId;
    document.getElementById('dip-form-title').textContent = `Modifica Dipendente #${id}`;
  }

  async function remove(id) {
    if (!await confirm('Eliminare questo dipendente?')) return;
    try { await DipendenteAPI.delete(id); toast('Dipendente eliminato'); load(); }
    catch(e) { toast(e.message, 'err'); }
  }

  function reset() {
    ['dip-id','dip-nome','dip-cognome','dip-anni'].forEach(i => document.getElementById(i).value = '');
    document.getElementById('dip-sede-sel').value = '';
    document.getElementById('dip-form-title').textContent = 'Nuovo Dipendente';
  }

  return { load, save, edit, remove, reset };
})();
