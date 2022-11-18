const twilio = require("twilio");

const ACCOUNT_SID = "ACe87fed0ac4660dd435107afba7ea4ee6";
const AUTH_TOKEN = "c2c7e6d6265de9cd96730445c5ec446b";
const PHONE_NUMBER = "+15735334331";

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendSMS = async (body) => {
    try {
        const message = await client.messages.create({
            body,
            from: PHONE_NUMBER,
            to: "+542236921422",
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = sendSMS;
