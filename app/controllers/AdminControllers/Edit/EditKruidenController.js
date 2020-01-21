var app = angular.module('EditKruidenController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('EditKruidenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {

    let kruidId = $routeParams.Id;
    $scope.kruid = $scope.kruidenModel.GetSpecificKruid(kruidId);

    $scope.updateKruid = function (kruid) {
        $scope.updateModel.UpdateKruid(kruidId, kruid);
    }
}]);