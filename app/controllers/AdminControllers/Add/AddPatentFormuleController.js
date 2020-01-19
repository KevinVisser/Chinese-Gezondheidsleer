var app = angular.module('AddPatentFormuleController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('AddPatentFormuleController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {

    $scope.patentformule = {
        "Nederlands": "",
        "Engels": "",
        "Pinjin": "",
        "Werking": "",
        "Tong": "",
        "Pols": "",
        "ContraIndicaties": ""
    }

    $scope.symptoom = {
        "Naam": ""
    }

    $scope.selectedChineseKruiden = [];
    $scope.selectedSymptomen = [];

    $scope.removeSymptoom = function (symptoom) {
        let position = $scope.selectedSymptomen.indexOf(symptoom)
        console.log(symptoom);

        if ($scope.selectedSymptomen.includes(symptoom)) {
            $scope.selectedSymptomen.splice(position, 1);
        }
    }

    $scope.removeKruid = function (kruid) {
        let position = $scope.selectedChineseKruiden.indexOf(kruid)

        if ($scope.selectedChineseKruiden.includes(kruid)) {
            $scope.selectedChineseKruiden.splice(position, 1);
        }
    }

    $scope.selectedItemChangeChineesKruid = function (chineesKruid) {
        if (chineesKruid != undefined) {
            if (chineesKruid.Pinjin != "" && !$scope.selectedChineseKruiden.includes(chineesKruid)) {
                $scope.selectedChineseKruiden.push(chineesKruid);
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

    $scope.updatePatentFormule = function (patentformule, form) {
        if (form.$valid) {
            let id = $scope.addDataModel.InsertIntoPatentFormules(patentformule);
            console.log(id);

            // Daarna de kruidenFormuleEnKruiden vullen
            $scope.addDataModel.InsertIntoChineseKruidenEnPatentFormules(id, $scope.selectedChineseKruiden);

            // Daarna de kruidenformuleEnSymptomen vullen
            $scope.addDataModel.InsertIntoPatentFormulesEnSymptomen(id, $scope.selectedSymptomen);
        } else {
            console.log("Invalid");
        }

    }

}]);