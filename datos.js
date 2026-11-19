/* =========================================================
   DATOS DE LA PÁGINA  ✏️  (este es el único archivo que tenés que tocar)
   ---------------------------------------------------------
   - Todo lo que dice "EDITAR" es un ejemplo para reemplazar.
   - Las fotos van en la carpeta /fotos con el nombre que pongas acá.
     Si una foto no existe, la página muestra un recuadro de ejemplo.
   - Respetá las comillas "..." y las comas al final de cada línea.
   ========================================================= */

const DATOS = {
  nombre: "Rosario",
  apodo: "Pochi",
  deParte: "Nahuel",
  nacimiento: "1998-11-25",       // año-mes-día en que nació (se usa para la cuenta regresiva y los números)

  // Frases que pasan en la cinta animada de arriba
  cinta: [
    "Feliz cumpleaños, Pochi",
    "Hoy es tu día",
    "La más linda",
    "25 de noviembre",
    "Diseñadora y cuerva",
    "Que se festeje en grande",
  ],

  /* ---------- POCHI EN NÚMEROS ----------
     Los días y las horas se calculan solos con la fecha de nacimiento.
     Acá sumás números graciosos de ella (inventados con cariño también valen). */
  numeros: [
    { valor: "834", texto: "Agendas terminadas" },
    { valor: "4", texto: "series turcas terminadas" },
    { valor: "+300", texto: "Ventas aprobadas" },
  ],

  /* ---------- ASÍ SOS VOS (cualidades) — sección oculta por ahora ---------- */
  cualidades: [
    { emoji: "☀️", titulo: "EDITAR: Luminosa", texto: "EDITAR" },
  ],

  /* ---------- LAS COSAS QUE TE GUSTAN (tarjetas que giran) ----------
     foto: la imagen que aparece al girar. Si está vacía, se muestra un dibujito con el emoji. */
  favoritos: [
    { emoji: "🍲", que: "Comida", valor: "Guiso argentino", foto: "fotos/fav-guiso.jpg" },
    { emoji: "🩵", que: "Color", valor: "Celeste", foto: "fotos/fav-celeste.jpg", fondo: "#87CEEB" },
    { emoji: "🔎", que: "Serie", valor: "Aurora Teagarden", foto: "fotos/fav-aurora.jpg" },
    { emoji: "🎤", que: "Artista", valor: "Lit Killah", foto: "fotos/fav-litkillah.jpg", pos: "center 25%" },
    { emoji: "🌷", que: "Lugar", valor: "Campo de tulipanes, Holanda", foto: "fotos/fav-tulipanes.jpg", pos: "center 40%" },
    { emoji: "🍫", que: "Antojo", valor: "Chocolate", foto: "fotos/fav-chocolate.jpg" },
    { emoji: "🐱", que: "Animal", valor: "Ozzy", foto: "fotos/fav-ozzy2.jpg", pos: "42% center" },
  ],

  /* ---------- ÁLBUMES DE FOTOS (carruseles) ----------
     Cada álbum es una sección de la página. Podés cambiar el texto de cada foto,
     sacar fotos (borrando la línea) o sumar más (copiando una línea). */
  albumes: {
    bebe: [
      { src: "fotos/bebe-01.jpg", texto: "Mirá esos cachetes" },
      { src: "fotos/bebe-02.jpg", texto: "Reina de la cuna" },
      { src: "fotos/bebe-03.jpg", texto: "Con la abuela pirucha" },
      { src: "fotos/bebe-16.jpg", texto: "Soplando la velita con mamá y papá", pos: "left center" },
      { src: "fotos/familia-07.jpg", texto: "Padre e hija" },
      { src: "fotos/bebe-05.jpg", texto: "Abuelo y corchito", pos: "left center" },
      { src: "fotos/bebe-06.jpg", texto: "Mami te ama" },
      { src: "fotos/bebe-07.jpg", texto: "Esa mirada ya decía todo" },
      { src: "fotos/bebe-15.jpg", texto: "Una coquita y a seguir", pos: "left 72%" },
      { src: "fotos/bebe-08.jpg", texto: "Pose de modelo" },
      { src: "fotos/bebe-09.jpg", texto: "Tormenta de facha" },
      { src: "fotos/bebe-11.jpg", texto: "Ayudando a papi en el trabajo" },
      { src: "fotos/bebe-17.jpg", texto: "Con el primo", pos: "center 42%" },
      { src: "fotos/bebe-13.jpg", texto: "Tomando sol" },
      { src: "fotos/familia-05.jpg", texto: "Tia Alejandra" },
      { src: "fotos/bebe-19.jpg", texto: "La bella Ursula", pos: "center 30%" },
      { src: "fotos/bebe-18.jpg", texto: "Con papá, de gala", pos: "center 22%" },
    ],
    amigos: [
      { src: "fotos/amigos-24.jpg", texto: "Los Vengadores", pos: "center 40%" },
      { src: "fotos/amigos-17.jpg", texto: "La banda", pos: "left center" },
      { src: "fotos/amigos-02.jpg", texto: "Estreno de campera", pos: "center" },
      { src: "fotos/amigos-07.jpg", texto: "Las culisueltas", pos: "center 40%" },
      { src: "fotos/amigos-09.jpg", texto: "Amigas", pos: "center" },
      { src: "fotos/amigos-10.jpg", texto: "Con los pibes", pos: "center" },
      { src: "fotos/amigos-04.jpg", texto: "Tu mejor amiga Selene", pos: "center 35%" },
      { src: "fotos/amigos-11.jpg", texto: "Con Mario Casas y un amigo", pos: "40% center" },
      { src: "fotos/amigos-16.jpg", texto: "Salida nocturna", pos: "60% center" },
      { src: "fotos/amigos-06.jpg", texto: "De joda con las pibas", pos: "30% center" },
      { src: "fotos/amigos-01.jpg", texto: "Ultimo año", pos: "65% center" },
      { src: "fotos/amigos-19.jpg", texto: "Cumpleaños", pos: "center 45%" },
      { src: "fotos/amigos-27.jpg", texto: "Merienda con las chicas", pos: "center" },
      { src: "fotos/amigos-18.jpg", texto: "Encuentro con los chicos", pos: "80% center" },
      { src: "fotos/amigos-05.jpg", texto: "Primera vez en casa", pos: "65% center" },
    ],
    // Ro y las flores
    flores: [
      { src: "fotos/flores-01.jpg", texto: "Gerberas rojas y esa sonrisa", pos: "center 35%" },
      { src: "fotos/flores-02.jpg", texto: "Un ramo bien colorido", pos: "center 30%" },
      { src: "fotos/flores-03.jpg", texto: "Entre agapantos", pos: "center 25%" },
      { src: "fotos/flores-04.jpg", texto: "Tulipanes, sus favoritos", pos: "center 40%" },
      { src: "fotos/flores-05.jpg", texto: "Un ramo para festejar", pos: "center 25%" },
      { src: "fotos/flores-06.jpg", texto: "Flores y chocolates, combo ganador", pos: "center 30%" },
    ],
    sanlorenzo: [
      { src: "fotos/sanlorenzo-01.jpg", texto: "Con el pipi en el Nuevo Gasómetro" },
      { src: "fotos/sanlorenzo-02.jpg", texto: "Los colores que llevamos tatuado en el corazón" },
      { src: "fotos/sanlorenzo-05.jpg", texto: "De fiesta cuerva" },
      { src: "fotos/sanlorenzo-06.jpg", texto: "Primera vez en la cancha" },
      { src: "fotos/sanlorenzo-07.jpg", texto: "Alentando juntos" },
      { src: "fotos/sanlorenzo-08.jpg", texto: "Con el buzo del Ciclón" },
      { src: "fotos/sanlorenzo-09.jpg", texto: "Con papá, cuervos de ley", pos: "center 30%" },
      { src: "fotos/sanlorenzo-10.jpg", texto: "Festejando la victoria", pos: "center 30%" },
      { src: "fotos/sanlorenzo-11.jpg", texto: "San Lorenzo campeón", pos: "center 25%" },
      { src: "fotos/sanlorenzo-12.jpg", texto: "Camisetas firmadas", pos: "center 30%" },
      { src: "fotos/sanlorenzo-16.jpg", texto: "Juntada azulgrana", pos: "60% center" },
      { src: "fotos/sanlorenzo-13.jpg", texto: "Porrista matadora", pos: "center 20%" },
      { src: "fotos/sanlorenzo-14.jpg", texto: "Alentando con pompones", pos: "center 20%" },
      { src: "fotos/sanlorenzo-15.jpg", texto: "Poster favorito de pochi", pos: "center 20%" },
    ],
    // Tus bichos de siempre
    bichos: [
      { src: "fotos/bichos-10.jpg", texto: "Tina de cachorrita", pos: "center 45%" },
      { src: "fotos/bichos-07.jpg", texto: "Esa sonrisa", pos: "center 20%" },
      { src: "fotos/bichos-08.jpg", texto: "Esos ojitos", pos: "center 25%" },
      { src: "fotos/bichos-09.jpg", texto: "Guiño seductor", pos: "center 25%" },
      { src: "fotos/bichos-02.jpg", texto: "Nuestro angelito" },
      { src: "fotos/bichos-03.jpg", texto: "Los chusmas del barrio" },
      { src: "fotos/bichos-04.jpg", texto: "Pachorra" },
      { src: "fotos/bichos-05.jpg", texto: "Cuanto amorrr" },
      { src: "fotos/bichos-06.jpg", texto: "La felcidad es total" },
    ],
    nahuel: [
      { src: "fotos/nahuel-01.jpg", texto: "Primera foto de novios" },
      { src: "fotos/nahuel-13.jpg", texto: "Brindando por nosotros", pos: "center 25%" },
      { src: "fotos/nahuel-02.jpg", texto: "Nuestra primera navidad juntos" },
      { src: "fotos/nahuel-03.jpg", texto: "Atardeceres con vos" },
      { src: "fotos/nahuel-04.jpg", texto: "Primeras vacaciones" },
      { src: "fotos/nahuel-05.jpg", texto: "Paseo lindo, compañía mejor" },
      { src: "fotos/nahuel-06.jpg", texto: "Frente al río" },
      { src: "fotos/nahuel-07.jpg", texto: "Calor, sol y vos" },
      { src: "fotos/nahuel-08.jpg", texto: "En la pituca" },
      { src: "fotos/nahuel-09.jpg", texto: "Festejando juntos" },
      { src: "fotos/nahuel-10.jpg", texto: "Hasta los días comunes son lindos" },
      { src: "fotos/nahuel-11.jpg", texto: "Mi persona favorita" },
      { src: "fotos/nahuel-12.jpg", texto: "Mi mujer" },
    ],
  },

  /* ---------- DE PARTE DE OZZY 🐾 ---------- */
  ozzy: {
    texto: "Este regalo viene de parte de un ser muy especial que no se olvidó de este día tan importante. Este regalo viene de parte de Ozzy.",
    fotos: [
      { src: "fotos/ozzy-01.jpg", texto: "Ozzy y mami" },
      { src: "fotos/ozzy-02.jpg", texto: "Amor genuino" },
      { src: "fotos/ozzy-03.jpg", texto: "Mami te amo" },
      { src: "fotos/ozzy-04.jpg", texto: "Mimos" },
      { src: "fotos/ozzy-05.jpg", texto: "Acostaditos" },
      { src: "fotos/ozzy-06.jpg", texto: "Cara a cara" },
      { src: "fotos/ozzy-07.jpg", texto: "Modelo" },
      { src: "fotos/ozzy-08.jpg", texto: "Durmiendo abrazados" },
      { src: "fotos/ozzy-09.jpg", texto: "Orgulloso de su diseñadora" },
      { src: "fotos/ozzy-10.jpg", texto: "Cucharita" },
      { src: "fotos/ozzy-11.jpg", texto: "Abrazo eterno" },
    ],
  },

  /* ---------- TU HISTORIA (carrusel, en orden) ---------- */
  recuerdos: [
    { fecha: "25 de noviembre de 1998", titulo: "Llegó Pochi", texto: "Ese día el mundo se volvió un lugar más lindo.", emoji: "👶", foto: "fotos/bebe-04.jpg", pos: "center 80%" },
    { fecha: "Infancia", titulo: "La nena de las colitas", texto: "Esa sonrisa pícara ya avisaba que iba a conquistar a todos.", emoji: "🎀", foto: "fotos/historia-02.jpg" },
    { fecha: "Fiesta de disfraces", titulo: "Una superheroína de verdad", texto: "Mujer Maravilla en el disfraz y también en la vida.", emoji: "🦸‍♀️", foto: "fotos/historia-03.jpg", pos: "left center" },
    { fecha: "Deportes", titulo: "Puro equipo", texto: "Compañera, guerrera y siempre dejando todo en la cancha.", emoji: "🏐", foto: "fotos/historia-04.jpg" },
    { fecha: "Fiesta de 15", titulo: "Feliz cumple Ro!", texto: "Quince años, muchisimos regalos y flores.", emoji: "🎈", foto: "fotos/historia-11.jpg", pos: "center 20%" },
    { fecha: "Gimnasia", titulo: "Six pack", texto: "Constancia y garra: cuando se propone algo, lo logra.", emoji: "💪", foto: "fotos/historia-12.jpg", pos: "center top" },
    { fecha: "La promo", titulo: "Último año, a todo color", texto: "Pintada de pies a cabeza y feliz de terminar una etapa.", emoji: "🎨", foto: "fotos/historia-13.jpg", pos: "center 20%" },
    { fecha: "La mudanza", titulo: "Las llaves de casa", texto: "Nuestro primer lugar juntos, llenos de emoción y felicidad.", emoji: "🔑", foto: "fotos/historia-14.jpg", pos: "center 35%" },
    { fecha: "Recibida", titulo: "¡Diseñadora Gráfica!", texto: "Todo el esfuerzo valió la pena. Siempre bien acompañada.", emoji: "🎓", foto: "fotos/historia-07.jpg" },
    { fecha: "Primer auto", titulo: "Peugeot 207", texto: "Tremenda nave, listo para salir a pasear juntos.", emoji: "🚙", foto: "fotos/historia-10.jpg" },
    { fecha: "La licencia", titulo: "Registro en mano", texto: "Tranquilos y pacientes Pochi. Con el auto controlado como dice Rober.", emoji: "🚗", foto: "fotos/historia-08.jpg" },
  ],

  /* ---------- DATOS CURIOSOS — sección oculta por ahora ---------- */
  trivia: [
    { frente: "EDITAR", dorso: "EDITAR" },
  ],

  /* ---------- TEST: "¿Qué tan Rosario sos?" ----------
     correcta = número de la opción correcta, empezando en 0
     (0 = primera, 1 = segunda, 2 = tercera, 3 = cuarta)      */
  quiz: [
    { pregunta: "¿Qué día naciste?", opciones: ["24 de noviembre", "25 de noviembre", "25 de octubre", "15 de noviembre"], correcta: 1, comentario: "El día más lindo del calendario." },
    { pregunta: "¿Qué gusto de helado pedís siempre?", opciones: ["Dulce de leche", "Chocolate", "Frutilla", "Limón"], correcta: 3, comentario: "Fresquito y sin dudar: limón." },
    { pregunta: "¿Cuánto tardás en prepararte para salir?", opciones: ["10 minutos", "Media hora", "Una hora", "Mejor no preguntar"], correcta: 3, comentario: "Pero siempre vale la pena la espera." },
    { pregunta: "¿De qué carrera está recibida Pochi?", opciones: ["Arquitectura", "Diseño Gráfico", "Publicidad", "Diseño de Indumentaria"], correcta: 1, comentario: "¡Diseñadora Gráfica recibida! Qué orgullo." },
    { pregunta: "¿De qué cuadro sos?", opciones: ["Boca", "River", "San Lorenzo", "Huracán"], correcta: 2, comentario: "¡Cuerva de corazón! Vamos Ciclón." },
  ],

  /* ---------- JUEGOS ---------- */
  // Memotest: 8 fotos (o emojis). Se arman los pares solos.
  memotest: ["fotos/memo-01.jpg", "fotos/memo-02.jpg", "fotos/memo-03.jpg", "fotos/memo-04.jpg", "fotos/memo-05.jpg", "fotos/memo-06.jpg", "fotos/memo-07.jpg", "fotos/memo-08.jpg"],

  // Reventá los globos: colores de los globos normales (+1). El dorado suma 3 y el negro resta 2.
  globos: ["#800020", "#87CEEB", "#b8334f", "#2b7ea6", "#ffffff"],

  // Vales de cumple: ella toca cada uno y se revela
  vales: [
    "Vale por un día entero donde vos elegís todo",
    "Vale por una comida en tu lugar favorito",
    "Vale por un masaje de 30 minutos",
    "Vale por un desayuno en la cama",
    "Vale por ganar una discusión (una sola)",
    "Vale por ver una serie/peli que vos elijas",
  ],

  // Deseos para su nuevo año (botón que muestra uno al azar)
  deseos: [
    "Que este año cumplas eso que venís soñando",
    "Que te rías tanto como hacés reír a los demás",
    "Que viajes a ese campo de tulipanes",
    "Que te sobren los motivos para festejar",
    "Que nunca te falten mates ni abrazos",
    "Que sigas siendo así, tan vos",
  ],

  /* ---------- CARTA FINAL (aparece después de apagar las velas) ---------- */
  /* ---------- BÚSQUEDA DEL TESORO ----------
     Una pista por regalo, en orden. Cuando encuentra uno, toca
     "¡Lo encontré!" y aparece el acertijo siguiente.          */
  busqueda: {
    intro: "Tu regalo no está acá: está escondido en el depto. Son 5 regalos y cada acertijo te lleva al siguiente.",
    // texto = el acertijo; ayuda = lo que aparece al tocar "💡 Pista"
    pistas: [
      { texto: "Cuando el frío aprieta me usás sin dudar. Soy inflada y vivo en el placard.", ayuda: "Soy color mostaza. Revisá bien mis bolsillos, que algo te quiero dar." },
      { texto: "Todas las noches te espero en la cama, escucho tus sueños y te abrazo hasta la mañana.", ayuda: "Meté la mano bien adentro de mi funda." },
      { texto: "No busques lejos: me tenés en la mano ahora mismo y me mirás más que a nadie.", ayuda: "Sacame la funda y fijate bien." },
      { texto: "Acá te tirás a ver tus series y a resolver misterios.", ayuda: "Levantá el almohadón." },
      { texto: "EDITAR: acertijo del regalo 5", ayuda: "EDITAR: pista del regalo 5" },
    ],
    final: "¡Encontraste todo! Feliz cumpleaños, Pochi. Te amo.",
  },
  firma: "Nahuel",
};
