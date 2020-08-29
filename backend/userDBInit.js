// Create a NeDB datastore for users with hashed passwords
//
// Remove the file usersDB before running this example
//
const DataStore = require('nedb');
const db = new DataStore({filename: __dirname + '/users.db', autoload: true});

const users = require('./clubUsersHash.json');
// We let NeDB create _id property for us.

db.insert(users, function(err, newDocs) {
	if(err) {
		console.log("Something went wrong when writing");
		console.log(err);
	} else {
		console.log("Added " + newDocs.length + " users");
	}
});




