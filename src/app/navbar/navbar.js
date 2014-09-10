angular.module('books-manager.navbar', [
  'ui.router',
  'books-manager.services.breadcrumbs',
  'books-manager.services.Auth'
])

/**
 * And of course we define a controller for our route.
 */
.controller('NavBarCtrl', function NavBarController($scope, Auth, $rootScope, breadcrumbs) {
  $scope.isAuthenticated = false;

  $rootScope.$watch('currentUser', function(currentUser) {
    $scope.isAuthenticated = !!currentUser;
  });

  $scope.isNavbarActive = function(path) {
    return breadcrumbs.getFirst().name === path;
  };

  $scope.logout = function() {
    Auth.logout(function() {
      angular.noop();
    });
  };
});