import { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('schedules', table => {
    table.increments('id').primary;
    table.dateTime('date').notNullable();
    table
      .enu('status', ['open', 'concluded', 'canceled'])
      .notNullable()
      .defaultTo('open');
    table
      .integer('user_id')
      .unsigned()
      .index()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
  })
  
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('schedules');
}