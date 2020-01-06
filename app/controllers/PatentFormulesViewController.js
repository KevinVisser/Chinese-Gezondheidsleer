var app = angular.module('PatentFormulesViewController', ['ngRoute', 'myAppRouter'])

app.controller('PatentFormulesViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.PatentFormulesModel = new PatentFormulesModel();

    $scope.patentformules = $scope.PatentFormulesModel.GetSpecificData($routeParams.PatentFormuleId);
    $scope.chineseKruiden = $scope.PatentFormulesModel.GetKruidData($routeParams.PatentFormuleId);

    var dir = "assets/aantekeningen/Patentformule/";
    var bestand = $routeParams.PatentFormuleId + ".txt";
    
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
            $scope.patentformules.message = contents;
        }
    });

    $scope.GoToView = function () {
        $location.path('/PatentFormules')
    }
}]);