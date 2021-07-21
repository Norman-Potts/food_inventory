var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/mydb";


let foodSchema = new mongoose.Schema({ 
      
    name:String,
    upc : String,
    dateBought: String,
    bestBefore: String,
    description:String,
    count:Number,
    weight: String,
});


module.exports = mongoose.model('Food', foodSchema, 'Food');