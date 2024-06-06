/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('category_master', table => {
    table.increments('category_id').primary().notNullable().unsigned();
    table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('restrict').notNullable();
    table.string('category_name', 255).unique().notNullable();
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
  return knex.schema.dropTable('category_master');
};
