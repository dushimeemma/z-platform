import * as Yup from 'yup';

export const validationSignupSchema = Yup.object().shape({
    name: Yup.string().required().label('Name'),
    email: Yup.string().required().label('Email'),
    password: Yup.string().required().min(8).max(24).label('Password'),
});

export const validationLoginSchema = Yup.object().shape({
    email: Yup.string().required().label('Email'),
    password: Yup.string().required().min(8).max(24).label('Password'),
});

export const validationForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required().label('Email')
});

export const validationResetPasswordSchema = Yup.object().shape({
    password: Yup.string().required().min(8).max(24).label('Password'),
    confirm_password: Yup.string().required().min(8).max(24).label('Confirm password'),
});
