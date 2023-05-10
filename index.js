$(document).ready(function () {
  $("form").submit(function (e) {
    e.preventDefault();
    $("#afterForm").removeClass("d-none");
    var file = $("#csvFile")[0].files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      var csv = reader.result;
      var rows = csv.split("\n");
      var headers = rows[0].split(",");
      var data = rows.slice(1).map(function (row) {
        return row.split(",");
      });
      var table = $("#dataTable").DataTable({
        data: data,
        columns: headers.map(function (header) {
          return { title: header };
        }),
      });
      generateCharts(headers, data);
    };
  });
});

function generateCharts(headers, rows) {
  var chart1Data = [];
  var chart2Data = [];

  // Chart 1: Bar Chart
  for (var i = 1; i < rows.length; i++) {
    chart1Data.push({
      label: rows[i][0],
      value: rows[i][1],
    });
  }
  new Chart(document.getElementById("chart1"), {
    type: "bar",
    data: {
      labels: chart1Data.map(function (data) {
        return data.label;
      }),
      datasets: [
        {
          label: headers[1],
          data: chart1Data.map(function (data) {
            return data.value;
          }),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  // Chart 2: Line Chart
  for (var i = 1; i < rows.length; i++) {
    chart2Data.push({
      label: rows[i][0],
      data: rows[i].slice(1),
      borderColor: "rgba(255, 99, 132, 1)",
      fill: false,
    });
  }
  new Chart(document.getElementById("chart2"), {
    type: "line",
    data: {
      labels: headers.slice(1),
      datasets: chart2Data,
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  function randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // Chart 3: Pie Chart
  var chart3Data = [];
  for (var i = 1; i < rows.length; i++) {
    chart3Data.push({
      label: rows[i][0],
      data: rows[i].slice(1),
      backgroundColor: randomColor(),
      borderWidth: 1,
    });
  }
  new Chart(document.getElementById("chart3"), {
    type: "pie",
    data: {
      labels: headers.slice(1),
      datasets: chart3Data,
    },
    options: {
      responsive: true,
    },
  });
  // Chart 4: Doughnut Chart
  var chart4Data = [];
  for (var i = 1; i < rows.length; i++) {
    chart4Data.push({
      label: rows[i][0],
      data: rows[i].slice(1),
      backgroundColor: randomColor(),
      borderWidth: 1,
    });
  }
  new Chart(document.getElementById("chart4"), {
    type: "doughnut",
    data: {
      labels: headers.slice(1),
      datasets: chart4Data,
    },
    options: {
      responsive: true,
    },
  });
  // Chart 5: Radar Chart
  var chart5Data = [];
  for (var i = 1; i < rows.length; i++) {
    chart5Data.push({
      label: rows[i][0],
      data: rows[i].slice(1),
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    });
  }
  new Chart(document.getElementById("chart5"), {
    type: "radar",
    data: {
      labels: headers.slice(1),
      datasets: chart5Data,
    },
    options: {
      responsive: true,
      scale: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  });
  // Chart 6: Polar Area Chart
  var chart6Data = [];
  for (var i = 1; i < rows.length; i++) {
    chart6Data.push({
      label: rows[i][0],
      data: rows[i].slice(1),
      backgroundColor: randomColor(),
      borderWidth: 1,
    });
  }
  new Chart(document.getElementById("chart6"), {
    type: "polarArea",
    data: {
      labels: headers.slice(1),
      datasets: chart6Data,
    },
    options: {
      responsive: true,
    },
  });
}
