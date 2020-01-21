var app = angular.module('EditPatentFormuleController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('EditPatentFormuleController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    let patentFormuleId = $routeParams.Id;

    $scope.chineseKruiden = $scope.chineseKruidenModel.GetAllData();
    $scope.symptomen = $scope.symptoomModel.GetAllData();

    $scope.patentformule = $scope.patentFormuleModel.GetSpecificData(patentFormuleId)

    $scope.selectedSymptomen = $scope.patentFormuleModel.GetSymptoomData(patentFormuleId);
    $scope.selectedChineseKruiden = $scope.patentFormuleModel.GetKruidData(patentFormuleId);

    $scope.removeSymptoom = function (symptoom) {
        let position = $scope.selectedSymptomen.indexOf(symptoom)

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
        let add = true;
        if (chineesKruid != undefined && chineesKruid.Pinjin != "") {
            for (let index = 0; index < $scope.selectedChineseKruiden.length; index++) {
                if (chineesKruid.Pinjin == $scope.selectedChineseKruiden[index].Pinjin) {
                    add = false;
                    break;
                }
            }
            if (add) {
                $scope.selectedChineseKruiden.push(chineesKruid)
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

    $scope.updatePatentFormule = function (patentformule, form) {
        if (form.$valid) {
            $scope.updateModel.UpdatePatentFormule(patentFormuleId, patentformule);

            $scope.updateModel.UpdateChineseKruidenEnPatentFormules(patentFormuleId, $scope.selectedChineseKruiden)

            $scope.updateModel.UpdatePatentFormulesEnSymptomen(patentFormuleId, $scope.selectedSymptomen);
        }
    }
}]);