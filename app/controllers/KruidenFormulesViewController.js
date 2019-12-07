var app = angular.module('KruidenFormulesViewController', ['ngRoute', 'myAppRouter'])

app.controller('KruidenFormulesViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    console.log($routeParams);
    $scope.message = "Hello, World";
    $scope.id = $routeParams.KruidenFormuleId;
}]);