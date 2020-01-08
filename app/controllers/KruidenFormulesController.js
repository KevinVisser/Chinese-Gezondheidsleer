var app = angular.module('KruidenFormulesController', ['ngRoute', 'myAppRouter'])

app.controller('KruidenFormulesController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.KruidenFormulesModel = new KruidenFormulesModel();

    $scope.kruidenFormules = $scope.KruidenFormulesModel.GetRelevantData();

    $scope.GoToView = function (id) {
        $location.path('/KruidenFormules/' + id)
    }

    $scope.GoToEdit = function (id) {
        $location.path('/Admin/Edit/KruidenFormule/' + id);
    }
}]);