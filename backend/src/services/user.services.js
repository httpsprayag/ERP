import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import roleData from '../models/role.model';
import userData from '../models/user.model';
import warehouseData from '../models/warehouse.model';
import currentKnexDate from '../utils/CurrentDateFormatter';

const fetchAllUsersService = () => userData.fetchAllUsersData();

const userLoginService = async (email, password) => {
  if (!email && !password) {
    return { status: StatusCodes.NOT_FOUND, success: false, message: 'Email and password are required fields!' };
  }

  const user = await userData.getUserByEmail(email);

  if (!user) return { status: StatusCodes.NOT_FOUND, success: false, message: 'User does not exists' };

  const isPasswordMatch = await bcrypt.compare(password, user.user_password);

  if (!isPasswordMatch) {
    return { status: StatusCodes.UNAUTHORIZED, success: false, message: 'invalid credentials' };
  }

  const accessToken = jwt.sign({ id: user.user_id }, process.env.SECRET_KEY, {
    algorithm: 'HS256',
  });

  const queryResponse = await userData.getUserMenusPermissionsByRole(user.role_id);

  const formattedMenus = {};
  const topLevelMenus = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const element of queryResponse) {
    const permissions = element.permission_types ? element.permission_types.split(',') : [];
    const menu = {
      menuId: element.menu_id,
      menuName: element.menu_name,
      permissions: permissions,
      link: `/${element.menu_name.toLowerCase().replace(/&/g, ' ').replace(/\s+/g, '-')}`,
      children: [],
    };

    formattedMenus[menu.menuId] = menu;

    if (element.parent_menu_id && formattedMenus[element.parent_menu_id]) {
      formattedMenus[element.parent_menu_id].children.push(menu);
    } else {
      topLevelMenus.push(menu);
    }
  }

  const result = {
    userId: user.user_id,
    name: user.user_name,
    email: user.user_email,
    contactNumber: user.user_contact_number,
    roleId: user.role_id,
    roleName: user.role_name,
    warehouseId: user.warehouse_id,
    warehouseName: user.warehouse_name,
    accessToken,
    accessibleMenus: topLevelMenus,
  };

  return { success: true, message: 'User login successfully', result };
};

const createUserService = async userFormData => {
  // check weather user is exist or not
  const isUserExist = await userData.getUserByEmail(userFormData.email);
  if (isUserExist) {
    return { status: StatusCodes.CONFLICT, success: false, message: 'Opps! User with this email already exist!' };
  }
  // check warehouse is exist or not
  const isWarehouseExist = await warehouseData.getWarehouseById(userFormData.warehouseId);
  if (!isWarehouseExist) return { status: StatusCodes.NOT_FOUND, success: false, message: 'Warehouse does not exist' };

  // check role is exist or not
  const isRoleExist = await roleData.getRoleById(userFormData.roleId);
  if (!isRoleExist) return { status: StatusCodes.NOT_FOUND, success: false, message: 'Role does not exist' };

  // convert password into the Hash format
  const hashedPassword = await bcrypt.hash(userFormData.password, 12);

  const result = await userData.postUserData(userFormData, hashedPassword);

  if (!result) {
    return { status: StatusCodes.BAD_REQUEST, success: false, message: 'User insertion failed.' };
  }
  return { success: true, message: 'User Added successfully!' };
};

const updateUserService = async (userFormData, id) => {
  // check weather user is exist or not
  const isUserExist = await userData.checkEmailExist(userFormData.email, id);
  if (isUserExist) {
    return { status: StatusCodes.CONFLICT, success: false, message: 'Opps! User with this email already exist!' };
  }
  // check warehouse is exist or not
  const isWarehouseExist = await warehouseData.getWarehouseById(userFormData.warehouseId);
  if (!isWarehouseExist) return { status: StatusCodes.NOT_FOUND, success: false, message: 'Warehouse does not exist' };

  // check role is exist or not
  const isRoleExist = await roleData.getRoleById(userFormData.roleId);
  if (!isRoleExist) return { status: StatusCodes.NOT_FOUND, success: false, message: 'Role does not exist' };

  const result = await userData.updateUserById(userFormData, id);

  if (result === 0) return { status: StatusCodes.NOT_FOUND, success: false, message: 'Opps, User not found!' };
  return { success: true, message: 'User updated successfully!' };
};

const deleteUserService = async id => {
  const deletedAt = currentKnexDate();
  const result = await userData.deleteUserById(id, deletedAt);
  if (result === 0) return { status: StatusCodes.NOT_FOUND, success: false, message: 'Opps, User not found!' };
  return { success: true, message: 'User deleted successfully!' };
};

// change password
const changePasswordService = async userChangePasswordData => {
  const isUserExist = await userData.getUserById(userChangePasswordData.userId);
  if (!isUserExist) return { status: StatusCodes.NOT_FOUND, success: false, message: 'User does not exists' };

  const userPasswordData = await userData.getUserPasswordById(userChangePasswordData.userId);

  const isPasswordMatch = await bcrypt.compare(userChangePasswordData.currentPassword, userPasswordData.user_password);
  if (!isPasswordMatch) {
    return { status: StatusCodes.UNAUTHORIZED, success: false, message: 'Opps, your current password is wrong' };
  }

  const hashedPassword = await bcrypt.hash(userChangePasswordData.newPassword, 12);

  const result = await userData.changePasswordById(userChangePasswordData, hashedPassword);

  if (result === 0) return { status: StatusCodes.NOT_FOUND, success: false, message: 'Opps, User not found!' };
  return { success: true, message: 'Password updated successfully!' };
};
const userServices = {
  fetchAllUsersService,
  userLoginService,
  createUserService,
  updateUserService,
  deleteUserService,
  changePasswordService,
};

export default userServices;
