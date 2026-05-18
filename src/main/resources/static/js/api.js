// ── CONFIGURAZIONE BASE ──
const BASE_URL = 'http://localhost:8080';

/**
 * Wrapper generico per le chiamate fetch.
 * Lancia un errore con il messaggio del server in caso di risposta non ok.
 */
async function apiFetch(method, endpoint, body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(BASE_URL + endpoint, options);

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || `Errore ${response.status}`);
  }

  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// ══════════════════════════════
//  AZIENDA
// ══════════════════════════════
const AziendaAPI = {
  lista:    ()      => apiFetch('GET',    '/azienda/lista'),
  get:      (id)    => apiFetch('GET',    `/azienda/${id}`),
  insert:   (body)  => apiFetch('POST',   '/azienda/insert', body),
  update:   (body)  => apiFetch('PUT',    '/azienda/update', body),
  delete:   (id)    => apiFetch('DELETE', `/azienda/delete/${id}`)
};

// ══════════════════════════════
//  SEDE
// ══════════════════════════════
const SedeAPI = {
  lista:         ()          => apiFetch('GET',    '/sede/lista'),
  get:           (id)        => apiFetch('GET',    `/sede/${id}`),
  byAzienda:     (aziendaId) => apiFetch('GET',    `/sede/azienda/${aziendaId}`),
  insert:        (body)      => apiFetch('POST',   '/sede/insert', body),
  update:        (body)      => apiFetch('PUT',    '/sede/update', body),
  delete:        (id)        => apiFetch('DELETE', `/sede/delete/${id}`)
};

// ══════════════════════════════
//  DIPENDENTE
// ══════════════════════════════
const DipendenteAPI = {
  lista:         ()       => apiFetch('GET',    '/dipendente/lista'),
  get:           (id)     => apiFetch('GET',    `/dipendente/${id}`),
  bySede:        (sedeId) => apiFetch('GET',    `/dipendente/sede/${sedeId}`),
  insert:        (body)   => apiFetch('POST',   '/dipendente/insert', body),
  insertMulti:   (body)   => apiFetch('POST',   '/dipendente/insertMultiple', body),
  update:        (body)   => apiFetch('PUT',    '/dipendente/update', body),
  delete:        (id)     => apiFetch('DELETE', `/dipendente/delete/${id}`)
};
