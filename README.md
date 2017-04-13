# check-ec2-event
![](https://img.shields.io/badge/node.js-6.10%2B-blue.svg)

## Overview  
Tools of checking AWS EC2 maintenance event  

## Description
This tool checks scheduled maintenance events of your AWS EC2 instance, and notify to your slack channel.

## Requirement
- Node.js 6.10.0

## Install
```
$ git clone git@github.com:kitakitabauer/check-ec2-event.git
$ cd check-ec2-event
$ npm i
```

### Run on local
1. Add your environment variables to .env file.
```
REGION = "your AWS region"
WEBHOOK_URI = "your incoming webhook url of slack"
SLACK_CHANNEL = "slack channel that you want to notify"
SLACK_ICON_EMOJI = "icon emoji of notification bot"
SLACK_USERNAME = "user name of notification bot"
```

2. Execute npm run.
```
$ npm run local
```

### Run on AWS Lambda
1. It compiles and deployes scripts including node_modules in zip format, but aws-cli is required.
```
$ ./zipDeploy.sh
```

2. Run it from your AWS account or aws-cli.

## License

[MIT](https://github.com/kitakitabauer/check-ec2-event/blob/master/LICENSE)

## Author

[kitakitabauer](https://github.com/kitakitabauer)
