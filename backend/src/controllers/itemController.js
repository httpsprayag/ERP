import { StatusCodes } from 'http-status-codes';
import * as Yup from 'yup';
import constants from '../constants/constants';
import itemServices from '../services/item.services';
import itemValidator from '../validator/itemValidator';

const createCategory = async (req, res) => {
  try {
    await itemValidator.createCategoryYup.validate(req.body);
    const { name } = req.body;
    const response = await itemServices.createCategoryService(name, req.rootUser.user_id);
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

const listAllCategories = async (req, res) => {
  try {
    const response = await itemServices.fetchAllCategories();
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

const createGroup = async (req, res) => {
  try {
    const groupFormData = await itemValidator.createGroupYup.validate(req.body);
    const response = await itemServices.createGroupService(groupFormData, req.rootUser.user_id);
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

const listAllGroups = async (req, res) => {
  try {
    const response = await itemServices.fetchAllGroups();
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

const createUnit = async (req, res) => {
  try {
    const unitFormData = await itemValidator.createUnitYup.validate(req.body);
    const response = await itemServices.createUnitService(unitFormData, req.rootUser.user_id);
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

const listAllUnits = async (req, res) => {
  try {
    const response = await itemServices.fetchAllUnitsService();
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

const itemsController = {
  createCategory,
  listAllCategories,
  createGroup,
  listAllGroups,
  createUnit,
  listAllUnits,
};

export default itemsController;
