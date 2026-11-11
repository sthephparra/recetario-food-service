const $app = document.getElementById("app");
const $nav = document.getElementById("nav");
const $buscar = document.getElementById("buscar");

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const catById = id => CATEGORIAS.find(c => c.id === id);
const subName = (cat, sub) => (cat.subs.find(s => s.id === sub) || {}).nombre;
const num = (x, d = 2) => x.toLocaleString("es", { maximumFractionDigits: d });

// ---------- Cálculo de cantidades ----------
const baseItems = r => r.ingredientes.filter(i => i.h);
const baseTotal = r => baseItems(r).reduce((s, i) => s + i.q, 0);      // en g o ml
const baseUnidad = r => (baseItems(r)[0] || {}).u === "ml" ? "L" : "kg";

function fmtCantidad(q, u) {
  if (u === "g") return q >= 5000 ? `${num(q / 1000)} kg` : `${num(q, q >= 100 ? 0 : 1)} g`;
  if (u === "ml") return q >= 5000 ? `${num(q / 1000)} L` : `${num(q, q >= 100 ? 0 : 1)} ml`;
  const r = Math.max(0.25, Math.round(q * 4) / 4);                     // cucharadas, tazas, unidades…
  return `${num(r)} ${u === "unid" ? "" : u}`.trim();
}

function fmtRinde(r, f) {
  const x = r.rinde;
  const v = Array.isArray(x.q) ? x.q : [x.q];
  if (x.u === "g" || x.u === "ml") return fmtCantidad(v[0] * f, x.u);
  const t = [...new Set(v.map(n => num(Math.max(1, Math.round(n * f)), 0)))].join("–");
  return `${t} ${x.u}`;
}

function htmlIngredientes(r, f) {
  return r.ingredientes.map(i => {
    if (i.grupo) return `<li class="grupo">${esc(i.grupo)}</li>`;
    const q = i.txt ? esc(i.txt) : fmtCantidad(i.q * f, i.u);
    return `<li><span class="q">${q}</span> ${esc(i.n)}</li>`;
  }).join("");
}

// ---------- Vistas ----------
function countRecetas(catId, subId) {
  return RECETAS.filter(r => r.cat === catId && (!subId || r.sub === subId)).length;
}
const plural = n => `${n} receta${n === 1 ? "" : "s"}`;

function recetaCard(r) {
  const cat = catById(r.cat);
  const sn = r.sub ? " · " + subName(cat, r.sub) : "";
  return `<a class="card" href="#/receta/${r.id}">
    <div class="ico">${cat.icono}</div><h3>${esc(r.titulo)}</h3>
    <p>${esc(r.tiempo)} · ${esc(fmtRinde(r, 1))}</p><span class="badge">${esc(cat.nombre + sn)}</span></a>`;
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
  const base = baseTotal(r) / 1000, bu = baseUnidad(r);
  $app.innerHTML = `<div class="crumbs"><a href="#/${cat.id}">${cat.nombre}</a>${sn}</div>
    <article class="receta"><h1>${esc(r.titulo)}</h1>
    <div class="meta"><span>⏱ ${esc(r.tiempo)}</span><span>🍽 Rinde: <b id="rinde"></b></span></div>

    <div class="calc">
      <label for="kilos">⚖️ Calcular para</label>
      <input id="kilos" type="number" min="0.001" step="any" value="${base}" inputmode="decimal">
      <span>${bu} de ${esc(r.baseNombre)}</span>
      <button type="button" id="reset" class="print">Receta original</button>
      <small id="factor"></small>
    </div>

    <h2>Ingredientes</h2><ul id="ings" class="ings"></ul>
    <h2>Preparación</h2><ol>${r.pasos.map(p => `<li>${esc(p)}</li>`).join("")}</ol>
    ${r.notas ? `<div class="nota">💡 ${esc(r.notas)}</div>` : ""}
    <button class="print" onclick="window.print()">🖨 Imprimir</button></article>`;

  const $k = document.getElementById("kilos");
  const pintar = () => {
    const v = parseFloat($k.value.replace(",", "."));
    const f = v > 0 ? (v * 1000) / baseTotal(r) : 1;
    document.getElementById("ings").innerHTML = htmlIngredientes(r, f);
    document.getElementById("rinde").textContent = fmtRinde(r, f);
    document.getElementById("factor").textContent = f === 1 ? "" : `Receta × ${num(f, 3)}`;
  };
  $k.addEventListener("input", pintar);
  document.getElementById("reset").addEventListener("click", () => { $k.value = base; pintar(); });
  pintar();
  window.scrollTo(0, 0);
}

function vistaBusqueda(q) {
  renderNav(null);
  const n = norm(q);
  const lista = RECETAS.filter(r => norm(r.titulo + " " + r.ingredientes.map(i => i.n || "").join(" ")).includes(n));
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
