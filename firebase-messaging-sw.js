// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/12.3.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.3.0/firebase-messaging-compat.js");

// إعداد Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBOyIGeCHOPAnBFYZ8wZZ2PYrfZXU9nIDU",
  authDomain: "dgkemo-52c93.firebaseapp.com",
  databaseURL: "https://dgkemo-52c93-default-rtdb.firebaseio.com",
  projectId: "dgkemo-52c93",
  storageBucket: "dgkemo-52c93.firebasestorage.app",
  messagingSenderId: "542241001900",
  appId: "1:542241001900:web:ab2de6b9a43a4322336a09",
  measurementId: "G-96BMQDSMXK"
});

const messaging = firebase.messaging();

// استقبال الإشعارات في الخلفية (background)
messaging.onBackgroundMessage((payload) => {
  console.log('📩 إشعار جديد:', payload);

  const notificationTitle = payload.notification.title || "إشعار جديد 🎵";
  const notificationOptions = {
    body: payload.notification.body || "تم نشر أغنية جديدة!",
    icon: payload.notification.icon || "/icon.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
