import { StatusCodes } from 'http-status-codes';
import constants from '../constants/constants';
import testQuery from '../models/test.model';

const fetchTestData = async (req, res) => {
  try {
    const result = await testQuery.fetchData();
    const data = result.map(ele => ({
      ...ele,
      permissions: JSON.parse(ele.permissions),
      length: JSON.parse(ele.permissions).length,
    }));

    res.status(StatusCodes.OK).send({
      success: true,
      message: 'Successfully fetched all data!',
      data,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: err.message ?? constants.defaultErrorMessage,
    });
  }
};

const testController = {
  fetchTestData,
};

export default testController;
