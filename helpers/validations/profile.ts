import * as Yup from 'yup';

export const validationUpdateProfileSchema = Yup.object().shape({
    name: Yup.string().required().label('Name'),
    gender: Yup.string().required().label('Gender'),
    dateOfBirth: Yup.string().required().label('Date of birth'),
    age: Yup.number().required().label('Age'),
    nationality: Yup.string().required().label('Nationality'),
    maritalStatus: Yup.string().required().label('Marital status'),
});
