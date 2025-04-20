const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {
    const res = await fetch("https://mental-chat-server.onrender.com/api/googling", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: event.body
    });

    const data = await res.text(); // Use text() to get the raw response
    return {
      statusCode: res.status,
      body: data,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
  } catch (err) {
    console.error("Netlify proxy error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Proxy failed", detail: err.message }),
    };
  }
};