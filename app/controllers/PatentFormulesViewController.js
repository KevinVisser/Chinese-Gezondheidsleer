var app = angular.module('PatentFormulesViewController', ['ngRoute', 'myAppRouter'])

app.controller('PatentFormulesViewController', ['$routeParams', '$scope', '$location', '$mdDialog', function ($routeParams, $scope, $location, $mdDialog) {

    $scope.patentformules = $scope.patentFormuleModel.GetSpecificData($routeParams.PatentFormuleId);
    $scope.chineseKruiden = $scope.patentFormuleModel.GetKruidData($routeParams.PatentFormuleId);

    var dir = "./resources/Aantekeningen/Patentformule/";
    var bestand = $routeParams.PatentFormuleId + ".txt";

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
            $scope.patentformules.message = contents;
        }
    });

    $scope.GoToView = function () {
        $location.path('/PatentFormules')
    }

    $scope.showConfirm = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Weet je zeker dat je dit Patentformule wil verwijderen?')
            .textContent('Dit verwijdert het Patentformule uit de database.')
            .ariaLabel('Verwijder Patentformule')
            .targetEvent(ev)
            .cancel('Ja')
            .ok('Nee');

        $mdDialog.show(confirm).then(function () {
        }, function () {
            $scope.deletePatentFormule($scope.patentformules)
        });
    };

    $scope.deletePatentFormule = function (patentformule) {
        $scope.addDataModel.DeletePatentFormule(patentformule.Id);
        $location.path('/PatentFormules');
    }

    $scope.GoToEdit = function () {
        $location.path('/Admin/Edit/PatentFormule/' + $scope.patentformules.Id)
    }
}]);