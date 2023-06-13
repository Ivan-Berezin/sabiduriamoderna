const express = require('express');
const nodemailer = require('nodemailer');
const app = express();


app.all('/submit', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.json({ success: false });
    return;
  }

  // Create a nodemailer transporter using your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'smtp.elasticemail.com', // e.g., 'Gmail', 'Yahoo', etc.
    auth: {
      user: 'ibhol1702@gmail.com',
      pass: '1D58249CC6F8797758D30A149F7713043B15',
    },
  });

  // Email options
  const mailOptions = {
    from: `${email}`,
    to: 'ibhol1702@gmail.com',
    subject: 'New Blog Form Submission',
    text: `Name: ${name}\nEmail: ${email}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.json({ success: false });
    } else {
      console.log('Email sent:', info.response);
      res.json({ success: true });
    }
  });
});

const port = 3000; // You can change this to any available port number
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});