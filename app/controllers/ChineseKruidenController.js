var app = angular.module('ChineseKruidenController', ['ngRoute', 'myAppRouter'])

app.controller('ChineseKruidenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.kruidenModel = new ChineseKruidenModel();

    $scope.kruiden = $scope.kruidenModel.GetAllData();

    $scope.GoToView = function (id) {
        $location.path('/ChineseKruiden/' + id)
    }
}]);