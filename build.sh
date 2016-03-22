#!/bin/sh
alias sassc="docker run -it --rm --name=sassc -v $(pwd):$(pwd) -w $(pwd) xzyfer/docker-libsass:latest"

docker rm -f sassc

while inotifywait -r -e modify assets/scss;
do
    echo `date`" RUNNING: "
    sassc assets/scss/main.scss assets/css/main.css 2>&1 > /tmp/error
    rc=$?; if [ $rc != 0 ]; then
        notify-send "SASS BUILD FAILED!"
        cat /tmp/error | ccze -A
    fi
done
