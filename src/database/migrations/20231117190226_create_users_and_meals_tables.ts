import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // Essa função não funciona se estiver utilizando sqlite
  // await knex.raw('create extension if not exists "uuid-ossp"')

  await knex.schema.createTable('users', (table) => {
    // table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })

  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.timestamp('meal_at').notNullable()
    table.boolean('diet_meal').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('meals')

  // await knex.raw('drop extension if exists "uuid-ossp"')
}
