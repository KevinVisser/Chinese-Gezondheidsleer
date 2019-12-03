var ChineseGezondheidsleer = angular.module('ChineseGezondheidsleer', ['ngMaterial'])

ChineseGezondheidsleer.controller('KruidenController', ['$scope', function ($scope) {

    function getKruiden() {
        const kruidenData = db.prepare("SELECT Nederlands, Latijns FROM Kruiden");
        // console.log(kruiden[0].Latijns);

        return kruiden;
    }
    // console.log(kruiden);
    // console.log(KruidenModel.GetAllData());

    //console.log(kruiden);

    $scope.message = "Hello, World"
}]);

ChineseGezondheidsleer.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    //$scope.toggleLeft = buildDelayedToggler('left');
    //$scope.toggleRight = buildToggler('right');
    // $scope.isOpenRight = function () {
    //     return $mdSidenav('right').isOpen();
    // };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }, 200);
    }

    function buildToggler(navID) {
        return function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        };
    }
})
ChineseGezondheidsleer.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });

    };
})
ChineseGezondheidsleer.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('right').close()
            .then(function () {
                $log.debug("close RIGHT is done");
            });
    };
});

ChineseGezondheidsleer.controller('testController', function ($scope, $timeout, $mdSidenav, $log) {
    let stmt;

    $scope.kruiden = loadKruiden();
    $scope.patentFormules = loadPatentFormules();
    $scope.kruidenFormules = loadKruidenFormules();
    $scope.syndromen = loadSyndromen();

    $scope.currentItem = "Kruiden"

    $scope.ChangeNav = function ChangeNav(nav) {
        $scope.currentItem = nav;
    }

    function loadKruiden() {
        stmt = db.prepare("SELECT Nederlands, Latijns, Familie FROM Kruiden");
        return stmt.all();
    }

    function loadPatentFormules() {
        stmt = db.prepare("SELECT Nederlands, Engels, Pinjin FROM PatentFormules");
        return stmt.all();
    }

    function loadKruidenFormules() {
        stmt = db.prepare("SELECT Naam FROM KruidenFormules");
        kruidenFormules = stmt.all();
    }

    function loadSyndromen() {
        stmt = db.prepare("SELECT Syndroom FROM Syndromen");
        syndromen = stmt.all();
    }

}); 