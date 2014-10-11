angular.module('books-manager.resources.Upload', ['ngResource'])
	.factory('Upload', function($resource) {
		return $resource('/api/uploaded/:identifier', {
			identifier: '@id'
		}, {
			'update': {
				method: 'PUT'
			}
		});
	});