const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;
const connectionPath = 'mongodb+srv://kevene1996:Kevene96*@cluster0.ya8betu.mongodb.net/?retryWrites=true&w=majority'

let db;

const mongoConnect = callback => {
  mongoClient.connect(connectionPath)
  .then(client => {
    console.log('connected');
    db = client.db()
    callback()
  })
  .catch(err => {
    // console.log(err);
    throw err;
  });
}

const getDb = () => {
  if (db) {
    return db;
  } else {
    throw 'no database found'
  }
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
