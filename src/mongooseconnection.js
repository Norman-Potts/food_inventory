let mongoose = require('mongoose');

const server = 'localhost:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'mydb';      // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true, useUnifiedTopology: true } )
       .then(() => {
         console.log('Mongose database connection successful!')
       })
       .catch(err => {
         console.error('Mongoose database connection error!')
       })
  }
}

module.exports = new Database()