angular.module('fentonTagApp')
.controller("IndivSessionCtrl", function($firebaseArray, $http, $state, $timeout, Auth, sessionIndivData, profile, QRGenService, currentPage) {
    var indivsessionCtrl = this;

    var sessionID = sessionIndivData;
    var profileID = profile.$id;
    indivsessionCtrl.QRinfo = QRGenService;
    indivsessionCtrl.currentPage = currentPage;


    var ref = firebase.database().ref('Sessions/'+sessionID);
    var sessionsIndiv = $firebaseArray(ref);

    indivsessionCtrl.sessionID = sessionID;
    indivsessionCtrl.sessionData = sessionsIndiv;

    indivsessionCtrl.isHost= false;

    indivsessionCtrl.checknullfunction = function() {
      if(indivsessionCtrl.sessionData[0] == null){
        $timeout(function () {
          indivsessionCtrl.checknullfunction();
        }, 200);
      }else{
          //checks to see if user is host
          console.log(indivsessionCtrl.sessionData);
          if(indivsessionCtrl.sessionData[2]['$value'] == profileID){
            indivsessionCtrl.isHost= true;
            indivsessionCtrl.QRinfo=QRGenService;
          }
      }
    }

    indivsessionCtrl.ShowQRCode = function() {
      indivsessionCtrl.currentPage.lastPage = sessionID;
      $state.go('sessions.sessionindiv.qrcode');
    }


    indivsessionCtrl.checknullfunction();





})
