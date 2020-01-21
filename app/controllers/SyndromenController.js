var app = angular.module('SyndromenController', ['ngRoute', 'myAppRouter'])

app.controller('SyndromenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {

    $scope.syndromen = $scope.syndroomModel.GetRelevantData();

    $scope.GoToView = function (id) {
        $location.path('/Syndromen/' + id)
    }

    $scope.GoToEdit = function (id) {
        $location.path('/Admin/Edit/Syndroom/' + id);
    }
}]);