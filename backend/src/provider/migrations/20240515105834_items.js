/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('items', table => {
    table.increments('item_id').primary().notNullable().unsigned();
    table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('restrict').notNullable();
    table.enum('item_inventory_type', ['goods', 'service']).notNullable();
    table.string('item_name', 255).defaultTo(null);
    table.string('item_code', 255).defaultTo(null);
    table
      .integer('category_id')
      .unsigned()
      .references('category_id')
      .inTable('category_master')
      .onDelete('restrict')
      .notNullable();
    table
      .integer('group_id')
      .unsigned()
      .references('group_id')
      .inTable('group_master')
      .onDelete('restrict')
      .defaultTo(null);
    table.string('attribute_1', 255).defaultTo(null);
    table.string('attribute_2', 255).defaultTo(null);
    table.string('attribute_3', 255).defaultTo(null);
    table.string('attribute_4', 255).defaultTo(null);
    table.string('product_full_name', 255).defaultTo(null);
    table
      .integer('unit_id')
      .unsigned()
      .references('unit_id')
      .inTable('unit_master')
      .onDelete('restrict')
      .defaultTo(null);
    table.double('item_minimum_level').defaultTo(null);
    table.double('item_opening_stock').defaultTo(null);
    table.double('item_purchase_rate').defaultTo(null);
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
  return knex.schema.dropTable('items');
};
