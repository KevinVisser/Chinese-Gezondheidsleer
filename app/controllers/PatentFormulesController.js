var app = angular.module('PatentFormulesController', ['ngRoute', 'myAppRouter'])

app.controller('PatentFormulesController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.PatentFormulesModel = new PatentFormulesModel();

    $scope.patentFormules = [];

    if ($scope.patentFormules.length == 0) {
        $scope.patentFormules = $scope.PatentFormulesModel.GetRelevantData();
        console.log("Hello, World");
    }

    // console.log($scope.patentFormules);

    // $scope.object = function (patentformules) {
    //     for (let i = 0; i < patentformules.length; i++) {

    //         var tmp = $scope.PatentFormulesModel.GetSymptoomData(patentformules[i].Id)
    //         var symptomen = tmp.map(e => e.Naam).join(",");
    //         // var symptomen = tmp.map(function (symptoom) {
    //         //     return symptoom.Naam;
    //         // })

    //         // const arr = $scope.PatentFormulesModel.GetSymptoomData(patentformules[i].Id)
    //         // console.log(arr);
    //         console.log(symptomen);
    //         patentformules[i].symptomen = symptomen
    //         // console.log(patentformules[i].symptomen);
    //         // if (patentformules[i].symptomen.length != 0) {
    //         //     patentformules[i].symptomen.forEach(element => {
    //         //         string = string.concat(element.Naam + ", ");
    //         //     });
    //         //     string = string.substr(0, string.length - 2);
    //         //     patentformules[i].symptomen = string;
    //         // } else if (patentformules[i].symptomen.length == 0) {
    //         //     patentformules[i].symptomen = string;
    //         // }
    //     }


    //     console.log(patentformules);
    // };

    // $scope.ShowSyndromen = function(patentformules) {
    //     var string = "";
    //     console.log("Showsyndromen method", patentformules);
    //     patentformules.symptomen.forEach(element => {
    //         string = string.concat(element.Naam + ", ");
    //     });
    //     console.log("patentFormules");
    //     string = string.substr(0, string.length - 2);
    // }

    // $scope.object($scope.patentFormules);
    // $scope.ShowSyndromen($scope.patentFormules);

    // console.log($scope.patentFormules);

    $scope.GoToView = function (id) {
        console.log(id);
        $location.path('/PatentFormules/' + id)
    }
}]);