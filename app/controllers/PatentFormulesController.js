var app = angular.module('PatentFormulesController', ['ngRoute', 'myAppRouter'])

app.controller('PatentFormulesController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.PatentFormulesModel = new PatentFormulesModel();

    $scope.patentFormules = $scope.PatentFormulesModel.GetRelevantData();

    $scope.object = function (patentformules) {
        for (let i = 0; i < patentformules.length; i++) {
            patentformules[i].symptomen = $scope.PatentFormulesModel.GetSymptoomData(patentformules[i].Id);
        }
        console.log(patentformules);
    };
    
    $scope.ShowSyndromen = function(patentformules) {
        var string = "";
        patentformules.symptomen.forEach(element => {
            string = string.concat(element.Naam + ", ");
        });
        console.log("patentFormules");
        string = string.substr(0, string.length - 2);
        return string;
    }

    $scope.object($scope.patentFormules);

    $scope.GoToView = function (id) {
        $location.path('/PatentFormules/' + id)
    }
}]);