angular.module('fentonTagApp')
  .controller('SessionsCtrl', function($state, md5, auth, profile){
    var sessionsCtrl = this;

    sessionsCtrl.profile = profile;

    sessionsCtrl.updateProfile = function(){
      sessionsCtrl.profile.emailHash = md5.createHash(auth.email);
      sessionsCtrl.profile.$save().then(function(){
        $state.go('homepage');
      });
    };
  });
