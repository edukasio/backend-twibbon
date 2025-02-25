const fs = require("fs-extra");
const path = require("path");

exports.handler = async function () {
    try {
        const filePath = path.resolve(__dirname, "../data/click_data.json"); // Path yang benar di Netlify

        if (!fs.existsSync(filePath)) {
            console.error("File JSON tidak ditemukan:", filePath);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "File JSON tidak ditemukan" }),
            };
        }

        const data = await fs.readJson(filePath);

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" }, // ✅ Fix CORS
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("Error membaca file JSON:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Gagal membaca data" }),
        };
    }
};
