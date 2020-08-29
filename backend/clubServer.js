const express = require('express');
const app = express();
const request = require('request');
const session = require('express-session');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const preUsers = require('./clubUsers2.json');
const users = require('./clubUsersHash.json');
const DataStore = require('nedb');

const db = new DataStore({filename: __dirname + '/usersDB', autoload: true});
const dbActi = new DataStore({filename: __dirname + '/activities.db', autoload: true});

const ACT_SIZE_LIMIT = 500;
const port = 1989;
const cookieName = "ik4256";

app.use(session({
	secret: 'ik4256 websystem',
	resave: false,
	saveUninitialized: false,
	name: cookieName // Sets the name of the cookie used by the session middleware
}));

app.listen(port, function () {
    console.log(`clubServer app listening on Ip4: localhost:${port}`);
});

// This initializes session state
function setUpSessionMiddleware(req, res, next) {
//	console.log(`\nsession object: ${JSON.stringify(req.session)}`);
//	console.log(`session id: ${req.session.id}`);
	if (!req.session.user) {
		req.session.user = {role: "guest"};
	};
	next();
};

app.use(setUpSessionMiddleware);

// User this middlewave to restrict paths only to admins
function checkAdminMiddleware(req, res, next) {
    //console.log(`here ${req.session}` );
//    console.log(req.session.user.role);
	if (req.session.user.role !== "admin") {
		res.status(401).json({error: "Not permitted"});;
	} else {
		next();
	}
};

app.get('/logout', function (req, res) {
	let options = req.session.cookie;
	req.session.destroy(function (err) {
		if (err) {
			console.log(err);
            res.status("400").send(err);
		}
		res.clearCookie(cookieName, options); // the cookie name and options
		res.json({message: "Goodbye"});
	})
});

app.post('/login', express.json(), function (req, res) {
	//console.log(req.body);
	let email = req.body.email;
	let password = req.body.password;
	// Find user
	let auser = users.find(function (user) {
		return user.email === email
	});
        
	if (!auser) {// Not found
		res.status(401).json({error: true, message: "User/Password error"});
		return;
	}
	let verified = bcrypt.compareSync(password, auser.passHash);
	if (verified) {
		// Upgrade in priveledge, should generate new session id
		// Save old session information if any, create a new session
		let oldInfo = req.session.user;
		req.session.regenerate(function (err) {
			if (err) {
				console.log(err);
			}
			let newUserInfo = Object.assign(oldInfo, auser);
			delete newUserInfo.passHash;
			req.session.user = newUserInfo;
			res.json(newUserInfo);
		});
	} else {
		res.status(401).json({error: true, message: "User/Password error"});
	}
});

function send_all_activites(res) {
    dbActi.find({}, function(err, docs){
        if (err){
            console.log("something is wrong");
        }else{
            console.log("We found " + docs.length + " documents");
            docs.forEach((ele)=> {
                if(ele.dates){ele.dates = ele.dates.join(', ');};
            });      
            res.status(200).json(docs);
        }
    })
}

app.delete("/activities/:id", function (req, res){
    let id = req.params.id;
    dbActi.remove({_id: id}, {}, function (err, numRemoved) {
        if (err){
            consoel.log(err);
            res.status(400).send(err);
        }else{
            console.log("removed " + numRemoved);    
        } 
    });
    send_all_activites(res)
});

app.post('/activities', express.json(), function (req, res) {
    // console.log(JSON.stringify(req.body));
    let tname = req.body.name;
    let tdates = req.body.dates;
    let doc = {name: tname, dates: tdates};
    
    dbActi.insert(doc, function (err, newDoc){
       if (err){
           console.log(err);
           res.status(400).send(err);
       } else{
           console.log("inserted")
       }
    });
    send_all_activites(res)
});

app.get('/activities', express.json(), function (req, res) {
    send_all_activites(res)
});

app.get("/users", checkAdminMiddleware, express.json(), function(req, res){
    let noPassHash = users.map(function(user){
        return{
            "firstName": user.firstName, "lastName": user.lastName, "email": user.email, "role": user.role
        };
    })
    res.status(200).json(noPassHash);
});

const Ajv = require('ajv');
let ajv = new Ajv();
const schema = require('./memberSchema.json');
let validate = ajv.compile(schema);
app.post('/applicants', express.json(), function(req, res) {
    let applicant = req.body;
    let valid = validate(applicant);
    if (!valid) {
        console.log(validate.errors);
        res.json({error: true, message: validate.errors});
    } else {
        res.json({message: "received your application"});
    }
});

app.use(function(req, res, next) {
    res.status(404).send('Not Found');
});