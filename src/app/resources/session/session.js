angular.module('books-manager.resources.Session', ['ngResource'])
    .factory('Session', function($resource) {
        return $resource('/auth/session/');
    });