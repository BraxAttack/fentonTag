angular.module('fentonTagApp')
  .factory('Stickers', function($firebaseArray){

    var ref = firebase.database().ref('/Stickers');
    var stickers = $firebaseArray(ref);

    return stickers;
  });
