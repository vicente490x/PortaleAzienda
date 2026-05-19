const AziendeModule = (() => {
  let _data = [];

  async function load() {
    loading('tb-aziende', 4);
    try {
      _data = await AziendaAPI.lista();
      render(); stat('st-aziende', _data.length);
    } catch(e) { toast('Errore aziende', 'err'); }
  }

  function render() {
    const tb = document.getElementById('tb-aziende');
    if (!_data.length) { empty('tb-aziende', 4, 'Nessuna azienda'); return; }
    tb.innerHTML = _data.map(a => `
      <tr>
        <td><span class="tag tag-id">#${a.id}</span></td>
        <td class="td-main">${a.nome}</td>
        <td><code style="font-size:11px;color:var(--sky)">${a.pIva}</code></td>
        <td>
          <button class="btn btn-sky btn-sm me-1" onclick="AziendeModule.edit(${a.id})">✎ modifica</button>
          <button class="btn btn-coral btn-sm" onclick="AziendeModule.remove(${a.id})">✕ elimina</button>
        </td>
      </tr>`).join('');
  }

  async function save() {
    const id   = document.getElementById('az-id').value;
    const nome = document.getElementById('az-nome').value.trim();
    const pIva = document.getElementById('az-piva').value.trim();
    if (!nome || !pIva) { toast('Compila tutti i campi', 'err'); return; }
    try {
      if (id) { await AziendaAPI.update({ id: +id, nome, pIva }); toast('Azienda aggiornata'); }
      else    { await AziendaAPI.insert({ nome, pIva }); toast('Azienda creata'); }
      reset(); load();
    } catch(e) { toast(e.message, 'err'); }
  }

  function edit(id) {
    const a = _data.find(x => x.id === id);
    document.getElementById('az-id').value   = a.id;
    document.getElementById('az-nome').value = a.nome;
    document.getElementById('az-piva').value = a.pIva;
    document.getElementById('az-form-title').textContent = `Modifica Azienda #${id}`;
  }

  async function remove(id) {
    if (!await confirm('Eliminare questa azienda?')) return;
    try { await AziendaAPI.delete(id); toast('Azienda eliminata'); load(); }
    catch(e) { toast(e.message, 'err'); }
  }

  function reset() {
    ['az-id','az-nome','az-piva'].forEach(i => document.getElementById(i).value = '');
    document.getElementById('az-form-title').textContent = 'Nuova Azienda';
  }

  function getData() { return _data; }
  return { load, save, edit, remove, reset, getData };
})();
