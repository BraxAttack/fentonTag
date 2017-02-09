angular.module('fentonTagApp')
  .factory('Auth', function($firebaseAuth){
    var auth = $firebaseAuth();

    return auth;
  });
