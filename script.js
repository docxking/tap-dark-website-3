
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
const firebaseConfig = {
  apiKey: "AIzaSyDA0fbgQb_OpY0WdlfigEs65E1hS1l2028",
  authDomain: "slap-b9b8a.firebaseapp.com",
  databaseURL: "https://slap-b9b8a-default-rtdb.firebaseio.com",
  projectId: "slap-b9b8a",
  storageBucket: "slap-b9b8a.firebasestorage.app",
  messagingSenderId: "139059965526",
  appId: "1:139059965526:web:07d34bc67892428081d5f7"
};
('click', () => {
  totalSlaps++;
  localStorage.setItem('totalSlaps', totalSlaps);
  slapCount.textContent = `${totalSlaps} SLAPS DELIVERED`;

  const entry = document.createElement('li');
  entry.textContent = `${nickname} slapped back!`;
  slapList.prepend(entry);
});

function updateSlapCount() {
  slapCount.textContent = `${totalSlaps} SLAPS DELIVERED`;
}

function showLeaderboard() {
  const entry = document.createElement('li');
  entry.textContent = `${nickname} joined the slap army.`;
  slapList.prepend(entry);
}
firebase.database().ref('slaps').limitToLast(10).on('child_added', (snapshot) => {
  const data = snapshot.val();
  const li = document.createElement('li');
  li.textContent = `${data.nickname} slapped back at ${new Date(data.timestamp).toLocaleTimeString()}`;
  slapList.prepend(li);
});
