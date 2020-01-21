var app = angular.module('EditChineseKruidenController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('EditChineseKruidenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    let chineesKruidId = $routeParams.Id;

    $scope.chineesKruid = $scope.chineseKruidenModel.GetSpecificKruid(chineesKruidId);
    $scope.symptomen = $scope.symptoomModel.GetAllData();

    $scope.selectedSymptomen = $scope.chineseKruidenModel.GetSymptoomData(chineesKruidId);

    $scope.updateChineesKruid = function (chineesKruid, form) {
        //Insert into chinese kruiden table
        if (form.$valid) {
            $scope.updateModel.UpdateChineseKruiden(chineesKruidId, chineesKruid)

            //Insert selected symptoms in symptomen table
            $scope.updateModel.UpdateChineseKruidenEnSymptomen(chineesKruidId, $scope.selectedSymptomen);
        }
    }

    $scope.removeSymptoom = function (symptoom) {
        let position = $scope.selectedSymptomen.indexOf(symptoom)

        if ($scope.selectedSymptomen.includes(symptoom)) {
            $scope.selectedSymptomen.splice(position, 1);
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
}]);