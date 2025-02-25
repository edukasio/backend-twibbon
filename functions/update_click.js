const fs = require("fs-extra");
const path = require("path");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { twibbon_name } = JSON.parse(event.body);

    if (!twibbon_name) {
      return { statusCode: 400, body: JSON.stringify({ error: "Parameter tidak valid" }) };
    }

    const filePath = path.join(__dirname, "../data/click_data.json");
    let data = await fs.readJson(filePath);

    // Tambahkan klik
    data[twibbon_name] = (data[twibbon_name] || 0) + 1;

    // Simpan kembali ke file JSON
    await fs.writeJson(filePath, data);

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "success", count: data[twibbon_name] })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Gagal memperbarui data" })
    };
  }
};
