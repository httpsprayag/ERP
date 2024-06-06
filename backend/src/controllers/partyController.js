import { StatusCodes } from 'http-status-codes';
import * as Yup from 'yup';
import constants from '../constants/constants';
import partyServices from '../services/party.services';
import partyValidator from '../validator/partyValidator';

// Area tags
const addAreaTags = async (req, res) => {
  try {
    await partyValidator.addAreaTagYup.validate(req.body);
    const { areaName } = req.body;
    const response = await partyServices.addAreaTagService(areaName);
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

const getAllAreaTags = async (rea, res) => {
  try {
    const response = await partyServices.getAllAreaTagsService();
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

// Collection By Tag
const addCollectionByTag = async (req, res) => {
  try {
    await partyValidator.addCollectionByTagYup.validate(req.body);
    const { collectionName } = req.body;
    const response = await partyServices.addCollectionTagService(collectionName);
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

const getAllCollectionByTags = async (req, res) => {
  try {
    const response = await partyServices.getAllCollectionTagsService();
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

// Group By Purchase
const addGroupByPurchase = async (req, res) => {
  try {
    await partyValidator.addGroupByPurchaseYup.validate(req.body);
    const { purchaseName } = req.body;
    const response = await partyServices.addGroupByPurchaseService(purchaseName);
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

const getAllGroupByPurchase = async (req, res) => {
  try {
    const response = await partyServices.getAllPurchaseTags();
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

// Group By Sale
const addGroupBySale = async (req, res) => {
  try {
    await partyValidator.addGroupBySaleYup.validate(req.body);
    const { saleName } = req.body;
    const response = await partyServices.addGroupBySaleService(saleName);
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

const getAllGroupBySale = async (req, res) => {
  try {
    const response = await partyServices.getAllSaleTags();
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

// --- Add Party ---
const addParty = async (req, res) => {
  try {
    const partyFormData = await partyValidator.addPartyYup.validate(req.body);
    if (partyFormData.isSubParty && partyFormData.subParty.length > 0) {
      await partyValidator.addSubPartyYup.validate(partyFormData.subParty);
    }

    const response = await partyServices.addPartyService(partyFormData);
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

// --- Get all parties ---
const getAllParties = async (req, res) => {
  try {
    const response = await partyServices.getAllPartiesService();
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

// get party or sub-party details by its id
const getPartyTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await partyServices.getPartyTransactionService(id);
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

const partyController = {
  addAreaTags,
  getAllAreaTags,
  addCollectionByTag,
  getAllCollectionByTags,
  addGroupByPurchase,
  getAllGroupByPurchase,
  addGroupBySale,
  getAllGroupBySale,
  addParty,
  getAllParties,
  getPartyTransaction,
};
export default partyController;
