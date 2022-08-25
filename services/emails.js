const nodemailer = require('nodemailer');
const { ErrorObject } = require('../helpers/error');

exports.nodemail = async (req) => {
  try {
    const { name, email, message } = req.body;
    const content = `
    <h2>From: ${name}</h2>
    <ul>
        <li>Email: ${email}</li>
        <li>Message: ${message}</li>
    </ul>
    `;
    const transport = nodemailer.createTransport({
      host: `${process.env.HOST_EMAIL}`,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    await transport.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.MY_EMAIL,
      subject: 'Contact',
      html: content,
    });

    return { message: 'Email sent' };
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
