var app = angular.module('AddSymptoomController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('AddSymptoomController', ['$routeParams', '$scope', '$location', '$mdDialog', function ($routeParams, $scope, $location, $mdDialog) {
    $scope.symptoom = {
        "Naam": ""
    }

    $scope.symptoomData = $scope.addDataModel.GetSymptomen();

    $scope.updateSymptoom = function (symptoom, form) {
        if (form.$valid) {
            console.log("good");
            $scope.addDataModel.InsertIntoSymptomen(symptoom);
        } else {
            console.log("Invalid");
        }
    }

    $scope.showConfirm = function (ev, symptoom) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Weet je zeker dat je dit symptoom wil verwijderen?')
            .textContent('Dit verwijdert het symptoom uit de database.')
            .ariaLabel('Verwijder symptoom')
            .targetEvent(ev)
            .cancel('Ja')
            .ok('Nee');

        $mdDialog.show(confirm).then(function () {
            console.log("je hebt", symptoom, "verwijdert");
        }, function () {
            $scope.deleteSymptoom(symptoom)
        });
    };

    $scope.deleteSymptoom = function (symptoom) {
        $scope.addDataModel.DeleteSymptoom(symptoom.Id);
        $scope.symptoomData = $scope.addDataModel.GetSymptomen();
    }
}]);

app.directive('ngConfirmClick', [
    function () {
        return {
            link: function (scope, element, attr) {
                console.log("Hello");
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click', function (event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }
]);