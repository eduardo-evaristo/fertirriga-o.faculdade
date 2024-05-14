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

let dia = new Date().getDate();
let mes = new Date().getMonth() + 1;
let ano = new Date().getFullYear();
let data = `${dia} 0${mes} ${ano}`;
console.log(data);
var dailyCount = 0;
const arrayInfo = [];

$(document).ready(function () {
  var database = firebase.database();

  // Retrieve the current dailyCount from Firebase
  var dailyCountRef = database.ref(`DailyCount`);
  dailyCountRef.once("value").then(function (snapshot) {
    dailyCount = snapshot.val() || 0; // Initialize to 0 if the value does not exist
  });

  var TemperaturaSolo = database.ref("TemperaturaSolo");
  var Temperatura = database.ref("Temperatura");
  var Precipitacao = database.ref("Precipitacao");
  var Umidade = database.ref("UmidadeSolo");
  var UmidadeRelativa = database.ref("UmidadeRelativa");
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
      //document.getElementById("unact").style.display = "block";
      //document.getElementById("act").style.display = "none";
    }

    Promise.all([
      fetchFirebaseData(TemperaturaSolo, "valor-temperatura-solo"),
      fetchFirebaseData(Temperatura, "valor-temperatura-ar"),
      fetchFirebaseData(Precipitacao, "valor-precipitacao"),
      fetchFirebaseData(Umidade, "valor-umidade-solo"),
      fetchFirebaseData(UmidadeRelativa, "valor-umidade-ar"),
      fetchFirebaseData(Nitrogenio, "valor-nitrogenio"),
      fetchFirebaseData(Fosforo, "valor-fosforo"),
      fetchFirebaseData(Potassio, "valor-potassio"),
    ]).then(renderCharts);
  });

  //Valores adicionados ao nó de datas
  var mudançaRef = database.ref("Mudança");

  mudançaRef.on("value", function (snapshot) {
    const mudança = snapshot.val();
    if (mudança) {
      dailyCount++; // Increment dailyCount
      // Fetch values from the nodes
      Promise.all([
        TemperaturaSolo.once("value"),
        Temperatura.once("value"),
        Precipitacao.once("value"),
        Umidade.once("value"),
        UmidadeRelativa.once("value"),
        Nitrogenio.once("value"),
        Fosforo.once("value"),
        Potassio.once("value"),
      ])
        .then(
          ([
            tempSoloSnap,
            tempSnap,
            precipSnap,
            umidSoloSnap,
            umidRelSnap,
            nitrogenioSnap,
            fosforoSnap,
            potassioSnap,
          ]) => {
            const temperaturaSolo = tempSoloSnap.val();
            const temperaturaAr = tempSnap.val();
            const precipitacao = precipSnap.val();
            const umidadeSolo = umidSoloSnap.val();
            const umidadeAr = umidRelSnap.val();
            const nitrogenio = nitrogenioSnap.val();
            const fosforo = fosforoSnap.val();
            const potassio = potassioSnap.val();

            // Add data to Firebase under a new path
            addContagem3(
              temperaturaSolo,
              temperaturaAr,
              precipitacao,
              umidadeSolo,
              umidadeAr,
              nitrogenio,
              fosforo,
              potassio
            );
          }
        )
        .then(() => {
          // Update dailyCount in Firebase
          dailyCountRef.set(dailyCount);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  });
});


async function fetchFirebaseData(ref, ...classNames) {
  return new Promise((resolve) => {
    ref.on("value", function (snap) {
      const data = snap.val();
      if (classNames.length > 0) {
        classNames.forEach((className) => {
          document.querySelector(`.${className}`).textContent = data;
        });
      }
      arrayInfo.push(data);
      resolve();
    });
  });
}

function addContagem3(
  temperaturaSolo,
  temperaturaAr,
  precipitacao,
  umidadeSolo,
  umidadeAr,
  nitrogenio,
  fosforo,
  potassio
) {
  const datePath = `Dados/${data}/Contagem${dailyCount}`;
  const contagemData = {
    TemperaturaSolo: temperaturaSolo,
    TemperaturaAr: temperaturaAr,
    Precipitacao: precipitacao,
    UmidadeSolo: umidadeSolo,
    UmidadeAr: umidadeAr,
    Nitrogenio: nitrogenio,
    Fosforo: fosforo,
    Potassio: potassio,
  };

  firebase
    .database()
    .ref(datePath)
    .set(contagemData)
    .then(() => {
      console.log(`Contagem${dailyCount} added succesfully!`);
    })
    .catch((error) => {
      console.error(`Error adding Contagem${dailyCount}:`, error);
    });
}

async function fetchFirebaseData(ref, ...classNames) {
  return new Promise((resolve) => {
    ref.on("value", function (snap) {
      const data = snap.val();
      if (classNames.length > 0) {
        classNames.forEach((className) => {
          document.querySelector(`.${className}`).textContent = data;
        });
      }
      arrayInfo.push(data);
      resolve();
    });
  });
}

const arrayTesteMensal = [];
for (let i = 0; i <= 31; i++) {
  let temperatura = Math.trunc(Math.random() * 50) + 1;
  arrayTesteMensal.push(temperatura);
}

function renderCharts() {
  const graficoTempSoloSemanal = document.getElementById("myChart");
  const graficoTempArSemanal = document.getElementById("chart2");
  const graficoTempArMensal = document.getElementById("chart3");
  const graficoTempSoloMensal = document.getElementById("chart4");

  const chart1 = document.querySelector(".chart-div1");
  const chart2 = document.querySelector(".chart-div2");
  const chart3 = document.querySelector(".chart-div3");
  const chart4 = document.querySelector(".chart-div4");
  chart1.addEventListener("click", function () {
    chart1.classList.toggle("hidden");
    chart2.classList.toggle("hidden");
  });
  chart2.addEventListener("click", function () {
    chart2.classList.toggle("hidden");
    chart1.classList.toggle("hidden");
  });

  chart3.addEventListener("click", function () {
    chart3.classList.toggle("hidden");
    chart4.classList.toggle("hidden");
  });
  chart4.addEventListener("click", function () {
    chart4.classList.toggle("hidden");
    chart3.classList.toggle("hidden");
  });

  new Chart(graficoTempSoloSemanal, {
    type: "bar",
    data: {
      labels: [
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
        "Domingo",
      ],
      datasets: [
        {
          label: "Temperatura do Solo - Semanal",
          data: arrayInfo,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  new Chart(graficoTempArSemanal, {
    type: "bar",
    data: {
      labels: [
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
        "Domingo",
      ],
      datasets: [
        {
          label: "Temperatura Relativa - Semanal",
          data: arrayInfo,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  new Chart(graficoTempArMensal, {
    type: "bar",
    data: {
      labels: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      datasets: [
        {
          label: "Temperatura Relativa - Mensal",
          data: arrayTesteMensal,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  new Chart(graficoTempSoloMensal, {
    type: "bar",
    data: {
      labels: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      datasets: [
        {
          label: "Temperatura do Solo - Mensal",
          data: arrayTesteMensal,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
