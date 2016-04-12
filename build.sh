#!/bin/sh
alias sassc="docker run -it --rm --name=sassc -v $(pwd):$(pwd) -w $(pwd) xzyfer/docker-libsass:latest"

docker rm -f sassc 2>&1 > /dev/null

buildSCSS() {
    echo `date`" RUNNING: "
    if [ $# -eq 0 ]; then
        sassc assets/scss/main.scss assets/css/main.css 2>&1 > /tmp/error
    else
        sassc assets/scss/main.scss -t compressed assets/css/main.css 2>&1 > /tmp/error
    fi;

    rc=$?; if [ $rc != 0 ]; then
        notify-send "SASS BUILD FAILED!"
        cat /tmp/error | ccze -A
    fi;
}

# Initial Build
buildSCSS

# Listen for changes
while inotifywait -r -e modify assets/scss;
do
    buildSCSS
done
