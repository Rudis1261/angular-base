var app = angular.module("app", []);

    // Menu Controller
    app.controller("menuCtrl", ["$scope", "$log", function($scope, $log) {
        $scope.menuOpen = false;
        $scope.toggleMenu = function() {
            $scope.menuOpen = ($scope.menuOpen == false ? true: false);
        };

        // Used to dismiss all interactions
        $scope.dismissAll = function($event) {
            var element = angular.element($event.target);

            // And open Menu
            if (!element.parent().hasClass('burger-menu') && !element.hasClass('burger-menu__content')) {
                $scope.menuOpen = false;
            }
        };

        $scope.shout = function(message) {
            alert(message);
        };

        $scope.menus = [{
            html: "Home",
            title: "Go to the home screen",
            icon: "home",
        },{
            html: "About",
            title: "About this application",
            icon: "info-sign",
        }];
    }]);

    // Index Controller
    app.controller("indexCtrl", ["$scope", function($scope) {
        $scope.message = "World!";
        $scope.loaded = true;
    }]);