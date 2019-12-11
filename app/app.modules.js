var ChineseGezondheidsleer = angular.module('ChineseGezondheidsleer', [
    'ngMaterial',
    'ngRoute',
    'myAppRouter',
    'MainController',
    'KruidenController',
    'PatentFormulesController',
    'KruidenFormulesController',
    'SyndromenController',
    'KruidenViewController',
    'PatentFormulesViewController',
    'KruidenFormulesViewController',
    'SyndromenViewController',
    'AddDataController'
]);

// // ChineseGezondheidsleer.controller('KruidenController', KruidenController)
// ChineseGezondheidsleer.controller('PatentFormulesController', PatentFormulesController)
// ChineseGezondheidsleer.controller('KruidenFormulesController', KruidenFormulesController)
// ChineseGezondheidsleer.controller('SyndromenController', SyndromenController)

// ChineseGezondheidsleer.controller('KruidenViewController', KruidenViewController)
// ChineseGezondheidsleer.controller('PatentFormulesViewController', PatentFormulesViewController)
// ChineseGezondheidsleer.controller('KruidenFormulesViewController', KruidenFormulesViewController)
// ChineseGezondheidsleer.controller('SyndromenViewController', SyndromenViewController)



// function PatentFormulesController($routeParams, $scope, $location) {
//     this.PatentFormulesModel = new PatentFormulesModel();

//     $scope.patentFormules = this.PatentFormulesModel.GetRelevantData();

//     $scope.GoToView = function (id) {
//         $location.path('/PatentFormules/' + id)
//     }
// }

// function KruidenFormulesController($routeParams, $scope, $location) {
//     this.KruidenFormulesModel = new KruidenFormulesModel();

//     $scope.kruidenFormules = this.KruidenFormulesModel.GetRelevantData();

//     $scope.GoToView = function (id) {
//         $location.path('/KruidenFormules/' + id)
//     }
// }

// function SyndromenController($routeParams, $scope, $location) {
//     this.SyndromenModel = new SyndromenModel();

//     $scope.syndromen = this.SyndromenModel.GetRelevantData();

//     $scope.GoToView = function (id) {
//         $location.path('/Syndromen/' + id)
//     }
// }

// function KruidenViewController($routeParams, $scope, $location) {
//     this.KruidenModel = new KruidenModel();

//     console.log($routeParams);
//     $scope.message = "Hello, World";
//     $scope.id = $routeParams.KruidId;

//     $scope.kruid = this.KruidenModel.GetSpecificKruid($routeParams.KruidId);


//     $scope.GoToView = function () {
//         console.log("Hello");
//         $location.path('/Kruiden')
//     }
// }

// function PatentFormulesViewController($routeParams, $scope) {
//     console.log($routeParams);
//     $scope.message = "Hello, World";
//     $scope.id = $routeParams.PatentFormuleId;
// }

// function KruidenFormulesViewController($routeParams, $scope) {
//     console.log($routeParams);
//     $scope.message = "Hello, World";
//     $scope.id = $routeParams.KruidenFormuleId;
// }

// function SyndromenViewController($routeParams, $scope) {
//     console.log($routeParams);
//     $scope.message = "Hello, World";
//     $scope.id = $routeParams.SyndroomId;
// }

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