var app = angular.module('ZoekenViewController', ['ngRoute', 'myAppRouter'])

app.controller('ZoekenViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.ZoekenModel = new ZoekenModel();

    $scope.data = $routeParams;
    
    if (!($scope.data.tong == "undefined" || $scope.data.tong == undefined )) {
        $scope.tong = $scope.ZoekenModel.GetTongData($scope.data.tong);
    }
    if (!($scope.data.pols == "undefined" || $scope.data.pols == undefined)) {
        $scope.pols = $scope.ZoekenModel.GetPolsData($scope.data.pols);
    }

    if ($routeParams.symptomen != "") {
        $scope.symptomen = $scope.ZoekenModel.GetSymptoomData($routeParams.symptomen);
    }
    
    $scope.GoBack = function () {
        $location.path('/Zoeken');
    }
    $scope.GoToView = function (id) {
        $location.path('/PatentFormules/' + id)
    }
}]);