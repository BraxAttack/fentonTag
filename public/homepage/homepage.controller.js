angular.module('fentonTagApp')
  .controller('HomepageCtrl', function($state, $mdDialog, Auth, Users, profile, currentPage){
    var homepageCtrl = this;


    homepageCtrl.currentPage = currentPage;

    homepageCtrl.currentPage.add("Homepage");

    homepageCtrl.profile = profile;

    homepageCtrl.userProfile = firebase.auth().currentUser;

    homepageCtrl.user = {
      firstname: 'B',
      lastname: 'Y',
      email: '@'
    };




    homepageCtrl.logout = function(){
        var confirm = $mdDialog.confirm()
              .title('Are you sure you want to Log Out?')
              .textContent('')
              .ariaLabel('TutorialsPoint.com')
              .targetEvent(event)
              .ok('Yes')
              .cancel('No');
              $mdDialog.show(confirm).then(function() {
                    Auth.$signOut().then(function(){
                      $state.go('login');
                    });
                 }, function() {
                    return
              });
    };

  });
