var app = angular.module('ChineseKruidenViewController', ['ngRoute', 'myAppRouter']);

app.controller('ChineseKruidenViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    this.KruidenModel = new ChineseKruidenModel();

    $scope.kruid = this.KruidenModel.GetSpecificKruid($routeParams.ChineesKruidId);

    var dir = "assets/aantekeningen/ChineseKruiden/";
    var bestand = $routeParams.ChineesKruidId + ".txt";
    
    $scope.smessage = function () {
        var aantekening = document.getElementById("aantekening").value;
        
        fs.readFile(bestand, function(err) {
            try {
                fs.writeFileSync(dir + bestand, aantekening);
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
        $location.path('/ChineseKruiden')
    }
}]);