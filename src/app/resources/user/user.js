angular.module('books-manager.resources.User', ['ngResource'])
    .factory('User', function($resource) {
        return $resource('/auth/users/:id/', {}, {
            'update': {
                method: 'PUT'
            }
        });
    });