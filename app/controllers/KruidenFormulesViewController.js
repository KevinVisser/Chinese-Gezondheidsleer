var app = angular.module('KruidenFormulesViewController', ['ngRoute', 'myAppRouter'])

app.controller('KruidenFormulesViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.KruidenFormulesModel = new KruidenFormulesModel();

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
}]);