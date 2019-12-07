var app = angular.module('myAppRouter', ['ngRoute'])

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/Kruiden', {
            templateUrl: './app/views/Kruiden.html',
            controller: 'KruidenController',
        })
        .when('/PatentFormules', {
            templateUrl: './app/views/PatentFormules.html',
            controller: 'PatentFormulesController',
        })
        .when('/KruidenFormules', {
            templateUrl: './app/views/KruidenFormules.html',
            controller: 'KruidenFormulesController',
        })
        .when('/Syndromen', {
            templateUrl: './app/views/Syndromen.html',
            controller: 'SyndromenController',
        })
        .when('/Kruiden/:KruidId', {
            templateUrl: './app/views/KruidenView.html',
            controller: 'KruidenViewController',
        })
        .when('/PatentFormules/:PatentFormuleId', {
            templateUrl: './app/views/PatentFormulesView.html',
            controller: 'PatentFormulesViewController',
        })
        .when('/KruidenFormules/:KruidenFormuleId', {
            templateUrl: './app/views/KruidenFormulesView.html',
            controller: 'KruidenFormulesViewController',
        })
        .when('/Syndromen/:SyndroomId', {
            templateUrl: './app/views/SyndromenView.html',
            controller: 'SyndromenViewController',
        })
}])