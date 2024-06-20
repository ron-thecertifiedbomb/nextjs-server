import { NextApiRequest, NextApiResponse } from 'next';
const nodemailer = require('nodemailer');


const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { payload } = req.body;
    console.log('Payload from Initial Care mobx provider', payload);

    if (!payload) {
      res.status(400).json({ message: 'Invalid payload' });
      return;
    }

    const otpCode = generateCode();

    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 'ronan.ramos.sibunga@gmail.com', 
        pass: 'Mybabe0814'
      }
    });

    const mailOptions = {
      from: 'ronan.ramos.sibunga@gmail.com', 
      to: 'recipient@example.com', 
      subject: 'OTP Password', 
      text: `Your OTP code is: ${otpCode}` 
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Error sending email', error: error.message });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({
          message: 'One Time Password sent successfully',
          otp: otpCode
        });
      }
    });

  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
