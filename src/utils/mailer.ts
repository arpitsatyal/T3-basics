import nodemailer from "nodemailer";

export async function sendLoginEmail({
  email,
  url,
  token,
}: {
  email: string;
  url: string;
  token: string;
}) {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  const info = await transporter.sendMail({
    from: "Arpit Satyal <arpited7@gmail.com>",
    to: email,
    subject: "login to your account.",
    html: `login by clicking here: <a href=${url}/login#token=${token}>HERE</a>`,
  });
  console.log(`preview url: ${nodemailer.getTestMessageUrl(info)}`);
}
