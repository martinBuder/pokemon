function renderCardContentBase() {
  styleBaseH3();
  pokeCardContent = document.getElementById("pokeCardContent");

  pokeCardContent.innerHTML = `<canvas id="pokeChart" ></canvas>`;
  createChart();
}

function createChart() {
  // *begin chart
  const ctx = document.getElementById("pokeChart");

  // *setup

  new Chart(ctx, {
    type: "radar",
    data: {
      labels: [
        "HP",
        "Attack",
        "Defense",
        "Special-Attack",
        "Special-Defense",
        "Speed",
      ],
      datasets: [
        {
          data: [
            currentCardPokemon["stats"][0]["base_stat"],
            currentCardPokemon["stats"][1]["base_stat"],
            currentCardPokemon["stats"][2]["base_stat"],
            currentCardPokemon["stats"][3]["base_stat"],
            currentCardPokemon["stats"][4]["base_stat"],
            currentCardPokemon["stats"][5]["base_stat"],
          ],
          fill: true,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderColor: "rgba(255, 255, 255, 0.7)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(0, 0, 0, 1)",
        },
      ],
    },
    options: {
      scales: {
        r: {
          angleLines: {
            display: true,
            lineWidth: 2,
            color: "#000",
          },
          grid: {
            lineWidth: 1,
            color: "#000",
          },
          suggestedMin: 0,
          suggestedMax: 145,
          ticks: {
            display: false,
          },
          pointLabels: {
            font: {
              size: 15, // Schriftgröße der Labels
              fontColor: "#000",
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        labels: {
          font: {
            size: 32,
            color: "rgb(0, 0, 0)",
          },
        },
      },
      elements: {
        line: {
          borderWidth: 2, // Dicke der Linien
        },
      },
    },
  });
}
