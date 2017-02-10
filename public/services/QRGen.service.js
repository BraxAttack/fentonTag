angular.module('fentonTagApp')
  .factory('QRGenService', function(){

    var qrData = {
      version: '4',
      errorL: 'M',
      size: '245',
      data: 'xzc'
    }


    return qrData;
  });
