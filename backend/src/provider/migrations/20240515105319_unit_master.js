/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('unit_master', table => {
    table.increments('unit_id').primary().notNullable().unsigned();
    table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('restrict').notNullable();
    table.string('unit_name', 255).unique().notNullable();
    table.decimal('unit_value', 18, 6).notNullable();
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
  return knex.schema.dropTable('unit_master');
};
