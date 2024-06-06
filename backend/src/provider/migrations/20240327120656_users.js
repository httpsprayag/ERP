/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('user_id').primary().notNullable().unsigned();
    table
      .integer('warehouse_id')
      .unsigned()
      .references('warehouse_id')
      .inTable('warehouses')
      .onDelete('restrict')
      .nullable();
    table.integer('role_id').unsigned().references('role_id').inTable('roles').onDelete('restrict').notNullable();
    table.string('user_name', 255).notNullable();
    table.string('user_email', 255).notNullable();
    table.string('user_contact_number', 15).nullable().defaultTo(null);
    table.string('user_password', 255).notNullable();
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
  return knex.schema.dropTable('users');
};
