/* Lógica de la página. No hace falta tocar este archivo: el contenido está en datos.js */
(function () {
  "use strict";
  const D = DATOS;
  const $ = (s, el = document) => el.querySelector(s);
  const crear = (tag, clase, html) => { const e = document.createElement(tag); if (clase) e.className = clase; if (html != null) e.innerHTML = html; return e; };
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const mezclar = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const leer = (k, def) => { try { const v = localStorage.getItem(k); return v == null ? def : JSON.parse(v); } catch (e) { return def; } };
  const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Foto con recuadro de ejemplo si el archivo no existe */
  function foto(src, alt, pos) {
    const vacia = () => crear("div", "foto-vacia", `<b>📷</b><span>Acá va una foto</span><small>${esc(src || "fotos/...")}</small>`);
    if (!src) return vacia();
    const img = new Image();
    img.alt = alt || "";
    img.loading = "lazy";
    if (pos) img.style.objectPosition = pos;
    // Si falla (conexión lenta), reintenta un par de veces antes de mostrar el recuadro
    let intentos = 0;
    img.onerror = () => {
      if (++intentos <= 3) setTimeout(() => { img.src = `${src}?r=${intentos}`; }, 800 * intentos);
      else img.replaceWith(vacia());
    };
    img.src = src;
    return img;
  }

  /* ---------- Datos básicos ---------- */
  document.querySelectorAll("[data-dato]").forEach((el) => { const v = D[el.dataset.dato]; if (v) el.textContent = v; });
  document.title = `Feliz Cumpleaños ${D.apodo}`;

  /* Título (estático) */
  $("#tituloNombre").textContent = `${D.apodo}!`;

  /* ---------- Loader ---------- */

  /* ---------- Menú móvil ---------- */
  const navT = $("#navToggle"), navL = $("#navLinks");
  navT.addEventListener("click", () => { const a = navL.classList.toggle("abierto"); navT.setAttribute("aria-expanded", a); });
  navL.addEventListener("click", (e) => { if (e.target.tagName === "A") { navL.classList.remove("abierto"); navT.setAttribute("aria-expanded", "false"); } });

  /* ---------- Cuenta regresiva ---------- */
  const [, cm, cd] = D.nacimiento.split("-").map(Number);
  function proximoCumple() {
    const ahora = new Date();
    let obj = new Date(ahora.getFullYear(), cm - 1, cd);
    const finDia = new Date(ahora.getFullYear(), cm - 1, cd + 1);
    if (ahora >= obj && ahora < finDia) return null; // hoy es el cumple
    if (ahora >= finDia) obj = new Date(ahora.getFullYear() + 1, cm - 1, cd);
    return obj;
  }
  let festejado = false;
  function tic() {
    if (!proximoCumple() && !festejado) { festejado = true; setTimeout(() => confeti(), 1500); }
  }

  /* ---------- En números (días, horas, latidos) ---------- */
  const [na, nm, nd] = D.nacimiento.split("-").map(Number);
  const nac = new Date(na, nm - 1, nd);
  const hoy = new Date();
  const dias = Math.max(0, Math.floor((hoy - nac) / 864e5));
  const horas = Math.max(0, Math.floor((hoy - nac) / 36e5));
  function contar(el, hasta) {
    if (sinMovimiento) { el.textContent = hasta.toLocaleString("es-AR"); return; }
    const t0 = performance.now(), dur = 1800;
    (function paso(t) { const p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(hasta * (1 - Math.pow(1 - p, 3))).toLocaleString("es-AR"); if (p < 1) requestAnimationFrame(paso); })(t0);
  }
  const nums = [["#nDias", dias], ["#nHoras", horas]];
  nums.forEach(([sel, v]) => ($(sel).textContent = v.toLocaleString("es-AR")));
  const jObs = new IntersectionObserver((ents) => { if (ents[0].isIntersecting) { nums.forEach(([sel, v]) => contar($(sel), v)); jObs.disconnect(); } });
  jObs.observe($(".juntos"));
  const nx = $("#numerosExtra");
  (D.numeros || []).forEach((n) => nx.appendChild(crear("div", "numero-chip", `<b>${esc(n.valor)}</b><span>${esc(n.texto)}</span>`)));

  tic(); setInterval(tic, 1000);

  /* ---------- Sorpresa bloqueada hasta el 25/11 a las 17 hs (Argentina) ---------- */
  const apertura = new Date("2026-11-25T17:00:00-03:00");
  const candado = $("#sorpresaCandado"), contenido = $("#sorpresaContenido");
  function candadoTic() {
    let ms = apertura - new Date();
    if (ms <= 0) {
      candado.hidden = true; contenido.hidden = false;
      clearInterval(candadoInt); return;
    }
    candado.hidden = false; contenido.hidden = true;
    const h = Math.floor(ms / 36e5); ms -= h * 36e5;
    const m = Math.floor(ms / 6e4); ms -= m * 6e4;
    $("#sHoras").textContent = String(h).padStart(2, "0");
    $("#sMin").textContent = String(m).padStart(2, "0");
    $("#sSeg").textContent = String(Math.floor(ms / 1000)).padStart(2, "0");
  }
  const candadoInt = setInterval(candadoTic, 1000); candadoTic();

  /* ---------- Cualidades ---------- */
  const cq = $("#cualidades");
  D.cualidades.forEach((c, i) => {
    const el = crear("article", "cualidad aparece", `<span class="cualidad-emoji">${esc(c.emoji)}</span><h3>${esc(c.titulo)}</h3><p>${esc(c.texto)}</p>`);
    el.style.setProperty("--rot", `${[-2, 1.5, -1, 2, -1.5, 1][i % 6]}deg`);
    cq.appendChild(el);
  });

  /* ---------- Favoritos ---------- */
  const fg = $("#favoritosGrid");
  D.favoritos.forEach((f) => {
    const b = crear("button", "fav-flip aparece"); b.type = "button";
    b.setAttribute("aria-label", `${f.que}: tocá para descubrir`);
    const inn = crear("div", "fav-in");
    inn.appendChild(crear("div", "fav-cara favorito", `<span class="fav-emoji">❓</span><b>${esc(f.que)}</b><small>Tocá para descubrir</small>`));
    const dorso = crear("div", "fav-cara fav-dorso");
    if (f.foto) dorso.appendChild(foto(f.foto, f.valor, f.pos));
    else {
      dorso.classList.add("fav-dibujo");
      if (f.fondo) dorso.style.background = f.fondo;
      dorso.appendChild(crear("span", "fav-dibujo-emoji", esc(f.emoji)));
    }
    dorso.appendChild(crear("span", "fav-pie", esc(f.valor)));
    inn.appendChild(dorso);
    b.appendChild(inn);
    b.addEventListener("click", () => b.classList.toggle("girada"));
    fg.appendChild(b);
  });

  /* ---------- Carruseles ---------- */
  let lbLista = [], lbI = 0;
  function armarCarrusel(cont, items, crearItem) {
    cont.textContent = "";
    const pista = crear("div", "carr-pista");
    const ant = crear("button", "carr-flecha izq", "‹"); ant.type = "button"; ant.setAttribute("aria-label", "Anterior");
    const sig = crear("button", "carr-flecha der", "›"); sig.type = "button"; sig.setAttribute("aria-label", "Siguiente");
    items.forEach((it, i) => pista.appendChild(crearItem(it, i)));
    const mover = (dir) => pista.scrollBy({ left: dir * pista.clientWidth * 0.8, behavior: sinMovimiento ? "auto" : "smooth" });
    ant.onclick = () => mover(-1); sig.onclick = () => mover(1);
    const estado = () => {
      ant.disabled = pista.scrollLeft < 8;
      sig.disabled = pista.scrollLeft + pista.clientWidth > pista.scrollWidth - 8;
    };
    pista.addEventListener("scroll", estado, { passive: true });
    window.addEventListener("resize", estado);
    cont.append(ant, pista, sig);
    requestAnimationFrame(estado);
  }
  function polaroid(f, i, lista) {
    const card = crear("button", "polaroid");
    card.type = "button";
    card.style.setProperty("--rot", `${[-3, 2, -1.5, 3, -2.5, 1.5][i % 6]}deg`);
    const marco = crear("div", "marco"); marco.appendChild(foto(f.src, f.texto, f.pos));
    card.appendChild(marco);
    card.appendChild(crear("p", null, esc(f.texto)));
    card.addEventListener("click", () => { lbLista = lista; abrirLB(i); });
    return card;
  }
  document.querySelectorAll("[data-album]").forEach((gal) => {
    const lista = (D.albumes && D.albumes[gal.dataset.album]) || [];
    if (!lista.length) { gal.closest("section").hidden = true; return; }
    armarCarrusel(gal, lista, (f, i) => polaroid(f, i, lista));
  });

  /* ---------- Pétalos de "Ro y las flores" ---------- */
  const petalos = $(".petalos");
  if (petalos && !sinMovimiento) {
    const tipos = ["🌸", "🌷", "🌼", "🌺", "💮"];
    for (let k = 0; k < 18; k++) {
      const pe = crear("span", "petalo", tipos[k % tipos.length]);
      pe.style.left = `${Math.random() * 100}%`;
      pe.style.fontSize = `${16 + Math.random() * 18}px`;
      pe.style.animationDuration = `${9 + Math.random() * 9}s`;
      pe.style.animationDelay = `${-Math.random() * 18}s`;
      pe.style.setProperty("--vaiven", `${(Math.random() - 0.5) * 120}px`);
      petalos.appendChild(pe);
    }
  }

  /* ---------- Ozzy ---------- */
  if (D.ozzy) {
    $("#ozzyTexto").textContent = D.ozzy.texto;
    const ozLista = D.ozzy.fotos.map((f) => (typeof f === "string" ? { src: f, texto: "Ozzy 🐾" } : f));
    armarCarrusel($("#ozzyFotos"), ozLista, (f, i) => {
      const b = crear("button", "ozzy-foto"); b.type = "button";
      b.appendChild(foto(f.src, "Ozzy"));
      b.appendChild(crear("span", "ozzy-pie", esc(f.texto)));
      b.addEventListener("click", () => { lbLista = ozLista; abrirLB(i); });
      return b;
    });
    let mimos = 0;
    $("#ozzyEstrella").onclick = (e) => {
      mimos++;
      $("#ozzyMimos").textContent = mimos === 1 ? "Le llegó tu mimo ✨" : `${mimos} mimos para Ozzy ✨`;
      const r = e.currentTarget.getBoundingClientRect();
      for (let k = 0; k < 6; k++) {
        const st = crear("span", "chispa ozzy-chispa"); st.textContent = k % 2 ? "✦" : "🐾";
        st.style.left = `${r.left + r.width / 2 + (Math.random() - 0.5) * 80}px`; st.style.top = `${r.top}px`;
        st.style.setProperty("--dx", `${(Math.random() - 0.5) * 60}px`);
        st.addEventListener("animationend", () => st.remove());
        document.body.appendChild(st);
      }
    };
  } else $("#ozzy").hidden = true;

  const lb = $("#lightbox");
  function abrirLB(i) {
    lbI = (i + lbLista.length) % lbLista.length;
    const f = lbLista[lbI];
    const media = $("#lbMedia"); media.textContent = ""; media.appendChild(foto(f.src, f.texto));
    $("#lbTexto").textContent = f.texto;
    lb.hidden = false;
  }
  $("#lbCerrar").onclick = () => (lb.hidden = true);
  $("#lbAnt").onclick = () => abrirLB(lbI - 1);
  $("#lbSig").onclick = () => abrirLB(lbI + 1);
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.hidden = true; });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") lb.hidden = true;
    if (e.key === "ArrowLeft") abrirLB(lbI - 1);
    if (e.key === "ArrowRight") abrirLB(lbI + 1);
  });

  /* ---------- Tu historia (carrusel) ---------- */
  const histLista = D.recuerdos.map((r) => ({ src: r.foto, texto: `${r.titulo}. ${r.texto}` }));
  armarCarrusel($("#historia"), D.recuerdos, (r, i) => {
    const b = crear("button", "historia-card"); b.type = "button";
    const fx = crear("div", "historia-foto"); fx.appendChild(foto(r.foto, r.titulo, r.pos));
    fx.appendChild(crear("span", "historia-emoji", esc(r.emoji || "❤")));
    b.appendChild(fx);
    b.appendChild(crear("div", "historia-texto", `<span class="hito-fecha">${esc(r.fecha)}</span><h3>${esc(r.titulo)}</h3><p>${esc(r.texto)}</p>`));
    b.addEventListener("click", () => { lbLista = histLista; abrirLB(i); });
    return b;
  });

  /* ---------- Trivia ---------- */
  const tg = $("#triviaGrid");
  D.trivia.forEach((t) => {
    const b = crear("button", "flip aparece");
    b.type = "button";
    b.innerHTML = `<div class="flip-in"><div class="flip-cara flip-frente"><span>${esc(t.frente)}</span></div><div class="flip-cara flip-dorso"><span>${esc(t.dorso)}</span></div></div>`;
    b.addEventListener("click", () => b.classList.toggle("girada"));
    tg.appendChild(b);
  });

  /* ---------- Quiz ---------- */
  let qi = 0, qPuntos = 0;
  const qCard = $("#quizCard");
  const qHTML = qCard.innerHTML;
  function mostrarPregunta() {
    const q = D.quiz[qi];
    $("#quizBarra").style.width = `${(qi / D.quiz.length) * 100}%`;
    $("#quizContador").textContent = `Pregunta ${qi + 1} de ${D.quiz.length}`;
    $("#quizPregunta").textContent = q.pregunta;
    const ops = $("#quizOpciones"); ops.textContent = "";
    $("#quizComentario").hidden = true; $("#quizSiguiente").hidden = true;
    q.opciones.forEach((o, i) => {
      const b = crear("button", "opcion"); b.type = "button"; b.textContent = o;
      b.addEventListener("click", () => responder(i));
      ops.appendChild(b);
    });
  }
  function responder(i) {
    const q = D.quiz[qi];
    const btns = [...$("#quizOpciones").children];
    btns.forEach((b) => (b.disabled = true));
    btns[q.correcta].classList.add("bien");
    const acierto = i === q.correcta;
    if (acierto) { qPuntos++; miniConfeti(btns[i]); } else btns[i].classList.add("mal");
    const c = $("#quizComentario");
    c.textContent = (acierto ? "¡Bien! " : "¡Nooo! ") + (q.comentario || "");
    c.hidden = false;
    const sig = $("#quizSiguiente");
    sig.textContent = qi === D.quiz.length - 1 ? "Ver resultado" : "Siguiente";
    sig.hidden = false;
    sig.focus({ preventScroll: true });
  }
  function finalQuiz() {
    const total = D.quiz.length, p = qPuntos / total;
    const msg = p === 1 ? `¡${D.nombre} certificada al 100%! 💯` : p >= 0.7 ? "¡Muy bien! Sos bastante vos. 😍" : p >= 0.4 ? "Mmm… ¿segura que sos vos? 😜" : "Bueno… yo te conozco mejor que vos misma. 😂";
    qCard.innerHTML = `<div class="quiz-final"><p class="quiz-contador">Tu resultado</p><div class="puntaje">${qPuntos}/${total}</div><h3 class="quiz-pregunta">${msg}</h3><button class="btn btn-granate" id="quizOtra" type="button">Jugar de nuevo</button></div>`;
    $("#quizOtra").onclick = () => { qCard.innerHTML = qHTML; qi = 0; qPuntos = 0; enlazarQuiz(); mostrarPregunta(); };
    if (p >= 0.7) confeti();
  }
  function enlazarQuiz() {
    $("#quizSiguiente").onclick = () => { qi++; if (qi >= D.quiz.length) finalQuiz(); else mostrarPregunta(); };
  }
  enlazarQuiz(); mostrarPregunta();

  /* ---------- Tabs de juegos ---------- */
  document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((x) => { x.classList.toggle("activa", x === t); x.setAttribute("aria-selected", x === t); });
    document.querySelectorAll(".panel").forEach((p) => (p.hidden = p.id !== `panel-${t.dataset.tab}`));
    if (t.dataset.tab !== "atrapa") pararAtrapa();
  }));

  /* ---------- Memotest ---------- */
  let memoAbiertas = [], memoMov = 0, memoPares = 0, memoBloqueo = false;
  const esRuta = (s) => /\.(jpe?g|png|webp|gif)$/i.test(s);
  function armarMemo() {
    const g = $("#memoGrid"); g.textContent = "";
    memoAbiertas = []; memoMov = 0; memoPares = 0; memoBloqueo = false;
    $("#memoMov").textContent = 0; $("#memoPares").textContent = 0; $("#memoTotal").textContent = D.memotest.length; $("#memoMsg").textContent = "";
    mezclar(D.memotest.concat(D.memotest)).forEach((v) => {
      const b = crear("button", "memo-carta"); b.type = "button"; b.dataset.v = v; b.setAttribute("aria-label", "Carta");
      const frente = crear("div", "memo-cara memo-frente");
      if (esRuta(v)) frente.appendChild(foto(v)); else frente.textContent = v;
      const inn = crear("div", "memo-in"); inn.appendChild(crear("div", "memo-cara memo-dorso", "❤")); inn.appendChild(frente);
      b.appendChild(inn);
      b.addEventListener("click", () => girarMemo(b));
      g.appendChild(b);
    });
  }
  function girarMemo(b) {
    if (memoBloqueo || b.classList.contains("abierta") || b.classList.contains("ok")) return;
    b.classList.add("abierta"); memoAbiertas.push(b);
    if (memoAbiertas.length < 2) return;
    memoMov++; $("#memoMov").textContent = memoMov;
    const [a, c] = memoAbiertas;
    if (a.dataset.v === c.dataset.v) {
      a.classList.add("ok"); c.classList.add("ok"); memoAbiertas = [];
      memoPares++; $("#memoPares").textContent = memoPares;
      if (memoPares === D.memotest.length) { $("#memoMsg").textContent = `¡Ganaste en ${memoMov} movimientos! Sos una genia ✨`; confeti(); }
    } else {
      memoBloqueo = true;
      setTimeout(() => { a.classList.remove("abierta"); c.classList.remove("abierta"); memoAbiertas = []; memoBloqueo = false; }, 800);
    }
  }
  $("#memoReiniciar").onclick = armarMemo;
  armarMemo();

  /* ---------- Reventá los globos ---------- */
  const coloresGlobo = D.globos || ["#800020", "#87CEEB"];
  $("#atrapaReglas").innerHTML = `Reventá los globos antes de que se escapen volando.<br>El <b>dorado</b> suma 3 y el <b>negro</b> resta 2.`;
  const zona = $("#atrapaZona");
  let aPuntos = 0, aTiempo = 30, aTimer = null, aSpawn = null;
  $("#atrapaRecord").textContent = leer("recordGlobos", 0);
  function pararAtrapa() { clearInterval(aTimer); clearTimeout(aSpawn); aTimer = aSpawn = null; zona.querySelectorAll(".cae").forEach((e) => e.remove()); }
  function soltar() {
    const azar = Math.random();
    const tipo = azar < 0.08 ? "dorado" : azar < 0.22 ? "negro" : "normal";
    const valor = tipo === "dorado" ? 3 : tipo === "negro" ? -2 : 1;
    const b = crear("button", `cae globo globo-${tipo}`); b.type = "button";
    b.setAttribute("aria-label", "Globo");
    if (tipo === "normal") b.style.setProperty("--c", coloresGlobo[Math.floor(Math.random() * coloresGlobo.length)]);
    b.style.left = `${Math.random() * 82 + 3}%`;
    b.style.setProperty("--vaiven", `${(Math.random() - 0.5) * 60}px`);
    const dur = Math.max(2, 4.2 - (30 - aTiempo) * 0.07);
    b.style.animationDuration = `${dur}s`;
    b.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      if (b.classList.contains("pum")) return;
      aPuntos = Math.max(0, aPuntos + valor);
      if (tipo === "dorado") miniConfeti(b);
      $("#atrapaPuntos").textContent = aPuntos;
      const t = getComputedStyle(b).transform;
      b.classList.add("pum");
      b.style.animation = "none"; b.style.transform = t === "none" ? "" : t;
      requestAnimationFrame(() => { b.style.transition = "transform .25s, opacity .25s"; b.style.transform = `${t === "none" ? "" : t} scale(1.8)`; b.style.opacity = "0"; });
      setTimeout(() => b.remove(), 300);
    });
    b.addEventListener("animationend", (e) => { if (e.animationName === "elevar") b.remove(); });
    zona.appendChild(b);
    aSpawn = setTimeout(soltar, Math.max(260, 650 - (30 - aTiempo) * 12));
  }
  $("#atrapaEmpezar").onclick = () => {
    $("#atrapaIntro").hidden = true;
    aPuntos = 0; aTiempo = 30;
    $("#atrapaPuntos").textContent = 0; $("#atrapaTiempo").textContent = 30;
    soltar();
    aTimer = setInterval(() => {
      aTiempo--; $("#atrapaTiempo").textContent = aTiempo;
      if (aTiempo <= 0) {
        pararAtrapa();
        const rec = leer("recordGlobos", 0);
        const nuevo = aPuntos > rec;
        if (nuevo) { guardar("recordGlobos", aPuntos); $("#atrapaRecord").textContent = aPuntos; confeti(); }
        const intro = $("#atrapaIntro");
        intro.querySelector("p").innerHTML = `${nuevo ? "¡Nuevo récord! " : ""}Reventaste globos por <b>${aPuntos}</b> puntos.<br>¡Feliz cumple, campeona! 🏆`;
        $("#atrapaEmpezar").textContent = "Otra vez";
        intro.hidden = false;
      }
    }, 1000);
  };

  /* ---------- Vales ---------- */
  const abiertos = leer("valesAbiertos", []);
  const vg = $("#valesGrid");
  D.vales.forEach((v, i) => {
    const b = crear("button", "vale"); b.type = "button";
    const abrir = () => { b.classList.add("abierto"); b.innerHTML = `<span>${esc(v)}</span>`; };
    b.innerHTML = `<span class="tapa"><b>🎁</b>Vale N° ${i + 1}<small>tocá para abrir</small></span>`;
    if (abiertos.includes(i)) abrir();
    b.addEventListener("click", () => {
      if (b.classList.contains("abierto")) return;
      abrir(); miniConfeti(b);
      if (!abiertos.includes(i)) { abiertos.push(i); guardar("valesAbiertos", abiertos); }
    });
    vg.appendChild(b);
  });

  /* ---------- Razones ---------- */
  let razones = mezclar(D.deseos), ri = 0;
  if ($("#razonBtn")) $("#razonBtn").onclick = () => {
    if (ri >= razones.length) { razones = mezclar(D.deseos); ri = 0; }
    const t = $("#razonTexto");
    t.textContent = razones[ri++];
    t.classList.remove("nueva"); void t.offsetWidth; t.classList.add("nueva");
    $("#razonCuenta").textContent = `Deseo ${ri} de ${razones.length}`;
  };

  /* ---------- Búsqueda del tesoro ---------- */
  function busqueda() {
    const B = D.busqueda, n = B.pistas.length;
    let i = 0;
    $("#busqIntro").textContent = B.intro;
    const pasos = $("#busqPasos"); pasos.textContent = "";
    B.pistas.forEach((_, k) => pasos.appendChild(crear("li", null, "🎁")));
    const fin = $("#busqFin"), btn = $("#busqBtn"), caja = $("#busqPista");
    fin.hidden = true; btn.hidden = false; caja.hidden = false;
    const mostrar = () => {
      [...pasos.children].forEach((li, k) => { li.classList.toggle("hecho", k < i); li.classList.toggle("actual", k === i); });
      if (i >= n) {
        caja.hidden = true; btn.hidden = true; $("#busqClave").hidden = true;
        fin.textContent = B.final; fin.hidden = false;
        confeti();
        return;
      }
      $("#busqNum").textContent = `Acertijo ${i + 1} de ${n}`;
      const pz = typeof B.pistas[i] === "string" ? { texto: B.pistas[i] } : B.pistas[i];
      $("#busqTexto").textContent = pz.texto;
      const ab = $("#busqAyudaBtn"), ay = $("#busqAyuda");
      ay.textContent = pz.ayuda || ""; ay.hidden = true;
      ab.hidden = !pz.ayuda;
      ab.onclick = () => { ay.hidden = false; ab.hidden = true; };
      const form = $("#busqClave"), inp = $("#busqInput"), err = $("#busqError"), abierto = $("#busqAbierto");
      abierto.hidden = true; err.hidden = true; inp.value = "";
      form.hidden = !pz.clave; btn.hidden = !!pz.clave;
      form.onsubmit = (e) => {
        e.preventDefault();
        if (inp.value.replace(/\D/g, "") === pz.clave) {
          form.hidden = true; abierto.textContent = pz.abierto || "🔓 ¡Abierto!"; abierto.hidden = false;
          btn.hidden = false; confeti();
        } else {
          err.hidden = false; form.classList.remove("mal"); void form.offsetWidth; form.classList.add("mal");
        }
      };
      btn.textContent = i === n - 1 ? "¡Encontré el último! 🎉" : (pz.clave ? "Siguiente sorpresa 🎁" : "¡Lo encontré! 🎁");
      caja.classList.remove("entra"); void caja.offsetWidth; caja.classList.add("entra");
    };
    btn.onclick = () => { i++; mostrar(); };
    mostrar();
  }

  /* ---------- Torta ---------- */
  const velas = [...document.querySelectorAll(".vela")];
  velas.forEach((v) => v.addEventListener("click", () => {
    if (v.classList.contains("apagada")) return;
    v.classList.add("apagada");
    const quedan = velas.filter((x) => !x.classList.contains("apagada")).length;
    $("#tortaBajada").textContent = quedan ? `¡Bien! Te ${quedan === 1 ? "queda 1 vela" : `quedan ${quedan} velas`}.` : "¡Deseos pedidos! Ahora empieza la búsqueda…";
    if (!quedan) {
      busqueda();
      $("#carta").hidden = false;
      confeti();
      setTimeout(() => $("#carta").scrollIntoView({ behavior: sinMovimiento ? "auto" : "smooth", block: "center" }), 600);
    }
  }));

  /* ---------- Aparecer al hacer scroll (desde un estado visible) ---------- */
  const apObs = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.remove("pre"); apObs.unobserve(e.target); } }), { rootMargin: "0px 0px -40px 0px" });
  if (!sinMovimiento) document.querySelectorAll(".aparece").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight) { el.classList.add("pre"); apObs.observe(el); }
  });

  /* ---------- Corazones de fondo y chispas ---------- */
  if (!sinMovimiento) {
    const fondo = $("#corazonesFondo");
    setInterval(() => {
      if (document.hidden) return;
      const c = crear("span", "corazon-flota");
      c.textContent = ["❤", "♥", "✿"][Math.floor(Math.random() * 3)];
      c.style.left = `${Math.random() * 100}%`;
      c.style.fontSize = `${12 + Math.random() * 22}px`;
      c.style.color = Math.random() < 0.5 ? "var(--granate)" : "var(--celeste-osc)";
      c.style.animationDuration = `${9 + Math.random() * 8}s`;
      c.addEventListener("animationend", () => c.remove());
      fondo.appendChild(c);
    }, 1100);

    let ultima = 0;
    document.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const t = performance.now(); if (t - ultima < 70) return; ultima = t;
      const s = crear("span", "chispa"); s.textContent = Math.random() < 0.5 ? "❤" : "✦";
      s.style.left = `${e.clientX}px`; s.style.top = `${e.clientY}px`;
      s.style.color = Math.random() < 0.5 ? "var(--granate)" : "var(--celeste-osc)";
      s.style.setProperty("--dx", `${(Math.random() - 0.5) * 40}px`);
      s.addEventListener("animationend", () => s.remove());
      document.body.appendChild(s);
    });
  }

  /* ---------- Confeti ---------- */
  const cv = $("#confeti"), ctx = cv.getContext("2d");
  let piezas = [], corriendo = false;
  const colores = ["#800020", "#87CEEB", "#ffffff", "#b8334f", "#2b7ea6"];
  function confeti(x, y, n = 160) {
    if (sinMovimiento) return;
    cv.width = innerWidth; cv.height = innerHeight;
    const ox = x ?? innerWidth / 2, oy = y ?? innerHeight / 3;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, v = 4 + Math.random() * 9;
      piezas.push({ x: ox, y: oy, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 5, r: 4 + Math.random() * 6, c: colores[i % colores.length], rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, vida: 140 + Math.random() * 60, cor: Math.random() < 0.25 });
    }
    if (!corriendo) { corriendo = true; requestAnimationFrame(animar); }
  }
  function miniConfeti(el) { const r = el.getBoundingClientRect(); confeti(r.left + r.width / 2, r.top + r.height / 2, 40); }
  function animar() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    piezas = piezas.filter((p) => p.vida-- > 0 && p.y < cv.height + 20);
    piezas.forEach((p) => {
      p.vy += 0.25; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c; ctx.strokeStyle = "#170609"; ctx.lineWidth = 1;
      if (p.cor) { ctx.font = `${p.r * 3}px sans-serif`; ctx.fillText("❤", -p.r, p.r); }
      else { ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); ctx.strokeRect(-p.r, -p.r / 2, p.r * 2, p.r); }
      ctx.restore();
    });
    if (piezas.length) requestAnimationFrame(animar); else { corriendo = false; ctx.clearRect(0, 0, cv.width, cv.height); }
  }
})();
