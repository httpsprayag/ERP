import knex from '../provider/db';

// Fetch all the users
const subquery = knex('permissions').distinct('permission_type');

const fetchData = () =>
  knex('menus')
    .select(
      'menus.menu_id as menuID',
      'menus.menu_name as menuName',
      knex.raw(
        `JSON_ARRAYAGG(JSON_OBJECT("id",??,"label", ??, "isChecked", 
        IF(?? IS NOT NULL AND ?? = 1, TRUE, FALSE))) AS permissions`,
        [
          'permissions.permission_id',
          'all_permissions.permission_type',
          'permissions.permission_id',
          'role_to_permission_mapping.role_id',
        ],
      ),
    )
    .crossJoin(subquery.as('all_permissions'))
    .leftJoin('permissions', function () {
      /* eslint-disable no-invalid-this */
      this.on('permissions.menu_id', '=', 'menus.menu_id').andOn(
        'permissions.permission_type',
        '=',
        knex.raw('all_permissions.permission_type'),
      );
    })
    .leftJoin('role_to_permission_mapping', function () {
      /* eslint-disable no-invalid-this */
      this.on('role_to_permission_mapping.permission_id', '=', 'permissions.permission_id').andOn(
        'role_to_permission_mapping.role_id',
        '=',
        knex.raw('1'),
      );
    })
    .whereNotNull('permissions.permission_id')
    .groupBy('menuID', 'menuName')
    .orderBy('menuID', 'asc');

const testQuery = {
  fetchData,
};

export default testQuery;
