const https = require("https");

const API_KEY = "79afe94e8bb6d0b490628b74a970c5c894356636";
const COMPANY_ID = "45952";

exports.handler = async function(event, context) {

  // Manejar preflight CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
      },
      body: ""
    };
  }

  const params = event.queryStringParameters || {};
  const limit  = params.limit  || "100";
  const offset = params.offset || "0";

  const tokkoUrl = `https://www.tokkobroker.com/api/v1/property/` +
    `?format=json` +
    `&key=${API_KEY}` +
    `&lang=es_ar` +
    `&limit=${limit}` +
    `&offset=${offset}`;

  return new Promise((resolve) => {
    const req = https.get(
      tokkoUrl,
      { headers: { "Accept": "application/json", "User-Agent": "SancariWeb/1.0" } },
      (res) => {
        let body = "";
        res.on("data", chunk => { body += chunk; });
        res.on("end", () => {
          if (res.statusCode !== 200) {
            resolve({
              statusCode: res.statusCode,
              headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
              body: JSON.stringify({ error: `Tokko devolvió ${res.statusCode}`, detail: body.slice(0, 300) })
            });
            return;
          }
          resolve({
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "public, s-maxage=300"
            },
            body: body
          });
        });
      }
    );
    req.on("error", (err) => {
      resolve({
        statusCode: 502,
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        body: JSON.stringify({ error: "No se pudo conectar con Tokko", detail: err.message })
      });
    });
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        statusCode: 504,
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Timeout conectando con Tokko" })
      });
    });
  });
};
