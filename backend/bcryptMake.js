const fs = require('fs');
const bcrypt = require('bcryptjs');
const users = require('./clubUsers2.json');
let nRounds = 10;
let hashedUsers = [];
let start = new Date(); // timing code
console.log(`Starting password hashing with nRounds = ${nRounds}, ${start}`);
users.forEach(function(u){
let salt = bcrypt.genSaltSync(nRounds);
let passHash = bcrypt.hashSync(u.password, salt);
let hashedUser = Object.assign({}, u, {passHash: passHash});
delete hashedUser.password;
hashedUsers.push(hashedUser);
})
let elapsed = new Date() - start; // timing code
console.log(`Finished password hashing, ${elapsed/1000} seconds.`);
fs.writeFileSync("clubUsersHash.json", JSON.stringify(hashedUsers, null, 2));