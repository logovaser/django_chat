/**
 * Created by logov on 04-May-17.
 */

export default ['$http', '$cookies', '$state', function ($http, $cookies, $state) {

    let user = {
        username: ''
    };

    let setAuth = function (isAuthenticated = true) {
        $cookies.put('isAuthenticated', isAuthenticated);
    };

    let login = function (form, redirect = 'cabinet') {
        $http.post('/ajax/login/', form).then(res => {
            let data = res.data;
            if (data.type === 'success') {
                setAuth();
                angular.copy(res.data.user, user);
                $state.go(redirect);
            }
        });
    };

    let logout = function (redirect = 'login') {
        $http.get('/ajax/logout/').then(res => {
            setAuth(200);
            user.username = '';
            $state.go(redirect);
        });
    };

    let isAuthenticated = function () {
        if (!($cookies.get('isAuthenticated') === 'true')) return false;
        return $http.get('/ajax/check/').then(
            res => {
                $cookies.put('isAuthenticated', res.data.type === 'success');
                angular.copy(res.data.user, user);
            },
            err => {
                $cookies.put('isAuthenticated', 'false');
                throw err;

            });
    };


    isAuthenticated();


    return {
        login,
        logout,
        isAuthenticated,

        user,
    }
}]
