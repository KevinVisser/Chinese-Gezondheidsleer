var app = angular.module('KruidenFormulesViewController', ['ngRoute', 'myAppRouter'])

app.controller('KruidenFormulesViewController', ['$routeParams', '$scope', '$location', '$mdDialog', function ($routeParams, $scope, $location, $mdDialog) {
    $scope.KruidenFormulesModel = new KruidenFormulesModel();
    $scope.addDataModel = new AddDataModel();

    $scope.kruidenFormules = $scope.KruidenFormulesModel.GetSpecificData($routeParams.KruidenFormuleId);

    $scope.kruiden = $scope.KruidenFormulesModel.GetKruidData($routeParams.KruidenFormuleId);

    var dir = "./resources/Aantekeningen/Kruidenformule/";
    var bestand = $routeParams.KruidenFormuleId + ".txt";

    $scope.smessage = function () {
        var aantekening = document.getElementById("aantekening").value;

        fs.readFile(bestand, function (err) {
            try {
                fs.writeFileSync(dir + bestand, aantekening);
            } catch (err) {
                console.log("wf2: ", err);
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
            console.log("rf: ", err);
        } else {
            $scope.kruiden.message = contents;
        }
    });

    $scope.GoToView = function () {
        $location.path('/KruidenFormules')
    }

    $scope.showConfirm = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Weet je zeker dat je dit Kruidenformule wil verwijderen?')
            .textContent('Dit verwijdert het Kruidenformule uit de database.')
            .ariaLabel('Verwijder Kruidenformule')
            .targetEvent(ev)
            .cancel('Ja')
            .ok('Nee');

        $mdDialog.show(confirm).then(function () {
        }, function () {
            $scope.deleteKruidenFormule($scope.kruidenFormules)
        });
    };

    $scope.deleteKruidenFormule = function (Kruidenformule) {
        $scope.addDataModel.DeleteKruidenFormule(Kruidenformule.Id);
        $location.path('/KruidenFormules');
    }

    $scope.GoToEdit = function () {
        $location.path('/Admin/Edit/KruidenFormule/' + $scope.kruidenFormules.Id)
    }
}]);