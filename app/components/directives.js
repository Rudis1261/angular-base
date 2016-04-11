// Image place holder directive
app.directive('hires', function() {
  return {
    restrict: 'A',
    scope: { hires: '@' },
    link: function(scope, element, attrs) {
        element.one('load', function() {
            if (scope.hires == "") {
                element.attr('src', scope.src);
            } else {
                element.attr('src', scope.hires);
            }
        });
    }
  };
});

// Bind scrolltop functionality
app.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", _.throttle(function() {
            if (this.pageYOffset >= 300) {
                scope.scrollToTop = true;
            } else {
                scope.scrollToTop = false;
            }
            scope.$apply();
        }, 100));
    };
});

// Toggle Active Class on btn
app.directive('addClass', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                if(element.attr("class") !== "active") {
                    element.addClass(attrs.addClass);
                }
            });
        }
    };
});

// Icon-directive
app.directive('icon', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.addClass('glyphicon glyphicon-'+attrs.icon);
        }
    };
});