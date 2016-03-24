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