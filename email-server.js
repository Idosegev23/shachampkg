const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer transporter
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Simple email endpoint
app.post('/send-email', async (req, res) => {
    try {
        const { name, phone, email, company, package, message } = req.body;
        
        // Validate
        if (!name || !phone || !email) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Format email
        const emailContent = `
        <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; max-width: 600px;">
            <h2 style="color: #2D90A6; border-bottom: 2px solid #F2D43D; padding-bottom: 10px;">
                פנייה חדשה - KA × שחם אורלן
            </h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">פרטי הלקוח:</h3>
                <p><strong>שם:</strong> ${name}</p>
                <p><strong>טלפון:</strong> <a href="tel:${phone}">${phone}</a></p>
                <p><strong>אימייל:</strong> <a href="mailto:${email}">${email}</a></p>
                ${company ? `<p><strong>חברה:</strong> ${company}</p>` : ''}
                <p><strong>חבילה:</strong> ${package || 'לא נבחר'}</p>
            </div>

            ${message ? `
            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #856404; margin-top: 0;">הודעה:</h3>
                <p style="color: #856404; line-height: 1.6;">${message}</p>
            </div>
            ` : ''}

            <div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin-top: 30px; text-align: center;">
                <p style="margin: 0; color: #0066cc;">
                    <strong>זמן הפנייה:</strong> ${new Date().toLocaleString('he-IL')}
                </p>
            </div>
        </div>
        `;

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'meravn@shaham-orlan.co.il',
            subject: `🔔 פנייה חדשה מ-${name} | ${package || 'כללי'}`,
            html: emailContent
        });

        res.json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', time: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`📧 Email server running on port ${PORT}`);
    console.log(`📬 Sending to: meravn@shaham-orlan.co.il`);
}); 