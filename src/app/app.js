angular.module('books-manager', [
  'templates-app',
  'templates-common',
  'books-manager.home',
  'books-manager.about',
  'books-manager.services.Auth',
  'ui.router',
  'ngLocale',
  'ngCookies',
  'ngResource',
  'ngSanitize'
])

.config(function myAppConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
})

.run(function run($rootScope, $location, Auth) {

  //watching the value of the currentUser variable.
  $rootScope.$watch('currentUser', function(currentUser) {
    // if no currentUser and on a page that requires authorization then try to update it
    // will trigger 401s if user does not have a valid session
    if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1)) {
      Auth.currentUser();
    }
  });
  
  // On catching 401 errors, redirect to the login page.
  $rootScope.$on('event:auth-loginRequired', function() {
    $location.path('/login');
    return false;
  });
})

.controller('AppCtrl', function AppCtrl($scope, $location) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (angular.isDefined(toState.data.pageTitle)) {
      $scope.pageTitle = toState.data.pageTitle + ' | books-manager';
    }
  });
})

;