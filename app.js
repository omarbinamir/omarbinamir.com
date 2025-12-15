import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKjRSYZVcV_pJFlqu0h1hmyPshYKyNE7I",
  authDomain: "omarbinamir.com",
  projectId: "obalabs-c56ab",
  appId: "1:415868024118:web:4ea58785b6a175c4fbef97"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

const provider = new GoogleAuthProvider();

const btn = document.getElementById("google");
const btnText = document.getElementById("btn-text");
const loader = document.getElementById("loader");

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const title = document.getElementById("neon-green");


loginTab.onclick = () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  title.textContent = "Login to OBA";
};
signupTab.onclick = () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  title.textContent = "Sign up for OBA";
};


btn.onclick = async () => {
  btnText.classList.add("hidden");
  loader.classList.remove("hidden");

  try {
    await signInWithPopup(auth, provider);
    window.location.href = "oba.html";
  } catch (err) {
    alert(err.message);
    btnText.classList.remove("hidden");
    loader.classList.add("hidden");
  }
};


onAuthStateChanged(auth, user => {
  if (user) window.location.href = "oba.html";
});
