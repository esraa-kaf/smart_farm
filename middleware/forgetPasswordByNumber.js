const otpManager = require('node-twillo-otp-manager')(accountSID ,authToken , serviceSID);
client.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.CELL_PHONE_NUMBER,
    body: "Send SMS using Twilio Api in Node.js!"
  }).then((message) => console.log(message.sid));
  