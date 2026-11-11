// ============================================================
//  DATOS DEL RECETARIO
//
//  Cada ingrediente es un objeto:
//    { n: "Harina de fuerza", q: 2000, u: "g", h: true }
//      n = nombre, q = cantidad, u = unidad (g, ml, cda, cdta, taza, unid)
//      h: true  -> ingrediente BASE (harinas / secos). Con la suma de los
//                  ingredientes base se calcula cuántos kilos vas a trabajar.
//    { n: "Sal y pimienta", txt: "al gusto" }   -> no se escala
//    { grupo: "MASA" }                           -> título de bloque
//
//  La receta se escribe para la cantidad base indicada (la suma de los "h").
//  El sitio multiplica todo cuando eliges otra cantidad en kilos.
//
//  rinde: { q: 27 | [26, 28], u: "bagels" }  -> cuánto sale con la cantidad base
//  baseNombre: texto que aparece en el calculador ("harina", "arroz"...)
//
//  En los pasos NO escribas cantidades de ingredientes (cambian al escalar);
//  sí puedes poner temperaturas, tiempos y pesos por pieza.
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
    titulo: "Bizcocho de vainilla", tiempo: "55 min",
    baseNombre: "harina", rinde: { q: 10, u: "porciones" },
    ingredientes: [
      { n: "Harina de trigo", q: 250, u: "g", h: true },
      { n: "Azúcar", q: 200, u: "g" },
      { n: "Huevos", q: 4, u: "unid" },
      { n: "Aceite neutro", q: 120, u: "ml" },
      { n: "Leche", q: 120, u: "ml" },
      { n: "Polvo de hornear", q: 2, u: "cdta" },
      { n: "Esencia de vainilla", q: 1, u: "cdta" },
      { n: "Sal", txt: "1 pizca" }
    ],
    pasos: ["Precalentar el horno a 175 °C y enmantecar un molde de 22 cm.", "Batir huevos con azúcar hasta que dupliquen su volumen.", "Agregar aceite, leche y vainilla.", "Incorporar harina, polvo de hornear y sal tamizados con movimientos envolventes.", "Hornear 35–40 min o hasta que un palillo salga limpio.", "Enfriar 10 min antes de desmoldar."],
    notas: "Base ideal para rellenar con crema pastelera o dulce de leche. Los tiempos de horno son para un molde de 22 cm; en cantidades mayores usa más moldes."
  },
  {
    id: "crema-pastelera", cat: "pasteleria", sub: null,
    titulo: "Crema pastelera", tiempo: "20 min",
    baseNombre: "leche", rinde: { q: 500, u: "g" },
    ingredientes: [
      { n: "Leche", q: 500, u: "ml", h: true },
      { n: "Yemas", q: 4, u: "unid" },
      { n: "Azúcar", q: 100, u: "g" },
      { n: "Maicena", q: 40, u: "g" },
      { n: "Esencia de vainilla", q: 1, u: "cdta" },
      { n: "Mantequilla", q: 20, u: "g" }
    ],
    pasos: ["Calentar la leche con la vainilla sin que hierva.", "Batir yemas, azúcar y maicena hasta integrar.", "Verter la leche caliente sobre las yemas, mezclando.", "Regresar al fuego medio revolviendo sin parar hasta espesar.", "Retirar, agregar la mantequilla y cubrir con film en contacto.", "Refrigerar mínimo 2 horas."],
    notas: "Dura 3 días refrigerada. Para el cálculo se toma la leche como base (1 L ≈ 1 kg)."
  },
  {
    id: "vinagreta-clasica", cat: "vinagretas", sub: null,
    titulo: "Vinagreta clásica", tiempo: "5 min",
    baseNombre: "aceite de oliva", rinde: { q: 250, u: "ml" },
    ingredientes: [
      { n: "Aceite de oliva", q: 150, u: "ml", h: true },
      { n: "Vinagre de vino blanco", q: 50, u: "ml" },
      { n: "Mostaza Dijon", q: 1, u: "cda" },
      { n: "Miel", q: 1, u: "cdta" },
      { n: "Sal y pimienta", txt: "al gusto" }
    ],
    pasos: ["Mezclar vinagre, mostaza, miel, sal y pimienta.", "Agregar el aceite en hilo fino batiendo hasta emulsionar.", "Ajustar sazón."],
    notas: "Proporción base 3:1 aceite-vinagre. Se conserva 1 semana en frío."
  },
  {
    id: "vinagreta-limon-hierbas", cat: "vinagretas", sub: null,
    titulo: "Vinagreta de limón y hierbas", tiempo: "5 min",
    baseNombre: "aceite de oliva", rinde: { q: 250, u: "ml" },
    ingredientes: [
      { n: "Aceite de oliva", q: 120, u: "ml", h: true },
      { n: "Jugo de limón", q: 60, u: "ml" },
      { n: "Ajo rallado", q: 1, u: "diente" },
      { n: "Perejil picado", q: 2, u: "cda" },
      { n: "Cilantro picado", q: 1, u: "cda" },
      { n: "Sal y pimienta", txt: "al gusto" }
    ],
    pasos: ["Combinar limón, ajo y sal; reposar 3 min.", "Añadir el aceite batiendo.", "Incorporar las hierbas al final para que no se oscurezcan."],
    notas: "Consumir en 3–4 días."
  },
  {
    id: "pan-rustico", cat: "panaderia", sub: null,
    titulo: "Pan rústico de masa madre rápida", tiempo: "4 h (30 min activo)",
    baseNombre: "harina", rinde: { q: 900, u: "g de pan" },
    ingredientes: [
      { n: "Harina de fuerza", q: 500, u: "g", h: true },
      { n: "Agua tibia", q: 350, u: "ml" },
      { n: "Sal", q: 10, u: "g" },
      { n: "Levadura seca", q: 3, u: "g" },
      { n: "Aceite de oliva", q: 1, u: "cda" }
    ],
    pasos: ["Mezclar todos los ingredientes sin amasar; reposar 30 min.", "Hacer 3 series de pliegues cada 30 min.", "Fermentar hasta que doble (aprox. 1.5–2 h).", "Formar el bollo y dejar reposar 30 min.", "Hornear a 240 °C con vapor 20 min, bajar a 210 °C y 20 min más."],
    notas: "La hidratación es alta (70 %): usar las manos húmedas."
  },
  {
    id: "bagels-nueva-york", cat: "panaderia", sub: null,
    titulo: "Bagels estilo Nueva York (receta oficial)", tiempo: "Aprox. 2 h 30 min + hornadas",
    baseNombre: "harina de fuerza", rinde: { q: [26, 28], u: "bagels de 125–130 g" },
    ingredientes: [
      { grupo: "Masa" },
      { n: "Harina de fuerza", q: 2000, u: "g", h: true },
      { n: "Agua tibia (38–43 °C)", q: 1490, u: "g" },
      { n: "Levadura seca activa", q: 18.5, u: "g" },
      { n: "Miel", q: 53, u: "g" },
      { n: "Azúcar rubia / morena", q: 53, u: "g" },
      { n: "Sal", q: 32, u: "g" },
      { grupo: "Agua de hervido" },
      { n: "Agua", txt: "la necesaria para llenar una olla grande" },
      { n: "Azúcar rubia / morena", q: 45, u: "g" },
      { n: "Bicarbonato de sodio", q: 6, u: "g" },
      { grupo: "Para decorar y dorar" },
      { n: "Huevo batido (para pincelar)", txt: "el necesario" },
      { n: "Toppings: sazonador Everything Bagel, ajonjolí (sésamo), queso cheddar rallado", txt: "al gusto" }
    ],
    pasos: [
      "Activar la levadura: en un contenedor pesar y mezclar el agua tibia, la miel y la levadura seca. Reposar 10 minutos hasta que forme espumita en la superficie.",
      "Preparar la masa: en el tazón de la batidora o amasadora pesar e integrar la harina de fuerza, el azúcar rubia y la sal. Verter la mezcla de levadura y amasar de 10 a 15 minutos a velocidad media hasta obtener una masa elástica y lisa. Si está excesivamente pegajosa, añadir pequeñas pizcas de harina, pero mantenerla suave para que el bagel no quede denso.",
      "Dividir y primer reposo: pesar la masa y dividirla en porciones iguales de 125 a 130 g. Formar bolitas, colocarlas sobre una mesa ligeramente enharinada, cubrir con un paño húmedo y reposar 15 minutos.",
      "Formar los bagels: con las manos ligeramente engrasadas con aceite, presionar con el pulgar el centro de cada bola para hacer un agujero y girarla suavemente en círculos para ensancharlo. Colocar las roscas en la mesa, cubrir de nuevo con el paño húmedo y dejar leudar 30 minutos.",
      "Hervir: precalentar el horno a 220 °C (425 °F). En una olla grande con abundante agua hirviendo, añadir el azúcar rubia y el bicarbonato del agua de hervido. Hervir los bagels por tandas, 1 minuto por lado.",
      "Montaje y decoración: retirar los bagels con una espumadera y colocarlos en bandejas cubiertas con papel manteca / vegetal. Pincelar con el huevo batido y agregar generosamente los toppings (ajonjolí, sazonador everything bagel o queso cheddar rallado).",
      "Hornear a 220 °C durante 25 a 30 minutos hasta que tengan un color dorado intenso. Dejar enfriar en la bandeja 10 minutos y luego pasar a una rejilla metálica hasta que enfríen por completo."
    ],
    notas: "Receta escrita para 2 kg de harina. Todas las cantidades se pesan en gramos."
  },
  {
    id: "keto-pan-nube", cat: "dieta", sub: "keto",
    titulo: "Pan nube keto", tiempo: "35 min",
    baseNombre: "queso crema", rinde: { q: 6, u: "unidades" },
    ingredientes: [
      { n: "Queso crema", q: 100, u: "g", h: true },
      { n: "Huevos (claras y yemas separadas)", q: 3, u: "unid" },
      { n: "Cremor tártaro", q: 0.25, u: "cdta" },
      { n: "Sal", txt: "1 pizca" }
    ],
    pasos: ["Precalentar a 150 °C.", "Batir las claras con cremor tártaro a punto firme.", "Mezclar yemas con queso crema y sal.", "Incorporar suavemente las claras.", "Formar discos en bandeja con papel y hornear 25–30 min."],
    notas: "Aprox. 1 g de carbohidratos por unidad."
  },
  {
    id: "vegana-hummus", cat: "dieta", sub: "vegana",
    titulo: "Hummus de garbanzo", tiempo: "10 min",
    baseNombre: "garbanzos cocidos", rinde: { q: 6, u: "porciones" },
    ingredientes: [
      { n: "Garbanzos cocidos", q: 400, u: "g", h: true },
      { n: "Tahini", q: 3, u: "cda" },
      { n: "Jugo de limón", q: 1, u: "unid" },
      { n: "Ajo", q: 1, u: "diente" },
      { n: "Aceite de oliva", q: 3, u: "cda" },
      { n: "Agua fría", q: 50, u: "ml" },
      { n: "Sal y comino", txt: "al gusto" }
    ],
    pasos: ["Procesar tahini y limón 1 min.", "Agregar ajo, aceite, sal y comino.", "Sumar garbanzos y agua fría hasta lograr textura cremosa."],
    notas: "Servir con un hilo de aceite y pimentón. “Jugo de limón: 1 unid” = el jugo de 1 limón."
  },
  {
    id: "pan-arroz-licuadora", cat: "dieta", sub: "sin-gluten",
    titulo: "Pan de arroz en licuadora", tiempo: "Reposo hasta duplicar + horneado",
    baseNombre: "arroz", rinde: { q: 1, u: "pan" },
    ingredientes: [
      { n: "Arroz blanco (largo fino, el clásico)", q: 380, u: "g", h: true },
      { n: "Agua tibia (no caliente, apenas tibia)", q: 250, u: "ml" },
      { n: "Aceite de oliva", q: 60, u: "ml" },
      { n: "Miel", q: 1, u: "cda" },
      { n: "Sal (cucharada grande)", q: 1, u: "cda" },
      { n: "Levadura seca", q: 5, u: "g" }
    ],
    pasos: ["Colocar el arroz blanco en la licuadora junto con el agua tibia y licuar hasta obtener una mezcla homogénea.", "Añadir el aceite de oliva, la miel, la sal y la levadura. Volver a licuar hasta que todo quede bien integrado.", "La masa queda líquida y fácil de manejar: verterla en un molde para pan o en una bandeja apta para horno.", "Dejar reposar hasta que la masa duplique su volumen.", "Hornear hasta que el pan esté dorado y firme."],
    notas: "Sin gluten y sin amasado. En lugar de 5 g de levadura seca se pueden usar 15 g de levadura fresca (el triple). La receta original no indica temperatura ni tiempo de horno: anótalos aquí cuando los pruebes."
  },
  {
    id: "alta-proteina-bowl", cat: "dieta", sub: "alta-proteina",
    titulo: "Bowl de pollo y quinoa", tiempo: "30 min",
    baseNombre: "pechuga de pollo", rinde: { q: 2, u: "porciones" },
    ingredientes: [
      { n: "Pechuga de pollo", q: 300, u: "g", h: true },
      { n: "Quinoa cocida", q: 1, u: "taza" },
      { n: "Aguacate", q: 1, u: "unid" },
      { n: "Espinaca", q: 1, u: "taza" },
      { n: "Limón, sal, pimienta y páprika", txt: "al gusto" }
    ],
    pasos: ["Sazonar el pollo con sal, pimienta y páprika.", "Sellar en sartén 5–6 min por lado.", "Armar el bowl con quinoa, espinaca, pollo en tiras y aguacate.", "Aderezar con limón."],
    notas: "Aprox. 45 g de proteína por porción."
  }
];
