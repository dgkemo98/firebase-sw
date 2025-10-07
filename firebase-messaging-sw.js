importScripts("https://www.gstatic.com/firebasejs/12.3.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.3.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBOyIGeCHOPAnBFYZ8wZZ2PYrfZXU9nIDU",
  authDomain: "dgkemo-52c93.firebaseapp.com",
  projectId: "dgkemo-52c93",
  messagingSenderId: "542241001900",
  appId: "1:542241001900:web:ab2de6b9a43a4322336a09",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon
  });
});
