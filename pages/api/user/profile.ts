import { NextApiResponse } from 'next';
import { config } from 'dotenv';

import withProtect from '../../../middlewares/auth/with_protected';

config();

const userProfileHandler = async (req: any, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      res.status(200).json({
        status: 'ok',
        message: 'user profile retrieved successfully',
        data: { ...req.user },
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

export default withProtect(userProfileHandler);
