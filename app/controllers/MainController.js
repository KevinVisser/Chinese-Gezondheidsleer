var app = angular.module('MainController', ['ngRoute', 'myAppRouter'])

app.controller('MainController', ['$route', '$routeParams', '$location', '$scope', function ($route, $routeParams, $location, $scope) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    $scope.addDataModel = new AddDataModel();
    $scope.updateModel = new UpdataDataModel();
    $scope.ZoekenModel = new ZoekenModel();
    $scope.ZoekenKFModel = new ZoekenKFModel();

    $scope.kruidenModel = new KruidenModel();
    $scope.patentFormuleModel = new PatentFormulesModel();
    $scope.kruidenFormuleModel = new KruidenFormulesModel();
    $scope.syndroomModel = new SyndromenModel();
    $scope.symptoomModel = new SymptomenModel();
    $scope.chineseKruidenModel = new ChineseKruidenModel();

    $scope.syndromen = $scope.syndroomModel.GetRelevantData();
    $scope.kruiden = $scope.kruidenModel.GetAllData();
    $scope.chineseKruiden = $scope.chineseKruidenModel.GetAllData();
    $scope.symptomen = $scope.symptoomModel.GetAllData();

    $scope.kruidenFormules = $scope.kruidenFormuleModel.GetRelevantData();
    $scope.patentFormules = $scope.patentFormuleModel.GetRelevantData();

    $scope.querySearch = function (query, type) {
        switch (type) {
            case 'kruid':
                var results = query ? $scope.kruiden.filter(createFilterFor(query, type)) : $scope.kruiden,
                    deferred
                break;
            case 'symptoom':
                var results = query ? $scope.symptomen.filter(createFilterFor(query, type)) : $scope.symptomen,
                    deferred
                break;
            case 'chineesKruid':
                var results = query ? $scope.chineseKruiden.filter(createFilterFor(query, type)) : $scope.chineseKruiden,
                    deferred
                break;
            case 'kruidenformule':
                var results = query ? $scope.kruidenFormules.filter(createFilterFor(query, type)) : $scope.kruidenFormules,
                    deferred
                break;
            case 'patentformule':
                var results = query ? $scope.patentFormules.filter(createFilterFor(query, type)) : $scope.patentFormules,
                    deferred
                break;
            default:
                break;
        }
        return results;
    };

    function createFilterFor(query, type) {
        var lowercaseQuery = query.toLowerCase();

        switch (type) {
            case 'kruid':
                return function filterFn(kruiden) {
                    return (kruiden.Nederlands.toLowerCase().indexOf(lowercaseQuery) === 0);
                };
            case 'symptoom':
                return function filterFn(symptomen) {
                    return (symptomen.Naam.toLowerCase().indexOf(lowercaseQuery) === 0);
                };
            case 'chineesKruid':
                return function filterFn(chineseKruiden) {
                    return (chineseKruiden.Pinjin.toLowerCase().indexOf(lowercaseQuery) === 0);
                };
            case 'kruidenformule':
                return function filterFn(kruidenFormules) {
                    return (kruidenFormules.Naam.toLowerCase().indexOf(lowercaseQuery) === 0);
                };
            case 'patentformule':
                return function filterFn(patentFormules) {
                    return (patentFormules.Pinjin.toLowerCase().indexOf(lowercaseQuery) === 0);
                };
            default:
                break;
        }
    }
}]);