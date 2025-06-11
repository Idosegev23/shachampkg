import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { name, phone, email, company, package: selectedPackage, message } = req.body;
        
        // Validate
        if (!name || !phone || !email) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Create transporter
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

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
                <p><strong>חבילה:</strong> ${selectedPackage || 'לא נבחר'}</p>
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
            subject: `🔔 פנייה חדשה מ-${name} | ${selectedPackage || 'כללי'}`,
            html: emailContent
        });

        res.status(200).json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
} 