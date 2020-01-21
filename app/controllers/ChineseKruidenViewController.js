var app = angular.module('ChineseKruidenViewController', ['ngRoute', 'myAppRouter']);

app.controller('ChineseKruidenViewController', ['$routeParams', '$scope', '$location', '$mdDialog', function ($routeParams, $scope, $location, $mdDialog) {
    this.KruidenModel = new ChineseKruidenModel();
    $scope.addDataModel = new AddDataModel();

    $scope.kruid = this.KruidenModel.GetSpecificKruid($routeParams.ChineesKruidId);

    var dir = "./resources/Aantekeningen/ChineseKruiden/";
    var bestand = $routeParams.ChineesKruidId + ".txt";

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

    $scope.showConfirm = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Weet je zeker dat je dit Chinees kruid wil verwijderen?')
            .textContent('Dit verwijdert het Chinees kruid uit de database.')
            .ariaLabel('Verwijder Chinees kruid')
            .targetEvent(ev)
            .cancel('Ja')
            .ok('Nee');

        $mdDialog.show(confirm).then(function () {
        }, function () {
            $scope.deleteChineesKruid($scope.kruid)
        });
    };

    $scope.deleteChineesKruid = function (kruid) {
        $scope.addDataModel.DeleteChineesKruid(kruid.Id);
        $location.path('/ChineseKruiden');
    }

    $scope.GoToView = function () {
        $location.path('/ChineseKruiden')
    }

    $scope.GoToEdit = function () {
        $location.path('/Admin/Edit/ChineesKruid/' + $scope.kruid.Id)
    }
}]);