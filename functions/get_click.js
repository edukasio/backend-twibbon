const fs = require("fs-extra");
const path = require("path");

exports.handler = async function (event, context) {
  try {
    const filePath = path.join(__dirname, "../../data/click_data.json"); // ✅ Akses JSON dari root
    console.log("Membaca file dari path:", filePath); // Debugging

    // Cek apakah file ada
    if (!fs.existsSync(filePath)) {
      console.error("File JSON tidak ditemukan:", filePath);
      return { statusCode: 500, body: JSON.stringify({ error: "File JSON tidak ditemukan" }) };
    }

    // Baca file JSON
    const data = await fs.readJson(filePath);

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" }, // ✅ Fix CORS
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Error membaca file JSON:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Gagal membaca data" })
    };
  }
};
