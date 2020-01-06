var app = angular.module('KruidenViewController', ['ngRoute', 'myAppRouter']);

app.controller('KruidenViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    this.KruidenModel = new KruidenModel();

    $scope.kruid = this.KruidenModel.GetSpecificKruid($routeParams.KruidId);

    var dir = "assets/aantekeningen/Kruiden/";
    var bestand = $routeParams.KruidId + ".txt";

    $scope.smessage = function () {
        var aantekening = document.getElementById("aantekening").value;
        
        fs.readFile(bestand, function(err) {
            try {
                fs.writeFileSync(bestand, aantekening);
            } catch (err) {
                console.log("wf2: ", err);
            }
        });
    }

    fs.readFile(dir+bestand, "UTF-8", function(err, contents) {
        //check if dir exists        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        if (!fs.existsSync(dir+bestand)) {
            fs.writeFileSync(dir+bestand, "");
        }
        if (err) {
            console.log("rf: ", err);
        } else {
            $scope.kruid.message = contents;
        }
    });  

    $scope.GoToView = function () {
        $location.path('/Kruiden')
    }
}]);