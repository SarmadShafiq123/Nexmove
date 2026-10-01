export const generateLeadEmailTemplate = (lead) => {
  const submissionTime = new Date(lead.createdAt).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'long'
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Carrier Lead</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">NEXMOVE</h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">New Carrier Lead Received</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 22px;">Lead Information</h2>
              
              <table width="100%" cellpadding="10" cellspacing="0">
                <tr>
                  <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280;">Full Name:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #1f2937;">${lead.fullName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280;">Company Name:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #1f2937;">${lead.companyName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280;">Email:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                    <a href="mailto:${lead.email}" style="color: #2563eb; text-decoration: none;">${lead.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280;">Phone:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                    <a href="tel:${lead.phone}" style="color: #2563eb; text-decoration: none;">${lead.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280;">Truck Type:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #1f2937;">${lead.truckType}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280;">MC Number:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #1f2937;">${lead.mcNumber}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280;">DOT Number:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #1f2937;">${lead.dotNumber}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280;">Submission Time:</strong>
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #1f2937;">${submissionTime}</span>
                  </td>
                </tr>
              </table>
              
              <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-left: 4px solid #2563eb; border-radius: 4px;">
                <h3 style="color: #1f2937; margin: 0 0 10px 0; font-size: 18px;">Message:</h3>
                <p style="color: #4b5563; margin: 0; line-height: 1.6; white-space: pre-wrap;">${lead.message}</p>
              </div>
              
              <div style="margin-top: 30px; padding: 20px; background-color: #eff6ff; border-radius: 4px; text-align: center;">
                <p style="color: #1e40af; margin: 0; font-size: 14px;">
                  <strong>Lead ID:</strong> ${lead._id}
                </p>
              </div>
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                © 2026 NEXMOVE Dispatch System. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};
