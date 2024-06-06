import * as yup from 'yup';

const addAreaTagYup = yup.object().shape({
  areaName: yup.string('Area tag should be in string').required('Area tag is required').trim(''),
});

const addCollectionByTagYup = yup.object().shape({
  collectionName: yup
    .string('Collection by tag should be in string')
    .required('Collection by tag is required')
    .trim(''),
});

const addGroupByPurchaseYup = yup.object().shape({
  purchaseName: yup.string('Group by purchase should be in string').required('Group by purchase is required').trim(''),
});

const addGroupBySaleYup = yup.object().shape({
  saleName: yup.string('Group by sale should be in string').required('Group by sale is required').trim(''),
});

const addPartyYup = yup.object().shape({
  userId: yup.number().required('User Id is required').positive('User Id should be a positive number'),
  name: yup
    .string('Party name should be in string')
    .strict()
    .typeError('Party name should be in string')
    .required('Party name is required'),
  contactNumber: yup
    .string()
    .matches(/^(\+|\d)+$/, 'Contact number must contain only numbers and the "+" sign')
    .required('Contact number is required'),
  phoneNumber: yup.string().matches(/^(\+|\d)+$/, 'Phone number must contain only numbers and the "+" sign'),
  address: yup.string().strict().typeError('Address should be in string').required('Address is required.'),
  isSubParty: yup.boolean().required('Is Sub-party is required.'),
  subParty: yup.array(),
  areaTagId: yup.number().required('Area Tag Id is required').positive('Area Tag Id should be a positive number'),
  collectionByTagId: yup
    .number()
    .required('Collection by tag Id is required')
    .positive('Collection by tag Id should be a positive number'),
  partyGroupBySaleId: yup
    .number()
    .required('Party group by sale Id is required')
    .positive('Party group by sale Id should be a positive number'),
  partyGroupByPurchaseId: yup
    .number()
    .required('party Group by purchase Id is required')
    .positive('party Group by purchase Id should be a positive number'),
  creditLimit: yup.number().strict().typeError('Credit limit should be in number').nullable(),
  partyBalanceIsReceivable: yup.boolean(),
  partyBalanceAmount: yup.number().strict().typeError('Party balance amount should be in number'),
  partyBalanceAsOnDate: yup.date().required('Party balance as on date is required'),
  partyStatus: yup.boolean(),
});

const addSubPartyYup = yup.array().of(
  yup.object().shape({
    subPartyName: yup
      .string()
      .strict()
      .typeError('Sub Party Name should be a string')
      .required('Sub Party name is required'),
    subPartyBalanceIsReceivable: yup.boolean(),
    subPartyBalanceAmount: yup.number(),
    subPartyBalanceAsOnDate: yup.date().required('Sub Party balance as on date is required'),
    subPartyStatus: yup.boolean(),
  }),
);
const partyValidator = {
  addAreaTagYup,
  addCollectionByTagYup,
  addGroupByPurchaseYup,
  addGroupBySaleYup,
  addPartyYup,
  addSubPartyYup,
};

export default partyValidator;
