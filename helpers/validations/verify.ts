import * as Yup from 'yup';

export const validationVerifyAccountSchema = Yup.object().shape({
    identity: Yup.string().required().label('Identity or passport number'),
});
