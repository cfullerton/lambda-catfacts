// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("key");
var http = require('http');
var app = require('express')();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// Get the credit card details submitted by the form

app.get('/', function(req, res) {          //sends index
	res.sendfile('./index.html');
});
app.post('/charge',function(request,res){
	var token = request.body.stripeToken; // Using Express
	console.log(token);
    // Create a charge: this will charge the user's card
    var charge = stripe.charges.create({
      amount: 100, // Amount in cents
      currency: "usd",
      source: token,
      description: "Example charge"
    }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
       // The card has been declined
	   console.log(err);
    }else {
		console.log(charge);
		res.send('accepted');
	}
});
})
app.listen(3000)
