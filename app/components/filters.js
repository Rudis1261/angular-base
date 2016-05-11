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


// Property Ordering
app.filter('seriesById', function() {
  return function(items, id) {
    angular.forEach(items, function(item) {
      console.log("sid: ", item.seriesid, "id: ", id, (item.seriesid == id));
      if (item.seriesid == id) {
        console.log("filtered: ", item);
        return item;
      }
    });
  };
});

// Filter out season
app.filter('bySeason', function() {
  return function(items, id) {
    angular.forEach(items, function(item) {
      console.log("season: ", item.s, "page: ", (Number(item.s) == Number(id)));
      if (Number(item.s) == Number(id)) {
        console.log("filtered: ", item);
        return item;
      }
    });
  };
});


// Create a pagination filter
app.filter('pagination', function() {
  return function(pages, current) {

    var pagination = [];
    if (!pages) {
        return pagination;
    }

    pages = Number(pages);
    current = Number(current);

    // Less than 6 pages, just print it out, there's enough space on the screen
    if (pages <= 6) {
        for(var i = 1; i <= pages; i++) {
            pagination.push(i);
        }
        return pagination;
    }

    // Larger page results
    if (!current || current <= 1) {
        current = 2;
    }

    pagination.push(1);

    // Padding between pagination
    padding = 2;
    offset = current + padding;

    if (offset > pages) {
      current = (pages - padding);
      offset = pages;
    }

    //console.log((offset > pages), offset, current);

    if (current > 3) {
      pagination.push('.');
    }

    if (current > 2) {
      current--;
      offset--;
    }

    // The body of the pager
    for(var i = current; i <= offset; i++) {
        if (i > pages) {
            break;
        }
        pagination.push(i);
    }

    //Should we add the last page? If it's out of bounds?
    if ((current + padding) < pages - 1) {
        pagination.push('..');
    }
    pagination.push(Number(pages));
    //console.log(pagination, current, offset);

    return pagination;
  };
});