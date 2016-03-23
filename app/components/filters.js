// Get the thumbnail image from the name
app.filter('imageThumb', function() {
  return function(item) {
    return item.replace(/(\.jpg)/i, '_thumb.jpg');
  };
});

// Property Ordering
app.filter('orderByProperty', function() {
  return function(items, property, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[property].substr(0, 5) > b[property].substr(0, 5) ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});