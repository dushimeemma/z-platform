import { config } from 'dotenv';

import { getToken } from '../../helpers/get_tokens';
import { decode } from '../../helpers/jwt_functions';
import prisma from '../../lib/prisma';

config();

const withProtect = (handler: any) => {
  return async (req: any, res: any) => {
    try {
      const { JWT_SECRET } = process.env;
      const token = getToken(req.headers.authorization);
      const userExists: any = decode(token, JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { email: userExists.email },
      });
      if (!userExists || !user) {
        return res.status(401).json({
          status: 'failed',
          error: 'Unauthorized',
          data: {},
        });
      }

      req.user = user;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({
        status: 'failed',
        error: 'Unauthorized',
        data: error,
      });
    }
  };
};

export default withProtect;
