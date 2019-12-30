var app = angular.module('KruidenViewController', ['ngRoute', 'myAppRouter'])

app.controller('KruidenViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    this.KruidenModel = new KruidenModel();

    $scope.kruid = this.KruidenModel.GetSpecificKruid($routeParams.KruidId);

    $scope.GoToView = function () {
        $location.path('/Kruiden')
    }
}]);