/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('role_to_permission_mapping', table => {
    table.increments('role_permission_id').primary();
    table.integer('role_id').unsigned().notNullable().references('role_id').inTable('roles').onDelete('restrict');
    table
      .integer('permission_id')
      .unsigned()
      .notNullable()
      .references('permission_id')
      .inTable('permissions')
      .onDelete('restrict');
    table.timestamps(true, true);
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.timestamp('deleted_at').nullable().defaultTo(null);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('role_to_permission_mapping');
};
