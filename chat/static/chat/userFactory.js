/**
 * Created by logov on 04-May-17.
 */

export default ['$http', '$cookies', function ($http, $cookies) {

    let setAuth = function () {
        $cookies.put('isAuthenticated', 'true');
    };

    let isAuthenticated = function () {
        if (!($cookies.get('isAuthenticated') === 'true')) return false;
        return $http.get('/ajax/check/').then(
            res => {
                $cookies.put('isAuthenticated', res.data.type === 'success');
            },
            err => {
                $cookies.put('isAuthenticated', 'false');
                throw err;

            });
    };

    return {
        isAuthenticated,
        setAuth,
    }
}]
