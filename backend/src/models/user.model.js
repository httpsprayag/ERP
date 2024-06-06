import knexConnection from '../provider/db';

// Fetch all the users
const fetchAllUsersData = () =>
  knexConnection('users')
    .select(
      'users.user_id AS id',
      'users.user_name AS name',
      'users.user_email AS email',
      'users.user_contact_number AS contactNumber',
      'users.role_id AS roleId',
      'roles.role_name AS roleName',
      'users.warehouse_id AS warehouseId',
      'warehouses.warehouse_name AS warehouseName',
    )
    .leftJoin('warehouses', 'warehouses.warehouse_id', 'users.warehouse_id')
    .leftJoin('roles', 'roles.role_id', 'users.role_id')
    .where({ 'users.is_deleted': 0 })
    .orderBy('users.user_id', 'desc');

// Get a single user by Email
const getUserByEmail = email =>
  knexConnection
    .select('users.*', 'roles.role_name', 'warehouses.warehouse_name')
    .from('users')
    .leftJoin('warehouses', 'warehouses.warehouse_id', 'users.warehouse_id')
    .leftJoin('roles', 'roles.role_id', 'users.role_id')
    .where({ 'users.user_email': email, 'users.is_deleted': 0 })
    .first();

// Get all the permissions of menu for the particular role id
const getUserMenusPermissionsByRole = roleId =>
  knexConnection
    .select(
      'menus.menu_id',
      'menus.menu_name',
      'menus.parent_menu_id',
      knexConnection.raw('GROUP_CONCAT(permissions.permission_type) AS permission_types'),
    )
    .from('menus')
    .leftJoin('permissions', 'permissions.menu_id', 'menus.menu_id')
    .leftJoin('role_to_permission_mapping', 'role_to_permission_mapping.permission_id', 'permissions.permission_id')
    .where({ 'role_to_permission_mapping.role_id': roleId, 'role_to_permission_mapping.is_deleted': 0 })
    .groupBy('menus.menu_id', 'menus.menu_name', 'menus.parent_menu_id')
    .orderBy('menus.menu_id', 'asc');

// Get a single user by its Id
const getUserById = id =>
  knexConnection
    .select(
      'user_id',
      'warehouse_id',
      'role_id',
      'user_name',
      'user_email',
      'user_contact_number',
      'created_at',
      'updated_at',
      'is_deleted',
      'deleted_at',
    )
    .from('users')
    .where({ user_id: id, is_deleted: 0 })
    .first();

// Create a user
const postUserData = (userFormData, hashedPassword) =>
  knexConnection('users').insert({
    user_name: userFormData.name,
    user_email: userFormData.email,
    user_password: hashedPassword,
    warehouse_id: userFormData.warehouseId,
    role_id: userFormData.roleId,
    user_contact_number: userFormData.contactNumber,
  });

// check, is there any other user with same email --use for the update user module
const checkEmailExist = (email, id) =>
  knexConnection('users').select('*').where({ user_email: email, is_deleted: 0 }).whereNot('user_id', id).first();

// Update a user by its Id
const updateUserById = async (userFormData, id) =>
  knexConnection('users')
    .update({
      user_name: userFormData.name,
      user_email: userFormData.email,
      warehouse_id: userFormData.warehouseId,
      role_id: userFormData.roleId,
      user_contact_number: userFormData.contactNumber,
    })
    .where({ user_id: id, is_deleted: 0 });

// Soft Delete user by its id
const deleteUserById = async (id, deletedAt) =>
  knexConnection('users').update({ is_deleted: true, deleted_at: deletedAt }).where({ user_id: id, is_deleted: 0 });

// Get password by user id
const getUserPasswordById = async id => knexConnection('users').select('user_password').where({ user_id: id }).first();

// Change password by its ID
const changePasswordById = async (data, hashedPassword) =>
  knexConnection('users').update({ user_password: hashedPassword }).where({ user_id: data.userId, is_deleted: 0 });

const userData = {
  fetchAllUsersData,
  getUserByEmail,
  getUserById,
  getUserMenusPermissionsByRole,
  postUserData,
  checkEmailExist,
  updateUserById,
  deleteUserById,
  getUserPasswordById,
  changePasswordById,
};

export default userData;
