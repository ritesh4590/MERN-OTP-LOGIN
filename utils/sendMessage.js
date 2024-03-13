import twilio from "twilio";

const sendMessage = async (options) => {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  await client.messages.create({
    body: options.body,
    to: options.to,
    from: process.env.TWILIO_PHONE_NO,
  });
};

export default sendMessage;
