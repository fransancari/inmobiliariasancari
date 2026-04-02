const https = require("https");

const API_KEY = "79afe94e8bb6d0b490628b74a970c5c894356636";

exports.handler = async function(event) {

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Body inválido" }) };
  }

  const postData = JSON.stringify(payload);
  const options = {
    hostname: "www.tokkobroker.com",
    path: `/api/v1/webcontact/?key=${API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData),
      "Accept": "application/json"
    }
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", chunk => { body += chunk; });
      res.on("end", () => {
        resolve({
          statusCode: 200,
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
          body: JSON.stringify({ ok: true, status: res.statusCode })
        });
      });
    });
    req.on("error", (err) => {
      resolve({
        statusCode: 502,
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        body: JSON.stringify({ error: err.message })
      });
    });
    req.write(postData);
    req.end();
  });
};
