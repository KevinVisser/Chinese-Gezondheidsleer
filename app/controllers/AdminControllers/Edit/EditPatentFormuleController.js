var app = angular.module('EditPatentFormuleController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('EditPatentFormuleController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
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
        let add = true;
        if (chineesKruid != undefined && chineesKruid.Pinjin != "") {
            for (let index = 0; index < $scope.selectedChineseKruiden.length; index++) {
                if (chineesKruid.Pinjin == $scope.selectedChineseKruiden[index].Pinjin) {
                    add = false;
                    console.log("False");
                    break;
                }
            }
            if (add) {
                $scope.selectedChineseKruiden.push(chineesKruid)
            }
        }
    }

    $scope.selectedItemChangeSymptoom = function (symptoom) {
        let add = true;
        if (symptoom != undefined && symptoom.Naam != "") {
            for (let index = 0; index < $scope.selectedSymptomen.length; index++) {
                if (symptoom.Naam == $scope.selectedSymptomen[index].Naam) {
                    add = false;
                    break;
                }
            }
            if (add) {
                $scope.selectedSymptomen.push(symptoom)
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
    }

    // $scope.querySearch = function (query, type) {
    //     console.log("hello");
    //     switch (type) {
    //         case 'chineesKruid':
    //             var results = query ? $scope.chineseKruiden.filter(createFilterFor(query, type)) : $scope.chineseKruiden,
    //                 deferred;
    //             break;
    //         case 'symptoom':
    //             var results = query ? $scope.symptomen.filter(createFilterFor(query, type)) : $scope.symptomen,
    //                 deferred;
    //             break;
    //         default:
    //             break;
    //     }
    //     if (self.simulateQuery) {
    //         deferred = $q.defer();
    //         $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
    //         return deferred.promise;
    //     } else {
    //         return results;
    //     }
    // };

    // function createFilterFor(query, type) {
    //     var lowercaseQuery = query.toLowerCase();
    //     switch (type) {
    //         case 'chineesKruid':
    //             return function filterFn(chineseKruiden) {
    //                 return (chineseKruiden.Pinjin.toLowerCase().indexOf(lowercaseQuery) === 0);
    //             };
    //         case 'symptoom':
    //             return function filterFn(symptomen) {
    //                 return (symptomen.Naam.toLowerCase().indexOf(lowercaseQuery) === 0);
    //             };
    //         default:
    //             break;
    //     }
    // }
}]);