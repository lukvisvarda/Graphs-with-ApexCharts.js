var source = new EventSource("http://old.iolab.sk/evaluation/sse/sse.php");
let sinus = [];
let cosinus = [];
let x = [];
const stopBtn = document.querySelector("#stop-btn");

customElements.define("my-slider", MySlider);
const slider = document
  .querySelector("#shadow-host")
  .shadowRoot.querySelector("#slider");
const inp = document
  .querySelector("#shadow-host")
  .shadowRoot.querySelector("#inp");

var sr = $("[name='shadow']");
var sr1 = $(sr)[0].shadowRoot;
var $range = $(sr1).find("#slider");
var $thumb = $($range).next(".sliderV");
var max = slider.max;

$range.each(function () {
  $(this).on("input input.range", function () {
    // var w = $(this).width();
    var first = 18;
    var last = 82;
    var val = parseInt(this.value, 0);
    var txt = val;
    var step = (last - first) / (this.max - 1);
    // var xPX = step * (val - this.min) + "%"; // Position in PX
    // var xPC = (xPX * 100) / w; // Position in % (if ever needed)
    var x = (val - 1) * step + first + "%";

    $thumb.css({ left: x }).attr("data-val", txt);
  });
});

$range.trigger("input.range"); // Calc on load
$(window).on("resize", () => $range.trigger("input.range")); // and on resize

$("#slider-checkbox").on("click", function () {
  if ($(this).is(":checked")) {
    slider.hidden = false;
    $thumb.show();
  } else {
    slider.hidden = true;
    $thumb.hide();
  }
});

$("#number-checkbox").on("click", function () {
  if ($(this).is(":checked")) {
    inp.hidden = false;
  } else {
    inp.hidden = true;
  }
});

document.addEventListener("update-amp", function (e) {
  slider.setAttribute("value", e.detail.value);
  $range.trigger("input.range"); // Calc on load
  $(window).on("resize", () => $range.trigger("input.range")); // and on resize
});
document.addEventListener("click-slider", function (e) {
  inp.setAttribute("value", e.detail.value);
});

source.onmessage = function (event) {
  var data = JSON.parse(event.data);
  sinus.push(data.y1 * slider.value);
  cosinus.push(data.y2 * slider.value);
  x.push(data.x);
};

var options = {
  series: [
    {
      name: "sinus",
      data: sinus.slice(),
    },
    {
      name: "kosinus",
      data: cosinus.slice(),
    },
  ],
  chart: {
    id: "realtime",
    height: 350,
    type: "line",
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000,
      },
    },
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: false,
    },
  },

  title: {
    text: "Graf 2",
    align: "left",
  },

  xaxis: {
    range: 10,
  },
  yaxis: {
    decimalsInFloat: 1,
    min: 0,
    max: 10,
  },
  tooltip: {
    shared: true,
  },
  legend: {
    show: false,
  },
};

var chart = new ApexCharts(document.querySelector("#chart2"), options);
chart.render();

let interval = window.setInterval(function () {
  chart.updateSeries([
    {
      data: sinus,
    },
    {
      data: cosinus,
    },
  ]);
  checkLegends();
}, 1000);

function checkLegends() {
  var allLegends = document.querySelectorAll("#legend input[type='checkbox']");

  for (var i = 0; i < allLegends.length; i++) {
    if (!allLegends[i].checked) {
      chart.toggleSeries(allLegends[i].value);
    }
  }
}

function toggleSeries(checkbox) {
  chart.toggleSeries(checkbox.value);
}

stopBtn.addEventListener("click", function () {
  source.close();
  try {
    chart.updateOptions({
      chart: {
        zoom: {
          type: "y",
          enabled: true,
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
  window.clearInterval(interval);
});
