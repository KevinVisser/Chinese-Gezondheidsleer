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
            let id = $scope.addDataModel.InsertIntoPatentFormules(patentformule);
            console.log(id);

            // Daarna de kruidenFormuleEnKruiden vullen
            $scope.addDataModel.InsertIntoChineseKruidenEnPatentFormules(id, $scope.selectedChineseKruiden);

            // Daarna de kruidenformuleEnSymptomen vullen
            $scope.addDataModel.InsertIntoPatentFormulesEnSymptomen(id, $scope.selectedSymptomen);
        } else {
            console.log("Invalid");
        }
        // gebruik selectedKruiden | selectedSymptomen
        // Eerst kruidenformule inserten in de database en het niewe id terugkrijgen

    }

    $scope.querySearch = function (query, type) {
        console.log(type);
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

        console.log(lowercaseQuery);

        switch (type) {
            case 'chineesKruid':

                console.log("hallo");
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