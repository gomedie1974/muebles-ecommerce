const firebaseConfig = {
  apiKey: "AIzaSyCU79ZWBAHThRPVp44voMXIC42zq6abS4Y",
  authDomain: "muebles-ecommerce-d8fc0.firebaseapp.com",
  projectId: "muebles-ecommerce-d8fc0",
  storageBucket: "muebles-ecommerce-d8fc0.firebasestorage.app",
  messagingSenderId: "724872861374",
  appId: "1:724872861374:web:d94cbd14d1b790d391b0ef",
  measurementId: "G-59W8JTZPXR"
};

// Inicializar Firebase solo una vez
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
