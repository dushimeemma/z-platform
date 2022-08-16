import { NextApiResponse } from 'next';
import { config } from 'dotenv';

import withProtect from '../../../middlewares/auth/with_protected';
import prisma from '../../../lib/prisma';

config();

const updateProfileHandler = async (req: any, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const { age } = req.body;
    try {
      const updatedProfile = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          ...req.body,
          age: Number(age),
        },
      });
      res.status(200).json({
        status: 'ok',
        message: 'user profile updated successfully',
        data: { ...updatedProfile},
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: "user doesn't exists",
        data: error,
      });
    }
  }
};

export default withProtect(updateProfileHandler);
