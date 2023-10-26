/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("pokemon", (table) => {
    table.integer("id").primary(); 
    table.integer("poke_api_id");
    table.string("name_japanese_hrkt", 255);
    table.string("name_japanese_romaji", 255);
    table.string("name_korean", 255);
    table.string("name_chinese_traditional", 255);
    table.string("name_french", 255);
    table.string("name_german", 255);
    table.string("name_spanish", 255);
    table.string("name_italian", 255);
    table.string("name_english", 255);
    table.string("name_japanese_normal", 255);
    table.string("name_chinese_simplified", 255);
    table.binary("front_picture");
      // to store blob in postgres, you need to store it as bytea, which is binary in knex
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("pokemon");
};
