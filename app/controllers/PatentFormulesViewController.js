var app = angular.module('PatentFormulesViewController', ['ngRoute', 'myAppRouter'])

app.controller('PatentFormulesViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    console.log($routeParams);
    $scope.message = "Hello, World";
    $scope.id = $routeParams.PatentFormuleId;
}]);