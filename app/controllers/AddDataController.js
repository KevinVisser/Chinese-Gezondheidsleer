var app = angular.module('AddDataController', ['ngRoute', 'myAppRouter'])

app.controller('AddDataController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.addDataModel = new AddDataModel();
    this.params = $routeParams;
    $scope.currentForm = "";

    $scope.templates = [
        { name: 'Kruid', url: './app/views/adminViews/AddKruid.html' },
        { name: 'Patentformule', url: './app/views/adminViews/AddPatentFormule.html' },
        { name: 'Kruidenformule', url: './app/views/adminViews/AddKruidenFormule.html' },
        { name: 'Syndroom', url: './app/views/adminViews/AddSyndroom.html' }
    ]

    $scope.toggleForm = function (form) {
        $scope.currentForm = form;
    }

    $scope.returnChosenForm = function () {
        for (let index = 0; index < $scope.templates.length; index++) {
            if ($scope.currentForm == $scope.templates[index].name) {
                return $scope.templates[index].url
            }
        }
    }

    $scope.kruid = {
        "Nederlands": "",
        "Latijns": "",
        "Familie": "",
        "Inhoudsstoffen": "",
        "Toepassing": "",
        "Eigenschappen": "",
        "Actie": "",
        "Gebruik": "",
        "LetOp": "",
        "Smaak": "",
        "Dosering": "",
        "ThermischeWaarde": "",
        "GebruikteDelen": "",
        "Orgaan": ""
    }

    $scope.updateKruid = function (kruid) {
        $scope.addDataModel.InsertIntoKruiden(kruid)
        $scope.kruid = null;
    }
}]);