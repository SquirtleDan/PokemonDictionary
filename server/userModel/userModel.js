const knex = require("knex")

//
//for Log-In
module.exports ={
    //Search DB by Username 
    getDataByUsername(username){
        return knex('account').where({ username: username }).first()
    },
    //Create New Account
    createUser(username, hash_salted_password,salt,email,first_name,last_name){
        return knex('account').insert({
            username:username,
            hash_salted_password:hash_salted_password,
            salt:salt,
            email:email,
            first_name:first_name,
            last_name:last_name,
        })
    }
}