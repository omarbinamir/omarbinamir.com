import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  // 🔴 PASTE YOUR FIREBASE CONFIG HERE
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("welcomeMsg").innerText = `Welcome, ${user.displayName}`;
  } else {
    document.getElementById("welcomeMsg").innerText = "Not logged in";
  }
});
