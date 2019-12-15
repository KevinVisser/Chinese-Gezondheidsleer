var app = angular.module('KruidenViewController', ['ngRoute', 'myAppRouter'])

app.controller('KruidenViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    this.KruidenModel = new KruidenModel();

    $scope.kruid = this.KruidenModel.GetSpecificKruid($routeParams.KruidId);

    console.log($scope.kruid);

    $scope.GoToView = function () {
        $location.path('/Kruiden')
    }
}]);