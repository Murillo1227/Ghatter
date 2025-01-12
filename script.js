// Lista de canciones
const canciones = [
  { nombre: "SPORT", artista: "myketowers", src: "/música/_ClarentKP - SPORT(M4A_128K).m4a", likes: 0 },
  { nombre: "La Última Vez", artista: "Anuel AA x Bad Bunny", src: "/música/Anuel AA_ Bad Bunny - La Última Vez(M4A_128K).m4a", likes: 0 },
  { nombre: "Eminem _Without-Me _slowed and Reverb", artista: "Eminem", src: "/música/_Eminem _Without-Me _slowed and Reverb(M4A_128K).mp3", likes: 0 },
  { nombre: "lovely", artista: "Billie Eilish", src: "/música/Billie Eilish - lovely (Lyrics) ft. Khalid(MP3_160K).mp3", likes: 0 },
  { nombre: "Conexión", artista: "Bryant Myers", src: "/música/Bryant Myers - Conexión (Solo Version)(M4A_128K).m4a", likes: 0 },
  { nombre: "El Anciano y El Niño", artista: "Cheo Gallego", src: "/música/Cheo Gallego - El Anciano y El Niño (Official Video)(M4A_128K).m4a", likes: 0 },
  { nombre: "Gucci Gang", artista: "Lil Pump", src: "/música/Lil Pump - Gucci Gang [Official Music Video](M4A_128K).m4a", likes: 0 },
  { nombre: "6locc 6a6y Remix", artista: "Lil Loaded ft x NLE Choppa", src: "/música/Lil Loaded ft. NLE Choppa _6locc 6a6y Remix_ (Official Video)(M4A_128K).m4a", likes: 0 },
  { nombre: "7 Years", artista: "Lukas Graham", src: "/música/Lukas Graham - 7 Years [Official Music Video](M4A_128K).m4a", likes: 0 },
  { nombre: "Jennifer", artista: "Trinidad cardona", src: "/música/Jennifer(MP3_160K).mp3", likes: 0 },
  { nombre: "Funk do Patinho", artista: "Bento e Totó", src: "/música/Bento e Totó - Funk do Patinho (Desenho Infantil)(M4A_128K).m4a", likes: 0 },
  { nombre: "Beautiful Things", artista: "Benson-Boone", src: "https://drive.google.com/uc?export=preview&id=1fJbBCHUD1FEHPJB7Eu086JC5bx-7xfs0", likes: 0 },
];

// Variables principales
let indiceCancion = 0;
const likesUsuario = new Set();
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const songList = document.getElementById("song-list");
const searchInput = document.getElementById("search");

// Efectos de sonido
const clickSound = new Audio("/música/mixkit-arrow-whoosh-1491.wav");
const playSound = new Audio("/música/mixkit-arrow-whoosh-1491.wav");
const pauseSound = new Audio("");
const likeSound = new Audio("/música/mixkit-arcade-game-jump-coin-216.wav");
const changeSound = new Audio("/música/mixkit-classic-click-1117.wav");

// Reproducir sonido
function reproducirSonido(sonido) {
  sonido.currentTime = 0;
  sonido.play();
}

// Mostrar mensaje personalizado
function showMessage(message, duration = 3000) {
  const messageContainer = document.getElementById("custom-message");
  const messageText = document.getElementById("message-text");
  const closeButton = document.getElementById("close-message");

  messageText.textContent = message;
  messageContainer.style.display = "block";

  closeButton.addEventListener("click", () => {
    messageContainer.style.display = "none";
  });

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, duration);
}

// Función para dar like
function darLike(index) {
  if (likesUsuario.has(index)) {
    showMessage("¡Ya diste like a esta canción!", 3500);
    return;
  }

  canciones[index].likes++;
  likesUsuario.add(index);
  reproducirSonido(likeSound);
  cargarLista(); // Recarga la lista para mostrar los nuevos likes
  showMessage("¡Gracias por tu like!", 3500);
}

// Cargar la lista de canciones
function cargarLista(filtradas = canciones) {
  songList.innerHTML = "";
  const cancionesOrdenadas = [...filtradas].sort((a, b) => b.likes - a.likes);

  cancionesOrdenadas.forEach((cancion, index) => {
    const li = document.createElement("li");
    const originalIndex = canciones.indexOf(cancion);

    li.innerHTML = `
      <button class="like-btn" data-index="${originalIndex}">
        ❤️ ${cancion.likes}
      </button>
      <span>${cancion.nombre} - ${cancion.artista}</span>
    `;

    // Asignar las clases para el Top 1, Top 2 y Top 3
    if (index === 0 && cancion.likes > 0) {
      li.innerHTML += `<span class="top-badge fire">🔥 Top 1</span>`;
      li.classList.add("top1");
    } else if (index === 1 && cancion.likes > 0) {
      li.innerHTML += `<span class="top-badge top2">✨ Top 2</span>`;
      li.classList.add("top2");
    } else if (index === 2 && cancion.likes > 0) {
      li.innerHTML += `<span class="top-badge top3">🌟 Top 3</span>`;
      li.classList.add("top3");
    }

    li.dataset.index = originalIndex;
    li.addEventListener("click", () => {
      reproducirSonido(clickSound);
      seleccionarCancion(originalIndex);
    });
    songList.appendChild(li);
  });

  document.querySelectorAll(".like-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      darLike(parseInt(btn.dataset.index, 10)); // Dar like al índice de la canción
    });
  });
}

// Cargar una canción
function cargarCancion(indice) {
  const cancion = canciones[indice];
  audio.src = cancion.src;
  actualizarEstiloSeleccionado(indice);
}

// Seleccionar y reproducir una canción
function seleccionarCancion(indice) {
  indiceCancion = indice;
  cargarCancion(indice);
  reproducirCancion();
}

// Reproducir canción
function reproducirCancion() {
  reproducirSonido(playSound);
  audio.play();
}

// Pausar canción
function pausarCancion() {
  reproducirSonido(pauseSound);
  audio.pause();
}

// Siguiente canción
function siguienteCancion() {
  indiceCancion = (indiceCancion + 1) % canciones.length;
  cargarCancion(indiceCancion);
  reproducirSonido(changeSound);
  reproducirCancion();
}

// Canción anterior
function anteriorCancion() {
  indiceCancion = (indiceCancion - 1 + canciones.length) % canciones.length;
  cargarCancion(indiceCancion);
  reproducirSonido(changeSound);
  reproducirCancion();
}

// Actualizar estilo de la canción seleccionada
function actualizarEstiloSeleccionado(indice) {
  const items = document.querySelectorAll("#song-list li");
  items.forEach((item, i) => {
    if (i === indice) {
      item.style.background = "#C674E3";
      item.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      item.style.background = "#812FD2";
    }
  });
}

// Filtrar canciones
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const cancionesFiltradas = canciones.filter(
    (cancion) =>
    cancion.nombre.toLowerCase().includes(query) ||
    cancion.artista.toLowerCase().includes(query)
  );
  cargarLista(cancionesFiltradas);
});

// Eventos
playBtn.addEventListener("click", reproducirCancion);
pauseBtn.addEventListener("click", pausarCancion);
nextBtn.addEventListener("click", siguienteCancion);
prevBtn.addEventListener("click", anteriorCancion);

// Inicializar
cargarLista();
cargarCancion(indiceCancion);

// Cambiar a la siguiente canción al terminar la actual
audio.addEventListener("ended", siguienteCancion);