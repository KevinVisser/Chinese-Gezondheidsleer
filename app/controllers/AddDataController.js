var app = angular.module('AddDataController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('AddDataController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.addDataModel = new AddDataModel();
    $scope.kruidenModel = new KruidenModel();
    $scope.patentFormuleModel = new PatentFormulesModel();
    $scope.kruidenFormuleModel = new KruidenFormulesModel();
    $scope.syndroomModel = new SyndromenModel();


    $scope.kruiden = $scope.kruidenModel.GetAllData();
    $scope.selectedKruiden = [];

    this.params = $routeParams;
    $scope.currentForm = "";

    // Alle html code voor alle forms
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

    $scope.patentformule = {
        "Nederlands": "",
        "Engels": "",
        "Pinjin": "",
        "Werking": "",
        "Tong": "",
        "Pols": "",
        "ContraIndicaties": ""
    }

    $scope.kruidenformule = {
        "Naam": "",
        "Werking": "",
        "ContraIndicatie": ""
    }

    $scope.syndroom = {

    }

    $scope.searchTextChange = function (kruid) {
        // console.log(kruid);
        // $scope.selectedKruiden.push(kruid);
    }
    $scope.selectedItemChange = function (kruid) {
        // console.log(kruid.Nederlands);
        if (kruid.Nederlands != "") {
            $scope.selectedKruiden.push(kruid);
        }
        // console.log($scope.selectedKruiden);
    }

    $scope.updateKruid = function (kruid) {
        console.log("good");
        $scope.addDataModel.InsertIntoKruiden(kruid)
        $scope.kruid = null;
    }

    $scope.querySearch = function (query) {
        var results = query ? $scope.kruiden.filter(createFilterFor(query)) : $scope.kruiden,
            deferred;
        if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    };

    function createFilterFor(query) {
        var lowercaseQuery = query.toLowerCase();

        // console.log(lowercaseQuery);

        return function filterFn(kruiden) {
            // console.log(kruiden.Nederlands);
            // console.log(kruiden.Nederlands.indexOf(lowercaseQuery));
            return (kruiden.Nederlands.toLowerCase().indexOf(lowercaseQuery) === 0);
        };

    }
}]);