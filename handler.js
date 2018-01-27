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
    statusCode: 200,
  };

  //Validate the trigger message
  if(payload && payload.trigger == "message:appMaker" && payload.messages && payload.messages[0].text == TRIGGER_STRING) {
    //Send the response
    smooch.appUsers.sendMessage(payload.app._id, payload.appUser._id, {
        role: 'appMaker',
        type: 'carousel',
        items: [{
            title: 'Tacos',
            description: 'These are tacos',
            mediaUrl: 'http://example.org/image.jpg',
            actions: [{
                text: 'Select',
                type: 'postback',
                payload: 'TACOS'
            }, {
                text: 'More info',
                type: 'link',
                uri: 'http://example.org'
            }]
        }, {
            title: 'Burritos',
            description: 'Burritos are usually better than tacos',
            mediaUrl: 'http://example.org/image.jpg',
            actions: [{
                text: 'Select',
                type: 'postback',
                payload: 'BURRITOS'
            }, {
                text: 'More info',
                type: 'link',
                uri: 'http://example.org'
            }]
        }]
    }).then(() => {
        callback(null, response);
    });
  } else if(payload && payload.trigger == "postback") {
    smooch.appUsers.sendMessage(payload.app._id, payload.appUser._id, {
        text: payload.postbacks[0].action.payload
        role: 'appUser',
        type: 'text'
    }).then(() => {
        // async code
    });
  } else {
    callback(null, response);
  }


};
