var app = angular.module('myAppRouter', ['ngRoute'])

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/Admin/Add', {
            templateUrl: './app/views/AdminViews/Add/AddData.html',
            controller: 'AddDataController',
        })
        .when('/Admin/Edit/Kruid/:Id', {
            templateUrl: './app/views/AdminViews/Edit/EditKruid.html'
        })
        .when('/Admin/Edit/KruidenFormule/:Id', {
            templateUrl: './app/views/AdminViews/Edit/EditKruidenFormule.html'
        })
        .when('/Admin/Edit/PatentFormule/:Id', {
            templateUrl: './app/views/AdminViews/Edit/EditPatentFormule.html'
        })
        .when('/Admin/Edit/ChineesKruid/:Id', {
            templateUrl: './app/views/AdminViews/Edit/EditChineesKruid.html'
        })
        .when('/Admin/Edit/Syndroom/:Id', {
            templateUrl: './app/views/AdminViews/Edit/EditSyndroom.html'
        })
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
        .when('/ChineseKruiden', {
            templateUrl: './app/views/ChineseKruiden.html',
            controller: 'ChineseKruidenController',
        })
        .when('/ChineseKruiden/:ChineesKruidId', {
            templateUrl: './app/views/ChineseKruidenView.html',
            controller: 'ChineseKruidenViewController',
        })
}])