/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('party_group_by_sale_tags', table => {
    table.increments('party_group_by_sale_tag_id').primary().notNullable().unsigned();
    table.string('party_group_by_sale_name', 255).notNullable();
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
  return knex.schema.dropTable('party_group_by_sale_tags');
};
