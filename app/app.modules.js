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
    'SyndromenViewController'
]);

ChineseGezondheidsleer.config(function ($mdIconProvider) {
    $mdIconProvider
        .iconSet('delete', './assets/icons/delete.svg', 24)
        .iconSet('edit', './assets/icons/edit.svg', 24)
});

ChineseGezondheidsleer.directive('kruidDirective', function ($q, $timeout) {
    console.log("Hello");
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            let kruidenModel = new KruidenModel();

            ctrl.$asyncValidators.Nederlands = function (modelValue, viewValue) {
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

ChineseGezondheidsleer.directive('patentformuleDirective', function ($q, $timeout) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            let patentFormuleModel = new PatentFormulesModel();

            ctrl.$asyncValidators.Nederlands = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty model valid
                    return $q.resolve();
                }

                var def = $q.defer();

                if (patentFormuleModel.GetPatentFormuleByNederlands(modelValue)) {
                    def.reject();
                } else {
                    def.resolve();
                }

                return def.promise;
            };

            ctrl.$asyncValidators.Engels = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty model valid
                    return $q.resolve();
                }

                var def = $q.defer();

                if (patentFormuleModel.GetPatentFormuleByEngels(modelValue)) {
                    def.reject();
                } else {
                    def.resolve();
                }

                return def.promise;
            };

            ctrl.$asyncValidators.Pinjin = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty model valid
                    return $q.resolve();
                }

                var def = $q.defer();

                if (patentFormuleModel.GetPatentFormuleByPinjin(modelValue)) {
                    def.reject();
                } else {
                    def.resolve();
                }

                return def.promise;
            };
        }
    }
});

ChineseGezondheidsleer.directive('kruidenformuleDirective', function ($q, $timeout) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            let kruidenFormuleModel = new KruidenFormulesModel();

            ctrl.$asyncValidators.Naam = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty model valid
                    return $q.resolve();
                }

                var def = $q.defer();

                if (kruidenFormuleModel.GetKruidenFormuleByNaam(modelValue)) {
                    def.reject();
                } else {
                    def.resolve();
                }

                return def.promise;
            };
        }
    }
});

ChineseGezondheidsleer.directive('chineesKruidDirective', function ($q, $timeout) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            let model = new ChineseKruidenModel();
            ctrl.$asyncValidators.Latijn = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty model valid
                    return $q.resolve();
                }

                var def = $q.defer();

                if (model.GetKruidByLatijn(modelValue)) {
                    def.reject();
                } else {
                    def.resolve();
                }

                return def.promise;
            };
        }
    }
});

ChineseGezondheidsleer.directive('symptoomDirective', function ($q, $timeout) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            let model = new SymptomenModel();
            ctrl.$asyncValidators.Naam = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty model valid
                    return $q.resolve();
                }

                var def = $q.defer();

                if (model.GetSymptoomByNaam(modelValue)) {
                    def.reject();
                } else {
                    def.resolve();
                }

                return def.promise;
            };
        }
    }
});