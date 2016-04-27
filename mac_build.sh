#!/bin/sh
PWD=$(pwd)
COMPRESSED=$#

fswatch -r -o assets/scss | (while read; 
	do 
		docker rm -f sassc 2>&1 > /dev/null
		echo `date`" START SCSS COMPILING"

		if [ $COMPRESSED -eq 0 ]; then
			docker run \
		        -i \
		        --rm \
		        --name=sassc \
		        -v $PWD:$PWD \
		        -w $PWD xzyfer/docker-libsass:latest \
		        assets/scss/main.scss \
		        assets/css/main.css

        else
	        docker run \
		        -i \
		        --rm \
		        --name=sassc \
		        -v $(pwd):$(pwd) \
		        -w $(pwd) xzyfer/docker-libsass:latest \
		        assets/scss/main.scss \
		        -t compressed assets/css/main.css 
	    fi;

        rc=$?; if [ $rc != 0 ]; then
	        osascript -e 'display notification "SASSC Build Failed" with title "Terminal"'
	    fi;

	    echo `date`" DONE SCSS COMPILING"
done) | ccze -A