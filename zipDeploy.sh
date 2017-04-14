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

funcName=$1

zip -r ${funcName}.zip index.js node_modules

# Check for AWS, AWS Command Line Interface
require aws

aws lambda update-function-code --function-name ${funcName} --zip-file fileb://${funcName}.zip

rm -f ${funcName}.zip

