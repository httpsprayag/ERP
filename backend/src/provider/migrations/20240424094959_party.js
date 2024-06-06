/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('party', table => {
    table.increments('party_id').primary().notNullable().unsigned();
    table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('restrict').notNullable();
    table.string('party_name', 255).notNullable();
    table.string('contact_number', 15).nullable().defaultTo(null);
    table.string('phone_number', 15).nullable().defaultTo(null);
    table.text('address').notNullable();
    table.boolean('is_sub_party').defaultTo(false);
    table
      .integer('area_tag_id')
      .unsigned()
      .references('area_tag_id')
      .inTable('area_tags')
      .onDelete('restrict')
      .notNullable();
    table
      .integer('collection_by_tag_id')
      .unsigned()
      .references('collection_by_tag_id')
      .inTable('collection_by_tags')
      .onDelete('restrict')
      .notNullable();
    table
      .integer('party_group_by_sale_tag_id')
      .unsigned()
      .references('party_group_by_sale_tag_id')
      .inTable('party_group_by_sale_tags')
      .onDelete('restrict')
      .notNullable();
    table
      .integer('party_group_by_purchase_tag_id')
      .unsigned()
      .references('party_group_by_purchase_tag_id')
      .inTable('party_group_by_purchase_tags')
      .onDelete('restrict')
      .notNullable();
    table.double('credit_limit', 10, 2).defaultTo(null);
    table.boolean('party_balance_is_receivable').defaultTo(false);
    table.double('party_balance_amount', 10, 2).defaultTo(null);
    table.date('party_balance_as_on_date').notNullable();
    table.boolean('party_status').defaultTo(true);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('party');
};
