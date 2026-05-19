const ProgettiModule = (() => {
  let _data = [];

  async function load() {
    loading('tb-prog', 5);
    await _fillSelects();
    try {
      _data = await ProgettoAPI.lista();
      render(); stat('st-progetti', _data.length);
    } catch(e) { toast('Errore progetti', 'err'); }
  }

  // ── popola select aziende e dipendenti ──
 async function _fillSelects() {
  try {
    const [aziende, dipendenti] = await Promise.all([
      AziendaAPI.lista(),
      DipendenteAPI.lista()
    ]);

    // query 1 aziende
    document.getElementById('q1-az-sel').innerHTML =
      '<option value="" disabled selected>Seleziona azienda...</option>' +
      aziende.map(a =>
        `<option value="${a.id}">${a.nome}</option>`
      ).join('');

    // dipendenti progetto
    document.getElementById('prog-dip-sel').innerHTML =
      dipendenti.map(d =>
        `<option value="${d.id}">${d.nome} ${d.cognome}</option>`
      ).join('');

    // query 3 dipendenti
    document.getElementById('q3-dip-sel').innerHTML =
      '<option value="" disabled selected>Seleziona dipendente...</option>' +
      dipendenti.map(d =>
        `<option value="${d.id}">${d.nome} ${d.cognome}</option>`
      ).join('');

  } catch(e) {
    console.error(e);
  }
}

  // ── RENDER tabella principale ──
  function render() {
    const tb = document.getElementById('tb-prog');
    if (!_data.length) { empty('tb-prog', 5, 'Nessun progetto'); return; }
    tb.innerHTML = _data.map(p => `
      <tr>
        <td><span class="tag tag-id">#${p.id}</span></td>
        <td class="td-main">${p.nome}</td>
        <td>${p.cliente}</td>
        <td><span class="tag tag-amber">${p.durataGiorni} gg</span></td>
        <td>
          <button class="btn btn-sky btn-sm me-1" onclick="ProgettiModule.edit(${p.id})">✎ modifica</button>
          <button class="btn btn-coral btn-sm" onclick="ProgettiModule.remove(${p.id})">✕ elimina</button>
        </td>
      </tr>`).join('');
  }

  // ── RENDER risultati query ──
  function renderResults(tbodyId, panelId, items, countId) {
    const panel = document.getElementById(panelId);
    panel.classList.add('show');

    document.getElementById(countId).textContent = `${items.length} risultati`;

    const tb = document.getElementById(tbodyId);
    if (!items.length) {
      tb.innerHTML = `<tr><td colspan="5"><div class="empty"><div class="empty-icon">🔍</div>Nessun risultato</div></td></tr>`;
      return;
    }
    tb.innerHTML = items.map(p => `
      <tr>
        <td><span class="tag tag-id">#${p.id}</span></td>
        <td class="td-main">${p.nome}</td>
        <td>${p.cliente}</td>
        <td><span class="tag tag-amber">${p.durataGiorni} gg</span></td>
        <td><span class="tag tag-neon">${(p.dipendentiIds||[]).length} dip.</span></td>
      </tr>`).join('');
  }

  // ══════════════════════════════
  //  QUERY 1 — per azienda
  // ══════════════════════════════
  async function queryByAzienda() {
    const id = document.getElementById('q1-az-sel').value;
    if (!id) { toast('Seleziona un\'azienda', 'err'); return; }
    try {
      const res = await ProgettoAPI.byAzienda(id);
      renderResults('tb-q1', 'panel-q1', res, 'cnt-q1');
    } catch(e) { toast(e.message, 'err'); }
  }

  // ══════════════════════════════
  //  QUERY 2 — per nome
  // ══════════════════════════════
  async function queryByNome() {
    const nome = document.getElementById('q2-nome').value.trim();
    if (!nome) { toast('Inserisci un nome da cercare', 'err'); return; }
    try {
      const res = await ProgettoAPI.byNome(nome);
      renderResults('tb-q2', 'panel-q2', res, 'cnt-q2');
    } catch(e) { toast(e.message, 'err'); }
  }

  // ══════════════════════════════
  //  QUERY 3 — per dipendente
  // ══════════════════════════════
  async function queryByDipendente() {
    const id = document.getElementById('q3-dip-sel').value;
    if (!id) { toast('Seleziona un dipendente', 'err'); return; }
    try {
      const res = await ProgettoAPI.byDipendente(id);
      renderResults('tb-q3', 'panel-q3', res, 'cnt-q3');
    } catch(e) { toast(e.message, 'err'); }
  }

  // ── INSERT / UPDATE ──
  async function save() {
    const id           = document.getElementById('prog-id').value;
    const nome         = document.getElementById('prog-nome').value.trim();
    const cliente      = document.getElementById('prog-cliente').value.trim();
    const durataGiorni = +document.getElementById('prog-durata').value;
    const dipendentiIds = Array.from(
      document.getElementById('prog-dip-sel').selectedOptions
    ).map(o => +o.value);

    if (!nome || !cliente || !durataGiorni) { toast('Compila tutti i campi', 'err'); return; }

    try {
      if (id) {
        await ProgettoAPI.update({ id: +id, nome, cliente, durataGiorni, dipendentiIds });
        toast('Progetto aggiornato');
      } else {
        await ProgettoAPI.insert({ nome, cliente, durataGiorni, dipendentiIds });
        toast('Progetto creato');
      }
      reset(); load();
    } catch(e) { toast(e.message, 'err'); }
  }

  // ── EDIT ──
  async function edit(id) {
    const p = _data.find(x => x.id === id);
    document.getElementById('prog-id').value      = p.id;
    document.getElementById('prog-nome').value    = p.nome;
    document.getElementById('prog-cliente').value = p.cliente;
    document.getElementById('prog-durata').value  = p.durataGiorni;

    // seleziona i dipendenti già assegnati nel multi-select
    const sel = document.getElementById('prog-dip-sel');
    Array.from(sel.options).forEach(o => {
      o.selected = (p.dipendentiIds || []).includes(+o.value);
    });

    document.getElementById('prog-form-title').textContent = `Modifica Progetto #${id}`;
    document.getElementById('prog-nome').focus();
  }

  // ── DELETE ──
  async function remove(id) {
    if (!await confirm('Eliminare questo progetto?')) return;
    try { await ProgettoAPI.delete(id); toast('Progetto eliminato'); load(); }
    catch(e) { toast(e.message, 'err'); }
  }

  // ── RESET ──
  function reset() {
    ['prog-id','prog-nome','prog-cliente','prog-durata'].forEach(i => document.getElementById(i).value = '');
    Array.from(document.getElementById('prog-dip-sel').options).forEach(o => o.selected = false);
    document.getElementById('prog-form-title').textContent = 'Nuovo Progetto';
  }

  return { load, save, edit, remove, reset, queryByAzienda, queryByNome, queryByDipendente };
})();
