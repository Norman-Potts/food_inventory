console.log('My DB');


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";



/// Create Food Collection
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.listCollections({name: "Food"})                 //// Check if collection exists
  .next(function(err, collinfo) { 
      if (collinfo === null) {                        //// if collection info is null create the collection.
        dbo.createCollection("Food", function(err, res) {
          if (err) throw err;
          console.log("Collection created!");
          db.close();
        });
      }
  }); 
});



//// Delete all recods in Food.
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("Food").deleteMany({}, function(err, obj) {
    if (err) throw err;
    console.log("Documents deleted.");
    db.close();
  });
});          



//// Repopulate with defualt array.
const bunch = [
  { name:'Apple', upc: '0402947243592843', dateBought: '18-July-2021', bestBefore: '25-July-2021', description: 'This is a apple.', count: 10, weight: '5lb'  },
  { name:'Banana',upc: '7728377298398729', dateBought: '19-July-2021', bestBefore: '24-July-2021', description: 'Bananas are yellow.', count: 11, weight: '4lb'  },
  { name:'Hamburger', upc: '0402947243592843', dateBought: '20-July-2021', bestBefore: '26-July-2021', description: 'Hamburger meat.', count: 5, weight: '7lb'  },
];
/// Insert 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");  
    dbo.collection("Food").insertMany(bunch, function(err, res) {
      if (err) throw err;
      console.log("Inital bunch inserted");
      db.close();
        });
  });



  function cekDB() {
    /// Check the Food collection for correct bunch
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("Food").find({}).toArray(function(err, result) {
          if (err) throw err;
              console.log(result);
          db.close();
        });
    });
  }



  module.exports = {
    cekDB
  };


















