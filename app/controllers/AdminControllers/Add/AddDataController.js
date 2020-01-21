var app = angular.module('AddDataController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('AddDataController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    // $scope.addDataModel = new AddDataModel();
    // $scope.kruidenModel = new KruidenModel();
    // $scope.patentFormuleModel = new PatentFormulesModel();
    // $scope.kruidenFormuleModel = new KruidenFormulesModel();
    // $scope.syndroomModel = new SyndromenModel();
    // $scope.symptoomModel = new SymptomenModel();
    // $scope.chineseKruidenModel = new ChineseKruidenModel();

    // $scope.syndromen = $scope.syndroomModel.GetRelevantData();
    // $scope.kruiden = $scope.kruidenModel.GetAllData();
    // $scope.chineseKruiden = $scope.chineseKruidenModel.GetAllData();
    // $scope.symptomen = $scope.symptoomModel.GetAllData();

    // $scope.kruidenFormules = $scope.kruidenFormuleModel.GetRelevantData();
    // $scope.patentFormules = $scope.patentFormuleModel.GetRelevantData();

    this.params = $routeParams;
    $scope.currentForm = "Kruid";

    // Alle html code voor alle forms
    $scope.templates = [
        { name: 'Kruid', url: './app/views/AdminViews/Add/AddKruid.html' },
        { name: 'Patentformule', url: './app/views/AdminViews/Add/AddPatentFormule.html' },
        { name: 'Kruidenformule', url: './app/views/AdminViews/Add/AddKruidenFormule.html' },
        { name: 'Syndroom', url: './app/views/AdminViews/Add/AddSyndroom.html' },
        { name: 'Symptoom', url: './app/views/AdminViews/Add/AddSymptoom.html' },
        { name: 'Chinees Kruid', url: './app/views/AdminViews/Add/AddChineesKruid.html' }
    ];

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
}]);