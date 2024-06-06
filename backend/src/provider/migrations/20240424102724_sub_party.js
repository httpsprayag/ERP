/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('sub_party', table => {
    table.increments('sub_party_id').primary().notNullable().unsigned();
    table.integer('party_id').unsigned().references('party_id').inTable('party').onDelete('restrict').notNullable();
    table.string('sub_party_name', 255).notNullable();
    table.boolean('sub_party_balance_is_receivable').defaultTo(null);
    table.double('sub_party_balance_amount', 10, 2).defaultTo(null);
    table.date('sub_party_party_balance_as_on_date').notNullable();
    table.boolean('sub_party_status').defaultTo(true);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('sub_party');
};
