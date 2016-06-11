/**
 * Created by jihad.kherfan on 6/10/2016.
 */
$(document).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat= position.coords.latitude ;
      var lon= position.coords.longitude;
      var appID= 'de0d2ebeb48a8dd2459c399e78b745ca' ;
      $.getJSON("api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID="+appID, function(json) {
        $("#cityName").text(json.name);
      })
    });
  }
});


/* $.getJSON("/json/cats.json", function(json) {
 $(".message").html(JSON.stringify(json));
 }); */