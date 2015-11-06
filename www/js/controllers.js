angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $http) {

  $scope.page = 1;
  $scope.Booklists = [];
  $scope.search = { key: "" };


  $scope.searchBooks = function() {
    $scope.page++;
    console.log('key: ' + $scope.search.key);
    console.log('PAGE: ' + $scope.page);
    $scope.Booklists = [];
    $scope.loadPage();
  };

  $scope.loadMore = function() {
    $scope.page++;
    console.log('key: ' + $scope.search.key);
    console.log('PAGE: ' + $scope.page);
    $scope.loadPage();
  };

  $scope.loadPage = function() {
    var url = 'http://it-ebooks-api.info/v1/search/' + $scope.search.key + '/page/';
    console.log('Call API v1/search/top');
    console.log('key: ' + $scope.search.key);
    console.log(url + $scope.page);
    $scope.showSpinner = true;
    $http({
      method: 'GET',
      url: url + $scope.page
    }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          // console.info(response);
          var arEbooks = response.data.Books;
          if (arEbooks) {
            for (var i = 0; i < arEbooks.length; i++) {
              $scope.Booklists.push({ title: arEbooks[i].Title, id: arEbooks[i].ID, imageUrl: arEbooks[i].Image });
            }
            $scope.showSpinner = false;
          }
          else {
            console.log('ERRO 1!');
            $scope.showSpinner = false;
          }
          console.info(response.data);
          console.info($scope.Booklists);
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('ERRO!');
    });
  };

  $scope.loadPage();

})

.controller('PlaylistCtrl', function($http, $scope, $stateParams) {

  $scope.showSpinner = true;

  $scope.exLink = function (){
    window.open(encodeURI($scope.book.Download), '_system', 'location=yes');
  };

  $http({
    method: 'GET',
    url: 'http://it-ebooks-api.info/v1/book/' + $stateParams.playlistId
  }).then(function successCallback(response) {
        var book = response.data;
        if (book) {
            $scope.book = book;
        }
        $scope.showDetailPage = true;
        $scope.showSpinner = false;

        console.info('Book', $scope.book);

  }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log('ERRO! Falhou XHR');
      $scope.showSpinner = false;
  });

});
