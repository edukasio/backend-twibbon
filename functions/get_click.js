const fs = require("fs-extra");
const path = require("path");

exports.handler = async function (event, context) {
  try {
    const filePath = path.join(__dirname, "../data/click_data.json");
    const data = await fs.readJson(filePath);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Gagal membaca data" })
    };
  }
};
