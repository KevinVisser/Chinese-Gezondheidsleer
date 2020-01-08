var app = angular.module('EditPatentFormuleController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('EditPatentFormuleController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.updateModel = new UpdataDataModel();
    $scope.chineseKruidenModel = new ChineseKruidenModel();
    $scope.patentFormuleModel = new PatentFormulesModel();
    $scope.symptoomModel = new SymptomenModel();

    let patentFormuleId = $routeParams.Id;

    $scope.chineseKruiden = $scope.chineseKruidenModel.GetAllData();
    $scope.symptomen = $scope.symptoomModel.GetAllData();

    $scope.patentformule = $scope.patentFormuleModel.GetSpecificData(patentFormuleId)

    $scope.selectedSymptomen = $scope.patentFormuleModel.GetSymptoomData(patentFormuleId);
    $scope.selectedChineseKruiden = $scope.patentFormuleModel.GetKruidData(patentFormuleId);

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
            if (chineesKruid.Pinjin != "" && !$scope.selectedChineseKruiden.includes(chineesKruid.Pinjin)) {
                $scope.selectedChineseKruiden.push(chineesKruid);
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

    $scope.updatePatentFormule = function (patentformule, form) {
        if (form.$valid) {
            $scope.updateModel.UpdatePatentFormule(patentFormuleId, patentformule);

            $scope.updateModel.UpdateChineseKruidenEnPatentFormules(patentFormuleId, $scope.selectedChineseKruiden, $scope.patentFormuleModel.GetKruidData(patentFormuleId))

            $scope.updateModel.UpdatePatentFormulesEnSymptomen(patentFormuleId, $scope.selectedSymptomen, $scope.patentFormuleModel.GetSymptoomData(patentFormuleId));
        } else {
            console.log("Invalid");
        }
        // gebruik selectedKruiden | selectedSymptomen
        // Eerst kruidenformule inserten in de database en het niewe id terugkrijgen

    }

    $scope.querySearch = function (query, type) {
        console.log("hello");
        switch (type) {
            case 'chineesKruid':
                var results = query ? $scope.chineseKruiden.filter(createFilterFor(query, type)) : $scope.chineseKruiden,
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
        switch (type) {
            case 'chineesKruid':
                return function filterFn(chineseKruiden) {
                    return (chineseKruiden.Pinjin.toLowerCase().indexOf(lowercaseQuery) === 0);
                };
            case 'symptoom':
                return function filterFn(symptomen) {
                    return (symptomen.Naam.toLowerCase().indexOf(lowercaseQuery) === 0);
                };
            default:
                break;
        }
    }
}]);