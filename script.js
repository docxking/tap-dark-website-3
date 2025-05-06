const firebaseConfig = {
  apiKey: "AIzaSyDA0fbgQb_OpY0WdlfigEs65E1hS1l2028",
  authDomain: "slap-b9b8a.firebaseapp.com",
  databaseURL: "https://slap-b9b8a-default-rtdb.firebaseio.com",
  projectId: "slap-b9b8a",
  storageBucket: "slap-b9b8a.firebasestorage.app",
  messagingSenderId: "139059965526",
  appId: "1:139059965526:web:07d34bc67892428081d5f7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const tapBtn = document.getElementById("tapBtn");
const nicknameInput = document.getElementById("nickname");
const slapList = document.getElementById("slapList");
const totalSlaps = document.getElementById("totalSlaps");

let slapCount = 0;

tapBtn.addEventListener("click", () => {
  const nick = nicknameInput.value.trim();
  if (!nick) return alert("Enter your nickname!");
  const slap = {
    nickname: nick,
    time: Date.now()
  };
  db.ref("slaps").push(slap);
});

db.ref("slaps").on("child_added", (snapshot) => {
  const data = snapshot.val();
  slapCount++;
  totalSlaps.textContent = slapCount;
  const li = document.createElement("li");
  li.textContent = ${data.nickname} slapped at ${new Date(data.time).toLocaleTimeString()};
  slapList.prepend(li);
});
