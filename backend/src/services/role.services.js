import { StatusCodes } from 'http-status-codes';
import roleData from '../models/role.model';
import currentKnexDate from '../utils/CurrentDateFormatter';

const fetchAllRoles = async () => {
  // Get all the roles from roles table
  const rolesQueryResponse = await roleData.fetchAllRolesData();
  return { success: true, message: 'Successfully fetch all roles', result: rolesQueryResponse };
};

const fetchPermissionsByRole = async roleId => {
  // check role is exist or not
  const isRoleExist = await roleData.getRoleById(roleId);
  if (!isRoleExist) return { status: StatusCodes.NOT_FOUND, success: false, message: 'Role does not exist' };

  const queryResponse = await roleData.getAllPermissionsByRoleId(roleId);
  const data = queryResponse.map(ele => ({
    ...ele,
    permissions: JSON.parse(ele.permissions),
  }));

  return { success: true, message: 'Successfully fetch all permissions for this role', result: data };
};

const createRoleService = async name => {
  // check name is exist or not
  const isNameExist = await roleData.getRoleByName(name);
  if (isNameExist) {
    return { status: StatusCodes.CONFLICT, success: false, message: 'Opps! role with this name already exist!' };
  }

  const result = await roleData.postRoleData(name);
  if (!result) {
    return { status: StatusCodes.BAD_REQUEST, success: false, message: 'Role insertion failed.' };
  }
  return { success: true, message: 'Role Added successfully!' };
};

const updatePermissionsService = async (roleId, permissions) => {
  // check role is exist or not
  const isRoleExist = await roleData.getRoleById(roleId);
  if (!isRoleExist) return { status: StatusCodes.NOT_FOUND, success: false, message: 'Role does not exist' };

  await roleData.deleteAllPermissionsByRoleId(roleId);

  const updatePermissionData = permissions.map(permissionId => ({
    role_id: roleId,
    permission_id: permissionId,
  }));

  await roleData.postPermissionsData(updatePermissionData);
  return { success: true, message: `Permissions updated successfully for ${isRoleExist.name} role!` };
};

const deleteRoleService = async id => {
  const deletedAt = currentKnexDate();
  const result = await roleData.deleteRoleById(id, deletedAt);
  if (result === 0) return { status: StatusCodes.NOT_FOUND, success: false, message: 'Opps, Role not found!' };
  return { success: true, message: 'Role deleted successfully!' };
};

// --- Update role by Id ---
const updateRoleService = async (name, id) => {
  // check name is exist or not
  const isNameExist = await roleData.checkRoleExist(name, id);
  if (isNameExist) {
    return { status: StatusCodes.CONFLICT, success: false, message: 'Opps! role with this name already exist!' };
  }

  // update query for role
  const result = await roleData.updateRoleById(name, id);
  if (result === 0) return { status: StatusCodes.NOT_FOUND, success: false, message: 'Opps, Role not found!' };
  return { success: true, message: 'Role updated successfully!' };
};
const roleServices = {
  fetchAllRoles,
  fetchPermissionsByRole,
  createRoleService,
  updatePermissionsService,
  deleteRoleService,
  updateRoleService,
};

export default roleServices;
