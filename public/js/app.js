var app = angular.module('myapp', ['ngRoute', 'ngMaterial', 'fb','gp']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/landing.html',
        controller: 'LandingController'
    }).when('/votingpanel', {
        templateUrl: 'views/panel.html',
        controller: 'VotingPanelController'
    }).when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultController'
    }).otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
});
app.controller('ResultController',function($rootScope,$scope,$http){
    $rootScope.socket.connect();
    $rootScope.socket.on('logged',function(data){
        console.log(data)
    });
    $http({
        url:'api/votes'
    }).then(function(response){
    
        $scope.movies=response.data.data;
    });
    $rootScope.socket.on('votedata',function(data){
        console.log(data)
        $scope.movies=data;
        $scope.$apply();
    });
});
app.run(function($rootScope,$location){
    $rootScope.socket=io.connect();
    if(localStorage.getItem("token")!==null){
        $rootScope.token=localStorage.getItem("token");
        
    }else{
        $location.path('/');
    }
    $rootScope.logOut=function(){
        localStorage.removeItem('token');
        $location.path('/');
    }
})