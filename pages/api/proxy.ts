import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'URL parameter required' });
    }

    try {
        // VULNERABILITY: SSRF - fetching arbitrary URLs from user input
        // No URL validation, allows access to internal network
        const response = await fetch(url, {
            headers: {
                // VULNERABILITY: Sending internal API secret to arbitrary URLs
                'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}`,
            }
        });

        const data = await response.text();

        // VULNERABILITY: Reflecting fetched content without sanitization
        res.status(200).send(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
