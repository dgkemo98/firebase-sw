(async function() {
  const firebaseConfig = {
    apiKey: "AIzaSyBOyIGeCHOPAnBFYZ8wZZ2PYrfZXU9nIDU",
    authDomain: "dgkemo-52c93.firebaseapp.com",
    databaseURL: "https://dgkemo-52c93-default-rtdb.firebaseio.com",
    projectId: "dgkemo-52c93",
    storageBucket: "dgkemo-52c93.firebasestorage.app",
    messagingSenderId: "542241001900",
    appId: "1:542241001900:web:ab2de6b9a43a4322336a09"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  const RSS_URL = "https://www.dgkemo.com/rss.xml";
  const CHECK_INTERVAL = 1000 * 60 * 5; // كل 5 دقائق

  function setLastNotified(link) {
    localStorage.setItem("lastNotifiedLink", link);
  }

  function getLastNotified() {
    return localStorage.getItem("lastNotifiedLink");
  }

  async function fetchRSS() {
    const resp = await fetch(RSS_URL);
    const text = await resp.text();
    const parser = new DOMParser();
    return parser.parseFromString(text, "application/xml");
  }

  async function processRSS() {
    try {
      const xml = await fetchRSS();
      const items = xml.querySelectorAll("item");
      if (items.length === 0) return;

      const last = items[0];
      const title = last.querySelector("title").textContent;
      const link = last.querySelector("link").textContent;

      const lastNot = getLastNotified();
      if (lastNot === link) return;

      const artists = ["عمرو دياب", "تامر حسني", "محمد رمضان"];

      for (let artist of artists) {
        if (title.includes(artist)) {
          const snap = await db.ref("followers").orderByChild("artist").equalTo(artist).once("value");
          snap.forEach(child => {
            const follower = child.val();
            if (follower.notifToken) {
              const token = follower.notifToken;
              fetch("https://fcm.googleapis.com/fcm/send", {
                method: "POST",
                headers: {
                  "Authorization": "key=BOT23GIP27I7OV_g-iT_tcQlq6kpdz-Ew6UpaZvEiVIXBjbvre6Ma2xURI10Qs5GfF3RVQ7X1ZZfZWMs6kqrX0w",
    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  to: token,
                  notification: {
                    title: `🎶 جديد من ${artist}`,
                    body: title,
                    click_action: link
                  }
                })
              }).then(r => console.log("تم إرسال إشعار إلى", token, "status:", r.status));
            }
          });

          setLastNotified(link);
          break;
        }
      }
    } catch (err) {
      console.error("خطأ في قراءة RSS أو الإشعارات:", err);
    }
  }

  processRSS();
  setInterval(processRSS, CHECK_INTERVAL);
})();
