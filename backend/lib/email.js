import { Resend } from 'resend';
import { passwordGen } from './gen.js';


export const sendEmail = (email, name, username, password) => {

    const resend = new Resend(process.env.RESEND_API_KEY);


    try{


        resend.emails.send({
            from: 'service@southernbasin.com',
            to: email,
            subject: 'Hello World',
            html: 
            `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Southern Basin • Your Dashboard Credentials</title>
                <style>
                    /* ---------- GENERAL RESET ---------- */
                    body {
                    margin: 0;
                    padding: 0;
                    background-color: #edf2f7;
                    font-family: Arial, Helvetica, sans-serif;
                    color: #2d3748;
                    -webkit-text-size-adjust: none;
                    }
                    table {
                    border-spacing: 0;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    }
                    img {
                    border: 0;
                    line-height: 100%;
                    text-decoration: none;
                    display: block;
                    max-width: 100%;
                    height: auto;
                    }
                    a {
                    color: #006dff;
                    text-decoration: none;
                    }

                    /* ---------- RESPONSIVE ---------- */
                    @media only screen and (max-width: 600px) {
                    .container {
                        width: 100% !important;
                        padding-left: 18px !important;
                        padding-right: 18px !important;
                    }
                    .stack {display:block !important; width:100% !important;}
                    .text-center {text-align:center !important;}
                    h1 {font-size: 22px !important;}
                    }
                </style>
                </head>

                <body>
                <!-- PREHEADER (hidden preview text) -->
                <div style="display:none;font-size:0;max-height:0;overflow:hidden;opacity:0;">Secure access details for your Southern Basin dashboard.</div>

                <!-- BACKGROUND -->
                <table role="presentation" width="100%" bgcolor="#edf2f7">
                    <tr>
                    <td align="center">
                        <!--[if (gte mso 9)|(IE)]>
                        <table role="presentation" width="600"><tr><td>
                        <![endif]-->
                        <table role="presentation" class="container" width="100%" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;">

                        <!-- HEADER -->
                        <tr>
                            <td style="padding:24px 32px 12px;" align="left">
                            <table role="presentation" width="100%"><tr>
                                <td class="stack" style="vertical-align:middle;">
                                <img src="https://i.ibb.co/5xnSCQ03/1000892271-removebg-preview.png" alt="Southern Basin Limited" width="160"/>
                                </td>
                                <td class="stack text-center" style="font-size:14px;color:#718096;">Engineering • Construction • Logistics</td>
                            </tr></table>
                            </td>
                        </tr>

                        <!-- HERO BANNER -->
                        <tr>
                            <td style="background:#003366;background:linear-gradient(135deg,#003366 0%,#0052b3 100%);padding:36px 32px;color:#ffffff;">
                            <h1 style="margin:0;font-size:26px;font-weight:600;">Dashboard Access Credentials</h1>
                            <p style="margin:8px 0 0;font-size:15px;font-weight:300;">Hello <strong>${name}</strong>, your dedicated workspace is ready.</p>
                            </td>
                        </tr>

                        <!-- MAIN BODY -->
                        <tr>
                            <td style="padding:32px 32px 16px;">
                            <p style="margin:0 0 18px;line-height:1.6;">
                            We’re delighted to welcome you to the Southern Basin Client Dashboard, a central hub for tracking project milestones, managing documentation, and receiving real-time updates.
                            </p>
                            <!-- CREDENTIALS CARD -->
                            <table role="presentation" width="100%" style="border-collapse:collapse;margin-bottom:24px;">
                                <tr>
                                <td colspan="2" style="padding:12px 18px;background:#f7fafc;border:1px solid #e2e8f0;font-size:15px;font-weight:600;">Secure Login Details</td>
                                </tr>
                                <tr>
                                <td style="padding:12px 18px;border:1px solid #e2e8f0;width:130px;background:#edf2f7;font-weight:600;">Username</td>
                                <td style="padding:12px 18px;border:1px solid #e2e8f0;">${username}</td>
                                </tr>
                                <tr>
                                <td style="padding:12px 18px;border:1px solid #e2e8f0;background:#edf2f7;font-weight:600;">Password</td>
                                <td style="padding:12px 18px;border:1px solid #e2e8f0;">${password}</td>
                                </tr>
                            </table>

                            <!-- CTA BUTTON -->
                            <table role="presentation" align="center" style="margin-bottom:32px;">
                                <tr>
                                <td align="center" bgcolor="#006dff" style="border-radius:4px;">
                                    <a href="https://southernbasin.com/s/client" target="_blank" style="display:inline-block;padding:14px 32px;font-size:16px;font-weight:600;line-height:1;color:#ffffff;border-radius:4px;">Open Dashboard</a>
                                </td>
                                </tr>
                            </table>

                            <p style="margin:0 0 16px;line-height:1.6;font-size:14px;">
                            
                            For support, reach us at <a href="mailto:support@southernbasin.com">support@southernbasin.com</a> or call +234&nbsp;803&nbsp;316&nbsp;8956.</p>
                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td style="background:#f7fafc;padding:24px 32px;font-size:12px;color:#718096;line-height:1.5;">
                            <p style="margin:0 0 8px;"><strong>Southern Basin Limited</strong> • RC 999968</p>
                            <p style="margin:0 0 8px;">Plot 9, Circular Road, Presidential Estate, Port Harcourt, Nigeria</p>
                            <p style="margin:0 0 8px;">© ${new Date().getFullYear()} Southern Basin Limited. All rights reserved.</p>
                            <p style="margin:0;font-size:11px;color:#a0aec0;">This message and any attachments are confidential and intended solely for the recipient. If received in error, please delete and notify the sender immediately.</p>
                            </td>
                        </tr>

                        </table>
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                    </td>
                    </tr>
                </table>
                </body>
                </html>

                            
                            
                            `
            });

        console.log({user, key})


    }catch(error){
        return {success: false, message: error.message}
    }
}