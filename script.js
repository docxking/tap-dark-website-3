let totalSlaps = localStorage.getItem('totalSlaps') || 0;
let nickname = '';

const nicknameInput = document.getElementById('nicknameInput');
const startBtn = document.getElementById('startBtn');
const slapBtn = document.getElementById('slapButton');
const slapCount = document.getElementById('slapCount');
const slapSection = document.getElementById('slapSection');
const slapList = document.getElementById('slapList');
const gif = document.getElementById('hawkTuahGif');

// Início do jogo
startBtn.addEventListener('click', () => {
  nickname = nicknameInput.value.trim();
  if (nickname.length > 0) {
    slapSection.classList.remove('hidden');
    startBtn.disabled = true;
    nicknameInput.disabled = true;
    updateSlapCount();
    showLeaderboard();
  } else {
    alert('Por favor, insira um nickname!');
  }
});

// Clique no botão de slap
slapBtn.addEventListener('click', () => {
  if (gif.style.display === 'block') return; // Evita múltiplos cliques enquanto o GIF está visível

  // Atualiza contagem local
  totalSlaps++;
  localStorage.setItem('totalSlaps', totalSlaps);
  slapCount.textContent = `${totalSlaps} SLAPS DELIVERED`;

  // Adiciona entrada local na lista
  const entry = document.createElement('li');
  entry.textContent = `${nickname} slapped back!`;
  slapList.prepend(entry);

  // Animação do GIF (6s total com transição suave)
  gif.style.display = 'none';
  const originalSrc = gif.src.split('?')[0];
  setTimeout(() => {
    gif.src = `${originalSrc}?t=${Date.now()}`;
    gif.style.display = 'block';
    gif.style.opacity = '1';
  }, 50);

  setTimeout(() => {
    gif.style.opacity = '0'; // Suavemente desaparece
  }, 5700);

  setTimeout(() => {
    gif.style.display = 'none'; // Some do layout após sumir
  }, 6000);

  // Envia para o Firebase
  const slapData = {
    nickname: nickname,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  };

  firebase.database().ref('slaps').push(slapData)
    .then(() => console.log("Slap registrado no Firebase"))
    .catch((error) => console.error("Erro ao registrar slap:", error));
});

// Atualizações em tempo real da slap list
firebase.database().ref('slaps').limitToLast(10).on('child_added', (snapshot) => {
  const data = snapshot.val();
  const li = document.createElement('li');
  li.textContent = `${data.nickname} slapped back at ${new Date(data.timestamp).toLocaleTimeString()}`;
  slapList.prepend(li);
});

// Atualiza contagem na tela
function updateSlapCount() {
  slapCount.textContent = `${totalSlaps} SLAPS DELIVERED`;
}

// Mostra entrada no leaderboard
function showLeaderboard() {
  const entry = document.createElement('li');
  entry.textContent = `${nickname} joined the slap army.`;
  slapList.prepend(entry);
}
