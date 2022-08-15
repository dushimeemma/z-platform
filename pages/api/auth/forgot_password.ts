import { NextApiRequest, NextApiResponse } from 'next';
import { config } from 'dotenv';
import nodemailer from 'nodemailer';

import { encode } from '../../../helpers/jwt_functions';
import prisma from '../../../lib/prisma';
import withValidateForgotPassword from '../../../middlewares/validations/with_validate_forgot_password';

config();

const forgotPasswordHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      const { MAILTRAP_USER, MAILTRAP_PASSWORD, SENDER_EMAIL } = process.env;

      const checkUser: any = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!checkUser) {
        return res.status(401).json({
          status: 'failed',
          error: 'unauthorized',
          data: {},
        });
      }

      const token = encode(checkUser, process.env.JWT_SECRET);

      const transport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 587,
        auth: {
          user: MAILTRAP_USER,
          pass: MAILTRAP_PASSWORD,
        },
      });

      const mailOptions = {
        from: SENDER_EMAIL,
        to: email,
        subject: 'Reset password',
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Reset Password</title>
            <style>
              body {
                margin: 0;
                padding: 0;
              }
              .container {
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .wrapper {
                width: 50vw;
                height: 50vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="wrapper">
                <span>Dear ${email}</span>
                <p>Click <a href='${process.env.ENV_URL}/auth/reset_password?token=${token}'>here</a> to reset your password</p>
                <span>Best regards,</span>
              </div>
            </div>
          </body>
        </html>`,
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(400).json({
            status: 'failed',
            error: 'Reset password link not sent',
            data: error,
          });
        }
        res.status(200).json({
          status: 'ok',
          message: `Check your email: ${email} to reset your password`,
          token,
          data: checkUser,
        });
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: 'Reset password link not sent',
        data: error,
      });
    }
  }
};

export default withValidateForgotPassword(forgotPasswordHandler);
