window.fbAsyncInit = function () {
    FB.init({
        appId: '283280905441186'
        , cookie: true
        , xfbml: true
        , version: 'v2.8'
    });
    FB.AppEvents.logPageView();
};
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
var facebook = angular.module('fb', []);
facebook.service('Facebook', function () {
    return {
        getLoginStatus: function () {
            return new Promise(function (resolve, reject) {
                FB.getLoginStatus(function (response) {
                    resolve(response);
                });
            });
        }
        , login: function () {
            return new Promise(function (resolve, reject) {
                FB.login(function (response) {
                    if (response.status === 'connected') {
                        resolve(response)
                    }
                    else {
                        reject('The person is not logged into this app or we are unable to tell.')
                    }
                }, {
                    scope: 'public_profile,email'
                });
            });
        }
        , getData: function () {
            return new Promise(function (resolve, reject) {
                FB.api('/me',{fields:'last_name,first_name,middle_name,email,gender,birthday,name'}, function (response) {
                    resolve(response)
                });
            });
        }
    }
});