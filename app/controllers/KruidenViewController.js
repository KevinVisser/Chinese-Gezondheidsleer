var app = angular.module('KruidenViewController', ['ngRoute', 'myAppRouter']);

app.controller('KruidenViewController', ['$routeParams', '$scope', '$location', '$mdDialog', function ($routeParams, $scope, $location, $mdDialog) {
    $scope.kruid = $scope.kruidenModel.GetSpecificKruid($routeParams.KruidId);

    var dir = "./resources/Aantekeningen/Kruiden/";
    var bestand = $routeParams.KruidId + ".txt";

    $scope.smessage = function () {
        var aantekening = document.getElementById("aantekening").value;

        fs.readFile(bestand, function (err) {
            try {
                fs.writeFileSync(dir + bestand, aantekening);
            } catch (err) {
            }
        });
    }

    fs.readFile(dir + bestand, "UTF-8", function (err, contents) {
        //check if dir exists        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        if (!fs.existsSync(dir + bestand)) {
            fs.writeFileSync(dir + bestand, "");
        }
        if (err) {
        } else {
            $scope.kruid.message = contents;
        }
    });

    $scope.GoToView = function () {
        $location.path('/Kruiden')
    }

    $scope.showConfirm = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Weet je zeker dat je dit kruid wil verwijderen?')
            .textContent('Dit verwijdert het kruid uit de database.')
            .ariaLabel('Verwijder kruid')
            .targetEvent(ev)
            .cancel('Ja')
            .ok('Nee');

        $mdDialog.show(confirm).then(function () {
        }, function () {
            $scope.deleteKruid($scope.kruid)
        });
    };

    $scope.deleteKruid = function (kruid) {
        $scope.addDataModel.DeleteKruid(kruid.Id);
        $location.path('/Kruiden');
    }

    $scope.GoToEdit = function () {
        $location.path('/Admin/Edit/Kruid/' + $scope.kruid.Id)
    }
}]);