angular.module('books-manager.resources.Upload', ['ngResource'])
	.factory('Upload', function($resource) {
		return $resource('/api/upload/:identifier', {
			identifier: '@id'
		}, {
			'update': {
				method: 'PUT'
			}
		});
	});