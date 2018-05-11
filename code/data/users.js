const mongodb = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v4');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function getUserByID(_id) {
	if (!_id || typeof _id != 'string')
		throw _id;
	
	let userCollection = await users();

	let user = await userCollection.findOne({ _id });
	return user;
}

async function getUserByUsername(username) {
	try {
		if (!username || typeof username != 'string')
			throw "username must be a non-empty string";
		
		let userCollection = await users();

		let user = await userCollection.findOne({ username }, {fields: { hashedpassword: false, sessionIDs: false }});
		return user;
	} catch (e) {
		throw e;
	}
}

async function loginUser(username, password) {
	if (!username || typeof username != 'string' || !password || typeof password != 'string')
		throw "username and password must be non-empty strings";

	let userCollection = await users();
	let user = undefined;
	try {
		user = await userCollection.findOne({ username });
	} catch (e) {
		return false;
	}

	if (user && await bcrypt.compare(password, user.hashedpassword))
		return user;
	else
		return false;
}

async function createUser(username, password) {
	if (!username || typeof username != 'string' || !password || typeof password != 'string')
		throw "username and password must be non-empty strings";

	if ((await getUserByUsername(username)) != undefined)
		return undefined;

	let hashedpassword = await bcrypt.hash(password, saltRounds);

	let userCollection = await users();

	let newUser = {
		_id: uuid(),
		username: username,
		hashedpassword: hashedpassword,
		sessionIDs: []
	};

	await userCollection.insert(newUser)
	return newUser;
}

//Gets all of the ratings that have been submitted by the user.
async function getUserRatings(username) {
	//MongoDB stuff
}

async function getUserBySessionID(sID) {
	try {
		if (!sID)
			return undefined;
		
		let userCollection = await users();
		let user = await userCollection.findOne({ sessionIDs: sID });

		return user;
	} catch (e) {
		throw e;
	}
}

async function addUserSessionID(_id, sID) {
	let userCollection = await users();

	return await userCollection.update({ _id }, { $push: { sessionIDs: sID }});
}

async function expireSessionID(sID) {
	try {
		let userCollection = await users();
		let currentUser = await getUserByUsername(username);

		let indexOfsID = currentUser.sessionIDs.indexOf(sID);
		let currentsIDs = currentUser.sessionIDs;
		currentsIDs.splice(indexOfsID, 1);

		await userCollection.update({ username }, {	$set: {	sessionIDs: currentsIDs	}});
		return await userCollection.findOne({ username: username });
	} catch (e) {
		throw e;
	}
}

module.exports = {
	getUserByID,
	getUserByUsername,
	loginUser,
	getUserBySessionID,
	addUserSessionID,
	expireSessionID,
	createUser
};