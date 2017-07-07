/**
 * Created by Artem on 06.07.2017.
 */

export default function ($httpProvider) {
    $httpProvider.interceptors.push(['$q', '$cookies', function ($q, $cookies) {

        function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }

        return {
            'request': function (config) {
                let csrftoken = $cookies.get('csrftoken');
                if (!csrfSafeMethod(config.method)) {
                    config.headers['X-CSRFToken'] = csrftoken;
                }
                return config;
            }
        };
    }]);
}
