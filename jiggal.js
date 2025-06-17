// Handle search on all pages
document.addEventListener("DOMContentLoaded", () => {
  const queryParams = new URLSearchParams(window.location.search);
  const query = queryParams.get("q") || "";

  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = query;

  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const val = searchInput.value.trim();
      if (val) window.location.href = `search.html?q=${encodeURIComponent(val)}`;
    });
  }

  if (document.getElementById("aiResult")) {
    const aiAnswers = {
      food: "🍕 Food is essential. Try pasta, burgers, or biryani!",
      cat: "🐱 Cats are cute and independent companions.",
      dog: "🐶 Dogs are loyal and love fetch.",
      hello: "👋 Hello! I'm your Search Buddy.",
      default: "I'm still learning... but I’m trying my best, bro!"
    };

    const getAIAnswer = text => {
      text = text.toLowerCase();
      if (text.includes("food")) return aiAnswers.food;
      if (text.includes("cat")) return aiAnswers.cat;
      if (text.includes("dog")) return aiAnswers.dog;
      if (text.includes("hello")) return aiAnswers.hello;
      return aiAnswers.default;
    };

    document.getElementById("aiResult").innerText = getAIAnswer(query);
  }

  // Jigalb Logic
  if (document.getElementById("jigalbPosts")) {
    const jigalbPosts = {
      food: [
        { user: "SnackLover", text: "I love spicy noodles 🍜", img: "https://i.imgur.com/Qr5B9eT.jpg" },
        { user: "PizzaBro", text: "Pizza is LIFE.", img: "https://i.imgur.com/YX6LxjX.jpg" }
      ],
      cat: [
        { user: "WhiskerFan", text: "Cats are supreme beings 🐱", img: "https://i.imgur.com/8zZ4IGl.jpg" }
      ],
      dog: [
        { user: "DoggoFan", text: "Pugs are hilarious!", img: "https://i.imgur.com/DF9lFCx.jpg" }
      ]
    };

    const keyword = query.toLowerCase();
    const area = document.getElementById("jigalbPosts");
    const posts = jigalbPosts[keyword] || [];

    posts.forEach(p => {
      const div = document.createElement("div");
      div.className = "jigalb-post";
      div.innerHTML = `<strong>${p.user}</strong>: ${p.text}<br><img src="${p.img}" alt="" />`;
      area.appendChild(div);
    });

    const form = document.getElementById("postForm");
    if (form) {
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        const input = document.getElementById("postInput");
        const text = input.value.trim();
        if (!text) return;
        const div = document.createElement("div");
        div.className = "jigalb-post";
        div.innerHTML = `<strong>You</strong>: ${text}`;
        area.prepend(div);
        input.value = "";
      });
    }
  }
});

// Search Buddy
function toggleBuddy() {
  const msg = prompt("Ask Search Buddy something!");
  if (msg) {
    alert("🤖 Buddy says:\n" + (msg.includes("help") ? "Try searching something or go to Obamail!" : "I'll get smarter soon!"));
  }
}

// Bug Report
function reportBug() {
  const bug = prompt("🪲 What's the bug?");
  if (bug) {
    const mailto = `mailto:oforomarbinamir@gmail.com?subject=Bug Report&body=${encodeURIComponent(bug)}`;
    window.location.href = mailto;
  }
}

// Validate Obamail Signup
function validateEmail(e) {
  e.preventDefault();
  const email = document.getElementById("emailInput").value;
  if (!email.endsWith("@jig.mail")) {
    document.getElementById("signupMessage").innerText = "❌ Must end with @jig.mail";
    return false;
  }
  document.getElementById("signupMessage").innerText = "✅ Welcome to Obamail!";
  return false;
}
