/**
 * Created by jihad.kherfan on 6/10/2016.
 */
var unitC = true;


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
  setInterval(positionC, 600000);// update weather every 10 minutes
  $('.unit').click(function(){
    alert('hello');
    if(unitC === true){
      unitC = false;
      positionC();
    } else {
      unitC = true;
      positionC();
    }
  })
});
function loadWeather(location,woeid){
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: function(){
      if(unitC === true){
        return 'c';
      } else {
        return 'f';
      }
    },
    success: function (weather) {
      var city = weather.city;
      var high = weather.high;
      var low = weather.low;
      var wcode = '<img class ="weathericon" src="img/'+ weather.code +'.png">';
      document.title = city+':'+ weather.temp;
      $('#cityName').text(city);

      $('#dayTemp').text(high);


      $('#nightTemp').text(low);


      $('.weather-icon').html(wcode);
    }
  })
}



/* $.getJSON("/json/cats.json", function(json) {
 $(".message").html(JSON.stringify(json));
 }); */