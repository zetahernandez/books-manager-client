angular.module('books-manager.resources.User', ['ngResource'])
  .factory('User', function($resource) {
    return $resource('/api/auth/users/:id/', {}, {
      'update': {
        method: 'PUT'
      }
    });
  });