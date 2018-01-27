'use strict';

const SMOOCH_APP_KEY = "";
const SMOOCH_APP_SECRET = "";
const TRIGGER_STRING = "";
const SmoochCore = require('smooch-core');

module.exports.smoochWebhookListener = (event, context, callback) => {
  const headers = event.headers;
  const payload = JSON.parse(event.body);

  var smooch = new SmoochCore({
      keyId: SMOOCH_APP_KEY,
      secret: SMOOCH_APP_SECRET,
      scope: 'app'
  });

  const response = {
      "statusCode": 200,
      "headers": {},
      "body": "{ 'ok': true }"
  };
  console.log(payload);

  //Validate the trigger message
  if(payload && payload.trigger == "message:appMaker" && payload.messages && payload.messages[0].text == TRIGGER_STRING) {
    //Send the response
    console.log("Triggered");

    smooch.appUsers.sendMessage(payload.appUser._id, {
        role: 'appMaker',
        type: 'carousel',
        items: [{
            title: 'Tacos',
            description: 'These are tacos',
            mediaUrl: 'https://deltaco.com/images/promos2017/promo8/queso-taco.png',
            actions: [{
                text: 'Tacos',
                type: 'postback',
                payload: 'TACOS'
            }, {
                text: 'More info',
                type: 'link',
                uri: 'http://smooch.io'
            }]
        }, {
            title: 'Burritos',
            description: 'Burritos are usually better than tacos',
            mediaUrl: 'https://www.deltaco.com/files/menu/item/machocomboburrito.png',
            actions: [{
                text: 'Burritos',
                type: 'postback',
                payload: 'BURRITOS'
            }, {
                text: 'More info',
                type: 'link',
                uri: 'http://zendesk.com'
            }]
        }]
    }).then(() => {
        context.succeed(response);
    });
  } else if(payload && payload.trigger == "postback") {
    smooch.appUsers.sendMessage(payload.appUser._id, {
        text: payload.postbacks[0].action.text,
        role: 'appUser',
        type: 'text',
        metadata: {payload: payload.postbacks[0].action.payload}
    }).then(() => {
        context.succeed(response);
    });
  } else {
    context.succeed(response);
  }


};
