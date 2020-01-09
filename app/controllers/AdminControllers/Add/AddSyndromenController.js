var app = angular.module('AddSyndromenController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('AddSyndromenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {

    $scope.syndroom = {
        "Nederlands": "",
        "Engels": "",
        "Pinjin": "",
        "Werking": "",
        "Tong": "",
        "Pols": "",
        "Hoofdsymptoom": "",
        "ContraIndicaties": ""
    }

    // $scope.symptoom = {
    //     "Naam": ""
    // }

    // console.log($scope.chineseKruiden);

    $scope.selectedKruidenFormules = [];
    $scope.selectedPatentFormules = [];
    $scope.selectedSymptomen = [];
    $scope.selectedHoofdSymptomen = [];

    $scope.removeSymptoom = function (symptoom) {
        let position = $scope.selectedSymptomen.indexOf(symptoom)
        console.log(symptoom);

        if ($scope.selectedSymptomen.includes(symptoom)) {
            $scope.selectedSymptomen.splice(position, 1);
        }
    }

    $scope.removeHoofdSymptoom = function (hoofdSymptoom) {
        let position = $scope.selectedHoofdSymptomen.indexOf(hoofdSymptoom)
        console.log(symptoom);

        if ($scope.selectedHoofdSymptomen.includes(hoofdSymptoom)) {
            $scope.selectedHoofdSymptomen.splice(position, 1);
        }
    }

    $scope.removeKruidenFormule = function (kruidenformule) {
        let position = $scope.selectedKruidenFormules.indexOf(kruidenformule)

        if ($scope.selectedKruidenFormules.includes(kruidenformule)) {
            $scope.selectedKruidenFormules.splice(position, 1);
        }
    }

    $scope.removePatentFormule = function (patentformule) {
        let position = $scope.selectedPatentFormules.indexOf(patentformule)

        if ($scope.selectedPatentFormules.includes(patentformule)) {
            $scope.selectedPatentFormules.splice(position, 1);
        }
    }

    $scope.selectedItemChangeSymptoom = function (symptoom) {
        if (symptoom != undefined) {
            if (symptoom.Naam != "" && !$scope.selectedSymptomen.includes(symptoom)) {
                $scope.selectedSymptomen.push(symptoom);
            }
        }
    }

    $scope.selectedItemChangeHoofdSymptoom = function (hoofdSymptoom) {
        if (hoofdSymptoom != undefined) {
            if (hoofdSymptoom.Naam != "" && !$scope.selectedSymptomen.includes(hoofdSymptoom)) {

                $scope.selectedHoofdSymptomen.push(hoofdSymptoom.Naam);
            }
        }
    }

    $scope.selectedItemChangeKruidenFormule = function (kruidenFormule) {
        if (kruidenFormule != undefined) {
            if (kruidenFormule.Naam != "" && !$scope.selectedKruidenFormules.includes(kruidenFormule)) {
                $scope.selectedKruidenFormules.push(kruidenFormule);
            }
        }
    }

    $scope.selectedItemChangePatentFormule = function (patentFormule) {
        if (patentFormule != undefined) {
            if (patentFormule.Pinjin != "" && !$scope.selectedPatentFormules.includes(patentFormule)) {
                $scope.selectedPatentFormules.push(patentFormule);
            }
        }
    }
    $scope.updateSyndroom = function (syndroom, form) {
        if (form.$valid) {
            $scope.syndroom.Hoofdsymptoom = $scope.selectedHoofdSymptomen.join(", ")

            //Insert syndroom into syndromen table
            let id = $scope.addDataModel.InsertIntoSyndromen(syndroom);
            console.log(id);

            // Daarna de ActieFormules vullen
            $scope.addDataModel.InsertIntoActieFormules(id, $scope.selectedPatentFormules, $scope.selectedKruidenFormules);

            console.log(id);
            // Daarna de kruidenformuleEnSymptomen vullen
            $scope.addDataModel.InsertIntoSyndromenEnSymptomen(id, $scope.selectedSymptomen);
        } else {
            console.log("Invalid");
        }


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
            case 'kruidenformule':

                console.log("hallo");
                return function filterFn(kruidenFormules) {
                    return (kruidenFormules.Naam.toLowerCase().indexOf(lowercaseQuery) === 0);
                };
            case 'patentformule':
                return function filterFn(patentFormules) {
                    return (patentFormules.Pinjin.toLowerCase().indexOf(lowercaseQuery) === 0);
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