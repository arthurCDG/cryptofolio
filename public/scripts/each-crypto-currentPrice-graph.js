// Currency sera la valeur dynamique obtenue sur la page
let symbolOfTheCrypto = "BTC";

if (document.querySelector("#symbol-of-the-crypto")) {
  symbolOfTheCrypto = document.querySelector("#symbol-of-the-crypto").innerText;
}

// Create a function to call the axios and then store the data in labelData and figuresData
const showGraph = () => {
  axios
    .get(
      `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbolOfTheCrypto}&market=USD&apikey=YE17KHZEV0XAPJN8`
    )
    .then((response) => {
      const labelData = Object.keys(
        response.data["Time Series (Digital Currency Daily)"]
      ).splice(0, 20);

      const x = Object.values(
        response.data["Time Series (Digital Currency Daily)"]
      ).splice(0, 20);

      const figuresData = [];

      for (let i = 0; i < x.length; i++) {
        figuresData.push(Number(x[i]["1a. open (USD)"]));
      }

      console.log(labelData);
      console.log(figuresData);
      renderChart(labelData, figuresData);
    })
    .catch((err) => console.error(err));
};

//Show the data in the canvas
function renderChart(labelData, figuresData) {
  const ctx = document.getElementById("myChart").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labelData,
      datasets: [
        {
          label: "Days",
          data: figuresData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
}

showGraph();
