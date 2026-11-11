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
  }
];
