var app = angular.module('KruidenController', ['ngRoute', 'myAppRouter'])

app.controller('KruidenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.kruidenModel = new KruidenModel();
    this.params = $routeParams;

    // $scope.kruiden = this.kruidenModel.GetAllData();

    $scope.GoToView = function (id) {
        $location.path('/Kruiden/' + id)
    }

    $scope.searchKruid = function (search) {
        console.log(search);
        // if (search.length > 2)
        $scope.kruiden = $scope.kruidenModel.SearchKruiden(search);
        if (search.length <= 2) {
            $scope.kruiden = [];
        }
    }
}]);