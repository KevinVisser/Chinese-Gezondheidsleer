var app = angular.module('ZoekenController', ['ngRoute', 'myAppRouter'])

app.controller('ZoekenController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {

    $scope.inputs = [{}];
    $scope.data = [];

    $scope.addfield=function(){
        if ($scope.inputs.length < 5) { 
            $scope.inputs.push({});
        }
    }
    $scope.removefield=function(){
        if ($scope.inputs.length > 0) { 
            $scope.inputs.pop();
        }
    }

    $scope.GoBack = function () {
        $location.path('/PatentFormules');
    }

    $scope.GoToView = function () {
        var str = "";
        // maakt een string van de array
        $scope.inputs.forEach(element => {
            if (element.value == null) {} else {
                str += element.value + ",";
            }
        });

        str = str.substring(0, str.length - 1);
        
        $location.path('/ZoekenView/').search({tong: $scope.data.tong, pols: $scope.data.pols, symptomen: str});
    }
}]);