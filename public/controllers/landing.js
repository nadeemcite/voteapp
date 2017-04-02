app.controller('LandingController', function($scope, Facebook, Modal, $location, $http, $rootScope, $route) {
    $scope.loginWithFb = function(ev) {
        Facebook.login().then(function(response) {
            if (response.status == "connected") {
                Facebook.getData().then(function(fbuser) {
                    console.log(fbuser);
                    Modal.alert('Success', 'Hi ' + fbuser.name, ev).then(function() {
                        console.log('Logged in');
                        $http({
                            url: '/api/login',
                            method: 'POST',
                            data: {
                                email: fbuser.email,
                                social: 'facebook',
                                socialObj: fbuser,
                                name: fbuser.name
                            }
                        }).then(function(response) {
                            console.log(response);
                            if (response.data.token) {
                                $rootScope.token = response.data.token;
                                localStorage.setItem("token",$rootScope.token);
                                $location.path('/votingpanel');
                                $rootScope.socket.emit('userlogin',{email:fbuser.email,name:fbuser.name});
                            }
                            else {
                                Modal.alert('Error', 'Something went Wrong.');
                                $route.reload();
                            }
                        }, function(response) {
                            console.log(response);
                        })
                    });
                }, function(response) {
                    console.log('fb Data', response);
                    Modal.alert('Error', 'Something went Wrong.')
                });
            }
            else {
                Modal.alert('Error', 'Something went Wrong.');
            }

        }, function(response) {
            console.log('fb connect', response);
            Modal.alert('Error', 'Something went Wrong.');
        })
    }
    $scope.loginWithGp = function() {
        console.log('Gp');
    }
});
