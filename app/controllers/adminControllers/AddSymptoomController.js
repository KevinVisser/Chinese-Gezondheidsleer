var app = angular.module('AddSymptoomController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('AddSymptoomController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    // Dit moet later verwijderd worden --> Moet in de form even validation toevoegen.
    $scope.symptoom = {
        "Naam": ""
    }

    // $scope.datamodel = new AddDataModel();

    $scope.symptoomData = $scope.addDataModel.GetSymptomen();

    $scope.updateSymptoom = function (symptoom) {
        console.log("good");
        $scope.addDataModel.InsertIntoSymptomen(symptoom);
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