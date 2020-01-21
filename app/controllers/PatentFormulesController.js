var app = angular.module('PatentFormulesController', ['ngRoute', 'myAppRouter'])

app.controller('PatentFormulesController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {

    $scope.patentFormules = $scope.patentFormuleModel.GetRelevantData();

    $scope.GoToView = function (id) {
        $location.path('/PatentFormules/' + id)
    }

    $scope.GoToEdit = function (id) {
        $location.path('/Admin/Edit/PatentFormule/' + id);
    }
}]);