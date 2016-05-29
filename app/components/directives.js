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

app.directive('toggleClass', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                //var all = (document.querySelector('[toggle-class]'));
                //console.log(all);
                element.toggleClass(attrs.toggleClass);
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

// Icon-directive
app.directive('episodeHighlight', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (!scope.episode.date) {
                return false;
            }

            var now = new Date();
            now = now.setDate(now.getDate());

            var recent = new Date();
            recent = recent.setDate(recent.getDate() - 14);

            var comingSoon = new Date();
            comingSoon = comingSoon.setDate(comingSoon.getDate() + 14);

            var check = new Date(scope.episode.date * 1000);
            check = check.setDate(check.getDate());

            if (check > now && check < comingSoon) {
                return element.addClass('coming-soon');
            }

            if (check < now && check > recent) {
                return element.addClass('recent');
            }
        }
    };
});