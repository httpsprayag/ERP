/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('group_master', table => {
    table.increments('group_id').primary().notNullable().unsigned();
    table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('restrict').notNullable();
    table
      .integer('category_id')
      .unsigned()
      .references('category_id')
      .inTable('category_master')
      .onDelete('restrict')
      .notNullable();
    table.string('group_name', 255).unique().notNullable();
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
  return knex.schema.dropTableIfExists('group_master');
};
