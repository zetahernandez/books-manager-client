  angular.module('books-manager.upload', [
    'ui.router',
    'flow',
    'bytesFilter',
    'books-manager.services.Auth',
    'books-manager.resources.Upload'
  ])

  /**
   * Each section or module of the site can also have its own routes. AngularJS
   * will handle ensuring they are all available at run-time, but splitting it
   * this way makes each module more "self-contained".
   */
  .config(function config($stateProvider, flowFactoryProvider) {
    $stateProvider.state('upload', {
      url: '/upload',
      views: {
        "navbar": {
          controller: 'NavBarCtrl',
          templateUrl: 'navbar/navbar.tpl.html'
        },
        "main": {
          controller: 'UploadCtrl',
          templateUrl: 'upload/upload.tpl.html'
        }
      },
      data: {
        pageTitle: 'upload'
      }
    });

    flowFactoryProvider.defaults = {
      target: '/api/upload',
      permanentErrors: [404, 500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 4
    };
    // flowFactoryProvider.on('catchAll', function(event) {
    //   console.log('catchAll', arguments);
    // });
  })



  /**
   * And of course we define a controller for our route.
   */
  .controller('UploadCtrl', function UploadController($scope, Auth, $location, Upload) {
    $scope.successUpload = function(flowFile, message) {
      console.log(flowFile);
      Upload.get({identifier: flowFile.uniqueIdentifier},function() {});
    };
  });