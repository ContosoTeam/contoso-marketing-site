import { NextApiRequest, NextApiResponse } from 'next';

// VULNERABILITY: Hardcoded Mailchimp credentials
const MAILCHIMP_API_KEY = 'mailchimp-contoso-key-us14-1234567890ab';
const MAILCHIMP_LIST_ID = 'abc1234567';
const MAILCHIMP_SERVER = 'us14';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, firstName, lastName } = req.body;

    // VULNERABILITY: No email validation
    // VULNERABILITY: No rate limiting (allows email enumeration/spam)
    
    try {
        const response = await fetch(
            `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `apikey ${MAILCHIMP_API_KEY}`,
                },
                body: JSON.stringify({
                    email_address: email,
                    status: 'subscribed',
                    merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName,
                    },
                }),
            }
        );

        const data = await response.json();
        
        if (response.ok) {
            res.status(200).json({ status: 'subscribed' });
        } else {
            // VULNERABILITY: Exposing Mailchimp API error details
            res.status(400).json({ error: data.detail, title: data.title });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
