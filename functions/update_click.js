const fs = require("fs-extra");
const path = require("path");

exports.handler = async function (event) {
    try {
        const filePath = path.resolve(__dirname, "../data/click_data.json"); // ✅ Fix path JSON
        console.log("Path JSON:", filePath); // Debugging

        if (!fs.existsSync(filePath)) {
            console.error("File JSON tidak ditemukan:", filePath);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "File JSON tidak ditemukan" }),
            };
        }

        // Jika user mencoba akses dengan GET, beri pesan error
        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                body: JSON.stringify({ error: "Method Not Allowed. Gunakan POST request." }),
            };
        }

        const body = JSON.parse(event.body);
        const { twibbon_name } = body;

        if (!twibbon_name) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Parameter tidak valid" }),
            };
        }

        let data = await fs.readJson(filePath);
        data[twibbon_name] = (data[twibbon_name] || 0) + 1;

        await fs.writeJson(filePath, data);

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" }, // ✅ Fix CORS
            body: JSON.stringify({ status: "success", count: data[twibbon_name] }),
        };
    } catch (error) {
        console.error("Error memperbarui file JSON:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Gagal memperbarui data" }),
        };
    }
};
