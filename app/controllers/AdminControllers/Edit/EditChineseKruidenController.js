var app = angular.module('EditChineseKruidenController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('EditChineseKruidenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.updateModel = new UpdataDataModel();
    $scope.chineseKruidenModel = new ChineseKruidenModel();
    $scope.symptoomModel = new SymptomenModel();

    let chineesKruidId = $routeParams.Id;

    $scope.chineesKruid = $scope.chineseKruidenModel.GetSpecificKruid(chineesKruidId);
    $scope.symptomen = $scope.symptoomModel.GetAllData();

    $scope.selectedSymptomen = $scope.chineseKruidenModel.GetSymptoomData(chineesKruidId);

    console.log($routeParams, chineesKruidId, $scope.selectedSymptomen);

    $scope.updateChineesKruid = function (chineesKruid, form) {
        //Insert into chinese kruiden table
        if (form.$valid) {
            $scope.updateModel.UpdateChineseKruiden(chineesKruidId, chineesKruid)

            //Insert selected symptoms in symptomen table
            $scope.updateModel.UpdateChineseKruidenEnSymptomen(chineesKruidId, $scope.selectedSymptomen, $scope.chineseKruidenModel.GetSymptoomData(chineesKruidId));
        } else {
            console.log("Invalid");
        }

    }

    $scope.removeSymptoom = function (symptoom) {
        let position = $scope.selectedSymptomen.indexOf(symptoom)
        console.log(symptoom);

        if ($scope.selectedSymptomen.includes(symptoom)) {
            $scope.selectedSymptomen.splice(position, 1);
        }
    }

    $scope.selectedItemChangeSymptoom = function (symptoom) {
        if (symptoom != undefined) {
            if (symptoom.Naam != "" && !$scope.selectedSymptomen.includes(symptoom.Naam)) {
                $scope.selectedSymptomen.push(symptoom);
            }
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