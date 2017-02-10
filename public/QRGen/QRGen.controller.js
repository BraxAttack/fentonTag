angular.module('fentonTagApp')
  .controller('QRGenCtrl', function($state, $window, $interval, Auth, Users, profile, currentPage, Stickers){
    var qrstuffCtrl = this;

    qrstuffCtrl.profile = profile;
    qrstuffCtrl.currentPage = currentPage;
    console.log(qrstuffCtrl.currentPage);


    qrstuffCtrl.result = "";




  });
