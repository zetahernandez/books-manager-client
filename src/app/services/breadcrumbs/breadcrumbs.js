angular.module('books-manager.services.breadcrumbs', [])

.factory('breadcrumbs', function Auth($location, $rootScope) {
  var breadcrumbs = [];
  var breadcrumbsService = {};

  //we want to update breadcrumbs only when a route is actually changed
  //as $location.path() will get updated imediatelly (even if route change fails!)
  $rootScope.$on('$stateChangeStart', function() {

    var pathElements = $location.path().split('/'),
      result = [],
      i;
    var breadcrumbPath = function(index) {
      return '/' + (pathElements.slice(0, index + 1)).join('/');
    };

    pathElements.shift();
    for (i = 0; i < pathElements.length; i++) {
      result.push({
        'name': pathElements[i],
        'path': breadcrumbPath(i)
      });
    }

    breadcrumbs = result;
  });

  breadcrumbsService.getAll = function() {
    console.log(breadcrumbs);
    return breadcrumbs;
  };

  breadcrumbsService.getFirst = function() {
    return breadcrumbs[0] || {};
  };

  return breadcrumbsService;
});