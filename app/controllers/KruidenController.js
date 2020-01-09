var app = angular.module('KruidenController', ['ngRoute', 'myAppRouter'])

app.controller('KruidenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.kruidenModel = new KruidenModel();

    $scope.kruiden = $scope.kruidenModel.GetAllData();

    $scope.GoToView = function (id) {
        $location.path('/Kruiden/' + id)
    }

    $scope.GoToEdit = function (id) {
        $location.path('/Admin/Edit/Kruid/' + id);
    }
}]);