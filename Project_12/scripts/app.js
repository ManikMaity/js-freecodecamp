const colors = {
  red: "#F38181",
  green: "#95E1D3",
  yellow: "#FCE38A",
  blue: "#8b8dff",
};

// for chart
const ctx = document.getElementById("myChart");
new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Expence", "Buget Left", "Income"],
    datasets: [
      {
        data: [100, 500, 100],
        backgroundColor: [colors.red, colors.blue, colors.green],
        borderWidth: 0,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

function checkRadio() {
  return document.querySelector('input[name="expFor"]:checked').value;
}
