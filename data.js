// ============================================================
//  DATOS DEL RECETARIO
//  Para agregar una receta: copia un bloque dentro de "recetas",
//  cambia los textos y listo. "cat" y "sub" deben coincidir con
//  los ids de CATEGORIAS.
// ============================================================

const CATEGORIAS = [
  { id: "pasteleria", nombre: "Pastelería", icono: "🍰", desc: "Tortas, cremas, galletas y postres.", subs: [] },
  { id: "vinagretas", nombre: "Vinagretas", icono: "🥗", desc: "Aderezos y salsas para ensaladas.", subs: [] },
  { id: "panaderia", nombre: "Panadería", icono: "🥖", desc: "Panes, masas fermentadas y bollería.", subs: [] },
  {
    id: "dieta", nombre: "Cocina Dieta", icono: "🥦", desc: "Recetas para cada tipo de alimentación.",
    subs: [
      { id: "keto", nombre: "Keto" },
      { id: "vegana", nombre: "Vegana" },
      { id: "vegetariana", nombre: "Vegetariana" },
      { id: "sin-gluten", nombre: "Sin gluten" },
      { id: "alta-proteina", nombre: "Alta en proteína" },
      { id: "baja-calorias", nombre: "Baja en calorías" },
      { id: "diabetica", nombre: "Apta diabéticos" }
    ]
  }
];

const RECETAS = [
  {
    id: "bizcocho-vainilla", cat: "pasteleria", sub: null,
    titulo: "Bizcocho de vainilla", porciones: "10 porciones", tiempo: "55 min",
    ingredientes: ["250 g harina de trigo", "200 g azúcar", "4 huevos", "120 ml aceite neutro", "120 ml leche", "2 cdta polvo de hornear", "1 cdta esencia de vainilla", "1 pizca de sal"],
    pasos: ["Precalentar el horno a 175 °C y enmantecar un molde de 22 cm.", "Batir huevos con azúcar hasta que dupliquen su volumen.", "Agregar aceite, leche y vainilla.", "Incorporar harina, polvo de hornear y sal tamizados con movimientos envolventes.", "Hornear 35–40 min o hasta que un palillo salga limpio.", "Enfriar 10 min antes de desmoldar."],
    notas: "Base ideal para rellenar con crema pastelera o dulce de leche."
  },
  {
    id: "crema-pastelera", cat: "pasteleria", sub: null,
    titulo: "Crema pastelera", porciones: "500 g", tiempo: "20 min",
    ingredientes: ["500 ml leche", "4 yemas", "100 g azúcar", "40 g maicena", "1 vaina de vainilla (o 1 cdta esencia)", "20 g mantequilla"],
    pasos: ["Calentar la leche con la vainilla sin que hierva.", "Batir yemas, azúcar y maicena hasta integrar.", "Verter la leche caliente sobre las yemas, mezclando.", "Regresar al fuego medio revolviendo sin parar hasta espesar.", "Retirar, agregar la mantequilla y cubrir con film en contacto.", "Refrigerar mínimo 2 horas."],
    notas: "Dura 3 días refrigerada."
  },
  {
    id: "vinagreta-clasica", cat: "vinagretas", sub: null,
    titulo: "Vinagreta clásica", porciones: "250 ml", tiempo: "5 min",
    ingredientes: ["150 ml aceite de oliva", "50 ml vinagre de vino blanco", "1 cda mostaza Dijon", "1 cdta miel", "Sal y pimienta al gusto"],
    pasos: ["Mezclar vinagre, mostaza, miel, sal y pimienta.", "Agregar el aceite en hilo fino batiendo hasta emulsionar.", "Ajustar sazón."],
    notas: "Proporción base 3:1 aceite-vinagre. Se conserva 1 semana en frío."
  },
  {
    id: "vinagreta-limon-hierbas", cat: "vinagretas", sub: null,
    titulo: "Vinagreta de limón y hierbas", porciones: "250 ml", tiempo: "5 min",
    ingredientes: ["120 ml aceite de oliva", "60 ml jugo de limón", "1 diente de ajo rallado", "2 cda perejil picado", "1 cda cilantro picado", "Sal y pimienta"],
    pasos: ["Combinar limón, ajo y sal; reposar 3 min.", "Añadir el aceite batiendo.", "Incorporar las hierbas al final para que no se oscurezcan."],
    notas: "Consumir en 3–4 días."
  },
  {
    id: "pan-rustico", cat: "panaderia", sub: null,
    titulo: "Pan rústico de masa madre rápida", porciones: "1 pan (900 g)", tiempo: "4 h (30 min activo)",
    ingredientes: ["500 g harina de fuerza", "350 ml agua tibia", "10 g sal", "3 g levadura seca", "1 cda aceite de oliva"],
    pasos: ["Mezclar todos los ingredientes sin amasar; reposar 30 min.", "Hacer 3 series de pliegues cada 30 min.", "Fermentar hasta que doble (aprox. 1.5–2 h).", "Formar el bollo y dejar reposar 30 min.", "Hornear a 240 °C con vapor 20 min, bajar a 210 °C y 20 min más."],
    notas: "La hidratación es alta (70 %): usar las manos húmedas."
  },
  {
    id: "keto-pan-nube", cat: "dieta", sub: "keto",
    titulo: "Pan nube keto", porciones: "6 unidades", tiempo: "35 min",
    ingredientes: ["3 huevos (claras y yemas separadas)", "100 g queso crema", "1/4 cdta cremor tártaro", "1 pizca de sal"],
    pasos: ["Precalentar a 150 °C.", "Batir las claras con cremor tártaro a punto firme.", "Mezclar yemas con queso crema y sal.", "Incorporar suavemente las claras.", "Formar 6 discos en bandeja con papel y hornear 25–30 min."],
    notas: "Aprox. 1 g de carbohidratos por unidad."
  },
  {
    id: "vegana-hummus", cat: "dieta", sub: "vegana",
    titulo: "Hummus de garbanzo", porciones: "6 porciones", tiempo: "10 min",
    ingredientes: ["400 g garbanzos cocidos", "3 cda tahini", "Jugo de 1 limón", "1 diente de ajo", "3 cda aceite de oliva", "50 ml agua fría", "Sal y comino"],
    pasos: ["Procesar tahini y limón 1 min.", "Agregar ajo, aceite, sal y comino.", "Sumar garbanzos y agua fría hasta lograr textura cremosa."],
    notas: "Servir con un hilo de aceite y pimentón."
  },
  {
    id: "alta-proteina-bowl", cat: "dieta", sub: "alta-proteina",
    titulo: "Bowl de pollo y quinoa", porciones: "2 porciones", tiempo: "30 min",
    ingredientes: ["300 g pechuga de pollo", "1 taza quinoa cocida", "1 aguacate", "1 taza espinaca", "Limón, sal, pimienta, páprika"],
    pasos: ["Sazonar el pollo con sal, pimienta y páprika.", "Sellar en sartén 5–6 min por lado.", "Armar el bowl con quinoa, espinaca, pollo en tiras y aguacate.", "Aderezar con limón."],
    notas: "Aprox. 45 g de proteína por porción."
  }
];
