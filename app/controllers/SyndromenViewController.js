var app = angular.module('SyndromenViewController', ['ngRoute', 'myAppRouter'])

app.controller('SyndromenViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.SyndromenModel = new SyndromenModel();

    $scope.syndromen = $scope.SyndromenModel.GetSpecificData($routeParams.SyndroomId);
    $scope.symptomen = $scope.SyndromenModel.GetSymptoomData($routeParams.SyndroomId);
    $scope.formules = $scope.SyndromenModel.GetFormules($routeParams.SyndroomId);

    var dir = "assets/aantekeningen/syndroom/";
    var bestand = $routeParams.SyndroomId + ".txt";

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
}]);