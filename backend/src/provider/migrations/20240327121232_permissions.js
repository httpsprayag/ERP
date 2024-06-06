/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('permissions', table => {
    table.increments('permission_id').primary().unsigned().notNullable();
    table.integer('menu_id').unsigned().notNullable().references('menu_id').inTable('menus').onDelete('restrict');
    table.string('permission_type', 100).notNullable();
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
  return knex.schema.dropTable('permissions');
};
