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

    newsessionCtrl.playRadius = .5;


    //MAPS API key
    //AIzaSyBemv7awP5b7YQcGhFgQb--v1BUo-Eacy0

    newsessionCtrl.initMap = function(latVar, lngVar) {
      var uluru = {lat: latVar, lng: lngVar};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
      }),

      circle  = new google.maps.Circle({
                  map:map,
                  center:map.getCenter(),
                  radius:newsessionCtrl.playRadius*1000,
                  strokeColor: '#4CAF50',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: '#4CAF50',
                  fillOpacity: 0.35
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

      newsessionCtrl.sessionStickers = [];
      //console.log(newsessionCtrl.stickers.length);

      for (i = 0; i < newsessionCtrl.stickers.length; i++) {
          //console.log(newsessionCtrl.stickers[i]['$id']);
          //console.log(newsessionCtrl.calcCrow(latVar,lngVar,newsessionCtrl.stickers[i]['lat'],newsessionCtrl.stickers[i]['lng']).toFixed(1));
          if((newsessionCtrl.calcCrow(latVar,lngVar,newsessionCtrl.stickers[i]['lat'],newsessionCtrl.stickers[i]['lng']).toFixed(1)) < newsessionCtrl.playRadius) {
            newsessionCtrl.sessionStickers.push(newsessionCtrl.stickers[i]['$id']);
            var uluru = {lat: newsessionCtrl.stickers[i]['lat'], lng: newsessionCtrl.stickers[i]['lng']};
            marker = new google.maps.Marker({
                     position: uluru,
                     map: map

          })
        }
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
      //console.log(" " + position.coords.latitude + " / " + position.coords.longitude);
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


      newsessionCtrl.createProject = function() {
        //alert("start");

          var sessionKey = firebase.database().ref('Sessions/').push().key;
          var sessionUpdates = {};

          newsessionCtrl.sessionOptions = {
            gameType: newsessionCtrl.gameType,
            gameLength: newsessionCtrl.gameDurr,
            radius: 1,
            originlat: newsessionCtrl.lat,
            originlng: newsessionCtrl.lng,
            seshStickers: newsessionCtrl.sessionStickers,
            host: newsessionCtrl.profile["$id"]

          };
          console.log(newsessionCtrl.sessionOptions);

          sessionUpdates['/Sessions/' + sessionKey] = newsessionCtrl.sessionOptions;
          firebase.database().ref().update(sessionUpdates)
          .then(function(ref){
            console.log(ref);
            $state.go('homepage');

          })

      };



      //calc distance
      //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)

      newsessionCtrl.calcCrow = function(lat1, lon1, lat2, lon2)
      {
        var R = 6371; // km
        var dLat = newsessionCtrl.toRad(lat2-lat1);
        var dLon = newsessionCtrl.toRad(lon2-lon1);
        var lat1 = newsessionCtrl.toRad(lat1);
        var lat2 = newsessionCtrl.toRad(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d;
      }

      // Converts numeric degrees to radians
      newsessionCtrl.toRad = function(Value)
      {
          return Value * Math.PI / 180;
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
