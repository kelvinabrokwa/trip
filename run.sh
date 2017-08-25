#!/usr/bin/env bash

./node_modules/budo/bin/cmd.js waves/$1.js --serve=bundle/$1.js --live --open -- --transform [ babelify --presets [ es2015 ] ]
