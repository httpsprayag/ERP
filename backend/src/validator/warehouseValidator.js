import * as Yup from 'yup';

const postWarehouseYup = Yup.object().shape({
  warehouseName: Yup.string()
    .strict(true)
    .typeError('Warehouse name must be a string')
    .required('Warehouse Name is required field!'),
  warehouseAddress: Yup.string().nullable().strict(true).typeError('Warehouse address must be a string'),
});

const warehouseValidator = {
  postWarehouseYup,
};

export default warehouseValidator;
