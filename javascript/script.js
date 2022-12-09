var Connect = new XMLHttpRequest();
Connect.open("GET", "z03.xml", false);
Connect.setRequestHeader("Content-Type", "text/xml");
Connect.send(null);
var doc = Connect.responseXML;

$eventItem = $(doc).find("zaznam");

console.log($eventItem);
let years = [];

$eventItem.each(function (_index, element) {
  years.push($(element).find("rok").text());
});

var options = {
  series: [
    {
      name: "A",
      data: [
        $eventItem[0].children[1].children[0].innerHTML,
        $eventItem[1].children[1].children[0].innerHTML,
        $eventItem[2].children[1].children[0].innerHTML,
        $eventItem[3].children[1].children[0].innerHTML,
        $eventItem[4].children[1].children[0].innerHTML,
        $eventItem[5].children[1].children[0].innerHTML,
      ],
    },
    {
      name: "B",
      data: [
        $eventItem[0].children[1].children[1].innerHTML,
        $eventItem[1].children[1].children[1].innerHTML,
        $eventItem[2].children[1].children[1].innerHTML,
        $eventItem[3].children[1].children[1].innerHTML,
        $eventItem[4].children[1].children[1].innerHTML,
        $eventItem[5].children[1].children[1].innerHTML,
      ],
    },
    {
      name: "C",
      data: [
        $eventItem[0].children[1].children[2].innerHTML,
        $eventItem[1].children[1].children[2].innerHTML,
        $eventItem[2].children[1].children[2].innerHTML,
        $eventItem[3].children[1].children[2].innerHTML,
        $eventItem[4].children[1].children[2].innerHTML,
        $eventItem[5].children[1].children[2].innerHTML,
      ],
    },
    {
      name: "D",
      data: [
        $eventItem[0].children[1].children[3].innerHTML,
        $eventItem[1].children[1].children[3].innerHTML,
        $eventItem[2].children[1].children[3].innerHTML,
        $eventItem[3].children[1].children[3].innerHTML,
        $eventItem[4].children[1].children[3].innerHTML,
        $eventItem[5].children[1].children[3].innerHTML,
      ],
    },
    {
      name: "E",
      data: [
        $eventItem[0].children[1].children[4].innerHTML,
        $eventItem[1].children[1].children[4].innerHTML,
        $eventItem[2].children[1].children[4].innerHTML,
        $eventItem[3].children[1].children[4].innerHTML,
        $eventItem[4].children[1].children[4].innerHTML,
        $eventItem[5].children[1].children[4].innerHTML,
      ],
    },
    {
      name: "FX",
      data: [
        $eventItem[0].children[1].children[5].innerHTML,
        $eventItem[1].children[1].children[5].innerHTML,
        $eventItem[2].children[1].children[5].innerHTML,
        $eventItem[3].children[1].children[5].innerHTML,
        $eventItem[4].children[1].children[5].innerHTML,
        $eventItem[5].children[1].children[5].innerHTML,
      ],
    },
    {
      name: "FN",
      data: [
        $eventItem[0].children[1].children[6].innerHTML,
        $eventItem[1].children[1].children[6].innerHTML,
        $eventItem[2].children[1].children[6].innerHTML,
        $eventItem[3].children[1].children[6].innerHTML,
        $eventItem[4].children[1].children[6].innerHTML,
        $eventItem[5].children[1].children[6].innerHTML,
      ],
    },
  ],
  responsive: [
    {
      breakpoint: 600,
      options: {
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        yaxis: {
          title: {
            text: "",
          },
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: years,
  },
  yaxis: {
    title: {
      text: "Students",
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " students";
      },
    },
  },
};

function createPieoptions(year) {
  var options = {
    series: [
      parseInt($eventItem[year].children[1].children[0].innerHTML),
      parseInt($eventItem[year].children[1].children[1].innerHTML),
      parseInt($eventItem[year].children[1].children[2].innerHTML),
      parseInt($eventItem[year].children[1].children[3].innerHTML),
      parseInt($eventItem[year].children[1].children[4].innerHTML),
      parseInt($eventItem[year].children[1].children[5].innerHTML),
      parseInt($eventItem[year].children[1].children[6].innerHTML),
    ],
    chart: {
      width: 380,
      type: "pie",
    },
    title: {
      text: `${years[year]}`,
      align: "center",
      margin: 10,
      offsetX: -30,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#263238",
      },
    },
    labels: ["A", "B", "C", "D", "E", "FX", "FN"],
    responsive: [
      {
        breakpoint: 600,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return options;
}

var options2 = {
  series: [
    {
      name: "Students",
      data: [
        $eventItem[0].children[1].children[0].innerHTML,
        $eventItem[1].children[1].children[0].innerHTML,
        $eventItem[2].children[1].children[0].innerHTML,
        $eventItem[3].children[1].children[0].innerHTML,
        $eventItem[4].children[1].children[0].innerHTML,
        $eventItem[5].children[1].children[0].innerHTML,
      ],
    },
  ],
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  title: {
    text: "Grade A by years",
    align: "left",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  yaxis: {
    title: {
      text: "Students",
    },
  },
  xaxis: {
    categories: years,
  },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

var pie1 = new ApexCharts(document.querySelector("#pie1"), createPieoptions(0));
pie1.render();
var pie2 = new ApexCharts(document.querySelector("#pie2"), createPieoptions(1));
pie2.render();
var pie3 = new ApexCharts(document.querySelector("#pie3"), createPieoptions(2));
pie3.render();
var pie4 = new ApexCharts(document.querySelector("#pie4"), createPieoptions(3));
pie4.render();
var pie5 = new ApexCharts(document.querySelector("#pie5"), createPieoptions(4));
pie5.render();
var pie6 = new ApexCharts(document.querySelector("#pie6"), createPieoptions(5));
pie6.render();
var myGraph = new ApexCharts(document.querySelector("#my-graph"), options2);
myGraph.render();
