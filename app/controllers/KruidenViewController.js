var app = angular.module('KruidenViewController', ['ngRoute', 'myAppRouter']);
const fs = require("fs");
const readline = require('readline');

app.controller('KruidenViewController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    this.KruidenModel = new KruidenModel();
    var bestand = "assets/aantekeningen/Kruiden.txt";

    $scope.kruid = this.KruidenModel.GetSpecificKruid($routeParams.KruidId);

    $scope.smessage = function () {
       var aantekening = document.getElementById("aantekeningText").value;
       aantekening = aantekening.replace(/\n\r?/g, '<br />');
        
        fs.readFile(bestand, function(err) {
            if (err) {
                console.log("rf1: ", err);
                //If you want to force the file to be empty then you want to use the 'w' flag:
                fs.openSync(bestand, 'w');
                fs.closeSync(fs.openSync(bestand, 'w'));
            }
            fs.writeFile(bestand, $routeParams.KruidId + "||" + aantekening, { flag: "wx"}, function (err) {
                console.log("wf: ", err);
            });
        });
    }

    // $scope.kruid.message = fs.readFileSync(bestand, 'utf8');
    // if ($scope.kruid.message != null) {
    //     fs.closeSync(fs.readFileSync(bestand, 'utf8'));        
    // }

    
    fs.readFile(bestand, "UTF-8", function(err, contents) {
        var i =0;
        if (err) {
            console.log("rf: ", err);
        } else {
            console.log(contents);
            $scope.kruid.message = contents;
        }
        fs.close();
    });
    

    $scope.GoToView = function () {
        $location.path('/Kruiden')
    }
}]);