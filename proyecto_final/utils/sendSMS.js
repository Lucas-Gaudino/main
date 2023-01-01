const twilio = require("twilio");

const ACCOUNT_SID = "ACb9ee9621d97e5282c99b17bb7eff305f";
const AUTH_TOKEN = "13efc7b780082de22b8564885e4daf7a";
const PHONE_NUMBER = "+1157328646";

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendSMS = async (body) => {
    try {
        const message = await client.messages.create({
            body,
            from: PHONE_NUMBER,
            to: "+13854691353",
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = sendSMS;
