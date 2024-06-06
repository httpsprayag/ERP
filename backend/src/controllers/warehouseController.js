import { StatusCodes } from 'http-status-codes';
import * as Yup from 'yup';
import constants from '../constants/constants';
import warehouseServices from '../services/warehouse.services';
import warehouseValidator from '../validator/warehouseValidator';

const createWarehouse = async (req, res) => {
  try {
    await warehouseValidator.postWarehouseYup.validate(req.body);
    const { warehouseName, warehouseAddress } = req.body;
    const response = await warehouseServices.createWarehouseService(warehouseName, warehouseAddress);
    res.status(response.status ?? StatusCodes.OK).send({
      success: response.success,
      message: response.message,
      result: response?.result,
    });
  } catch (err) {
    res
      .status(err instanceof Yup.ValidationError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        success: false,
        message: err.message ?? constants.defaultErrorMessage,
      });
  }
};

const getWarehouseList = async (req, res) => {
  try {
    const response = await warehouseServices.getWarehouseListService();
    res.status(response.status ?? StatusCodes.OK).send({
      success: response.success,
      message: response.message,
      result: response?.result,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: err.message ?? constants.defaultErrorMessage,
    });
  }
};

const updateWarehouse = async (req, res) => {
  try {
    await warehouseValidator.postWarehouseYup.validate(req.body);
    const { warehouseName, warehouseAddress } = req.body;
    const { id } = req.params;
    const response = await warehouseServices.updateWarehouseService(id, warehouseName, warehouseAddress);
    res.status(response.status ?? StatusCodes.OK).send({
      success: response.success,
      message: response.message,
      result: response?.result,
    });
  } catch (err) {
    res
      .status(err instanceof Yup.ValidationError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        success: false,
        message: err.message ?? constants.defaultErrorMessage,
      });
  }
};

const deleteWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await warehouseServices.deleteWarehouseService(id);
    res.status(response.status ?? StatusCodes.OK).send({
      success: response.success,
      message: response.message,
      result: response?.result,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: err.message ?? constants.defaultErrorMessage,
    });
  }
};

const warehouseController = {
  createWarehouse,
  getWarehouseList,
  updateWarehouse,
  deleteWarehouse,
};

export default warehouseController;
