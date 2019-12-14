var app = angular.module('KruidenController', ['ngRoute', 'myAppRouter'])

app.controller('KruidenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.kruidenModel = new KruidenModel();
    this.params = $routeParams;

    $scope.aantekeningen = [
        {
            Id: '',
            Aantekening: ''
        }
    ]

    $scope.kruidenFormules = kruidenFormulesModel.GetAllData();
    $scope.kruiden = kruidenModel.GetAllData();
    $scope.Symptomen = SymptomenModel.GetAllData();


    // for loop door kruidenformules heen --> bij elk ID alle kruiden en hun namen toevoegen aan de lijst --> het zelfde met symptomen
    // $scope.object = [
    //     { KruidenformuleNaam: "Milt Qi Digest Thee", 
    //       kruiden: ["Venkel", "Nog een Kruid"], 
    //       syndromen: ["Syndroom 1", "Syndroom 2"] }
    // ]


    $scope.kruiden = $scope.kruidenModel.GetAllData();

    $scope.GoToView = function (id) {
        $location.path('/Kruiden/' + id)
    }

    // $scope.searchKruid = function (search) {
    //     console.log(search);
    //     // if (search.length > 2)
    //     $scope.kruiden = $scope.kruidenModel.SearchKruiden(search);
    //     if (search.length <= 2) {
    //         $scope.kruiden = [];
    //     }
    // }
}]);