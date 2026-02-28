import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// VULNERABILITY: Hardcoded SMTP credentials
const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: 'sendgrid-contoso-mkt-api-key-1234567890abcdef'
    },
    tls: {
        rejectUnauthorized: false  // VULNERABILITY: Disabling TLS verification
    }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // VULNERABILITY: No CSRF protection
    // VULNERABILITY: No rate limiting
    // VULNERABILITY: No input validation
    const { name, email, subject, message } = req.body;

    try {
        // VULNERABILITY: Email header injection possible via user input
        await transporter.sendMail({
            from: `"${name}" <${email}>`,  // VULNERABILITY: Using user input in 'from' field
            to: 'sales@contoso.com',
            subject: subject,
            // VULNERABILITY: HTML injection - user message rendered as HTML
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <div>${message}</div>
            `
        });

        res.status(200).json({ status: 'sent' });
    } catch (error: any) {
        // VULNERABILITY: Exposing internal error details
        res.status(500).json({ 
            error: 'Failed to send email', 
            details: error.message,
            stack: error.stack
        });
    }
}
