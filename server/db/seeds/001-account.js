/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex("account").insert([
    {
      username: "usernameTest1",
      hash_salted_password: "hashSaltedPassword1",
      salt: "salt1",
      email: "email@gmail.com1",
      first_name: "firstName1",
      last_name: "lastName1",
    },
    {
      username: "usernameTest2",
      hash_salted_password: "hashSaltedPassword2",
      salt: "salt2",
      email: "email@gmail.com2",
      first_name: "firstName2",
      last_name: "lastName2",
    },
    {
      username: "usernameTest3",
      hash_salted_password: "hashSaltedPassword3",
      salt: "salt3",
      email: "email@gmail.com3",
      first_name: "firstName3",
      last_name: "lastName3",
    },
  ]);
};
