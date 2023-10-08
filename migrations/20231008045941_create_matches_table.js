/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('matches', (table) => {
      table.increments('id').primary();
      table
        .integer('user_id_1')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table
        .integer('user_id_2')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table
        .integer('movie_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('user_movie_relationships') // Reference the user_movie_relationships table
        .onDelete('CASCADE');
      table.string('movie_title').notNullable();
      table.enum('user_1_action', ['yes', 'maybe']).notNullable(); // User 1's action
      table.enum('user_2_action', ['yes', 'maybe']).notNullable(); // User 2's action
      table.timestamp('created_at').defaultTo(knex.fn.now());
  
      // Add a unique constraint to ensure each match is unique based on user IDs and movie ID
      table.unique(['user_id_1', 'user_id_2', 'movie_id']);
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('matches');
};
  