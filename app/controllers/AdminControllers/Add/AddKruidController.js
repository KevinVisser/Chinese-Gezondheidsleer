var app = angular.module('AddKruidController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('AddKruidController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {

    $scope.kruid = {
        "Nederlands": "",
        "Latijns": "",
        "Familie": "",
        "Inhoudsstoffen": "",
        "Toepassing": "",
        "Eigenschappen": "",
        "Actie": "",
        "Gebruik": "",
        "LetOp": "",
        "Smaak": "",
        "Dosering": "",
        "ThermischeWerking": "",
        "GebruikteDelen": "",
        "Orgaan": ""
    }

    $scope.updateKruid = function (kruid, form) {

        if (form.$valid) {
            $scope.addDataModel.InsertIntoKruiden(kruid)
            $scope.kruid = null;
        } else {
        }
    }
}]);