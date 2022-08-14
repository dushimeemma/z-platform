import { NextApiResponse } from 'next';
import { config } from 'dotenv';

import withProtect from '../../../middlewares/auth/with_protected';
import prisma from '../../../lib/prisma';

config();

const verifyAccountHandler = async (req: any, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      const updatedProfile = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          ...req.body,
          isVerified:"pending verification"
        },
      });
      res.status(200).json({
        status: 'ok',
        message: 'account under review successfully',
        data: { ...updatedProfile },
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: "account verification failed",
        data: error,
      });
    }
  }
};

export default withProtect(verifyAccountHandler);
