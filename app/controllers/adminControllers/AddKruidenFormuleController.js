var app = angular.module('AddKruidenFormuleController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('AddKruidenFormuleController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    // Dit moet later verwijderd worden --> Moet in de form even validation toevoegen.
    $scope.kruidenformule = {
        "Naam": "",
        "Werking": "",
        "ContraIndicatie": ""
    }

    $scope.symptoom = {
        "Naam": ""
    }


    $scope.selectedKruiden = [];
    $scope.selectedSymptomen = [];

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

    $scope.updateKruidenFormule = function (kruidenformule) {
        // gebruik selectedKruiden | selectedSymptomen
        console.log($scope.selectedKruiden);
        // Eerst kruidenformule inserten in de database en het niewe id terugkrijgen

        let id = $scope.addDataModel.InsertIntoKruidenFormules(kruidenformule);
        console.log(id);

        // Daarna de kruidenFormuleEnKruiden vullen
        $scope.addDataModel.InsertIntoKruidenFormulesEnKruiden(id, $scope.selectedKruiden);

        // Daarna de kruidenformuleEnSymptomen vullen
        $scope.addDataModel.InsertIntoKruidenFormulesEnSymptomen(id, $scope.selectedSymptomen);
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