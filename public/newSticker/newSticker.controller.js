
angular.module('fentonTagApp')
  .controller('NewStickerCtrl', function($state, $window, $interval, $timeout, Auth, Users, profile, currentPage, Stickers){
    var newstickerCtrl = this;

    newstickerCtrl.profile = profile;
    newstickerCtrl.stickers = Stickers;
    newstickerCtrl.currentPage = currentPage;

    newstickerCtrl.stickerIDNumber = "";



    newstickerCtrl.getNewStickerQR = function(){
      newstickerCtrl.getLocation();
      if(newstickerCtrl.currentPage.lat == 'null') {
          $timeout(function () {
            newstickerCtrl.getNewStickerQR();
          }, 200);
      }else{
          console.log("got it");
          newstickerCtrl.currentPage.lastPage = "newsticker";
          $state.go('QRreader');
      }

    }

    //MAPS API key
    //AIzaSyBemv7awP5b7YQcGhFgQb--v1BUo-Eacy0


    newstickerCtrl.getLocation = function() {
        if (navigator && navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(newstickerCtrl.successCallback, newstickerCtrl.errorCallback);
         } else {
             console.log('Geolocation is not supported');
         }
     }

      newstickerCtrl.errorCallback = function() {}
      newstickerCtrl.successCallback = function(position) {
           //newstickerCtrl.lat = position.coords.latitude;
           //newstickerCtrl.lng = position.coords.longitude;
           newstickerCtrl.currentPage.lat = position.coords.latitude;
           newstickerCtrl.currentPage.lng = position.coords.longitude;

       }




/*



    newstickerCtrl.initSticker = function() {

      if(newstickerCtrl.stickerIDNumber.length > 10) {

        newstickerCtrl.getLocation();

        if( newstickerCtrl.lat == null) {
          $timeout(function () {
            newstickerCtrl.initSticker();
            //alert(newstickerCtrl.lat);
          }, 100);
        }else{
          //alert(newstickerCtrl.lat);
          var updates = {};
          newstickerCtrl.stickerData = {
            lat: newstickerCtrl.lat,
            lng: newstickerCtrl.lng
          };
          updates['/Stickers/' + newstickerCtrl.stickerIDNumber ] = newstickerCtrl.stickerData;
          firebase.database().ref().update(updates);

          newstickerCtrl.stickerIDNumber = "";
          newstickerCtrl.stickerData = "";



          //alert("tag logged")
          $timeout(function () {
              //$window.location.reload();
          }, 10);
          alert("tag logged")

          //$state.go('homepage');

        }


      }else{
        alert("too short")

      };

    }




    newstickerCtrl.updateProfile = function(){
      newstickerCtrl.profile.emailHash = md5.createHash(auth.email);
      newstickerCtrl.profile.$save().then(function(){
        $state.go('homepage');
      });
    };

    */
  });
