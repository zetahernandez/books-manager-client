angular.module('books-manager', [
  'templates-app',
  'templates-common',
  'books-manager.navbar',
  'books-manager.home',
  'books-manager.about',
  'books-manager.login',
  'books-manager.signup',
  'books-manager.upload',
  'books-manager.services.Auth',
  'ui.router',
  'ngLocale',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'http-auth-interceptor'
])

.config(function myAppConfig(/* $stateProvider ,*/ $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
})

.run(function run($rootScope, $location, $state, Auth) {

  //watching the value of the currentUser variable.
  $rootScope.$watch('currentUser', function(currentUser) {
    // if no currentUser and on a page that requires authorization then try to update it
    // will trigger 401s if user does not have a valid session
    if (!currentUser && (['', '/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1)) {
      Auth.currentUser();
    }
  });

  // On catching 401 errors, redirect to the login page.
  $rootScope.$on('event:auth-loginRequired', function() {
    if (['', '/', '/login', '/logout', '/signup', '/home'].indexOf($location.path()) == -1) {
      $state.go('login');
    }

    return false;
  });
})

.controller('AppCtrl', function AppCtrl($scope /*, $location*/) {
  $scope.$on('$stateChangeSuccess', function(/*event,*/ toState/*, toParams, fromState, fromParams*/) {
    if (angular.isDefined(toState.data.pageTitle)) {
      $scope.pageTitle = toState.data.pageTitle + ' | books-manager';
    }
  });
})

;