var app = angular.module('KruidenFormulesViewController', ['ngRoute', 'myAppRouter'])

app.controller('KruidenFormulesViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.KruidenFormulesModel = new KruidenFormulesModel();
    
    $scope.kruidenFormules = $scope.KruidenFormulesModel.GetSpecificData($routeParams.KruidenFormuleId);
    
    $scope.kruiden = $scope.KruidenFormulesModel.GetKruidData($routeParams.KruidenFormuleId);


    console.log($scope.kruidenFormules);
    console.log($scope.kruiden);
    

    $scope.GoToView = function () {
        $location.path('/KruidenFormules')
    }
}]);