// Get the thumbnail image from the name
app.filter('imageThumb', function() {
  return function(item) {
    if (!item || item == "") {
      return "https://img.tvtracker.co.za/missing.png";
    }
    return "https://img.tvtracker.co.za/tv/" + item.replace(/(\.jpg)/i, '_thumb.jpg');
  };
});

// Find show
app.filter('searchTerm', function() {
  return function(items, term, reverse) {
    if (!term || term == "") {
      return items;
    }
    term = term.toLowerCase();
    var filtered = [];
    angular.forEach(items, function(item) {
      if (item.seriesname.toLowerCase().indexOf(term) !== -1 || item.overview.toLowerCase().indexOf(term) !== -1) {
        filtered.push(item);
      }
    });
    return filtered;
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