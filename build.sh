#!/bin/sh
alias sassc="docker run -it --rm --name=sassc -v $(pwd):$(pwd) -w $(pwd) xzyfer/docker-libsass:latest"

docker rm -f sassc

while inotifywait -r -e modify assets/scss;
do
    echo `date`" RUNNING: "
    # No arguments, just run it as is without compressing it
    if [ $# -eq 0 ]; then
        sassc assets/scss/main.scss assets/css/main.css 2>&1 > /tmp/error
    else
        sassc assets/scss/main.scss -t compressed assets/css/main.css 2>&1 > /tmp/error
    fi

    rc=$?; if [ $rc != 0 ]; then
        notify-send "SASS BUILD FAILED!"
        cat /tmp/error | ccze -A
    fi
done
