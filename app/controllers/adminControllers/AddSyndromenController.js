var app = angular.module('AddSyndromenController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('AddSyndromenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {

    $scope.syndroom = {
        "Nederlands": "",
        "Engels": "",
        "Pinjin": "",
        "Werking": "",
        "Tong": "",
        "Pols": "",
        "ContraIndicaties": ""
    }

    // $scope.symptoom = {
    //     "Naam": ""
    // }

    // console.log($scope.chineseKruiden);

    $scope.selectedKruidenFormules = [];
    $scope.selectedPatentFormules = [];

    $scope.selectedItemChangeKruidenFormule = function (kruidenFormule) {
        if (kruidenFormule != undefined) {
            if (kruidenFormule.Naam != "" && !$scope.selectedKruidenFormules.includes(kruidenFormule.Naam)) {
                $scope.selectedKruidenFormules.push(kruidenFormule);
            }
        }
    }

    $scope.selectedItemChangePatentFormule = function (patentFormule) {
        if (patentFormule != undefined) {
            if (patentFormule.Pinjin != "" && !$scope.selectedPatentFormules.includes(patentFormule.Pinjin)) {
                $scope.selectedPatentFormules.push(patentFormule);
            }
        }
    }

    $scope.updateSyndroom = function (patentformule) {
        // gebruik selectedKruiden | selectedSymptomen
        // Eerst kruidenformule inserten in de database en het niewe id terugkrijgen
        console.log(patentformule);
        console.log($scope.selectedKruidenFormules);
        console.log($scope.selectedPatentFormules);

        // let id = $scope.addDataModel.InsertIntoPatentFormules(patentformule);
        // console.log(id);

        // // Daarna de kruidenFormuleEnKruiden vullen
        // $scope.addDataModel.InsertIntoChineseKruidenEnPatentFormules(id, $scope.selectedChineseKruiden);

        // // Daarna de kruidenformuleEnSymptomen vullen
        // $scope.addDataModel.InsertIntoPatentFormulesEnSymptomen(id, $scope.selectedSymptomen);
    }

    $scope.querySearch = function (query, type) {
        console.log(type);
        switch (type) {
            case 'kruidenformule':
                var results = query ? $scope.kruidenFormules.filter(createFilterFor(query, type)) : $scope.kruidenFormules,
                    deferred;
                break;
            case 'patentformule':
                var results = query ? $scope.patentFormules.filter(createFilterFor(query, type)) : $scope.patentFormules,
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
            case 'kruidenformule':

                console.log("hallo");
                return function filterFn(kruidenFormules) {
                    return (kruidenFormules.Naam.toLowerCase().indexOf(lowercaseQuery) === 0);
                };
            case 'patentformule':
                return function filterFn(patentFormules) {
                    return (patentFormules.Pinjin.toLowerCase().indexOf(lowercaseQuery) === 0);
                };
            default:
                break;
        }
    }
}]);