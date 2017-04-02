app.service('Modal', function($mdDialog, $mdToast,$timeout,$rootScope) {
    return {
        alert: function(title, msg, event) {
            return $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('body')))
                .clickOutsideToClose(false)
                .title(title)
                .textContent(msg)
                .ariaLabel('Alert Dialog Demo')
                .ok('Ok')
                .targetEvent(event)
            );
        },
        toast: function(text) {
            
            $mdToast.show(
                $mdToast.simple()
                .textContent(text)
                .position('bottom right')
                .hideDelay(3000)
            );
            
        },
        imdb: function(movie) {
            $mdDialog.show({
                    templateUrl: 'components/imdb.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        }
    }
})
