const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: 'fadhelfikri@yahoo.com',
        pass: 'qfaeokubzwsnadkc'
    }
});

exports.sendEmailWithAttachments = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            const { senderName, recipientEmail, subject, message, attachment1, attachment2 } = req.body;

            const mailOptions = {
                from: 'fadhelfikri@yahoo.com',
                to: recipientEmail,
                subject: subject,
                text: message,
                attachments: [
                    {
                        filename: 'fadhel-fikri.png',
                        encoding: 'base64'
                    },
                    {
                        filename: 'attachment2.png',
                        content: attachment2,
                        encoding: 'base64'
                    }
                ]
            };

            await transporter.sendMail(mailOptions);

            res.status(200).send('Email berhasil dikirim dengan lampiran');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Gagal mengirim email');
        }
    });
});