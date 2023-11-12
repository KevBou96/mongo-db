const  ObjectId  = require('mongodb').ObjectId;
const getDb = require('../util/database').getDb;



class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title,
    this.price = price,
    this.description = description,
    this.imageUrl = imageUrl
  }

  save() {
    const db = getDb();
    return db.collection('products').insertOne(this)
  }

  static fetchAllProducts() {
    const db = getDb();
    return db.collection('products')
    .find()
    .toArray()
    .then(result => {
      return result
    })
    .catch(err => {
      console.log(err);
    })
  }

  static getProduct(productId) {
    const db = getDb()
    let objectId = new ObjectId(productId)
    return db.collection('products')
    .findOne({_id: objectId})
    .then(result => {
      return result
    })
    .catch(err => {
    })
  }

  static updateProduct(productId, title, price, description, imgUrl) {
    const db = getDb();
    let objectId = new ObjectId(productId);
    return db.collection('products').updateOne(
      {_id: objectId}, 
      {$set: {title: title, price: price, description: description, imageUrl: imgUrl}})
  }

  static deleteProduct(productId) {
    const db = getDb();
    let objectId = new ObjectId(productId);
    return db.collection('products').deleteOne({_id: objectId})
  }
} 



module.exports = Product;
