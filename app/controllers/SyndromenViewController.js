var app = angular.module('SyndromenViewController', ['ngRoute', 'myAppRouter'])

app.controller('SyndromenViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    console.log($routeParams);
    $scope.message = "Hello, World";
    $scope.id = $routeParams.SyndroomId;
}]);