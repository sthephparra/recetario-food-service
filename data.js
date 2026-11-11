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
    id: "bagels-nueva-york", cat: "panaderia", sub: null,
    titulo: "Bagels estilo Nueva York", porciones: "8 bagels", tiempo: "Aprox. 2 h 30 min",
    ingredientes: [
      "7 g (2 1/4 cdta) de levadura seca activa",
      "1 cda de miel",
      "560 ml (2 1/4 tazas) de agua tibia (38–43 °C / 100–110 °F)",
      "5 tazas de harina de fuerza (de pan)",
      "2 cda de azúcar morena",
      "3 cdta de sal",
      "Para cubrir: mezcla “everything bagel”, semillas de sésamo y queso cheddar rallado",
      "Baño de huevo (huevo batido) para pincelar",
      "Agua de cocción: 1 olla de agua, 3 cda de azúcar morena y 1 cdta de bicarbonato de sodio"
    ],
    pasos: [
      "Activar la levadura: en un bowl mezclar el agua tibia, la miel y la levadura. Reposar 10 minutos hasta que haga burbujas.",
      "Hacer la masa: en otro bowl mezclar la harina, el azúcar y la sal. Agregar la mezcla de levadura y amasar 10–15 minutos hasta que quede suave (con batidora de pie si se tiene). Si está pegajosa, añadir harina poco a poco, pero dejarla ligeramente pegajosa para que los bagels no queden duros.",
      "Dividir la masa en 8 bolas. Colocarlas sobre una superficie enharinada, cubrir con un paño húmedo y reposar 15 minutos.",
      "Formar los bagels: con las manos aceitadas, presionar un agujero en el centro de cada bola y girar la masa con un movimiento circular para ensancharlo. Cubrir de nuevo con el paño húmedo y reposar 30 minutos.",
      "Cocer los bagels: precalentar el horno a 220 °C (425 °F). Llevar a ebullición una olla grande con agua, el azúcar morena y el bicarbonato. Hervir cada bagel 1 minuto por cada lado.",
      "Preparar para hornear: forrar una bandeja con papel manteca. Espolvorear la mezcla “everything” sobre el papel, colocar los bagels hervidos y pincelar con el baño de huevo. Cubrir con la mezcla “everything”, el sésamo y el cheddar rallado.",
      "Hornear 25–30 minutos hasta que estén dorados. Dejar enfriar 10 minutos sobre la bandeja y luego pasar a una rejilla hasta que enfríen por completo."
    ],
    notas: "Las conversiones a °C son aproximadas. La receta original no indica el peso de la harina en gramos (5 tazas) ni cuántos huevos usar para el baño: ajusta y anótalo cuando la pruebes. El tiempo total es una estimación sumando reposos, cocción y horneado."
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
    id: "pan-arroz-licuadora", cat: "dieta", sub: "sin-gluten",
    titulo: "Pan de arroz en licuadora", porciones: "1 pan", tiempo: "Reposo hasta duplicar + horneado",
    ingredientes: ["380 g de arroz blanco (largo fino, el clásico)", "250 ml de agua tibia (no caliente, apenas tibia)", "60 ml de aceite de oliva", "1 cucharada de miel", "1 cucharada grande de sal", "5 g de levadura seca o 15 g de levadura fresca"],
    pasos: ["Colocar el arroz blanco en la licuadora junto con el agua tibia y licuar hasta obtener una mezcla homogénea.", "Añadir el aceite de oliva, la miel, la sal y la levadura. Volver a licuar hasta que todo quede bien integrado.", "La masa queda líquida y fácil de manejar: verterla en un molde para pan o en una bandeja apta para horno.", "Dejar reposar hasta que la masa duplique su volumen.", "Hornear hasta que el pan esté dorado y firme."],
    notas: "Sin gluten y sin amasado. La receta original no indica temperatura ni tiempo de horno: anótalos aquí cuando los pruebes."
  },
  {
    id: "alta-proteina-bowl", cat: "dieta", sub: "alta-proteina",
    titulo: "Bowl de pollo y quinoa", porciones: "2 porciones", tiempo: "30 min",
    ingredientes: ["300 g pechuga de pollo", "1 taza quinoa cocida", "1 aguacate", "1 taza espinaca", "Limón, sal, pimienta, páprika"],
    pasos: ["Sazonar el pollo con sal, pimienta y páprika.", "Sellar en sartén 5–6 min por lado.", "Armar el bowl con quinoa, espinaca, pollo en tiras y aguacate.", "Aderezar con limón."],
    notas: "Aprox. 45 g de proteína por porción."
  }
];
