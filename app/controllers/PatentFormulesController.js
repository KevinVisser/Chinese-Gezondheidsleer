var app = angular.module('PatentFormulesController', ['ngRoute', 'myAppRouter'])

app.controller('PatentFormulesController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    this.PatentFormulesModel = new PatentFormulesModel();

    $scope.patentFormules = this.PatentFormulesModel.GetRelevantData();

    $scope.GoToView = function (id) {
        $location.path('/PatentFormules/' + id)
    }
}]);