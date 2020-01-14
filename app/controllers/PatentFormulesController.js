var app = angular.module('PatentFormulesController', ['ngRoute', 'myAppRouter'])

app.controller('PatentFormulesController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.PatentFormulesModel = new PatentFormulesModel();

    $scope.patentFormules = $scope.PatentFormulesModel.GetRelevantData();

    $scope.GoToView = function (id) {
        console.log(id);
        $location.path('/PatentFormules/' + id)
    }

    $scope.GoToEdit = function (id) {
        $location.path('/Admin/Edit/PatentFormule/' + id);
    }
}]);


app.filter('split', function() {
    return function(items, search) {
        
        if (!search) {
            return items;
        }

        return items.filter(function(element, index, array) {
            console.log("s: ", search);
            console.log("e :", element);
            
            if (element.Nederlands != null && search.Nederlands != null && search.Nederlands != "") {
                var tmp = element.Nederlands.toLowerCase();
                var tmp2 = search.Nederlands.toLowerCase();

                if(tmp != null) {
                    var ned = tmp.includes(tmp2);
                }
            }
            if (element.Engels != null && search.Engels != null && search.Engels != "") {
                var tmp = element.Engels.toLowerCase();
                var tmp2 = search.Engels.toLowerCase();

                if(tmp != null) {                    
                    var eng = tmp.includes(tmp2);
                }
            }
            //hier moet de return
            
        });
    }
});