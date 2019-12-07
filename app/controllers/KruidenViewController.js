var app = angular.module('KruidenViewController', ['ngRoute', 'myAppRouter'])

app.controller('KruidenViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    this.KruidenModel = new KruidenModel();

    console.log($routeParams);
    $scope.message = "Hello, World";
    $scope.id = $routeParams.KruidId;

    $scope.kruid = this.KruidenModel.GetSpecificKruid($routeParams.KruidId);


    $scope.GoToView = function () {
        console.log("Hello");
        $location.path('/Kruiden')
    }
}]);