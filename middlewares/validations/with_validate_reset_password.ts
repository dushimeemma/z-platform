import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

const withValidateResetPassword = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const schema = Joi.object({
      token: Joi.string().messages({
        'any.required': 'Token is required',
        'string.empty': 'Token can not be empty',
      }),
      confirm_password: Joi.string().messages({
        'any.required': 'Confirm password is required',
        'string.empty': 'Confirm password can not be empty',
      }),
      password: Joi.string()
        .regex(
          new RegExp(
            '^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=])(?=.*?[0-9]).*$'
          )
        )
        .required()
        .messages({
          'any.required': 'Password is required',
          'string.pattern.base':
            'Password must be at least 8 characters including 1 uppercase and special character',
          'string.empty': 'Password can not be empty',
        }),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({
        status: 'failed',
        error: error.details[0].message,
        data: error,
      });
    return handler(req, res);
  };
};

export default withValidateResetPassword;
