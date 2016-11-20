var AWS = require("aws-sdk");
console.log('Loading function');

exports.handler = (event, context, callback) => {
    var sns = new AWS.SNS();
    var inputNumber = (event.query.number === undefined ? "" : event.query.number);
    var params = {
  TopicArn: 'your-topic-arn', /* enter your arn */
  //NextToken: 'moreSubs'
};
var removeARN = "";
sns.listSubscriptionsByTopic(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else{
      for (var i = 0; i<data.Subscriptions.length;i++){
          if (data.Subscriptions[i].Endpoint == '+' + inputNumber){
              removeARN = data.Subscriptions[i].SubscriptionArn;
              unsubscribeSMS(removeARN);
              break;
          }
      }

  }
});
 function unsubscribeSMS(arn){
       var unsubParams = {
        SubscriptionArn: arn
      };
    sns.unsubscribe(unsubParams, function(err, data) {
       if (err) console.log(err, err.stack); // an error occurred
       else     console.log(data);           // successful response
    });
 }
};
