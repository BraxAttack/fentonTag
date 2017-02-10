angular.module('fentonTagApp')
.controller("IndivSessionCtrl", function($firebaseArray, $http, $state, $timeout, Auth, sessionIndivData, profile) {
    var indivsessionCtrl = this;

    var sessionID = sessionIndivData;
    var profileID = profile.$id;


    var ref = firebase.database().ref('Sessions/').child(sessionID);
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
          if(indivsessionCtrl.sessionData[2]['$value'] == profileID){
            indivsessionCtrl.isHost= true;
          }
      }
    }

    indivsessionCtrl.checknullfunction();



})
