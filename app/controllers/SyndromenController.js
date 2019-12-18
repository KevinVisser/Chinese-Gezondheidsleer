var app = angular.module('SyndromenController', ['ngRoute', 'myAppRouter'])

app.controller('SyndromenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.SyndromenModel = new SyndromenModel();

    $scope.syndromen = $scope.SyndromenModel.GetRelevantData();
    console.log($scope.syndromen);

    // $scope.object = function (syndromen) {
    //     for (let i = 0; i < syndromen.length; i++) {
    //         syndromen[i].symptomen = $scope.SyndromenModel.GetSymptoomData(syndromen[i].Id);
    //     }
    // };

    // $scope.ShowSyndromen = function(syndromen) {
    //     var string = "";
    //     syndromen.symptomen.forEach(element => {
    //         string = string.concat(element.Naam + ", ");
    //     });
    //     console.log("syndromen");
    //     string = string.substr(0, string.length - 2);
    //     return string;
    // }

    // $scope.object($scope.syndromen);

    $scope.GoToView = function (id) {
        $location.path('/Syndromen/' + id)
    }
}]);