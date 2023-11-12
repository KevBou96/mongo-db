const { LONG } = require('mysql2/lib/constants/types');

const Product = require('../models/product')
const  ObjectId  = require('mongodb').ObjectId;
const getDb = require('../util/database').getDb;


class User {
  constructor(email, password, cart, _id) {
    this.email = email,
    this.password = password
    this.cart = cart
    this._id = _id
  }

  saveUser() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  static findUserById(userId) {
    const db = getDb();
    const objId = new ObjectId(userId);
    return db.collection('users')
    .findOne({_id: objId})
    .then(user => {
      return user
    }).catch(err => {
      console.log(err);
    })
  }

  static addProductToCart(product_id, user_id) {
    const db = getDb();
    const updatedCart = {
      items: [{product_id: new ObjectId(product_id), quantity: 1}]
    }
    return db.collection('users').updateOne(
      {_id: user_id}, 
      {$set: updatedCart})
  }

  static getCart(user_id) {
    const db = getDb();
    return db.collection('users').findOne({items})
  }
}

module.exports = User;
