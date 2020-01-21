var app = angular.module('AddKruidenFormuleController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('AddKruidenFormuleController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.kruidenformule = {
        "Naam": "",
        "Werking": "",
        "ContraIndicatie": ""
    }

    $scope.symptoom = {
        "Naam": ""
    }


    $scope.selectedKruiden = [];
    $scope.selectedSymptomen = [];

    $scope.removeSymptoom = function (symptoom) {
        let position = $scope.selectedSymptomen.indexOf(symptoom)

        if ($scope.selectedSymptomen.includes(symptoom)) {
            $scope.selectedSymptomen.splice(position, 1);
        }
    }

    $scope.removeKruid = function (kruid) {
        let position = $scope.selectedKruiden.indexOf(kruid)

        if ($scope.selectedKruiden.includes(kruid)) {
            $scope.selectedKruiden.splice(position, 1);
        }
    }

    $scope.selectedItemChangeKruid = function (kruid) {
        if (kruid != undefined) {
            if (kruid.Nederlands != "" && !$scope.selectedKruiden.includes(kruid)) {
                $scope.selectedKruiden.push(kruid);
            }
        }
    }

    $scope.selectedItemChangeSymptoom = function (symptoom) {
        if (symptoom != undefined) {
            if (symptoom.Naam != "" && !$scope.selectedSymptomen.includes(symptoom)) {
                $scope.selectedSymptomen.push(symptoom);
            }
        }
    }

    $scope.updateKruidenFormule = function (kruidenformule, form) {
        if (form.$valid) {
            // gebruik selectedKruiden | selectedSymptomen
            // Eerst kruidenformule inserten in de database en het niewe id terugkrijgen

            let id = $scope.addDataModel.InsertIntoKruidenFormules(kruidenformule);

            // Daarna de kruidenFormuleEnKruiden vullen
            $scope.addDataModel.InsertIntoKruidenFormulesEnKruiden(id, $scope.selectedKruiden);

            // Daarna de kruidenformuleEnSymptomen vullen
            $scope.addDataModel.InsertIntoKruidenFormulesEnSymptomen(id, $scope.selectedSymptomen);
        }
    }
}]);