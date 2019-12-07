var app = angular.module('KruidenFormulesController', ['ngRoute', 'myAppRouter'])

app.controller('KruidenFormulesController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    this.KruidenFormulesModel = new KruidenFormulesModel();

    $scope.kruidenFormules = this.KruidenFormulesModel.GetRelevantData();

    $scope.GoToView = function (id) {
        $location.path('/KruidenFormules/' + id)
    }
}]);