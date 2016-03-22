#!/bin/sh
mkdir -p app \
assets \
app/shared \
app/components \
assets/img \
assets/css \
assets/scss \
assets/js \
assets/vendor

# Bower components
npm -g install bower
bower install