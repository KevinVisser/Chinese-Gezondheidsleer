var app = angular.module('ZoekenKFController', ['ngRoute', 'myAppRouter'])

app.controller('ZoekenKFController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {

    $scope.inputs1 = [{}];
    $scope.inputs2 = [{}];
    $scope.inputs3 = [{}];
    $scope.data = [];

    $scope.addfield=function(num){
        switch (num) {
            case 1:
                if ($scope.inputs1.length < 5) { 
                    $scope.inputs1.push({});
                }
                break;
            case 2:
                if ($scope.inputs2.length < 5) { 
                    $scope.inputs2.push({});
                }
                break;
            case 3:
                if ($scope.inputs3.length < 5) { 
                    $scope.inputs3.push({});
                }
                break;
            
            default:
                break;
        }
        
    }
    $scope.removefield=function(num){
        switch (num) {
            case 1:
                if ($scope.inputs1.length > 0) { 
                    $scope.inputs1.pop();
                }
                break;
            case 2:
                if ($scope.inputs2.length > 0) { 
                    $scope.inputs2.pop();
                }
                break;
            case 3:
                if ($scope.inputs3.length > 0) { 
                    $scope.inputs3.pop();
                }
                break;
        
            default:
                break;
        }
        
    }

    $scope.GoBack = function () {
        $location.path('/KruidenFormules');
    }

    $scope.GoToView = function () {
        var str1 = "";
        var str2 = "";
        var str3 = "";
        
        // maakt een string van de array om het mee te sturen naar de volgende view
        $scope.inputs1.forEach(element => {
            if (element.value == null) {} else {
                str1 += element.value + ",";
            }
        });
        $scope.inputs2.forEach(element => {
            if (element.value == null) {} else {
                str2 += element.value + ",";
            }
        });
        $scope.inputs3.forEach(element => {
            if (element.value == null) {} else {
                str3 += element.value + ",";
            }
        });

        str1 = str1.substring(0, str1.length - 1);
        str2 = str2.substring(0, str2.length - 1);
        str3 = str3.substring(0, str3.length - 1);        
        
        $location.path('/ZoekenViewKF/').search({werking: str1, ingredienten: str2, symptomen: str3});
    }
}]);