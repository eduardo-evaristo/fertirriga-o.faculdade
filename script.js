"use strict";

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
firebase.initializeApp(firebaseConfig);

const arrayInfo = [];

$(document).ready(function () {
  var database = firebase.database();

  var Temperatura = database.ref("Temperatura");
  var Precipitacao = database.ref("Precipitacao");
  var Umidade = database.ref("Umidade");
  var Nitrogenio = database.ref("NPK/Nitrogenio");
  var Fosforo = database.ref("NPK/Fosforo");
  var Potassio = database.ref("NPK/Potassio");
  var Led1Status = database.ref("Led1Status");


  database.ref().on("value", function (snap) {
    Led1Status = snap.val().Led1Status;
    if (Led1Status == "1") {
      document.getElementById("unact").style.display = "none";
      document.getElementById("act").style.display = "block";
    } else {
      document.getElementById("unact").style.display = "block";
      document.getElementById("act").style.display = "none";
    }
  });

  Temperatura.on("value", function (snap) {
    var temperatura = snap.val();
    document.querySelector(".valor-temperatura-solo").textContent = temperatura + " °C";
    document.querySelector(".valor-temperatura-ar").textContent = temperatura + " °C";
  });

  Precipitacao.on("value", function (snap) {
    var precipitacao = snap.val();
    document.querySelector(".valor-precipitacao").textContent = precipitacao + " mm";
  });

  Umidade.on("value", function (snap) {
    var umidade = snap.val();
    document.querySelector(".valor-umidade-solo").textContent = umidade + "%";
    document.querySelector(".valor-umidade-ar").textContent = umidade + "%";
  });

  Nitrogenio.on("value", function (snap) {
    var nitrogenio = snap.val();
    arrayInfo.push(nitrogenio);
    document.querySelector(".valor-nitrogenio").textContent = nitrogenio;
  });

  Fosforo.on("value", function (snap) {
    var fosforo = snap.val();
    arrayInfo.push(fosforo);
    document.querySelector(".valor-fosforo").textContent = fosforo;
  });

  Potassio.on("value", function (snap) {
    var potassio = snap.val();
    arrayInfo.push(potassio);
    document.querySelector(".valor-potassio").textContent = potassio;
  });

  Led1Status.on("value", function (snap) {
    var teste2 = snap.val();
    document.querySelector(".data4-visor").textContent = teste2;
  });
});



