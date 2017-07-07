/**
 * Created by logov on 05-May-17.
 */

export function getTemplateAsync(load) {
    return ['$q', $q => $q(res => {
        load(function (file) {
            res(file);
        });
    })]
}

export function getCtrlAsync(load, ...deps) {
    return [...deps, function (...args) {
        load(function (file) {
            file.default.apply(this, args);
            deps.forEach((dep, i) => {
                if (dep === '$scope') args[i].$apply()
            });
        });
    }]
}

export function redirectToLoginIfNotAuth($state, userFactory) {
    let auth = userFactory.isAuthenticated();
    if (auth) auth.then(() => {
        },
        () => {
            $state.go('login')
        }).catch(() => {
        $state.go('login')
    });
    else $state.go('login');
}
