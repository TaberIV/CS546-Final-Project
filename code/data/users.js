const mongodb = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function getUserByUsername(username) {
	try{
		if (!username || typeof username != 'string')
			throw "username must be a non-empty string";
		let userCollection = await users();
		return await userCollection.findOne({
			username: username
		});
	} catch (e){
		throw e;
	}
}

async function loginUser(username, password) {
	if (!username || typeof username != 'string' || !password || typeof password != 'string')
		throw "username and password must be non-empty strings";

	try {
		let user = await getUserByUsername(username);
	} catch (e) {
		return false;
	}

	if (user && await bcrypt.compare(password, user.hashedpassword))
		return user;
	else
		return false;
}

async function createUser(username, password) {
	try{
		if (!username || typeof username != 'string' || !password || typeof password != 'string')
			throw "username and password must be non-empty strings";

		if (await getUserByUsername(username) != undefined)
			return undefined;

		let hashedpassword = await bcrypt.hash(password, saltRounds);

		let userCollection = await users();

		let newUser = {
			username: username,
			firstname: "New",
			lastname: "Guy",
			profession: "N00b",
			bio: "Just joined!",
			hashedpassword: hashedpassword,
			sessionIDs: []
		};

		await userCollection.insertOne(newUser);
		return await userCollection.findOne({username: username});
	} catch (e){
		throw e;
	}
}

//Gets all of the ratings that have been submitted by the user.
async function getUserRatings(username) {
	//MongoDB stuff
}

async function getUserBySessionID(sID) {
	try{
		let userCollection = await users();
		
		return await userCollection.find({sessionIDs: sID});
	} catch (e){
		throw e;
	}
}

async function addUserSessionID(username, sID) {
	try{
		let userCollection = await users();
		let currentUser = await getUserByUsername(username);

		await userCollection.update(
			{username: username},
			{
				$set:{
					sessionIDs: currentUser.sessionIDs.push(sID)
				}
			}
		);
		return await userCollection.findOne({username: username});
	} catch e{
		throw e;
	}
}

async function expireSessionID(sID) {
	try{
		let userCollection = await users();
		let currentUser = await getUserByUsername(username);

		let indexOfsID = currentUser.sessionIDs.indexOf(sID);
		let currentsIDs = currentUser.sessionIDs;
		currentsIDs.splice(indexOfsID, 1);

		await userCollection.update(
			{username: username},
			{
				$set:{
					sessionIDs: currentsIDs
				}
			}
		);
		return await userCollection.findOne({username: username});
	} catch e{
		throw e;
	}
}

module.exports = {
	getUserByUsername,
	loginUser,
	getUserBySessionID,
	addUserSessionID,
	expireSessionID,
	createUser
};