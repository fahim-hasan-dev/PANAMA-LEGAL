import config from '../config'
import { ICreateAccount, IResetPassword } from '../interfaces/emailTemplate'

const darkLogoHeader = `
          <!-- Company Logo Header -->
          <tr>
            <td align="center" style="background-color: #16253E; padding: 10px 20px; border-bottom: 1px solid #1E293B;">
              <img src="https://i.ibb.co.com/wkXb3dS/PV-logo-login.png" alt="PV ASOCIADOS" style="width: 190px; max-width: 65%; height: auto; display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none;" />
            </td>
          </tr>`

const createAccount = (values: ICreateAccount) => {
  const userName = values.name?.trim() || 'User'
  const data = {
    to: values.email,
    subject: `Verify your account, ${userName} - PV ASOCIADOS`,
    html: `
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1E293B;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 540px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02);">
          ${darkLogoHeader}

          <!-- Email Content Body -->
          <tr>
            <td style="padding: 36px 32px;">
              <h1 style="font-size: 22px; font-weight: 700; color: #0F172A; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.01em;">
                Confirm Your Registration
              </h1>

              <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 24px 0; text-align: center;">
                Hello <strong style="color: #0F172A;">${userName}</strong>,<br>
                Thank you for joining <strong>PV ASOCIADOS</strong>. Please use the verification code below to confirm your account and complete your registration.
              </p>

              <!-- OTP Display Box -->
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px 16px; text-align: center; margin: 0 0 24px 0;">
                <span style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 34px; font-weight: 700; letter-spacing: 8px; color: #0F172A;">
                  ${values.otp}
                </span>
              </div>

              <p style="font-size: 13px; line-height: 1.5; color: #64748B; margin: 0; text-align: center;">
                This verification code will expire in <strong>5 minutes</strong>.<br>
                If you did not request this account registration, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #F1F5F9;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} <strong>PV ASOCIADOS</strong>. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
    `,
  }
  return data
}

const resetPassword = (values: IResetPassword) => {
  const userName = values.name?.trim() || 'User'
  const data = {
    to: values.email,
    subject: `Reset your PV ASOCIADOS password, ${userName}`,
    html: `
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1E293B;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 540px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02);">
          ${darkLogoHeader}

          <!-- Body -->
          <tr>
            <td style="padding: 36px 32px;">
              <h1 style="font-size: 22px; font-weight: 700; color: #0F172A; margin: 0 0 16px 0; text-align: center;">
                Password Reset Request 🔐
              </h1>

              <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 24px 0; text-align: center;">
                Hi <strong style="color: #0F172A;">${userName}</strong>, 👋<br>
                We received a request to reset your password for your <strong>PV ASOCIADOS</strong> account. Enter the code below to complete the process:
              </p>

              <!-- OTP Box -->
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px 16px; text-align: center; margin: 0 0 24px 0;">
                <span style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 34px; font-weight: 700; letter-spacing: 8px; color: #0F172A;">
                  ${values.otp}
                </span>
              </div>

              <p style="font-size: 13px; line-height: 1.5; color: #64748B; margin: 0 0 20px 0; text-align: center;">
                This verification code is valid for <strong>5 minutes</strong>.<br>
                If you didn’t request this, please ignore this email — your account is safe.
              </p>

              <!-- Tip -->
              <div style="background-color: #FFFBEB; border-left: 4px solid #F59E0B; border-radius: 6px; padding: 12px 16px; margin-top: 20px;">
                <p style="margin: 0; color: #92400E; font-size: 13px; line-height: 1.5;">
                  ⚠️ <strong>Security Tip:</strong> Never share your reset code with anyone. PV ASOCIADOS will never ask for it.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #F1F5F9;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} <strong>PV ASOCIADOS</strong>. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
    `,
  }

  return data
}

const resendOtp = (values: {
  email: string
  name: string
  otp: string
  type: 'resetPassword' | 'createAccount'
}) => {
  const isReset = values.type === 'resetPassword'
  const userName = values.name?.trim() || 'User'

  const data = {
    to: values.email,
    subject: `${isReset ? 'Password Reset' : 'Account Verification'} - New Code`,
    html: `
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1E293B;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 540px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02);">
          ${darkLogoHeader}

          <!-- Body -->
          <tr>
            <td style="padding: 36px 32px;">
              <h1 style="font-size: 22px; font-weight: 700; color: #0F172A; margin: 0 0 16px 0; text-align: center;">
                ${isReset ? 'Reset Your Password 🔐' : 'Verify Your Account 🚀'}
              </h1>

              <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 24px 0; text-align: center;">
                Hi <strong style="color: #0F172A;">${userName}</strong>, 👋<br>
                ${isReset
                  ? 'You requested a new verification code to reset your PV ASOCIADOS password.'
                  : 'Here is your new verification code to complete your PV ASOCIADOS account setup.'
                }<br>
                Use the code below to continue:
              </p>

              <!-- OTP Box -->
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px 16px; text-align: center; margin: 0 0 24px 0;">
                <span style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 34px; font-weight: 700; letter-spacing: 8px; color: #0F172A;">
                  ${values.otp}
                </span>
              </div>

              <p style="font-size: 13px; line-height: 1.5; color: #64748B; margin: 0 0 20px 0; text-align: center;">
                This code is valid for <strong>5 minutes</strong>.<br>
                If this was not you, please ignore the email.
              </p>

              <!-- Tip -->
              <div style="background-color: #FFFBEB; border-left: 4px solid #F59E0B; border-radius: 6px; padding: 12px 16px; margin-top: 20px;">
                <p style="margin: 0; color: #92400E; font-size: 13px; line-height: 1.5;">
                  🔒 <strong>Security Tip:</strong> Never share your OTP with anyone. PV ASOCIADOS will never request it.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #F1F5F9;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} <strong>PV ASOCIADOS</strong>. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
    `,
  }

  return data
}

const adminContactNotificationEmail = (payload: {
  name: string
  email: string
  phone?: string
  message: string
}) => {
  return {
    to: config.super_admin.email as string,
    subject: '📩 New Contact Form Submission – PV ASOCIADOS',
    html: `
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1E293B;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 540px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02);">
          ${darkLogoHeader}

          <!-- Body -->
          <tr>
            <td style="padding: 36px 32px;">
              <h1 style="font-size: 22px; font-weight: 700; color: #0F172A; margin: 0 0 20px 0; text-align: center;">
                📬 New Contact Submission
              </h1>

              <p style="color: #475569; font-size: 15px; text-align: center; margin-bottom: 24px;">
                A new contact message has been submitted on <strong>PV ASOCIADOS</strong>.
              </p>

              <!-- Contact Details -->
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 12px 0; font-size: 15px; color: #0F172A;">👤 <strong>Name:</strong></td>
                  <td style="padding: 12px 0; font-size: 15px; color: #0F172A; text-align: right;">${payload.name}</td>
                </tr>
                <tr style="border-top: 1px solid #E2E8F0;">
                  <td style="padding: 12px 0; font-size: 15px; color: #0F172A;">📧 <strong>Email:</strong></td>
                  <td style="padding: 12px 0; font-size: 15px; color: #0F172A; text-align: right;">${payload.email}</td>
                </tr>
                <tr style="border-top: 1px solid #E2E8F0;">
                  <td style="padding: 12px 0; font-size: 15px; color: #0F172A;">📞 <strong>Phone:</strong></td>
                  <td style="padding: 12px 0; font-size: 15px; color: #0F172A; text-align: right;">${payload.phone || 'N/A'}</td>
                </tr>
              </table>

              <!-- Message Box -->
              <div style="background-color: #F8FAFC; border-left: 3px solid #0F172A; border-radius: 4px; padding: 16px 20px; margin-top: 24px;">
                <p style="margin: 0; font-size: 14px; color: #334155; line-height: 1.6; font-style: italic;">
                  “${payload.message}”
                </p>
              </div>

              <p style="color: #64748B; font-size: 13px; margin-top: 24px; text-align: center;">
                You can respond directly to <strong>${payload.email}</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #F1F5F9;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} <strong>PV ASOCIADOS</strong>. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
    `,
  }
}

const userContactConfirmationEmail = (payload: {
  name: string
  email: string
  message: string
}) => {
  const userName = payload.name?.trim() || 'Valued Client'
  return {
    to: payload.email,
    subject: 'Thank you for contacting PV ASOCIADOS',
    html: `
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1E293B;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 540px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02);">
          ${darkLogoHeader}

          <!-- Email Content Body -->
          <tr>
            <td style="padding: 36px 32px;">
              <h1 style="font-size: 22px; font-weight: 700; color: #0F172A; margin: 0 0 16px 0; text-align: center; letter-spacing: -0.01em;">
                We Have Received Your Message
              </h1>

              <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 24px 0; text-align: center;">
                Dear <strong style="color: #0F172A;">${userName}</strong>,<br>
                Thank you for contacting <strong>PV ASOCIADOS</strong>. We have received your inquiry and our support team will get back to you shortly.
              </p>

              <!-- Message Card -->
              <div style="background-color: #F8FAFC; border-left: 3px solid #0F172A; border-radius: 4px; padding: 16px 20px; margin: 0;">
                <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0; font-style: italic;">
                  “${payload.message}”
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #F1F5F9;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} <strong>PV ASOCIADOS</strong>. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
    `,
  }
}

const sendPaymentConfirmationEmail = (data: any) => {
  const parcelsHtml = data.parcel
    .map(
      (p: any, i: number) => `
        <tr>
          <td style="padding:6px 0; color:#475569;">Parcel ${i + 1}:</td>
          <td style="padding:6px 0; color:#0F172A; text-align:right;">
            ${p.name}, ${p.weight}${p.mass_unit}
          </td>
        </tr>
      `,
    )
    .join('')

  return {
    to: data.address_to.email,
    subject: `✅ Payment Completed – PV ASOCIADOS Order`,
    html: `
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1E293B;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden;">
          ${darkLogoHeader}

          <tr>
            <td style="padding: 32px;">
              <h2 style="color:#0F172A; font-size: 20px; text-align: center; margin: 0 0 16px 0;">Payment Successful ✅</h2>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; text-align: center;">
                Hello <strong style="color:#0F172A;">${data.address_from.name}</strong>, your payment for your order has been successfully completed.
              </p>

              <h3 style="color:#0F172A; font-size:16px; margin-top:24px;">📨 Sender & Receiver</h3>
              <p style="font-size:14px; margin:4px 0; color:#475569;"><strong>From:</strong> ${data.address_from.name}, ${data.address_from.city}, ${data.address_from.country}</p>
              <p style="font-size:14px; margin:4px 0; color:#475569;"><strong>To:</strong> ${data.address_to.name}, ${data.address_to.city}, ${data.address_to.country}</p>

              <h3 style="color:#0F172A; font-size:16px; margin-top:20px;">📦 Shipping Details</h3>
              <p style="font-size:14px; margin:4px 0; color:#475569;">Type: <strong>${data.shipping_type}</strong></p>
              <p style="font-size:14px; margin:4px 0; color:#475569;">Status: <strong>${data.status}</strong></p>

              <h3 style="color:#0F172A; font-size:16px; margin-top:20px;">🛍 Parcels</h3>
              <table style="width:100%; border-collapse:collapse;">${parcelsHtml}</table>

              <h3 style="color:#0F172A; font-size:16px; margin-top:20px;">💰 Payment Summary</h3>
              <p style="font-size:14px; margin:4px 0; color:#475569;">Shipping Cost: £${data.shipping_cost}</p>
              <p style="font-size:14px; margin:4px 0; color:#0F172A; font-weight:700;">Total Paid: £${data.total_cost}</p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #F1F5F9;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0;">
                &copy; ${new Date().getFullYear()} <strong>PV ASOCIADOS</strong>. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
    `,
  }
}

const sendAdminPaymentNotificationEmail = (data: any) => {
  return {
    to: config.super_admin.email as string,
    subject: `💡 Payment Completed by ${data.address_from.name} – ${data.shipping_type}`,
    html: `
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1E293B;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden;">
          ${darkLogoHeader}

          <tr>
            <td style="padding: 32px;">
              <h2 style="color:#0F172A; font-size: 20px; text-align: center; margin: 0 0 16px 0;">Payment Notification</h2>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; text-align: center;">
                <strong style="color:#0F172A;">${data.address_from.name}</strong> has successfully completed payment for <strong>${data.shipping_type}</strong>.
              </p>

              <table style="width:100%; border-collapse:collapse; margin-top: 20px;">
                <tr>
                  <td style="padding:8px 0; color:#64748B;">Customer Name:</td>
                  <td style="padding:8px 0; color:#0F172A; text-align:right;">${data.address_from.name}</td>
                </tr>
                <tr style="border-top:1px solid #E2E8F0;">
                  <td style="padding:8px 0; color:#64748B;">Email:</td>
                  <td style="padding:8px 0; color:#0F172A; text-align:right;">${data.address_from.email}</td>
                </tr>
                <tr style="border-top:1px solid #E2E8F0;">
                  <td style="padding:8px 0; color:#64748B;">Total Paid:</td>
                  <td style="padding:8px 0; color:#0F172A; font-weight:700; text-align:right;">£${data.total_cost}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #F1F5F9;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0;">
                &copy; ${new Date().getFullYear()} <strong>PV ASOCIADOS</strong>. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
    `,
  }
}

const businessUserShipmentInfoEmail = (data: any) => {
  return {
    to: data.address_from.email,
    subject: `📦 Your Lost Item Has Been Booked – #${data._id}`,
    html: `
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1E293B;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden;">
          ${darkLogoHeader}

          <tr>
            <td style="padding: 32px;">
              <h2 style="color:#0F172A; font-size: 20px; text-align: center; margin: 0 0 16px 0;">Item Booked for Shipment</h2>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; text-align: center;">
                Hello <strong style="color:#0F172A;">${data.address_from.name}</strong>,<br>
                Your added lost item has been successfully booked for shipment (ID: <strong>${data._id}</strong>).
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #F1F5F9;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0;">
                &copy; ${new Date().getFullYear()} <strong>PV ASOCIADOS</strong>. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
    `,
  }
}

const businessUserRegistrationInviteEmail = (data: any) => {
  return {
    to: data.address_from.email,
    subject: `📦 Action Required – Create Your PV ASOCIADOS Account`,
    html: `
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1E293B;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden;">
          ${darkLogoHeader}

          <tr>
            <td style="padding: 32px;">
              <h2 style="color:#0F172A; font-size: 20px; text-align: center; margin: 0 0 16px 0;">Lost Item Shipment Created</h2>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; text-align: center;">
                Hello <strong style="color:#0F172A;">${data.address_from.name}</strong>,<br>
                A customer has booked a shipment for the lost item found (Booking ID: <strong>${data._id}</strong>).
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #F1F5F9;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0;">
                &copy; ${new Date().getFullYear()} <strong>PV ASOCIADOS</strong>. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
    `,
  }
}

const guestLostItemNotificationEmail = (data: any) => {
  return {
    to: data.guestEmail,
    subject: `📦 We Found Your Lost Item`,
    html: `
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1E293B;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden;">
          ${darkLogoHeader}

          <tr>
            <td style="padding: 32px;">
              <h2 style="color:#0F172A; font-size: 20px; text-align: center; margin: 0 0 16px 0;">We Found Your Item!</h2>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; text-align: center;">
                Hello <strong style="color:#0F172A;">${data.guestName}</strong>,<br>
                Our team has located an item matching your belongings: <strong>${data.itemName}</strong>.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #F1F5F9;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0;">
                &copy; ${new Date().getFullYear()} <strong>PV ASOCIADOS</strong>. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
    `,
  }
}

const businessShippingDetailsUpdateEmail = (data: any) => {
  return {
    to: data.address_from.email,
    subject: `📦 Shipping Details Updated – #${data._id}`,
    html: `
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1E293B;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden;">
          ${darkLogoHeader}

          <tr>
            <td style="padding: 32px;">
              <h2 style="color:#0F172A; font-size: 20px; text-align: center; margin: 0 0 16px 0;">Shipping Details Updated</h2>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; text-align: center;">
                Hello <strong style="color:#0F172A;">${data.address_from.name}</strong>,<br>
                The shipping for this shipment (ID: <strong>${data._id}</strong>) has been booked with <strong>${data.carrier || 'the carrier'}</strong>.
              </p>
              <p style="font-size: 14px; color: #334155; margin-top: 16px; text-align: center;"><strong>Tracking ID:</strong> ${data.tracking_id || 'N/A'}</p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #F1F5F9;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0;">
                &copy; ${new Date().getFullYear()} <strong>PV ASOCIADOS</strong>. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
    `,
  }
}

const customerShippingDetailsUpdateEmail = (data: any) => {
  return {
    to: data.address_to.email,
    subject: `📦 Your Shipment Tracking Details Updated – #${data._id}`,
    html: `
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1E293B;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden;">
          ${darkLogoHeader}

          <tr>
            <td style="padding: 32px;">
              <h2 style="color:#0F172A; font-size: 20px; text-align: center; margin: 0 0 16px 0;">Shipment Trackable</h2>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; text-align: center;">
                Hello <strong style="color:#0F172A;">${data.address_to.name}</strong>,<br>
                Your shipment has been booked with carrier <strong>${data.carrier || 'N/A'}</strong>.<br>
                Tracking Number: <strong>${data.tracking_id || 'N/A'}</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #F1F5F9;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0;">
                &copy; ${new Date().getFullYear()} <strong>PV ASOCIADOS</strong>. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
    `,
  }
}

const subscriptionActivatedEmail = (data: any) => {
  return {
    to: data.user.email,
    subject: `✅ Subscription Activated – Welcome to PV ASOCIADOS`,
    html: `
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1E293B;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden;">
          ${darkLogoHeader}

          <tr>
            <td style="padding: 32px;">
              <h2 style="color:#0F172A; font-size: 20px; text-align: center; margin: 0 0 16px 0;">Subscription Activated!</h2>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; text-align: center;">
                Hello <strong>${data.user.firstName}</strong>,<br>
                Your subscription for <strong>${data.plan.title}</strong> has been successfully activated.
              </p>
              <p style="font-size: 14px; color: #475569; margin: 4px 0; text-align: center;"><strong>Amount Paid:</strong> £${data.amountPaid}</p>
              <p style="font-size: 14px; color: #475569; margin: 4px 0; text-align: center;"><strong>Transaction ID:</strong> ${data.trxId}</p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #F1F5F9;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0;">
                &copy; ${new Date().getFullYear()} <strong>PV ASOCIADOS</strong>. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
    `,
  }
}

const lawyerAccountCreated = (values: {
  name: string
  email: string
  password: string
}) => {
  const userName = values.name?.trim() || 'Attorney'
  return {
    to: values.email,
    subject: `⚖️ Welcome to PV & ASOCIADOS Legal Group – Your Attorney Credentials`,
    html: `
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1E293B;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden;">
          ${darkLogoHeader}

          <tr>
            <td style="padding: 36px 32px;">
              <h1 style="color: #0F172A; font-size: 22px; font-weight: 700; margin-bottom: 16px; text-align: center;">
                Welcome to PV & ASOCIADOS Legal Group, ${userName}! ⚖️
              </h1>

              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 24px; text-align: center;">
                An administrator has registered your official <strong>PV & ASOCIADOS Legal Group</strong> attorney account.<br>
                Use the credentials below to log into the attorney portal:
              </p>

              <!-- Credentials Box -->
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #64748B;">📧 <strong>Email:</strong></td>
                    <td style="padding: 8px 0; font-size: 14px; color: #0F172A; font-weight: 700; text-align: right;">${values.email}</td>
                  </tr>
                  <tr style="border-top: 1px solid #E2E8F0;">
                    <td style="padding: 8px 0; font-size: 14px; color: #64748B;">🔑 <strong>Password:</strong></td>
                    <td style="padding: 8px 0; font-size: 14px; color: #1E3A8A; font-weight: 700; text-align: right;">${values.password}</td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #FFFBEB; border-left: 4px solid #F59E0B; border-radius: 6px; padding: 12px 16px; margin-top: 20px;">
                <p style="margin: 0; color: #92400E; font-size: 13px; line-height: 1.5;">
                  🔒 <strong>Security Notice:</strong> Please log in and change your password in account settings for optimal security.
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #F1F5F9;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0;">
                &copy; ${new Date().getFullYear()} <strong>PV & ASOCIADOS Legal Group</strong>. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
    `,
  }
}

export const emailTemplate = {
  createAccount,
  resetPassword,
  resendOtp,
  userContactConfirmationEmail,
  adminContactNotificationEmail,
  sendPaymentConfirmationEmail,
  sendAdminPaymentNotificationEmail,
  businessUserShipmentInfoEmail,
  businessUserRegistrationInviteEmail,
  guestLostItemNotificationEmail,
  businessShippingDetailsUpdateEmail,
  customerShippingDetailsUpdateEmail,
  subscriptionActivatedEmail,
  lawyerAccountCreated,
}
