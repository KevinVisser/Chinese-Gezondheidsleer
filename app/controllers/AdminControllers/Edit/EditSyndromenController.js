var app = angular.module('EditSyndromenController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('EditSyndromenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.syndromen = $scope.syndroomModel.GetRelevantData();
    $scope.kruiden = $scope.kruidenModel.GetAllData();
    $scope.chineseKruiden = $scope.chineseKruidenModel.GetAllData();
    $scope.symptomen = $scope.symptoomModel.GetAllData();

    $scope.kruidenFormules = $scope.kruidenFormuleModel.GetRelevantData();
    $scope.patentFormules = $scope.patentFormuleModel.GetRelevantData();

    // Variables
    let syndroomId = $routeParams.Id;



    $scope.syndroom = $scope.syndroomModel.GetSpecificData(syndroomId);


    $scope.selectedKruidenFormules = $scope.syndroomModel.GetKruidenFormuleData(syndroomId);
    $scope.selectedPatentFormules = $scope.syndroomModel.GetPatentFormuleData(syndroomId);
    $scope.selectedSymptomen = $scope.syndroomModel.GetSymptoomData(syndroomId);

    $scope.hoofdSymptomen = $scope.syndroom.Hoofdsymptoom;

    // Functions
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
        let add = true;
        if (symptoom != undefined && symptoom.Naam != "") {
            for (let index = 0; index < $scope.selectedSymptomen.length; index++) {
                if (symptoom.Naam == $scope.selectedSymptomen[index].Naam) {
                    add = false;
                    break;
                }
            }
            if (add) {
                $scope.selectedSymptomen.push(symptoom)
            }
        }
    }

    $scope.selectedItemChangeHoofdSymptoom = function (hoofdSymptoom) {
        let add = true;
        if (hoofdSymptoom != undefined && hoofdSymptoom.Naam != "") {
            for (let index = 0; index < $scope.hoofdSymptomen.length; index++) {
                if (hoofdSymptoom.Naam == $scope.hoofdSymptomen[index].Naam) {
                    add = false;
                    break;
                }
            }
            if (add) {
                $scope.hoofdSymptomen.push(hoofdSymptoom)
            }
        }
    }

    $scope.selectedItemChangeKruidenFormule = function (kruidenFormule) {
        let add = true;
        if (kruidenFormule != undefined && kruidenFormule.Naam != "") {
            for (let index = 0; index < $scope.selectedKruidenFormules.length; index++) {
                if (kruidenFormule.Naam == $scope.selectedKruidenFormules[index].Naam) {
                    add = false;
                    break;
                }
            }
            if (add) {
                $scope.selectedKruidenFormules.push(kruidenFormule)
            }
        }
    }

    $scope.selectedItemChangePatentFormule = function (patentFormule) {
        let add = true;
        if (patentFormule != undefined && patentFormule.Naam != "") {
            for (let index = 0; index < $scope.selectedPatentFormules.length; index++) {
                if (patentFormule.Pinjin == $scope.selectedPatentFormules[index].Pinjin) {
                    add = false;
                    break;
                }
            }
            if (add) {
                $scope.selectedPatentFormules.push(patentFormule)
            }
        }
    }

    $scope.updateSyndroom = function (syndroom, form) {
        if (form.$valid) {
            $scope.updateModel.UpdateSyndroom(syndroomId, syndroom);

            $scope.updateModel.UpdateActieFormules(syndroomId, $scope.selectedPatentFormules, $scope.selectedKruidenFormules)

            $scope.updateModel.UpdateSyndromenEnSymptomen(syndroomId, $scope.selectedSymptomen)
        }
    }
}]);