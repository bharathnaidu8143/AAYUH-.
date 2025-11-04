// =====================================================
// 🔹 AAYUH! - script.js
// Handles: PWA Install, Firebase check, Service Worker
// =====================================================

// -----------------------------
// 1️⃣ Firebase Initialization
// -----------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDVZNBKutvRFrQOFQunVgSBwJFLMvrct0Q",
  authDomain: "aayuh-c9a87.firebaseapp.com",
  projectId: "aayuh-c9a87",
  storageBucket: "aayuh-c9a87.firebasestorage.app",
  messagingSenderId: "459370049467",
  appId: "1:459370049467:web:4354a11c6b43d3f6dede9e",
  measurementId: "G-GNFKCBES0L"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => console.log("✅ Persistent login enabled."))
  .catch(error => console.error("Persistence error:", error.message));

// -----------------------------
// 2️⃣ PWA: Install Prompt Logic
// -----------------------------
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log("📱 PWA install prompt available.");
  if (installBtn) installBtn.style.display = 'block';
});

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install: ${outcome}`);
    deferredPrompt = null;
  });
}

// -----------------------------
// 3️⃣ Service Worker Registration
// -----------------------------
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => {
      console.log("✅ Service Worker registered successfully.");

      // Detect new updates
      reg.onupdatefound = () => {
        const newWorker = reg.installing;
        newWorker.onstatechange = () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            const updatePopup = document.getElementById('updatePopup');
            if (updatePopup) updatePopup.style.display = 'flex';
          }
        };
      };
    })
    .catch(err => console.error("❌ Service Worker registration failed:", err));
}

// Refresh button logic for update popup
const refreshBtn = document.getElementById('refreshBtn');
if (refreshBtn) {
  refreshBtn.addEventListener('click', () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ action: 'skipWaiting' });
    }
    window.location.reload();
  });
}

// -----------------------------
// 4️⃣ Auth State Check
// -----------------------------
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("👤 Logged in as:", user.email);
    if (window.location.pathname.includes('index.html')) {
      window.location.href = 'dashboard.html';
    }
  } else {
    console.log("🚪 No user logged in.");
  }
});
