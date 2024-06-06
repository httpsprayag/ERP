import * as yup from 'yup';

const userLoginYup = yup.object().shape({
  email: yup.string().email('Please enter valid email!').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const addUserYup = yup.object().shape({
  email: yup
    .string()
    .typeError('Email must be a string')
    .email('Please enter valid email')
    .required('Email is required'),
  name: yup.string().strict().typeError('Name must be a string').required('Name is required.'),
  password: yup.string().strict().typeError('Password must be a string').required('Password is required'),
  contactNumber: yup
    .string()
    .matches(/^(\+|\d)+$/, 'Contact number must contain only numbers and the "+" sign')
    .required('Contact number is required'),
  warehouseId: yup
    .number('warehouse Id should be number')
    .strict()
    .typeError('Warehouse Id must be a number')
    .required('Warehouse Id is required'),
  roleId: yup
    .number('Role Id should be number')
    .strict()
    .typeError('Role Id must be a number')
    .required('Role Id is required'),
});

const updateUserYup = yup.object().shape({
  email: yup
    .string()
    .typeError('Email must be a string')
    .email('Please enter valid email')
    .required('Email is required'),
  name: yup.string().strict().typeError('Name must be a string').required('Name is required.'),
  contactNumber: yup
    .string()
    .matches(/^(\+|\d)+$/, 'Contact number must contain only numbers and the "+" sign')
    .required('Contact number is required'),
  warehouseId: yup
    .number('warehouse Id should be number')
    .strict()
    .typeError('Warehouse Id must be a number')
    .required('Warehouse Id is required'),
  roleId: yup
    .number('Role Id should be number')
    .strict()
    .typeError('Role Id must be a number')
    .required('Role Id is required'),
});

const changeUserPasswordYup = yup.object().shape({
  userId: yup.number().required('ID is required').positive('ID should be a positive number'),
  currentPassword: yup
    .string()
    .strict()
    .typeError('Current Password must be a string')
    .required('Current Password is required'),
  newPassword: yup.string().strict().typeError('New Password must be a string').required('New Password is required'),
});

const userValidator = {
  userLoginYup,
  addUserYup,
  updateUserYup,
  changeUserPasswordYup,
};

export default userValidator;
