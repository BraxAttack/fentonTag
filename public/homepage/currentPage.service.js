angular.module('fentonTagApp')
  .factory('currentPage', function(){
    var currentPage = {};

    currentPage.pageVar = 'blooba';
    currentPage.iconVar = 'blooba';

    currentPage.lastPage = "null";
    currentPage.lat = "null";
    currentPage.lng = "null";
    //console.log(currentPage.pageVar);

    currentPage.add = function(pageName) {
        //console.log(currentPage.pageVar);
        currentPage.pageVar = pageName
        //console.log(currentPage.pageVar);
    }



    return currentPage;
  });
