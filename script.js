import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  // 🔴 PASTE YOUR FIREBASE CONFIG HERE
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Protect page + show user info
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("welcomeMsg").innerText =
      `Welcome, ${user.displayName}`;

    const pic = document.getElementById("profilePic");
    pic.src = user.photoURL;
    pic.style.display = "block";
  } else {
    window.location.href = "index.html";
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});
