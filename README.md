# lambda-catfacts

## TODO: Make a better example webpage.

## Step 1 - Create SNS Topics

  - Create a new sns topic. Note its ARN, you will be using this topic to subscribe endpoints and  publish topics to.
  - Create another sns topic. We will use this one to send welcome messages.

## Step 2 - Create IAM Role
  Create an IAM role with the permissions seen in iam.json. We will assign all of the lambda scripts to this role.
  
## step 3 - Create Node.js Lambda functions
  - Create the unsubscribe, subscribe and main lambda functions, see unsubscribe.js susbscribe.js and catfacts.js.
  - add your topic ARN in each file. Put the main topic and welcome ARNs in the desiginated places in Subscribe.js 
  - Give them all the role created in step 2. 
  - Create a "cloudwatch events - schedule" trigger for your main file. Don't worry about adding a trigger for subscribe and unsubscribe, we will trigger them with the API gateway. 
  - Modify the main js file to contain your facts
  
## Step 4 - Create Application Gateway
  - Create a new API with two resources "subscribe" and "unsubscribe"
  - 
