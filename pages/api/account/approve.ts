import { NextApiResponse } from 'next';
import { config } from 'dotenv';

import withProtect from '../../../middlewares/auth/with_protected';
import prisma from '../../../lib/prisma';

config();

const approveAccountHandler = async (req: any, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const approvedAccount = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          isVerified:"verified"
        },
      });
      res.status(200).json({
        status: 'ok',
        message: 'account approved successfully',
        data: { ...approvedAccount },
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: "account approval failed",
        data: error,
      });
    }
  }
};

export default withProtect(approveAccountHandler);
