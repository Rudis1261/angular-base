#!/bin/sh
alias sassc="docker run -it --rm --name=sassc -v $(pwd):$(pwd) -w $(pwd) xzyfer/docker-libsass:latest"

docker rm -f sassc

while true;
do
    sleep 1
    echo `date`" - Building Assets"
    #sassc assets/scss/main.scss -t compressed assets/css/main.css | ccze -A
    sassc assets/scss/main.scss assets/css/main.css | ccze -A
done;