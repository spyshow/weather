/**
 * Created by jihad.kherfan on 6/10/2016.
 */
var unitC = true;
var ctx = $("#myChart");
function loadWeather(location,woeid){
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: (function(){
      if(unitC === true){
        return 'c';
      } else {
        return 'f';
      }
    })(),
    success: function (weather) {

      // start chart

      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          showScale: false,
          labels: [weather.forecast[0].day,weather.forecast[1].day, weather.forecast[2].day, weather.forecast[3].day, weather.forecast[4].day],
          datasets: [
            {
              label: "low temp",
              fill: true,
              lineTension: 0.1,
              backgroundColor: "#85ECFF",
              borderColor: "#85ECFF",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "#85ECFF",
              pointBackgroundColor: "#85ECFF",
              pointBorderWidth: 5,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "white",
              pointHoverBorderColor: "white",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [weather.forecast[0].low,weather.forecast[1].low, weather.forecast[2].low, weather.forecast[3].low, weather.forecast[4].low],
              spanGaps: false,

            },{
              label: "high temp",
              fill: true,
              lineTension: 0.1,
              backgroundColor: "white",
              borderColor: "white",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "#85ECFF",
              pointBackgroundColor: "#85ECFF",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#85ECFF",
              pointHoverBorderColor: "#85ECFF",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [weather.forecast[0].high , weather.forecast[1].high, weather.forecast[2].high, weather.forecast[3].high, weather.forecast[4].high],
              spanGaps: false,

            }

          ]
        },// end of data

        options: {
          title: {
            display: false
          },
          legend: {
            display: false
          },
          scales: {
            showScale: false,
            yAxes: [{
              display: false,
              color : '#f39c12',
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }// end of option


      });

      // end chart

      var city = weather.city;
      var high = weather.high;
      var low = weather.low;
      var wcode = '<img class ="weathericon" src="img/'+ weather.code +'.png">';
      document.title = city+':'+ weather.temp;
      $('#cityName').text(city);
      $('#dayTemp').html(high+'<span class="temp">'+weather.units.temp+'</span>');
      $('#nightTemp').html(low+'<span class="temp">'+weather.units.temp+'</span>');
      $('.weather-icon').html(wcode);
      if((weather.temp > 25 && weather.units.temp === 'C') || (weather.temp > 77 && weather.units.temp === 'F')) {
        $('.weather-board').animate({backgroundColor: '#f1c40f'}, 1500);
        $('.outer-1').animate({borderColor: '#f39c12'}, 100);
        $('.outer-1').animate({backgroundColor: '#f39c12'}, 100);
        $('.inner-1').animate({backgroundColor: '#e67e22'}, 100);
        $('.inner-1').animate({borderColor: '#e67e22'}, 100);
        $('.inner-2').animate({backgroundColor: '#d35400'}, 100);
        $('.inner-2').animate({borderColor: '#d35400'}, 100);
        $('#nightTemp').animate({color: '#f39c12'}, 100);
        $('#nightTemp').css('text-shadow','0 0 8px #f39c12');
        $(".my-btn:hover").css("color","#f39c12");
        $('.my-btn:active').css("color","#f39c12");
      } else {
        $('.weather-board').animate({backgroundColor: '#C8F7FF'}, 1500);
      }
      myChart.update();
    }
  })
}

$(document).ready(function() {

  function positionC () {
    if (Navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        loadWeather(position.coords.latitude + ',' + position.coords.longitude);
      });
    } else {
      loadWeather("Homs, SY", "");
    }
  }
  positionC();
  setInterval(loadWeather, 600000);// update weather every 10 minutes
  $('.unit').click(function(){
    if(unitC === true){
      unitC = false;

      positionC();

    } else {
      unitC = true;
      $(".Chart").html('');
      positionC();

    }
  })

});


/* $.getJSON("/json/cats.json", function(json) {
 $(".message").html(JSON.stringify(json));
 }); */