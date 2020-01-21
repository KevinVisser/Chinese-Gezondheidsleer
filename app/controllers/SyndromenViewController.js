var app = angular.module('SyndromenViewController', ['ngRoute', 'myAppRouter'])

app.controller('SyndromenViewController', ['$routeParams', '$scope', '$location', '$mdDialog', function ($routeParams, $scope, $location, $mdDialog) {

    $scope.syndromen = $scope.syndroomModel.GetSpecificData($routeParams.SyndroomId);
    $scope.symptomen = $scope.syndroomModel.GetSymptoomData($routeParams.SyndroomId);
    $scope.formules = $scope.syndroomModel.GetFormules($routeParams.SyndroomId);

    var dir = "./resources/Aantekeningen/syndroom/";
    var bestand = $routeParams.SyndroomId + ".txt";

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
            $scope.syndromen.message = contents;
        }
    });

    $scope.GoToView = function () {
        $location.path('/Syndromen');
    }

    $scope.GoToViewPF = function (id) {
        $location.path('/PatentFormules/' + id);
    }

    $scope.GoToViewKF = function (id) {
        $location.path('/KruidenFormules/' + id);
    }

    $scope.showConfirm = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Weet je zeker dat je dit syndroom wil verwijderen?')
            .textContent('Dit verwijdert het syndroom uit de database.')
            .ariaLabel('Verwijder syndroom')
            .targetEvent(ev)
            .cancel('Ja')
            .ok('Nee');

        $mdDialog.show(confirm).then(function () {
        }, function () {
            $scope.deleteSyndroom($scope.syndromen)
        });
    };

    $scope.deleteSyndroom = function (syndroom) {
        $scope.addDataModel.DeleteSyndroom(syndroom.Id);
        $location.path('/Syndromen');
    }

    $scope.GoToEdit = function () {
        $location.path('/Admin/Edit/Syndroom/' + $scope.syndromen.Id)
    }
}]);