export function getEmailTemplate(confirmLink: string, sendEmail: string) {
  const sendInfo = {
    confirmLink: confirmLink,
    url: process.env.NEXTAUTH_URL,
    domain: process.env.DOMAIN,
    sendEmail: sendEmail,
  }
  return `
  <!DOCTYPE html>
  <html>
  <head>
  <title>Welcome Email</title>
  </head>
  <body style="font-family: Arial, sans-serif; color: #333;">
      <h2>Welcome to Our Community!</h2>
      <p>Dear [Recipient Name],</p>
      <p>Thank you for signing up. Please confirm your email address to complete your registration.</p>
      <p><a href="${confirmLink}" style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; display: inline-block; border-radius: 5px;">Confirm Email</a></p>
      <p>This link will expire in 24 hours for security reasons. If you did not initiate this request, please ignore this email.</p>
      <p>Best regards,<br> 李成浩 </p>
      <footer style="font-size: 12px; color: #777;">
          <p>This message was sent to ${sendInfo.sendEmail} from ${sendInfo.domain} .</p>
          <p>For more information, visit our website at [Your Website Link].</p>
      </footer>
  </body>
  </html>
  `
}
