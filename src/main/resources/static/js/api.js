const BASE = 'http://localhost:8080';

async function apiFetch(method, url, body = null) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(BASE + url, opts);
  if (!res.ok) { const t = await res.text(); throw new Error(t || `Errore ${res.status}`); }
  if (res.status === 204) return null;
  const t = await res.text();
  return t ? JSON.parse(t) : null;
}

const AziendaAPI = {
  lista:  ()     => apiFetch('GET',    '/azienda/lista'),
  insert: (b)    => apiFetch('POST',   '/azienda/insert', b),
  update: (b)    => apiFetch('PUT',    '/azienda/update', b),
  delete: (id)   => apiFetch('DELETE', `/azienda/delete/${id}`)
};

const SedeAPI = {
  lista:     ()    => apiFetch('GET',    '/sede/lista'),
  byAzienda: (id)  => apiFetch('GET',    `/sede/azienda/${id}`),
  insert:    (b)   => apiFetch('POST',   '/sede/insert', b),
  update:    (b)   => apiFetch('PUT',    '/sede/update', b),
  delete:    (id)  => apiFetch('DELETE', `/sede/delete/${id}`)
};

const DipendenteAPI = {
  lista:   ()    => apiFetch('GET',    '/dipendente/lista'),
  bySede:  (id)  => apiFetch('GET',    `/dipendente/sede/${id}`),
  insert:  (b)   => apiFetch('POST',   '/dipendente/insert', b),
  update:  (b)   => apiFetch('PUT',    '/dipendente/update', b),
  delete:  (id)  => apiFetch('DELETE', `/dipendente/delete/${id}`)
};

const ProgettoAPI = {
  lista:        ()       => apiFetch('GET',    '/progetto/lista'),
  byAzienda:    (id)     => apiFetch('GET',    `/progetto/azienda/${id}`),
  byNome:       (nome)   => apiFetch('GET',    `/progetto/search?nome=${encodeURIComponent(nome)}`),
  byDipendente: (id)     => apiFetch('GET',    `/progetto/dipendente/${id}`),
  insert:       (b)      => apiFetch('POST',   '/progetto/insert', b),
  update:       (b)      => apiFetch('PUT',    '/progetto/update', b),
  delete:       (id)     => apiFetch('DELETE', `/progetto/delete/${id}`)
};
