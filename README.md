# Recetario Food Service

Recetario web estático: Pastelería, Vinagretas, Panadería y Cocina Dieta (con subsecciones).

## Ver en local
Abre `index.html` en el navegador (doble clic).

## Agregar recetas
Edita `data.js`: copia un bloque dentro de `RECETAS` y cambia los textos.
- `cat`: `pasteleria`, `vinagretas`, `panaderia` o `dieta`
- `sub`: solo para `dieta` (`keto`, `vegana`, `vegetariana`, `sin-gluten`, `alta-proteina`, `baja-calorias`, `diabetica`); en las demás usa `null`.
- Para crear una subsección nueva, agrégala en `CATEGORIAS` → `dieta` → `subs`.

## Publicar en GitHub Pages
1. Crea un repositorio público en GitHub.
2. Sube estos archivos.
3. En el repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save**.
4. En ~1 minuto estará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.
