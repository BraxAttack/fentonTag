angular.module('fentonTagApp')
  .controller('NewSessionCtrl', function($state, $timeout, Auth, Users, profile, currentPage, Stickers){
    var newsessionCtrl = this;

    newsessionCtrl.profile = profile;
    newsessionCtrl.stickers = Stickers;

    newsessionCtrl.GameTypes = [
          "Hunting and Gathering",
          "Other Option",
          "Another One",
          "Still Going"
      ];


    newsessionCtrl.gameType = "Hunting and Gathering";

    newsessionCtrl.gameDurr = 15;


    //MAPS API key
    //AIzaSyBemv7awP5b7YQcGhFgQb--v1BUo-Eacy0

    newsessionCtrl.initMap = function(latVar, lngVar) {
      var uluru = {lat: latVar, lng: lngVar};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru
      });

      var centerIcon = {
          url: '../images/mylocation.png',
          scaledSize: new google.maps.Size(50, 50), // scaled size


      }

     marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: centerIcon
      });


      for (i = 0; i < newsessionCtrl.stickers.length; i++) {
          //console.log(newsessionCtrl.stickers[i]['lat']);
          var uluru = {lat: newsessionCtrl.stickers[i]['lat'], lng: newsessionCtrl.stickers[i]['lng']};
          marker = new google.maps.Marker({
                   position: uluru,
                   map: map

        })
      };
/*      marker = new google.maps.Marker({
         position: uluru,
         map: map,
         icon: centerIcon
       });
  */


    }

    newsessionCtrl.getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(newsessionCtrl.showLatLng, newsessionCtrl.showError);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

      newsessionCtrl.showLatLng = function(position) {
      console.log(" " + position.coords.latitude + " / " + position.coords.longitude);
      newsessionCtrl.lat = position.coords.latitude;
      newsessionCtrl.lng = position.coords.longitude;
      //initializes the google map
      newsessionCtrl.initMap(newsessionCtrl.lat, newsessionCtrl.lng);
      }

      newsessionCtrl.showError = function(error) {
          switch(error.code) {
              case error.PERMISSION_DENIED:
                  console.log("User denied the request for Geolocation.");
                  break;
              case error.POSITION_UNAVAILABLE:
                  console.log("Location information is unavailable.");
                  break;
              case error.TIMEOUT:
                  console.log("The request to get user location timed out.");
                  break;
              case error.UNKNOWN_ERROR:
                  console.log("An unknown error occurred.");
                  break;
          }
      }

      //calls location getting function
      newsessionCtrl.getLocation();


    newsessionCtrl.updateProfile = function(){
      newsessionCtrl.profile.emailHash = md5.createHash(auth.email);
      newsessionCtrl.profile.$save().then(function(){
        $state.go('homepage');
      });
    };
  });
