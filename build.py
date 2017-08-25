#!/usr/bin/env python

import os
import json
from subprocess import call

data_view_file = "data_view.json"
waves_dir = os.listdir("waves")

print "building: index.html"

# create data view file
with open(data_view_file, "w") as f:
    f.write(json.dumps({"posts": [{"post": s.replace(".js", "")} for s in waves_dir]}))

# write index.html from template and data view file
with open("index.html", "w") as f:
    call(["./node_modules/mustache/bin/mustache", data_view_file, "index.mustache"], stdout=f)

# clean up data view file
os.remove(data_view_file)

# browserify all pages
for f in waves_dir:
    print "building: {}".format(f)
    call("./node_modules/browserify/bin/cmd.js --transform [ babelify --presets [ es2015 ] ] --transform [ uglifyify ] {} --outfile {}".format(os.path.join("waves", f), os.path.join("bundles", f)), shell=True)

print "done!"
