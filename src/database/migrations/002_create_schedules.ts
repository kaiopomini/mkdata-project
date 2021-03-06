import { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('schedules', table => {
    table.increments('id').primary;
    table.date('date').notNullable();
    table.time('time').notNullable();
    table.string('title').notNullable();
    table.string('description')
    table
      .enu('status', ['open', 'concluded', 'canceled'])
      .notNullable()
      .defaultTo('open');
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
  })
  
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('schedules');
}