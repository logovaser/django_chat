/**
 * Created by logov on 05-May-17.
 */

let registeredNames = [];

// export function getTemplateAsync(load) {
//     return ['$q', $q => $q(res => {
//         load(function (file) {
//             res(file);
//         });
//     })]
// }
//
// export function getCtrlAsync(load, ...deps) {
//     return [...deps, function (...args) {
//         load(function (file) {
//             file.default.apply(this, args);
//             deps.forEach((dep, i) => {
//                 if (dep === '$scope') args[i].$apply()
//             });
//         });
//     }]
// }

export function regModuleAsync(load) {
    return ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => $q(res => {
        load(data => {
            if (data.default) data = data.default;
            if (!registeredNames.includes(data)) {
                registeredNames.push(data);
                $ocLazyLoad.inject(data);
            }
            res();
        });
    })]
}

export function regComponentAsync(load) {
    return ['$q', $q => $q(res => {
        load(data => {
            let name = data.default.name;
            if (!registeredNames.includes(name)) {
                registeredNames.push(name);
                data.default();
            }
            res()
        });
    })]
}
