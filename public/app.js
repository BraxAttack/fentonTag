'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('fentonTagApp', [
    'firebase',
    'angular-md5',
    'ui.router'/*,
    'ngMaterial',
    'ngMessages'*/
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireSignIn().then(function(auth){
              stype=2;
              $state.go('homepage');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireSignIn().then(function(auth){
              stype=2;
              $state.go('homepage');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('homepage', {
        url: '/homepage',
        controller: 'HomepageCtrl as homepageCtrl',
        templateUrl: 'homepage/homepage.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireSignIn().catch(function(){
              stype=2;
              $state.go('login');
            });
          },
          profile: function ($state, Auth, Users){
            return Auth.$requireSignIn().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function (profile){
                stype=2;
                if(profile.displayName){
                  return profile;
                } else {
                  $state.go('profile');
                }
              });
            }, function(error){
              $state.go('login');
            });
          }
        }

      })
      .state('newsession', {
        url: '/newsession',
        templateUrl: 'newSession/newSession.html',
        controller: 'NewSessionCtrl as newsessionCtrl',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireSignIn().catch(function(){
              $state.go('login');
            });
          },
          profile: function(Users, Auth){
            stype=2;
            return Auth.$requireSignIn().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      .state('newsticker', {
        url: '/newsticker',
        templateUrl: 'newSticker/newSticker.html',
        controller: 'NewStickerCtrl as newstickerCtrl',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireSignIn().catch(function(){
              $state.go('login');
            });
          },
          profile: function(Users, Auth){
            stype=2;
            return Auth.$requireSignIn().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      .state('QRreader', {
        url: '/qrreader',
        templateUrl: 'QRStuff/QRpage.html',
        controller: 'QRStuffCtrl as qrstuffCtrl',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireSignIn().catch(function(){
              $state.go('login');
            });
          },
          profile: function(Users, Auth){
            stype=2;
            return Auth.$requireSignIn().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireSignIn().catch(function(){
              $state.go('login');
            });
          },
          profile: function(Users, Auth){
            stype=2;
            return Auth.$requireSignIn().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })

    $urlRouterProvider.otherwise('/');
  })
  .config(function(){
    // Replace this config with your Firebase's config.
    // Config for your Firebase can be found using the "Web Setup"
    // button on the top right of the Firebase Dashboard in the
    // "Authentication" section.

    var config = {
       apiKey: "AIzaSyDTkhkCHqnczzIq13dBgkYSlIrIHBfp7wM",
       authDomain: "fentontag-c0828.firebaseapp.com",
       databaseURL: "https://fentontag-c0828.firebaseio.com",
       storageBucket: "fentontag-c0828.appspot.com",
       messagingSenderId: "646559029376"
     };

    firebase.initializeApp(config);
  });
