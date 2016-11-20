var AWS = require("aws-sdk");

exports.handler = (event, context, callback) => {
    var number = (event.query.number === undefined ? "0" : event.query.number); // need something better
    var sns = new AWS.SNS();
 var params = {
  Protocol: 'sms',
  TopicArn: 'your-topic-arn', //put your topic arn
  Endpoint: number,
};
sns.subscribe(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
};
