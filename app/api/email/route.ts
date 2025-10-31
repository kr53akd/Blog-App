import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const {body, email} = await req.json();
    nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return NextResponse.json({message: "Failed to create a testing account"});
    }

    console.log('Credentials obtained, sending message...');

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });

    // Message object
    let message = {
        from: 'Sender Name <sender@example.com>',
        to: `Recipient ${email}`,
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: body    
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return NextResponse.json({message: "Error occurred."});
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        return NextResponse.json({message: "Email sent"});
    });
});
  return NextResponse.json("test")
}