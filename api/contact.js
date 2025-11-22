import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, service, message } = req.body;

    if (!name || !email || !service || !message) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    try {
        // Connect to your email account (123reg, Gmail, Outlook etc)
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"AMD Creative" <design@amdcreative.co.uk>`,
            to: "design@amdcreative.co.uk",
            subject: `New enquiry from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Message:</strong><br>${message}</p>
            `
        });

        return res.status(200).json({ ok: true });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Email failed to send' });
    }
}

