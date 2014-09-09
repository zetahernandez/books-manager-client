angular.module('books-manager.resources.Session', ['ngResource'])
    .factory('Session', function($resource) {
        return $resource('/api/auth/session/');
    });