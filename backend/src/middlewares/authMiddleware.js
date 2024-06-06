import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import userData from '../models/user.model';

const authenticate = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace('Bearer ', '');

    const verifyToken = jwt.verify(accessToken, process.env.SECRET_KEY);

    const rootUser = await userData.getUserById(verifyToken.id);
    req.rootUser = rootUser;
    next();
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).send({
      success: false,
      message: 'Unauthorized',
    });
  }
};

const authorizeRoles = async (req, res, next) => {
  try {
    const loggedInUser = req.rootUser;

    const currentUrl = req.originalUrl.split('/');
    const currentMenu = currentUrl[currentUrl.length - 2];
    const currentMenuPermission = currentUrl[currentUrl.length - 1];

    const rolePermissionQueryResponse = await userData.getUserMenusPermissionsByRole(loggedInUser.role_id);

    const demo = rolePermissionQueryResponse.find(
      ele => ele.menu_name.toLowerCase().replace(/&/g, ' ').replace(/\s+/g, '-') === currentMenu,
    );

    if (!demo) {
      throw Error;
    }

    const permissions = demo.permission_types.split(',');
    if (!permissions.includes(currentMenuPermission)) {
      throw Error;
    }

    next();
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).send({
      success: false,
      message: 'your role is not allowed to access this resouce',
    });
  }
};

const authMiddleware = {
  authenticate,
  authorizeRoles,
};

export default authMiddleware;
