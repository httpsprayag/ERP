import { StatusCodes } from 'http-status-codes';
import * as Yup from 'yup';
import constants from '../constants/constants';
import roleServices from '../services/role.services';
import roleValidator from '../validator/roleValidator';

const getAllRoles = async (req, res) => {
  try {
    const response = await roleServices.fetchAllRoles();
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

const getPermissionsByRole = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await roleServices.fetchPermissionsByRole(id);
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

const createRole = async (req, res) => {
  try {
    await roleValidator.createRoleYup.validate(req.body);
    const { name } = req.body;
    const response = await roleServices.createRoleService(name);
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

const updatePermissions = async (req, res) => {
  try {
    await roleValidator.updatePermissionsYup.validate(req.body);
    const { id, permissions } = req.body;
    const response = await roleServices.updatePermissionsService(id, permissions);
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

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await roleServices.deleteRoleService(id);
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

// update particular role name by its id
const updateRole = async (req, res) => {
  try {
    await roleValidator.createRoleYup.validate(req.body);
    const { name } = req.body;
    const { id } = req.params;
    const response = await roleServices.updateRoleService(name, id);
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

const roleController = {
  getAllRoles,
  getPermissionsByRole,
  createRole,
  updatePermissions,
  deleteRole,
  updateRole,
};

export default roleController;
