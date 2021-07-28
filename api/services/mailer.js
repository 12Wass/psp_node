import nodemailer from 'nodemailer';
import SMTPConfigs from '../smtp.config.local';

class Mailer {}

Mailer.transporter = nodemailer.createTransport( SMTPConfigs );

Mailer.send = ( options = { from: SMTPConfigs.auth.user, to, subject, text, html }, cb) => {
    Mailer.transporter.sendMail({ from: SMTPConfigs.auth.user,...options }, cb);
}

export default Mailer;