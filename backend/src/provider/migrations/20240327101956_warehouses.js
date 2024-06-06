/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('warehouses', table => {
    table.increments('warehouse_id').primary().unsigned().notNullable();
    table.string('warehouse_name', 100).notNullable();
    table.string('warehouse_address', 255).nullable().defaultTo('null');
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
  return knex.schema.dropTable('warehouses');
};
