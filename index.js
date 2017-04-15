'use strict';

require('dotenv').config();

const AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.REGION,
});
const ec2 = new AWS.EC2({});

const _ = require('lodash');

const SlackNode = require('slack-node');
const slack = new SlackNode();

const params = {
  IncludeAllInstances: true,
};

function toMentionText(text) {
  return `<!here>\n\`\`\`${JSON.stringify(text, null, '    ')}\`\`\``;
}

function report(text) {
  slack.setWebhook(process.env.WEBHOOK_URI);
  slack.webhook({
    channel: process.env.SLACK_CHANNEL,
    username: process.env.SLACK_USERNAME,
    icon_emoji: process.env.SLACK_ICON_EMOJI,
    text: toMentionText(text),
  }, (err, res) => {
    console.log(err, res);
  });
}

exports.handler = () => {
  ec2.describeInstanceStatus(params, (err, res) => {
    if (err !== null) {
      console.error(err);
      return;
    }

    console.log(`Instance num: ${res.InstanceStatuses.length}`);

    const events = _
      .chain(res.InstanceStatuses)
      .filter(status => status.Events.length > 0)
      .map(status => {
        return {
          InstanceId: status.InstanceId,
          InstanceState: status.InstanceState,
          Events: status.Events,
        };
      })
      .filter(instance => {   // for exclude completed event
        let filtered = _.filter(instance.Events, (event) => {
          return !event.Description.startsWith('[Completed]');
        });

        return filtered.length > 0;
      })
      .value();

    if (events.length <= 0) {
      return;
    }

    report(events);
  });
};

