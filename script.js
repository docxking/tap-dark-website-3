
let totalSlaps = localStorage.getItem('totalSlaps') || 0;
let nickname = '';
const nicknameInput = document.getElementById('nicknameInput');
const startBtn = document.getElementById('startBtn');
const slapBtn = document.getElementById('slapButton');
const slapCount = document.getElementById('slapCount');
const slapSection = document.getElementById('slapSection');
const slapList = document.getElementById('slapList');

startBtn.addEventListener('click', () => {
  nickname = nicknameInput.value.trim();
  if (nickname.length > 0) {
    slapSection.classList.remove('hidden');
    startBtn.disabled = true;
    nicknameInput.disabled = true;
    updateSlapCount();
    showLeaderboard();
  }
});

slapBtn.addEventListener('click', () => {
  totalSlaps++;
  localStorage.setItem('totalSlaps', totalSlaps);
  slapCount.textContent = `${totalSlaps} SLAPS DELIVERED`;

  const entry = document.createElement('li');
  entry.textContent = `${nickname} slapped back!`;
  slapList.prepend(entry);

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

firebase.database().ref('slaps').limitToLast(10).on('child_added', (snapshot) => {
  const data = snapshot.val();
  const li = document.createElement('li');
  li.textContent = `${data.nickname} slapped back at ${new Date(data.timestamp).toLocaleTimeString()}`;
  slapList.prepend(li);
});


function updateSlapCount() {
  slapCount.textContent = `${totalSlaps} SLAPS DELIVERED`;
}

function showLeaderboard() {
  const entry = document.createElement('li');
  entry.textContent = `${nickname} joined the slap army.`;
  slapList.prepend(entry);
}

const slapButton = document.getElementById('slapButton');
const gif = document.getElementById('hawkTuahGif');

slapButton.addEventListener('click', () => {
  gif.style.display = 'block';
  gif.style.opacity = '1';
  gif.src = gif.src; // Reinicia o GIF

  setTimeout(() => {
    gif.style.opacity = '0';
  }, 700); // Inicia o desaparecimento após 0.7s

  setTimeout(() => {
    gif.style.display = 'none';
  }, 1000); // Remove o GIF do layout após 1s
});
