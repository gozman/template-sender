# Smooch Template Sender

A `serverless` function that listens for appMaker and postback webhooks from Smooch in order to fire off templated structured messages and handle postback responses.

# How do I use it?

1. Clone the repo
2. Fill up the constants in handler.js with App key and secret as well as a trigger string you want to listen for
3. Modify the code to send the structured message you want in response to the trigger string
4. Deploy the code with a good ol' `serverless deploy -v`
5. Make note of the AWS endpoint where the service is listening for a POST
6. Go to your smooch app and configure a webhook to go to the endpoint from 5 and set it to trigger on message:appMaker as well as on postbacks
7. Have a conversation on the Smooch app you configured this for and as an agent send an exact match of your `TRIGGER_STRING`
8. Profit!

# TODO
 * Adopt for passthrough API call and test on secret channel
 * Move code constants to environment variables instead to separate code/config
 * Remove console.log's I was using for debugging
 
