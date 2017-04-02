app.controller('VotingPanelController', function($scope, $http, $rootScope, $q, $mdToast, Modal, $window) {
    $window.onbeforeunload = function() {
        $rootScope.socket.emit('logout');
    };
    $scope.movies = [{
        'title': 'Beauty and the Beast',
        'Distributor': 'Disney',
        'Worldwide_gross': '$766,516,842'
    }, {
        'title': 'Logan',
        'Distributor': '20th Century Fox',
        'Worldwide_gross': '$569,901,411'
    }, {
        'title': 'Kong: Skull Island',
        'Distributor': 'Warner Bros',
        'Worldwide_gross': '$397,948,204'
    }, {
        'title': 'Fifty Shades Darker',
        'Distributor': 'Universal',
        'Worldwide_gross': '$377,898,465'
    }, {
        'title': 'xXx: Return of Xander Cage',
        'Distributor': 'Paramount',
        'Worldwide_gross': '$346,302,504'
    }, {
        'title': 'The Great Wall',
        'Distributor': 'Universal',
        'Worldwide_gross': '$330,500,000'
    }, {
        'title': 'Resident Evil: The Final Chapter',
        'Distributor': 'Sony Pictures',
        'Worldwide_gross': '$312,300,000'
    }, {
        'title': 'The Lego Batman Movie',
        'Distributor': 'Warner Bros',
        'Worldwide_gross': '$293,526,563'
    }, {
        'title': 'Split',
        'Distributor': 'Universal',
        'Worldwide_gross': '$265,387,059'
    }, {
        'title': 'The Boss Baby',
        'Distributor': 'DreamWorks',
        'Worldwide_gross': '$254,212,245'
    }];

    function getmovieData(name) {
        return $q(function(resolve, reject) {
            $http({
                url: 'http://www.omdbapi.com/',
                params: {
                    s: name
                },
                method: 'GET'
            }).then(function(response) {
                //console.log(response)
                if (response.data.Search) {
                    var imagepath = response.data.Search[0].Poster;
                    resolve(imagepath);
                }
                else {
                    reject('not found')
                }
            }, function(resp) {
                reject(resp);
            })
        });
    }
    $scope.movies.map(function(item) {
        getmovieData(item.title).then(function(img) {
            item.image = img;
        }, function(resp) {
            item.image = 'n/a';
            console.log(resp)
        });
        return item;
    })
    $scope.voteMovie = function(movie) {
        $http({
            url: '/api/vote',
            method: 'POST',
            headers: {
                'token': $rootScope.token
            },
            data: {
                movie: movie
            }
        }).then(function(response) {
            if (response.data.success) {
                Modal.toast('Vote Recorded!');
                $rootScope.socket.emit('newvote', {
                    vote: '1'
                });
            }
            else {
                Modal.toast(response.data.msg)
            }
            console.log(response);
        }, function(response) {
            console.log(response);
        });
    }
    $scope.showImdb = function(movie) {
        Modal.imdb(movie)
    }
    $scope.global = $rootScope;
});
