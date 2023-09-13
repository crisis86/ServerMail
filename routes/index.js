const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
//const bodyParser = require('body-parser');
//const app= express()

//app.use(bodyParser());

let transport = {
  host: "smtps.aruba.it",
    port: 465,
    secure: true,
    auth: {
      user: 'info@spinuptennis.it',
      pass: 'Modica2022@'
  }
}

let transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  const from ="info@spinuptennis.it";
  let name = req.body.name
  let email = req.body.email
  let message = req.body.message
   // let content = `name: ${name} \n email: ${email} \n message: ${content} `

  console.log(req.body.email)

  let mail = {
    from: from,
    to: email,  //Change to email address that you want to receive messages on
    subject: name,
    text: message
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router;
