var app = angular.module('EditKruidenController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('EditKruidenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.updateModel = new UpdataDataModel();
    $scope.kruidenModel = new KruidenModel();

    let kruidId = $routeParams.Id;
    $scope.kruid = $scope.kruidenModel.GetSpecificKruid(kruidId);

    $scope.updateKruid = function (kruid) {
        console.log(kruid);
        $scope.updateModel.UpdateKruid(kruidId, kruid);
    }
}]);