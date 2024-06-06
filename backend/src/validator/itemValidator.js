import * as yup from 'yup';

const createCategoryYup = yup.object().shape({
  name: yup.string('Category name should be in string').required('Category name is required').trim(),
});

const createGroupYup = yup.object().shape({
  category: yup.number().required('Category Id is required').positive('Category Id should be a positive number'),
  name: yup.string('Group name should be in string').required('Group name is required').trim(),
});

const createUnitYup = yup.object().shape({
  name: yup.string('Unit name should be in string').required('Unit name is required').trim(),
  value: yup
    .number()
    .strict()
    .typeError('unit value should be in number')
    .required('Unit value is required')
    .positive('Unit value should be a positive number'),
});

const itemValidator = {
  createCategoryYup,
  createGroupYup,
  createUnitYup,
};

export default itemValidator;
