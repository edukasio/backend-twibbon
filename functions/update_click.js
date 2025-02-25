const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
    try {
        // Ambil parameter dari request
        const { twibbon_name } = event.queryStringParameters;
        if (!twibbon_name) {
            return { statusCode: 400, body: JSON.stringify({ error: "Twibbon name is required" }) };
        }

        const filePath = path.resolve(__dirname, "../data/click_data.json");
        const data = fs.readFileSync(filePath, "utf8");
        let jsonData = JSON.parse(data);

        // Tambah jumlah klik
        jsonData[twibbon_name] = (jsonData[twibbon_name] || 0) + 1;
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "success", count: jsonData[twibbon_name] }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Gagal memperbarui data JSON" }),
        };
    }
};
