var app = angular.module('AddSyndromenController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('AddSyndromenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {

    $scope.syndroom = {
        "Nederlands": "",
        "Engels": "",
        "Pinjin": "",
        "Werking": "",
        "Tong": "",
        "Pols": "",
        "Hoofdsymptoom": "",
        "ContraIndicaties": ""
    }

    $scope.selectedKruidenFormules = [];
    $scope.selectedPatentFormules = [];
    $scope.selectedSymptomen = [];
    $scope.selectedHoofdSymptomen = [];

    $scope.removeSymptoom = function (symptoom) {
        let position = $scope.selectedSymptomen.indexOf(symptoom)

        if ($scope.selectedSymptomen.includes(symptoom)) {
            $scope.selectedSymptomen.splice(position, 1);
        }
    }

    $scope.removeHoofdSymptoom = function (hoofdSymptoom) {
        let position = $scope.selectedHoofdSymptomen.indexOf(hoofdSymptoom)

        if ($scope.selectedHoofdSymptomen.includes(hoofdSymptoom)) {
            $scope.selectedHoofdSymptomen.splice(position, 1);
        }
    }

    $scope.removeKruidenFormule = function (kruidenformule) {
        let position = $scope.selectedKruidenFormules.indexOf(kruidenformule)

        if ($scope.selectedKruidenFormules.includes(kruidenformule)) {
            $scope.selectedKruidenFormules.splice(position, 1);
        }
    }

    $scope.removePatentFormule = function (patentformule) {
        let position = $scope.selectedPatentFormules.indexOf(patentformule)

        if ($scope.selectedPatentFormules.includes(patentformule)) {
            $scope.selectedPatentFormules.splice(position, 1);
        }
    }

    $scope.selectedItemChangeSymptoom = function (symptoom) {
        if (symptoom != undefined) {
            if (symptoom.Naam != "" && !$scope.selectedSymptomen.includes(symptoom)) {
                $scope.selectedSymptomen.push(symptoom);
            }
        }
    }

    $scope.selectedItemChangeHoofdSymptoom = function (hoofdSymptoom) {
        if (hoofdSymptoom != undefined) {
            if (hoofdSymptoom.Naam != "" && !$scope.selectedSymptomen.includes(hoofdSymptoom)) {

                $scope.selectedHoofdSymptomen.push(hoofdSymptoom.Naam);
            }
        }
    }

    $scope.selectedItemChangeKruidenFormule = function (kruidenFormule) {
        if (kruidenFormule != undefined) {
            if (kruidenFormule.Naam != "" && !$scope.selectedKruidenFormules.includes(kruidenFormule)) {
                $scope.selectedKruidenFormules.push(kruidenFormule);
            }
        }
    }

    $scope.selectedItemChangePatentFormule = function (patentFormule) {
        if (patentFormule != undefined) {
            if (patentFormule.Pinjin != "" && !$scope.selectedPatentFormules.includes(patentFormule)) {
                $scope.selectedPatentFormules.push(patentFormule);
            }
        }
    }
    $scope.updateSyndroom = function (syndroom, form) {
        if (form.$valid) {
            $scope.syndroom.Hoofdsymptoom = $scope.selectedHoofdSymptomen.join(", ")

            //Insert syndroom into syndromen table
            let id = $scope.addDataModel.InsertIntoSyndromen(syndroom);

            // Daarna de ActieFormules vullen
            $scope.addDataModel.InsertIntoActieFormules(id, $scope.selectedPatentFormules, $scope.selectedKruidenFormules);

            // Daarna de kruidenformuleEnSymptomen vullen
            $scope.addDataModel.InsertIntoSyndromenEnSymptomen(id, $scope.selectedSymptomen);
        }
    }
}]);