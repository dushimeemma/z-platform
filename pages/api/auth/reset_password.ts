import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

import {  decode } from '../../../helpers/jwt_functions';
import prisma from '../../../lib/prisma';
import withValidateResetPassword from '../../../middlewares/validations/with_validate_reset_password';

config();

const resetPasswordHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    try {
      const { password, confirm_password, token } = req.body;
      const { JWT_SECRET } = process.env;

      const user: any = decode(token, JWT_SECRET);

      if (!user) {
        return res.status(400).json({
          status: 'failed',
          error: "User doesn't exists",
          data: {},
        });
      }

      if (password !== confirm_password) {
        return res.status(400).json({
          status: 'failed',
          error: "Password doesn't match",
          data: {},
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hash,
        },
      });

      res.status(200).json({
        status: 'ok',
        message: 'Password reset successfully',
        data: { ...updatedUser },
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: 'Password reset failed',
        data: error,
      });
    }
  }
};

export default withValidateResetPassword(resetPasswordHandler);
