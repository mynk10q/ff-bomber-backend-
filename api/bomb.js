import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export default async function handler(req, res) {
    const { key, phone } = req.query;

    // --- KEY CHECK ---
    if (key !== "mynk01") {
        return res.status(401).json({ error: "Invalid API key", credit: "api by mynk" });
    }

    if (!phone) {
        return res.status(400).json({ error: "Phone number missing", credit: "api by mynk" });
    }

    const jar = new CookieJar();
    const client = wrapper(axios.create({ jar, withCredentials: true }));

    const url = `https://freefire-api.ct.ws/bomber4.php?phone=${phone}`;

    try {
        // 1st request → Cloudflare gives JS challenge
        await client.get(url);

        // 2nd request → Actual result with cookies
        const resp = await client.get(url + "&i=1");

        return res.status(200).json({
            status: "OK",
            credit: "api by mynk",
            target: phone,
            response: resp.data
        });

    } catch (err) {
        return res.status(500).json({
            error: "API Error",
            details: err.message,
            credit: "api by mynk"
        });
    }
}
