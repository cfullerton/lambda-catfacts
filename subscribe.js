var AWS = require("aws-sdk");
console.log('Loading function');

exports.handler = (event, context, callback) => {
    var number = (event.query.number === undefined ? "" : event.query.number);
    var sns = new AWS.SNS();
 var params = {
  Protocol: 'sms', /* required */
  TopicArn: 'main-arn', /* required */
  Endpoint: number,
};
sns.subscribe(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
var welcomeSubParams = {
  Protocol: 'sms',
  TopicArn: 'welcome-arn', //input welcome arn
  Endpoint: number,
};
sns.subscribe(welcomeSubParams, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     {
      var welcomeParams = {
        Message: "welcome to Cat Facts! to unsubscribe visit examle.com",
        Subject: "Top Gun Quotes",
        TopicArn: "welcome-arn"   //input welcome arn
    };
    sns.publish(welcomeParams,function(err,data){
        if (err) console.log(err, err.stack); // an error occurred
        else     {
               removeWelcome()
        }           // successful response
    });
  }           // successful response
});
    function removeWelcome(){
        var removeWelcomeParams = {
       TopicArn: 'welcome-arn', /* enter your arn */
       //NextToken: 'moreSubs'
    };
          sns.listSubscriptionsByTopic(removeWelcomeParams, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else{
      for (var i = 0; i<data.Subscriptions.length;i++){
              removeARN = data.Subscriptions[i].SubscriptionArn;
              unsubscribeSMS(removeARN);
              break;
      }

  }
});
    }
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
