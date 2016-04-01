// Get the thumbnail image from the name
app.filter('imageThumb', function() {
  return function(item) {
    if (!item || item == "") {
      return "https://img.tvtracker.co.za/missing.png";
    }
    return "https://img.tvtracker.co.za/tv/" + item.replace(/(\.jpg)/i, '_thumb.jpg');
  };
});

// Property Ordering
app.filter('seriesFilterByPropertyAndTerm', function() {
  return function(items, property, term, reverse) {
    var filtered = [];

    angular.forEach(items, function(item) {
      if (!term) {
        filtered.push(item);
      } else {
        term = term.toLowerCase();
        if (item.seriesname.toLowerCase().indexOf(term) !== -1 || item.overview.toLowerCase().indexOf(term) !== -1) {
          filtered.push(item);
        }
      }
    });

    // Filter it
    filtered.sort(function (a, b) {
      return (a[property].substr(0, 5) > b[property].substr(0, 5) ? 1 : -1);
    });

    if(reverse) filtered.reverse();
    return filtered;
  };
});

// Slug
app.filter('slugify', function() {
  return function(input) {
    if (!input) {
      return "";
    }
    var segments = input.toLowerCase().split(" ");
    angular.forEach(segments, function(segment, index) {
      segments[index] = segments[index].replace(/\W/g, '');
    });
    return segments.join("-");
  };
});