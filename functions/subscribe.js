require('dotenv').config();

exports.handler = (event, _context, callback) => {
   const client = require('@sendgrid/client');
   client.setApiKey(process.env.SENDGRID_API_KEY);

   const data = {
      contacts: [
         {
            email: event.body
         }
      ]
   };
   const request = {
      method: 'PUT',
      url: 'https://api.sendgrid.com/v3/marketing/contacts',
      body: data,
      headers: { 'Content-Type': 'application/json' }
   };

   client
      .request(request)
      .then((response) => {
         callback(null, {
            statusCode: response[0].statusCode,
            body: `${event.body} subscribed!!`
         });
      })
      .catch((error) => {
         callback(error, null);
      });
};
