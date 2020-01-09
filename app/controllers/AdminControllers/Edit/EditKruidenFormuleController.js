var app = angular.module('EditKruidenFormuleController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('EditKruidenFormuleController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    // Models
    $scope.updateModel = new UpdataDataModel();
    $scope.kruidenModel = new KruidenModel();
    $scope.kruidenFormuleModel = new KruidenFormulesModel();
    $scope.symptoomModel = new SymptomenModel();

    // Variables
    let kruidenFormuleId = $routeParams.Id;

    $scope.symptomen = $scope.symptoomModel.GetAllData();
    $scope.kruiden = $scope.kruidenModel.GetAllData();

    $scope.kruidenformule = $scope.kruidenFormuleModel.GetSpecificData(kruidenFormuleId);

    $scope.selectedKruiden = $scope.kruidenFormuleModel.GetKruidData(kruidenFormuleId);
    $scope.selectedSymptomen = $scope.kruidenFormuleModel.GetSymptoomData(kruidenFormuleId);

    $scope.removeSymptoom = function (symptoom) {
        let position = $scope.selectedSymptomen.indexOf(symptoom)
        console.log(symptoom);

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
            if (kruid.Nederlands != "" && !$scope.selectedKruiden.includes(kruid.Nederlands)) {
                $scope.selectedKruiden.push(kruid);
            }
        }
    }

    $scope.selectedItemChangeSymptoom = function (symptoom) {
        if (symptoom != undefined) {
            if (symptoom.Naam != "" && !$scope.selectedSymptomen.includes(symptoom.Naam)) {
                $scope.selectedSymptomen.push(symptoom);
            }
        }
    }

    $scope.updateKruidenFormule = function (kruidenformule, form) {
        if (form.$valid) {
            $scope.updateModel.UpdateKruidenFormule(kruidenFormuleId, kruidenformule);

            // // Daarna de kruidenFormuleEnKruiden vullen
            $scope.updateModel.UpdateKruidenFormulesEnKruiden(kruidenFormuleId, $scope.selectedKruiden, $scope.kruidenFormuleModel.GetKruidData(kruidenFormuleId));

            // Daarna de kruidenformuleEnSymptomen vullen
            $scope.updateModel.UpdateKruidenFormulesEnSymptomen(kruidenFormuleId, $scope.selectedSymptomen, $scope.kruidenFormuleModel.GetSymptoomData(kruidenFormuleId));
        } else {
            console.log("Invalid");
        }
    }

    $scope.querySearch = function (query, type) {
        switch (type) {
            case 'kruid':
                var results = query ? $scope.kruiden.filter(createFilterFor(query, type)) : $scope.kruiden,
                    deferred;
                break;
            case 'symptoom':
                var results = query ? $scope.symptomen.filter(createFilterFor(query, type)) : $scope.symptomen,
                    deferred;
                break;
            default:
                break;
        }
        if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    };

    function createFilterFor(query, type) {
        var lowercaseQuery = query.toLowerCase();

        // console.log(lowercaseQuery);
        switch (type) {
            case 'kruid':
                return function filterFn(kruiden) {
                    return (kruiden.Nederlands.toLowerCase().indexOf(lowercaseQuery) === 0);
                };
            // console.log(kruiden);
            case 'symptoom':
                return function filterFn(symptomen) {
                    return (symptomen.Naam.toLowerCase().indexOf(lowercaseQuery) === 0);
                };
            default:
                break;
        }
    }
}]);