var app = angular.module('EditKruidenFormuleController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('EditKruidenFormuleController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    // Variables
    let kruidenFormuleId = $routeParams.Id;

    $scope.symptomen = $scope.symptoomModel.GetAllData();
    $scope.kruiden = $scope.kruidenModel.GetAllData();

    $scope.kruidenformule = $scope.kruidenFormuleModel.GetSpecificData(kruidenFormuleId);

    $scope.selectedKruiden = $scope.kruidenFormuleModel.GetKruidData(kruidenFormuleId);
    $scope.selectedSymptomen = $scope.kruidenFormuleModel.GetSymptoomData(kruidenFormuleId);

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
        let add = true;
        if (kruid != undefined && kruid.Naam != "") {
            for (let index = 0; index < $scope.selectedKruiden.length; index++) {
                if (kruid.Nederlands == $scope.selectedKruiden[index].Nederlands) {
                    add = false;
                    break;
                }
            }
            if (add) {
                $scope.selectedKruiden.push(kruid)
            }
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

    $scope.updateKruidenFormule = function (kruidenformule, form) {
        if (form.$valid) {
            $scope.updateModel.UpdateKruidenFormule(kruidenFormuleId, kruidenformule);

            // // Daarna de kruidenFormuleEnKruiden vullen
            $scope.updateModel.UpdateKruidenFormulesEnKruiden(kruidenFormuleId, $scope.selectedKruiden);

            // Daarna de kruidenformuleEnSymptomen vullen
            $scope.updateModel.UpdateKruidenFormulesEnSymptomen(kruidenFormuleId, $scope.selectedSymptomen);
        }
    }
}]);