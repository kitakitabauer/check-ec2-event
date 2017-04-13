#!/bin/sh
set -eu

# Check requirements
function require {
    command -v $1 > /dev/null 2>&1 || {
        echo "Some of the required software is not installed:"
        echo "    please install $1" >&2;
        exit 1;
    }
}

zip -r checkMaintenance.zip index.js node_modules

# Check for AWS, AWS Command Line Interface
require aws

aws lambda update-function-code --function-name checkEC2Maintenance --zip-file fileb://checkMaintenance.zip

rm -f checkMaintenance.zip

