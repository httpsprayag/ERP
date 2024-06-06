const { categoryMasterRows } = require('./constants/category_master');
const { groupMasterRows } = require('./constants/group_master');
const { menusRows } = require('./constants/menus');
const { permissionsRows } = require('./constants/permissions');
const { roleToPermissionMappingRows } = require('./constants/role_to_permission_mapping');
const { rolesRows } = require('./constants/roles');
const { usersRows } = require('./constants/users');
const { warehousesRows } = require('./constants/warehouses');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('warehouses').insert(warehousesRows);
  await knex('roles').insert(rolesRows);
  await knex('users').insert(usersRows);
  await knex('menus').insert(menusRows);
  await knex('permissions').insert(permissionsRows);
  await knex('role_to_permission_mapping').insert(roleToPermissionMappingRows);
  await knex('category_master').insert(categoryMasterRows);
  await knex('group_master').insert(groupMasterRows);
};
