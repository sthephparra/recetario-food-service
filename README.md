# Recetario Food Service

Recetario web estático: Pastelería, Vinagretas, Panadería y Cocina Dieta (con subsecciones).

## Ver en local
Abre `index.html` en el navegador (doble clic).

## Calculador de cantidades
Cada receta tiene un campo **"Calcular para __ kg de harina"**. Al cambiar los kilos, todos los
ingredientes y el rendimiento (ej. cantidad de bagels) se recalculan. Se basa en los ingredientes
marcados con `h: true` en `data.js` (la harina u otro ingrediente base).

## Agregar recetas
Edita `data.js` (arriba del archivo hay una guía del formato): copia un bloque dentro de `RECETAS`
y cambia los textos. Los ingredientes llevan cantidad numérica (`q`) y unidad (`u`) para poder escalarse;
marca con `h: true` la harina o ingrediente base. No escribas cantidades de ingredientes dentro de los pasos.
- `cat`: `pasteleria`, `vinagretas`, `panaderia` o `dieta`
- `sub`: solo para `dieta` (`keto`, `vegana`, `vegetariana`, `sin-gluten`, `alta-proteina`, `baja-calorias`, `diabetica`); en las demás usa `null`.
- Para crear una subsección nueva, agrégala en `CATEGORIAS` → `dieta` → `subs`.

## Publicar en GitHub Pages
1. Crea un repositorio público en GitHub.
2. Sube estos archivos.
3. En el repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save**.
4. En ~1 minuto estará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.
