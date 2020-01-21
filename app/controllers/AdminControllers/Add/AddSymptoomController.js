var app = angular.module('AddSymptoomController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('AddSymptoomController', ['$routeParams', '$scope', '$location', '$mdDialog', function ($routeParams, $scope, $location, $mdDialog) {
    $scope.symptoom = {
        "Naam": ""
    }

    $scope.symptoomData = $scope.addDataModel.GetSymptomen();

    $scope.updateSymptoom = function (symptoom, form) {
        if (form.$valid) {
            $scope.addDataModel.InsertIntoSymptomen(symptoom);
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