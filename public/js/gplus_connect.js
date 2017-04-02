var google = angular.module('gp', []);
google.service('Google', function () {
    return {
        onSignIn: function () {
            return new Promise(function (resolve, reject) {
                gapi.load('auth2', function () {
                    auth2 = gapi.auth2.init({
                        client_id: '657338097274-pj7aba10149ed0uv2snhgg534gmvqdeo.apps.googleusercontent.com'
                        , fetch_basic_profile: true
                        , scope: 'profile'
                    });
                    auth2.signIn().then(function () {
                        var profile = auth2.currentUser.get().getBasicProfile();
                        var obj = {
                            id: profile.getId()
                            , name: profile.getName()
                            , firstName: profile.getGivenName()
                            , lastName: profile.getFamilyName()
                            , email: profile.getEmail()
                        }
                        resolve(obj)
                    });
                });
            });
        }
    }
});