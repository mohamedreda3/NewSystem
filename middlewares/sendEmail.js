const nodemailer = require("nodemailer");

module.exports = class SendEmail {
  constructor() {}
  getCode() {
    let code = "";
    for (let i = 11; i < 17; i++) {
      code += Math.floor(Math.random() * i);
    }
    return code.substring(0, 6);
  }

  async sendEmail(email, code, message, text) {
    let transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      // port: 587,
      // secure: true, // true for 465, false for other ports
      service: "gmail",
      auth: {
        user: "mmoh336512@gmail.com",
        pass: "lnsslafgwggkzezl",
      },
    });

    let info = await transporter.sendMail({
      from: '"خيرنا" <mmoh336512@gmail.com>', // sender address
      to: email, // list of receivers
      subject: message, // Subject line
      text: text, // plain text body
      html: `
      <div
      style="color: black !important;
      width: 300px !important;
      min-height: fit-content !important;
      padding: 15px !important;
      margin: 10px auto !important;
      background: white !important;
      box-shadow: -4px -3px 17px -3px #808080ab !important;
      border: 12px ridge #a9a9a90a !important;
      border-radius: 8px !important;
      text-align:center
      ">
      <h2 style="margin:5px 0; color:black; font-weight:400">
      ${text}: 
      </h2>
      <h1 style="margin:5px 0; color:black; font-weight:400">
      <b>${code}</b>
      </h1>
      </div>`, // html body
    });

    return { code: code };
  }
};
