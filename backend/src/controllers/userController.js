import { StatusCodes } from 'http-status-codes';
import * as Yup from 'yup';
import constants from '../constants/constants';
import userServices from '../services/user.services';
import userValidator from '../validator/userValidator';

const fetchAllUsers = async (req, res) => {
  try {
    const result = await userServices.fetchAllUsersService();

    res.status(StatusCodes.OK).send({
      success: true,
      message: 'Successfully fetched all users!',
      result,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: err.message ?? constants.defaultErrorMessage,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    await userValidator.userLoginYup.validate(req.body);
    const { email, password } = req.body;
    const response = await userServices.userLoginService(email, password);

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

const userProfile = async (req, res) => {
  try {
    const response = req.rootUser;
    res.status(StatusCodes.OK).send({
      success: true,
      message: 'Fetch user profile details!',
      result: response,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: err.message ?? constants.defaultErrorMessage,
    });
  }
};

const createUser = async (req, res) => {
  try {
    await userValidator.addUserYup.validate(req.body);
    const response = await userServices.createUserService(req.body);
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

const updateUser = async (req, res) => {
  try {
    const userFormData = await userValidator.updateUserYup.validate(req.body);
    const { id } = req.params;
    const response = await userServices.updateUserService(userFormData, id);
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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userServices.deleteUserService(id);
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

// change Password
const changePassword = async (req, res) => {
  try {
    const userChangePasswordData = await userValidator.changeUserPasswordYup.validate(req.body);
    const response = await userServices.changePasswordService(userChangePasswordData);
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
const userController = {
  fetchAllUsers,
  loginUser,
  userProfile,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
};

export default userController;
