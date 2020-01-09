var app = angular.module('AddChineesKruidController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('AddChineesKruidController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    // Dit moet later verwijderd worden --> Moet in de form even validation toevoegen.
    $scope.chineesKruid = {
        "Pinjin": "",
        "Engels": "",
        "Latijn": "",
        "ThermischeWerking": "",
        "Smaak": "",
        "Meridianen": "",
        "Werking": "",
        "ContraIndicaties": "",
        "Dosering": ""
    }

    $scope.selectedSymptomen = [];

    $scope.updateChineesKruid = function (chineesKruid, form) {
        //Insert into chinese kruiden table
        if (form.$valid) {
            let id = $scope.addDataModel.InsertIntoChineseKruiden(chineesKruid)

            //Insert selected symptoms in symptomen table
            $scope.addDataModel.InsertIntoChineseKruidenEnSymptomen(id, $scope.selectedSymptomen);
        } else {
            console.log("Invalid");
        }

    }

    $scope.selectedItemChangeSymptoom = function (symptoom) {
        console.log(symptoom);
        if (symptoom != undefined) {
            if (symptoom.Naam != "" && !$scope.selectedSymptomen.includes(symptoom)) {
                $scope.selectedSymptomen.push(symptoom);
            }
        }
    }

    $scope.removeSymptoom = function (symptoom) {
        let position = $scope.selectedSymptomen.indexOf(symptoom)

        if ($scope.selectedSymptomen.includes(symptoom)) {
            $scope.selectedSymptomen.splice(position, 1);
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