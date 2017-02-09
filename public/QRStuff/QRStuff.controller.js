angular.module('fentonTagApp')
  .controller('QRStuffCtrl', function($state, $window, $interval, Auth, Users, profile, currentPage, Stickers){
    var qrstuffCtrl = this;

    qrstuffCtrl.profile = profile;

    qrstuffCtrl.result = "";

    //initates qr reading
    load()

    qrstuffCtrl.audio = new Audio('../sounds/coin-drop-4.mp3');
    //qrstuffCtrl.audio.play();

    //initialize when page is loaded
    qrstuffCtrl.initQRpage = function() {
      qrstuffCtrl.StartCheckInputVar();
      setimg();
      setwebcam2();


    }


    qrstuffCtrl.playCoinSound = function() {
      //var audio = new Audio('../sounds/coin-drop-4.mp3');
      qrstuffCtrl.audio.play();
       $state.go('homepage');





    }

    qrstuffCtrl.StartCheckInputVar = function () {
      console.log("start");
      qrstuffCtrl.intervalPromise = $interval(qrstuffCtrl.checkInputVar , 250);

    };


    qrstuffCtrl.cancelInputVar = function () {
      $interval.cancel(qrstuffCtrl.intervalPromise);
    }

    qrstuffCtrl.checkInputVar = function () {

        var inputVal = angular.element('#resultInput').val();
        
        if(inputVal != "null") {
          //lets user know it was taken
          //$window.alert("hello");
          qrstuffCtrl.playCoinSound();
          qrstuffCtrl.cancelInputVar();
          //stops the qr reader from firing the entire time
          setimg();
          $state.go('homepage');
          console.log(inputVal);
        }
      }

      //qrstuffCtrl.StartCheckInputVar();
      qrstuffCtrl.initQRpage();


  });
