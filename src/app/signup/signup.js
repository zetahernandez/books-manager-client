  angular.module( 'books-manager.signup', [
    'ui.router',
    'books-manager.services.Auth'
  ])

  /**
   * Each section or module of the site can also have its own routes. AngularJS
   * will handle ensuring they are all available at run-time, but splitting it
   * this way makes each module more "self-contained".
   */
  .config(function config( $stateProvider ) {
    $stateProvider.state( 'signup', {
      url: '/signup',
      views: {
        "navbar": {
          controller: 'NavBarCtrl',
          templateUrl: 'navbar/navbar.tpl.html'
        },
        "main": {
          controller: 'SignUpCtrl',
          templateUrl: 'signup/signup.tpl.html'
        }
      },
      data:{ pageTitle: 'Signup' }
    });
  })
  /**
   * And of course we define a controller for our route.
   */
  .controller( 'SignUpCtrl', function SignUpController( $scope, Auth, $location ) {
      $scope.register = function(form) {
        Auth.createUser({
            email: $scope.user.email,
            name: $scope.user.username,
            username: $scope.user.username,
            password: $scope.user.password
          },
          function(err) {
            $scope.errors = {};

            if (!err) {
              $location.path('/');
            } else {
              angular.forEach(err.errors, function(error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.type;
              });
            }
          }
        );
      };
    });