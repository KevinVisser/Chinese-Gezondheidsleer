var ChineseGezondheidsleer = angular.module('ChineseGezondheidsleer', [
    'ngMaterial',
    'ngRoute',
    'ngMessages',
    'myAppRouter',
    'MainController',
    'KruidenController',
    'PatentFormulesController',
    'KruidenFormulesController',
    'SyndromenController',
    'KruidenViewController',
    'PatentFormulesViewController',
    'KruidenFormulesViewController',
    'AddDataController',
    'AddKruidController',
    'AddPatentFormuleController',
    'AddKruidenFormuleController',
    'AddSyndromenController',
    'AddSymptoomController',
    'AddChineesKruidController',
    'SyndromenViewController',
    'ChineseKruidenController',
    'ChineseKruidenViewController'
]);

ChineseGezondheidsleer.directive('kruidDirective', function ($q, $timeout) {
    console.log("Hello");
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            let kruidenModel = new KruidenModel();

            ctrl.$asyncValidators.Nederlands = function (modelValue, viewValue) {
                console.log("NEDERLANDS");
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty model valid
                    return $q.resolve();
                }

                var def = $q.defer();

                if (kruidenModel.GetKruidByNederlands(modelValue)) {
                    def.reject();
                } else {
                    def.resolve();
                }

                return def.promise;
            };

            ctrl.$asyncValidators.Latijns = function (modelValue, viewValue) {

                console.log("LATIJNS");
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty model valid
                    return $q.resolve();
                }

                var def = $q.defer();

                if (kruidenModel.GetKruidByLatijns(modelValue)) {
                    def.reject();
                } else {
                    def.resolve();
                }

                return def.promise;
            };
        }
    }
});