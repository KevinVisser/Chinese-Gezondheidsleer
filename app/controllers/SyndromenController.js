var app = angular.module('SyndromenController', ['ngRoute', 'myAppRouter'])

app.controller('SyndromenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    this.SyndromenModel = new SyndromenModel();

    $scope.syndromen = this.SyndromenModel.GetRelevantData();

    $scope.GoToView = function (id) {
        $location.path('/Syndromen/' + id)
    }
}]);