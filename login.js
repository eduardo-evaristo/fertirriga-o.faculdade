import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDGe3V6PnVaSpycvazT4E1pplmwoYFyOmE",
  authDomain: "arduino-web-73b1a.firebaseapp.com",
  databaseURL: "https://arduino-web-73b1a-default-rtdb.firebaseio.com",
  projectId: "arduino-web-73b1a",
  storageBucket: "arduino-web-73b1a.appspot.com",
  messagingSenderId: "730055975071",
  appId: "1:730055975071:web:05d29a61d39dfcb53082aa",
  measurementId: "G-HXHPGYFWKZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the authentication service
const auth = getAuth(app);

//Submit
const submit = document.getElementById("autenticar");

submit.addEventListener("click", function () {
  //Input
  const email = document.getElementById("usuario").value;
  const password = document.getElementById("senha").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      alert("Redirecionando...");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      //console.error(`Error ${errorCode}: ${errorMessage}`);
      alert(`Não foi possível encontrar o usuário!`);
    });
});
const submitButton = document.getElementById("autenticar");

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        submitButton.click();
    }
})
