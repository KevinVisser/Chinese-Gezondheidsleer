var app = angular.module('PatentFormulesViewController', ['ngRoute', 'myAppRouter'])

app.controller('PatentFormulesViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.PatentFormulesModel = new PatentFormulesModel();

    $scope.patentformules = $scope.PatentFormulesModel.GetSpecificData($routeParams.PatentFormuleId);
    $scope.chineseKruiden = $scope.PatentFormulesModel.GetKruidData($routeParams.PatentFormuleId);

    $scope.GoToView = function () {
        $location.path('/PatentFormules')
    }
}]);