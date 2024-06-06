/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('menus', table => {
    table.increments('menu_id').primary().notNullable().unsigned();
    table.string('menu_name', 100).notNullable();
    table
      .integer('parent_menu_id')
      .unsigned()
      .nullable()
      .defaultTo(null)
      .references('menu_id')
      .inTable('menus')
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
  return knex.schema.dropTable('menus');
};
