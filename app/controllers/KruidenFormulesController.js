var app = angular.module('KruidenFormulesController', ['ngRoute', 'myAppRouter'])

app.controller('KruidenFormulesController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.KruidenFormulesModel = new KruidenFormulesModel();

    $scope.kruidenFormules = $scope.KruidenFormulesModel.GetRelevantData();

    $scope.object = function (kruidenformules) {
        for (let i = 0; i < kruidenformules.length; i++) {
           kruidenformules[i].kruidnaam = $scope.KruidenFormulesModel.GetKruidData(kruidenformules[i].Id);
           kruidenformules[i].symptomen = $scope.KruidenFormulesModel.GetSymptoomData(kruidenformules[i].Id);
        }
    };
    
    $scope.ShowKruidenNederlands = function(kruidenformule) {
        var string = "";
        kruidenformule.kruidnaam.forEach(element => {
            string = string.concat(element.Nederlands + ", ");
        });
        string = string.substr(0, string.length - 2);
        return string;
    }

    $scope.ShowKruidenLatijns = function(kruidenformule) {
        var string = "";
        kruidenformule.kruidnaam.forEach(element => {
            if (element.Latijns != null) {
                string = string.concat(element.Latijns + ", ");
            }
        });
        string = string.substr(0, string.length - 2);
        return string;
    }

    $scope.ShowSymptomen = function(kruidenformule) {
        var string = "";
        kruidenformule.symptomen.forEach(element => {
            if (element.Naam != null) {
                string = string.concat(element.Naam + ", ");
            }
        });
        string = string.substr(0, string.length - 2);
        return string;
    }

    $scope.object($scope.kruidenFormules);
    $scope.GoToView = function (id) {
        $location.path('/KruidenFormules/' + id)
    }
}]);