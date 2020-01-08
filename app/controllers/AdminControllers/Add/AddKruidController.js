var app = angular.module('AddKruidController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('AddKruidController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    // Dit moet later verwijderd worden --> Moet in de form even validation toevoegen.

    $scope.kruid = {
        "Nederlands": "",
        "Latijns": "",
        "Familie": "",
        "Inhoudsstoffen": "",
        "Toepassing": "",
        "Eigenschappen": "",
        "Actie": "",
        "Gebruik": "",
        "LetOp": "",
        "Smaak": "",
        "Dosering": "",
        "ThermischeWerking": "",
        "GebruikteDelen": "",
        "Orgaan": ""
    }

    $scope.updateKruid = function (kruid, form) {

        if (form.$valid) {
            $scope.addDataModel.InsertIntoKruiden(kruid)
            $scope.kruid = null;
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