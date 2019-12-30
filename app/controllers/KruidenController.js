var app = angular.module('KruidenController', ['ngRoute', 'myAppRouter'])

app.controller('KruidenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.kruidenModel = new KruidenModel();

    $scope.kruiden = $scope.kruidenModel.GetAllData();
    console.log(__dirname, '/assets/img/icon.png');
    $scope.GoToView = function (id) {
        $location.path('/Kruiden/' + id)
    }
}]);