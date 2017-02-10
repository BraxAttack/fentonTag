angular.module('fentonTagApp')
  .controller('QRGenCtrl', function($state, profile, QRGenService, currentPage){
    var qrgenCtrl = this;

    qrgenCtrl.profile = profile;
    qrgenCtrl.currentPage = currentPage;
    console.log(qrgenCtrl.profile);

    qrgenCtrl.QRinfo = QRGenService;

    if(qrgenCtrl.QRinfo.data == ''){
        $state.go("homepage");
    }

    qrgenCtrl.goBack = function() {
          qrgenCtrl.QRinfo.data = '';
          $state.go(qrgenCtrl.currentPage.lastPage);

    }

  });
