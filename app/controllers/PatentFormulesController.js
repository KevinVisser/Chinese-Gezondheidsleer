var app = angular.module('PatentFormulesController', ['ngRoute', 'myAppRouter'])

app.controller('PatentFormulesController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.PatentFormulesModel = new PatentFormulesModel();

    $scope.patentFormules = $scope.PatentFormulesModel.GetRelevantData();
    console.log("Hello, World");

    $scope.GoToView = function (id) {
        console.log(id);
        $location.path('/PatentFormules/' + id)
    }

    $scope.GoToEdit = function (id) {
        $location.path('/Admin/Edit/PatentFormule/' + id);
    }
}]);