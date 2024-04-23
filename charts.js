
const graficoTempSoloSemanal = document.getElementById("myChart");
const graficoTempArSemanal = document.getElementById("chart2");

new Chart(graficoTempSoloSemanal, {
  type: "bar",
  data: {
    labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
    datasets: [
      {
        label: "Temperatura do Solo - Semanal",
        data: [12, 19, 3, 5, 2, 3, 16],
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
        label: "Temperatura do Ar - Semanal",
        data: [12, 19, 3, 5, 2, 3, 16],
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