var app = angular.module('AddDataController', ['ngRoute', 'myAppRouter', 'ngMaterial'])

app.controller('AddDataController', ['$routeParams', '$scope', '$location', function ($routeParams, $scope, $location) {
    $scope.addDataModel = new AddDataModel();
    $scope.kruidenModel = new KruidenModel();
    $scope.patentFormuleModel = new PatentFormulesModel();
    $scope.kruidenFormuleModel = new KruidenFormulesModel();
    $scope.syndroomModel = new SyndromenModel();
    $scope.symptoomModel = new SymptomenModel();


    $scope.kruiden = $scope.kruidenModel.GetAllData();
    $scope.syndromen = $scope.syndroomModel.GetRelevantData();
    $scope.symptomen = $scope.symptoomModel.GetAllData();

    console.log($scope.symptomen);
    $scope.selectedKruiden = [];
    $scope.selectedSymptomen = [];

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

    $scope.symptoom = {
        "Naam": ""
    }

    $scope.searchTextChange = function (kruid) {
        // console.log(kruid);
        // $scope.selectedKruiden.push(kruid);
    }

    $scope.selectedItemChangeKruid = function (kruid) {
        if (kruid != undefined) {
            if (kruid.Nederlands != "" && !$scope.selectedKruiden.includes(kruid.Nederlands)) {
                $scope.selectedKruiden.push(kruid);
            }
        }
    }

    $scope.selectedItemChangeSymptoom = function (symptoom) {
        if (symptoom != undefined) {
            if (symptoom.Naam != "" && !$scope.selectedSymptomen.includes(symptoom.Naam)) {
                $scope.selectedSymptomen.push(symptoom);
            }
        }
    }

    $scope.updateKruid = function (kruid) {
        console.log("good");
        $scope.addDataModel.InsertIntoKruiden(kruid)
        $scope.kruid = null;
    }

    $scope.updateKruidenFormule = function (kruidenformule) {
        // gebruik selectedKruiden | selectedSymptomen
        console.log(kruidenformule);
        // Eerst kruidenformule inserten in de database en het niewe id terugkrijgen

        let id = $scope.addDataModel.InsertIntoKruidenFormules(kruidenformule);
        console.log(id);

        // Daarna de kruidenFormuleEnKruiden vullen
        $scope.addDataModel.InsertIntoKruidenFormuleEnKruiden(id, $scope.selectedKruiden);

        // Daarna de kruidenformuleEnSymptomen vullen
        $scope.addDataModel.InsertIntoKruidenFormuleEnSymptomen(id, $scope.selectedSymptomen);
    }

    $scope.querySearch = function (query, type) {
        switch (type) {
            case 'kruid':
                var results = query ? $scope.kruiden.filter(createFilterFor(query, type)) : $scope.kruiden,
                    deferred;
                break;
            case 'symptoom':
                var results = query ? $scope.symptomen.filter(createFilterFor(query, type)) : $scope.symptomen,
                    deferred;
                break;
            default:
                break;
        }
        if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    };

    function createFilterFor(query, type) {
        var lowercaseQuery = query.toLowerCase();

        // console.log(lowercaseQuery);
        switch (type) {
            case 'kruid':
                return function filterFn(kruiden) {
                    return (kruiden.Nederlands.toLowerCase().indexOf(lowercaseQuery) === 0);
                };
            // console.log(kruiden);
            case 'symptoom':
                return function filterFn(symptomen) {
                    return (symptomen.Naam.toLowerCase().indexOf(lowercaseQuery) === 0);
                };
            default:
                break;
        }

    }
}]);