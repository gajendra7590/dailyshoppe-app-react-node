import { transporter } from "../config/mailConfig.js";

export const sendVerificationEmail = async ({
    email,
    name,
    verificationUrl,
}) => {

    const mailData = {
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
        to: (process.env.APP_ENV == 'production') ? email : process.env.MAIL_TEST_TO_EMAIL,
        subject: "Verify Your Account",
        html: `
        <div style="max-width:600px;margin:0 auto;padding:20px;font-family:Arial,sans-serif;">
            
            <h2>Welcome to ${process.env.APP_NAME}</h2>

            <p>Hello ${name},</p>

            <p>
                Thank you for creating an account.
                Please verify your email address by clicking the button below.
            </p>

            <div style="margin:30px 0;text-align:center;">
                <a
                    href="${verificationUrl}"
                    style="
                        background:#2563eb;
                        color:#fff;
                        padding:12px 24px;
                        text-decoration:none;
                        border-radius:5px;
                        display:inline-block;
                    "
                >
                    Verify Account
                </a>
            </div>

            <p>
                If the button does not work, copy and paste the link below into your browser:
            </p>

            <p>
                <a href="${verificationUrl}">
                    ${verificationUrl}
                </a>
            </p>

            <p>
                This link will expire in 24 hours.
            </p>

            <hr />

            <p style="font-size:12px;color:#666;">
                If you did not create this account, you can safely ignore this email.
            </p>

        </div>
    `,
    };

    try {
        const info = await transporter.sendMail(mailData);

        console.log(
            "Verification email sent:",
            info.messageId
        );

        return info;

    } catch (error) {
        console.error(
            "Failed to send verification email:",
            error
        );

        throw error;
    }

};