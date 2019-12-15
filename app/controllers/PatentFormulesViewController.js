var app = angular.module('PatentFormulesViewController', ['ngRoute', 'myAppRouter'])

app.controller('PatentFormulesViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.PatentFormulesModel = new PatentFormulesModel();
    
    $scope.patentformules = $scope.PatentFormulesModel.GetSpecificData($routeParams.PatentFormuleId);
    $scope.patentformules.symptomen = $scope.PatentFormulesModel.GetSymptoomData($routeParams.PatentFormuleId);
    $scope.patentformules.kruiden = $scope.PatentFormulesModel.GetKruidData($routeParams.PatentFormuleId);
    console.log($scope.patentformules.Id);
    console.log($scope.patentformules);
        
    //moet nog de new line zien te pakken
    $scope.ShowSyndromen = function(patentformules) {
        var string = "";
        patentformules.symptomen.forEach(element => {
            string = string.concat(element.Naam + "\n");
        });
        console.log(string);
        return string;
    }

    $scope.GoToView = function () {
        $location.path('/PatentFormules')
    }
}]);