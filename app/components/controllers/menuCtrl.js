// Menu Controller
app.controller("menuCtrl", [
    "$scope", "$log", "$route", "$location", "$rootScope",
    function($scope, $log, $route, $location, $rootScope) {
        $scope.menuOpen = false;
        $scope.toggleMenu = function() {
            $scope.menuOpen = ($scope.menuOpen == false ? true: false);
        };

        // Show the back button when non-root
        $scope.showBackBtn = $location.path() !== '/';
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            $scope.showBackBtn = next.$$route.originalPath !== '/';
        });

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
            href: "/#/"
        },{
            html: "Login",
            title: "Login, to get your shows",
            icon: "user",
            href: "/#/login"
        }];
}]);