const fetch = require('node-fetch');

async function test() {
  const accessKey = "14e39eb2-cb9b-4792-acd2-b199a8272685";
  const web3formsPayload = {
    access_key: accessKey,
    name: "elhadj pouye",
    email: "cblniv15@gmail.com",
    subject: "[Toolubaay] DEMANDE INFO",
    message: "CECI EST UN MESSAGE TEST.",
    replyto: "cblniv15@gmail.com"
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(web3formsPayload),
    });

    const text = await response.text();
    console.log("Status:", response.status);
    console.log("Response:", text);
  } catch (e) {
    console.error("Error:", e);
  }
}

test();
