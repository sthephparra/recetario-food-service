const $app = document.getElementById("app");
const $nav = document.getElementById("nav");
const $buscar = document.getElementById("buscar");

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const catById = id => CATEGORIAS.find(c => c.id === id);
const subName = (cat, sub) => (cat.subs.find(s => s.id === sub) || {}).nombre;

function countRecetas(catId, subId) {
  return RECETAS.filter(r => r.cat === catId && (!subId || r.sub === subId)).length;
}
const plural = n => `${n} receta${n === 1 ? "" : "s"}`;

function recetaCard(r) {
  const cat = catById(r.cat);
  const sn = r.sub ? " · " + subName(cat, r.sub) : "";
  return `<a class="card" href="#/receta/${r.id}">
    <div class="ico">${cat.icono}</div><h3>${esc(r.titulo)}</h3>
    <p>${esc(r.tiempo)} · ${esc(r.porciones)}</p><span class="badge">${esc(cat.nombre + sn)}</span></a>`;
}

function renderNav(activeCat) {
  $nav.innerHTML = `<a href="#/" class="${activeCat ? "" : "on"}">Inicio</a>` +
    CATEGORIAS.map(c => `<a href="#/${c.id}" class="${c.id === activeCat ? "on" : ""}">${c.icono} ${c.nombre}</a>`).join("");
}

function vistaInicio() {
  renderNav(null);
  $app.innerHTML = `<h1>Bienvenido</h1><p class="sub">Elige una sección para ver las recetas.</p>
    <div class="grid">${CATEGORIAS.map(c => `
      <a class="card" href="#/${c.id}"><div class="ico">${c.icono}</div><h3>${c.nombre}</h3>
      <p>${c.desc}</p><span class="badge">${plural(countRecetas(c.id))}</span></a>`).join("")}</div>`;
}

function vistaCategoria(catId, subId) {
  const cat = catById(catId);
  renderNav(catId);
  let html = `<h1>${cat.icono} ${cat.nombre}</h1><p class="sub">${cat.desc}</p>`;
  if (cat.subs.length) {
    html += `<div class="chips"><a href="#/${catId}" class="${!subId ? "on" : ""}">Todas (${countRecetas(catId)})</a>` +
      cat.subs.map(s => `<a href="#/${catId}/${s.id}" class="${s.id === subId ? "on" : ""}">${s.nombre} (${countRecetas(catId, s.id)})</a>`).join("") + `</div>`;
  }
  const lista = RECETAS.filter(r => r.cat === catId && (!subId || r.sub === subId));
  html += lista.length ? `<div class="grid">${lista.map(recetaCard).join("")}</div>` : `<p class="vacio">Aún no hay recetas aquí.</p>`;
  $app.innerHTML = html;
}

function vistaReceta(id) {
  const r = RECETAS.find(x => x.id === id);
  if (!r) return vistaInicio();
  const cat = catById(r.cat);
  renderNav(r.cat);
  const sn = r.sub ? ` › <a href="#/${cat.id}/${r.sub}">${subName(cat, r.sub)}</a>` : "";
  $app.innerHTML = `<div class="crumbs"><a href="#/${cat.id}">${cat.nombre}</a>${sn}</div>
    <article class="receta"><h1>${esc(r.titulo)}</h1>
    <div class="meta"><span>⏱ ${esc(r.tiempo)}</span><span>🍽 ${esc(r.porciones)}</span></div>
    <h2>Ingredientes</h2><ul>${r.ingredientes.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
    <h2>Preparación</h2><ol>${r.pasos.map(p => `<li>${esc(p)}</li>`).join("")}</ol>
    ${r.notas ? `<div class="nota">💡 ${esc(r.notas)}</div>` : ""}
    <button class="print" onclick="window.print()">🖨 Imprimir</button></article>`;
  window.scrollTo(0, 0);
}

function vistaBusqueda(q) {
  renderNav(null);
  const n = norm(q);
  const lista = RECETAS.filter(r => norm(r.titulo + " " + r.ingredientes.join(" ")).includes(n));
  $app.innerHTML = `<h1>Resultados</h1><p class="sub">“${esc(q)}” · ${plural(lista.length)}</p>` +
    (lista.length ? `<div class="grid">${lista.map(recetaCard).join("")}</div>` : `<p class="vacio">Sin resultados.</p>`);
}

function router() {
  const [a, b] = location.hash.replace(/^#\/?/, "").split("/");
  if (!a) return vistaInicio();
  if (a === "receta") return vistaReceta(b);
  if (catById(a)) return vistaCategoria(a, b);
  vistaInicio();
}

$buscar.addEventListener("input", () => {
  const q = $buscar.value.trim();
  q ? vistaBusqueda(q) : router();
});
window.addEventListener("hashchange", () => { $buscar.value = ""; router(); });
router();
