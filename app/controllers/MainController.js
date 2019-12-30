var app = angular.module('MainController', ['ngRoute', 'myAppRouter'])

app.controller('MainController', ['$route', '$routeParams', '$location', function ($route, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
}]);