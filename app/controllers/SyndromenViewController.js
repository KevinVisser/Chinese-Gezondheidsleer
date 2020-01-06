var app = angular.module('SyndromenViewController', ['ngRoute', 'myAppRouter'])

app.controller('SyndromenViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.SyndromenModel = new SyndromenModel();

    $scope.syndromen = $scope.SyndromenModel.GetSpecificData($routeParams.SyndroomId);
    $scope.symptomen = $scope.SyndromenModel.GetSymptoomData($routeParams.SyndroomId);
    $scope.formules = $scope.SyndromenModel.GetFormules($routeParams.SyndroomId);

    $scope.GoToView = function (id) {
        $location.path('/Syndromen');
    }

    $scope.GoToViewPF = function (id) {
        console.log(id);
        $location.path('/PatentFormules/' + id);
    }

    $scope.GoToViewKF = function (id) {
        console.log(id);

        $location.path('/KruidenFormules/' + id);
    }
}]);