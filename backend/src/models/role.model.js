import knexConnection from '../provider/db';

// Fetch all the roles with user count according to that role
const fetchAllRolesData = () =>
  knexConnection('roles')
    .select('roles.role_id As id', 'roles.role_name As name')
    .count('users.user_id as userCount')
    .leftJoin('users', function () {
      /* eslint-disable no-invalid-this */
      this.on('roles.role_id', '=', 'users.role_id').andOn('users.is_deleted', '=', 0);
    })
    .where('roles.is_deleted', 0)
    .groupBy('roles.role_id', 'roles.role_name')
    .orderBy('roles.role_id', 'desc');

const getRoleById = id =>
  knexConnection('roles').select('role_id AS id', 'role_name AS name').where({ role_id: id, is_deleted: 0 }).first();

const subQuery = knexConnection('permissions').distinct('permission_type');

// Get all the permission by its role id
const getAllPermissionsByRoleId = id =>
  knexConnection('menus')
    .select(
      'menus.menu_id as menuID',
      'menus.menu_name as menuName',
      knexConnection.raw(
        `CONCAT('[', GROUP_CONCAT(
        JSON_OBJECT(
            "id", ??,
            "label", ??,
            "isChecked", IF(?? IS NOT NULL AND ?? = ${id}, TRUE, FALSE)
        )
        SEPARATOR ','
    ), ']') AS permissions`,
        [
          'permissions.permission_id',
          'all_permissions.permission_type',
          'permissions.permission_id',
          'role_to_permission_mapping.role_id',
        ],
      ),
    )
    .crossJoin(subQuery.as('all_permissions'))
    .leftJoin('permissions', function () {
      /* eslint-disable no-invalid-this */
      this.on('permissions.menu_id', '=', 'menus.menu_id').andOn(
        'permissions.permission_type',
        '=',
        knexConnection.raw('all_permissions.permission_type'),
      );
    })
    .leftJoin('role_to_permission_mapping', function () {
      /* eslint-disable no-invalid-this */
      this.on('role_to_permission_mapping.permission_id', '=', 'permissions.permission_id').andOn(
        'role_to_permission_mapping.role_id',
        '=',
        knexConnection.raw(id),
      );
    })
    .whereNotNull('permissions.permission_id')
    .groupBy('menuID', 'menuName')
    .orderBy('menuID', 'asc');

// Get particular role by its name
const getRoleByName = async name =>
  knexConnection('roles').select('*').where({ role_name: name, is_deleted: 0 }).first();

// Post role in to roles table
const postRoleData = async name =>
  knexConnection('roles').insert({
    role_name: name,
  });

// Delete all the permissions in role_to_permissions_mapping by its role id
const deleteAllPermissionsByRoleId = async id =>
  knexConnection('role_to_permission_mapping').delete().where({ role_id: id });

const postPermissionsData = async updatePermissionData =>
  knexConnection('role_to_permission_mapping').insert(updatePermissionData);

// Soft delete role by its id
const deleteRoleById = async (id, deletedAt) =>
  knexConnection('roles').update({ is_deleted: true, deleted_at: deletedAt }).where({ role_id: id, is_deleted: 0 });

// check role is exist or not for the update operation
const checkRoleExist = async (name, id) =>
  knexConnection('roles').select('*').where({ role_name: name, is_deleted: 0 }).whereNot('role_id', id).first();

// update role by ID
const updateRoleById = async (name, id) =>
  knexConnection('roles').update({ role_name: name }).where({ role_id: id, is_deleted: 0 });

const roleData = {
  fetchAllRolesData,
  getRoleById,
  getAllPermissionsByRoleId,
  getRoleByName,
  postRoleData,
  deleteAllPermissionsByRoleId,
  postPermissionsData,
  deleteRoleById,
  checkRoleExist,
  updateRoleById,
};

export default roleData;
