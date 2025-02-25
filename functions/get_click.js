const fs = require("fs");
const path = require("path");

exports.handler = async () => {
    try {
        const filePath = path.resolve(__dirname, "../data/click_data.json");
        const data = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(data);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Gagal membaca data JSON" }),
        };
    }
};
