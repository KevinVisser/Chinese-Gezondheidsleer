var ChineseGezondheidsleer = angular.module('ChineseGezondheidsleer', ['ngMaterial', 'ngRoute'])

// Set up routing in the app
ChineseGezondheidsleer.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    console.log($routeProvider, $locationProvider);
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

//Controller Declarations
ChineseGezondheidsleer.controller('MainController', MainController)

ChineseGezondheidsleer.controller('KruidenController', KruidenController)
ChineseGezondheidsleer.controller('PatentFormulesController', PatentFormulesController)
ChineseGezondheidsleer.controller('KruidenFormulesController', KruidenFormulesController)
ChineseGezondheidsleer.controller('SyndromenController', SyndromenController)

ChineseGezondheidsleer.controller('KruidenViewController', KruidenViewController)
ChineseGezondheidsleer.controller('PatentFormulesViewController', PatentFormulesViewController)
ChineseGezondheidsleer.controller('KruidenFormulesViewController', KruidenFormulesViewController)
ChineseGezondheidsleer.controller('SyndromenViewController', SyndromenViewController)

//Controller Implementations
function MainController($route, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    console.log($route, $location, $routeParams);
}

function KruidenController($routeParams, $scope, $location) {
    this.kruidenModel = new KruidenModel();
    this.params = $routeParams;

    $scope.kruiden = this.kruidenModel.GetAllData();

    $scope.GoToView = function GoToView(id) {
        $location.path('/Kruiden/' + id)
    }
}

function PatentFormulesController($routeParams, $scope, $location) {
    this.PatentFormulesModel = new PatentFormulesModel();

    $scope.patentFormules = this.PatentFormulesModel.GetRelevantData();

    $scope.GoToView = function GoToView(id) {
        $location.path('/PatentFormules/' + id)
    }
}

function KruidenFormulesController($routeParams, $scope, $location) {
    this.KruidenFormulesModel = new KruidenFormulesModel();

    $scope.kruidenFormules = this.KruidenFormulesModel.GetRelevantData();

    $scope.GoToView = function GoToView(id) {
        $location.path('/KruidenFormules/' + id)
    }
}

function SyndromenController($routeParams, $scope, $location) {
    this.SyndromenModel = new SyndromenModel();

    $scope.syndromen = this.SyndromenModel.GetRelevantData();

    $scope.GoToView = function GoToView(id) {
        $location.path('/Syndromen/' + id)
    }
}

function KruidenViewController($routeParams, $scope) {
    this.KruidenModel = new KruidenModel();

    console.log($routeParams);
    $scope.message = "Hello, World";
    $scope.id = $routeParams.KruidId;

    $scope.kruid = this.KruidenModel.GetSpecificKruid($routeParams.KruidId);

    console.log($scope.kruid);
}

function PatentFormulesViewController($routeParams, $scope) {
    console.log($routeParams);
    $scope.message = "Hello, World";
    $scope.id = $routeParams.PatentFormuleId;
}

function KruidenFormulesViewController($routeParams, $scope) {
    console.log($routeParams);
    $scope.message = "Hello, World";
    $scope.id = $routeParams.KruidenFormuleId;
}

function SyndromenViewController($routeParams, $scope) {


    console.log($routeParams);
    $scope.message = "Hello, World";
    $scope.id = $routeParams.SyndroomId;

}

// ChineseGezondheidsleer.controller('testController', function ($scope, $timeout, $mdSidenav, $log) {
//     $scope.kruidenModel = new KruidenModel();

//     $scope.kruidenModel.GetRelevantData();

//     $scope.kruiden = [];
//     $scope.patentFormules = [];
//     $scope.kruidenFormules = [];
//     $scope.syndromen = [];

//     $scope.values = [];

//     $scope.ChangeNav = function ChangeNav(nav) {
//         $scope.currentItem = nav;

//         switch ($scope.currentItem) {
//             case "Kruiden":
//                 $scope.kruiden = $scope.kruidenModel.GetRelevantData();
//                 $scope.patentFormules = [];
//                 $scope.kruidenFormules = [];
//                 $scope.syndromen = [];
//                 console.log($scope.values);
//                 break;
//             case "PatentFormules":
//                 $scope.patentFormules = $scope.kruidenModel.PatentFormules();
//                 $scope.kruiden = [];
//                 $scope.kruidenFormules = [];
//                 $scope.syndromen = [];
//                 console.log($scope.values);
//                 break;
//             case "KruidenFormules":
//                 $scope.kruidenFormules = $scope.kruidenModel.KruidenFormules();
//                 $scope.patentFormules = [];
//                 $scope.kruiden = [];
//                 $scope.syndromen = [];
//                 console.log($scope.values);
//                 break;
//             case "Syndroom":
//                 $scope.syndromen = $scope.kruidenModel.Syndroom();
//                 $scope.patentFormules = [];
//                 $scope.kruidenFormules = [];
//                 $scope.kruiden = [];
//                 console.log($scope.values);
//                 break;
//         }
//     }
// }); 