var AWS = require("aws-sdk");
var quoteList = ["fact or quote","fact or quote"] // FIll in with your topic's quotes or facts
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.handler = function(event, context) {
    var quoteNum = getRandomInt(0,quoteList.length);
    var messageText =quoteList[quoteNum];
    console.log(messageText);
  var sns = new AWS.SNS();
    var params = {
        Message: messageText,
        Subject: "some subject", // shows up at the beginning of every text
        TopicArn: "your-topic-arn" //fill in your topic arn
    };
    if (today <= 5 || today <= 14) {
        sns.publish(params, context.done);
    }
};
