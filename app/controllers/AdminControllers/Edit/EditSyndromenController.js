var app = angular.module('EditSyndromenController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('EditSyndromenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    // Models
    $scope.updateModel = new UpdataDataModel();
    $scope.kruidenModel = new KruidenModel();
    $scope.patentFormuleModel = new PatentFormulesModel();
    $scope.kruidenFormuleModel = new KruidenFormulesModel();
    $scope.syndroomModel = new SyndromenModel();
    $scope.symptoomModel = new SymptomenModel();
    $scope.chineseKruidenModel = new ChineseKruidenModel();

    $scope.syndromen = $scope.syndroomModel.GetRelevantData();
    $scope.kruiden = $scope.kruidenModel.GetAllData();
    $scope.chineseKruiden = $scope.chineseKruidenModel.GetAllData();
    $scope.symptomen = $scope.symptoomModel.GetAllData();

    $scope.kruidenFormules = $scope.kruidenFormuleModel.GetRelevantData();
    $scope.patentFormules = $scope.patentFormuleModel.GetRelevantData();

    // Variables
    let syndroomId = $routeParams.Id;



    $scope.syndroom = $scope.syndroomModel.GetSpecificData(syndroomId);

    console.log($scope.syndroom);

    $scope.selectedKruidenFormules = $scope.syndroomModel.GetKruidenFormuleData(syndroomId);
    $scope.selectedPatentFormules = $scope.syndroomModel.GetPatentFormuleData(syndroomId);
    $scope.selectedSymptomen = $scope.syndroomModel.GetSymptoomData(syndroomId);

    $scope.hoofdSymptomen = $scope.syndroom.Hoofdsymptoom;

    // Functions
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
            if (hoofdSymptoom.Naam != "" && !$scope.hoofdSymptomen.includes(hoofdSymptoom)) {
                $scope.syndroom.Hoofdsymptoom += ", " + hoofdSymptoom.Naam;
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
            $scope.updateModel.UpdateSyndroom(syndroomId, syndroom);

            $scope.updateModel.UpdateActieFormules(syndroomId, $scope.selectedPatentFormules, $scope.selectedKruidenFormules)

            $scope.updateModel.UpdateSyndromenEnSymptomen(syndroomId, $scope.selectedSymptomen, $scope.syndroomModel.GetSymptoomData(syndroomId))
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