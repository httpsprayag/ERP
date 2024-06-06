import * as yup from 'yup';

const createRoleYup = yup.object().shape({
  name: yup.string('Role name should be in string').required('Role name is required'),
});

const updatePermissionsYup = yup.object().shape({
  id: yup.number().required('ID is required').positive('ID should be a positive number'),
  permissions: yup
    .array()
    .of(
      yup
        .number()
        .strict()
        .typeError('Permission ID should be number')
        .required('Permission ID is required')
        .positive('Permission ID should be a positive number'),
    )
    .required('Permissions array is required')
    .min(1, 'At least one permission is required'),
});

const roleValidator = {
  createRoleYup,
  updatePermissionsYup,
};

export default roleValidator;
