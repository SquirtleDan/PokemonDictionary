/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("score", (table) => {
        table.increments("id").primary(); 
        table.integer("value");
        table.integer("game_mode_id").notNullable();
        table.foreign("game_mode_id").references("id").inTable("game_mode");
        table.integer("account_id").notNullable();
        table.foreign("account_id").references("id").inTable("account");
      });
    };
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
