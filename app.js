import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDKjRSYZVcV_pJFlqu0h1hmyPshYKyNE7I",
  authDomain: "obalabs-c56ab.firebaseapp.com", // reset to default
  projectId: "obalabs-c56ab",
  appId: "1:415868024118:web:4ea58785b6a175c4fbef97"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

// Google provider
const provider = new GoogleAuthProvider();
const googleBtn = document.getElementById("google");
const btnText = document.getElementById("btn-text");
const loader = document.getElementById("loader");

// Tabs
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const title = document.getElementById("neon-green");
loginTab.onclick=()=>{
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  title.textContent="Login to OBA";
};
signupTab.onclick=()=>{
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  title.textContent="Sign up for OBA";
};

// Google login
googleBtn.onclick=async()=>{
  btnText.classList.add("hidden");
  loader.classList.remove("hidden");
  try{
    await signInWithPopup(auth,provider);
    window.location.href="oba.html";
  }catch(err){
    alert(err.message);
    btnText.classList.remove("hidden");
    loader.classList.add("hidden");
  }
};

// Email/password form
const emailForm=document.getElementById("emailForm");
emailForm.onsubmit=async(e)=>{
  e.preventDefault();
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;

  const policy=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
  if(!policy.test(password)){alert("Password does not meet policy requirements!");return;}

  const isLogin=loginTab.classList.contains("active");
  try{
    if(isLogin){
      await signInWithEmailAndPassword(auth,email,password);
    }else{
      const userCred=await createUserWithEmailAndPassword(auth,email,password);
      await sendEmailVerification(userCred.user);
      alert("Verification email sent!");
    }
    window.location.href="oba.html";
  }catch(err){
    alert(err.message);
  }
};

// redirect if already logged in
onAuthStateChanged(auth,user=>{
  if(user) window.location.href="oba.html";
});
