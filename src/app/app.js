'use strict';
angular.module('books-manager', [
  'templates-app',
  'templates-common',
  'books-manager.home',
  'books-manager.about',
  'ui.router',
  'ngCookies',
  'ngResource',
  'ngSanitize',
])

.config(function myAppConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
})

.run(function run() {})

.controller('AppCtrl', function AppCtrl($scope, $location) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (angular.isDefined(toState.data.pageTitle)) {
      $scope.pageTitle = toState.data.pageTitle + ' | books-manager';
    }
  });
})

;