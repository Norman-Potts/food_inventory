const  Food   = require("./models/food.js");


//// Bring in tools from graphql.
const {
    GraphQLObjectType, 
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


const FoodType = new GraphQLObjectType({
    name:'Foods',
    //// The fields we want for a Food, and set their types.
    fields:() => ({   
        _id:{type:GraphQLString},
        name:{type: GraphQLString},
        upc : {type: GraphQLString},
        dateBought: {type:GraphQLString},
        bestBefore: {type: GraphQLString },
        description: {type: GraphQLString },
        count: {type: GraphQLInt },
        weight: {type: GraphQLString },
    })
});




//// Root Query
const RootQuery = new GraphQLObjectType({  
    name:'RootQueryType',
    fields:{
        Food: {
            type:FoodType,
            args:{
                _id:{type:GraphQLString}    
            },
            resolve(parentValue, args) {
                return Food.find({ _id: args._id  }).then(doc => doc[0] );
            }
        },
        FoodByName: {
            type:FoodType,
            args:{
                name:{type:GraphQLString}    
            },
            resolve(parentValue, args) {
                return Food.find({ name: args.name  }).then(doc => doc[0] );
            }
        },
        Foods:{
            type: new GraphQLList(FoodType),
            resolve(parentValue, args) {
                return Food.find().then(doc =>  doc );
            }
        }
    }
});




//// Mutations allow you to alter data.
const mutation  = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addFood:{
            type:FoodType, 
            args: {
                name:{type: GraphQLString},
                upc : {type: GraphQLString},
                dateBought: {type:GraphQLString},
                bestBefore: {type: GraphQLString },
                description: {type: GraphQLString },
                count: {type: GraphQLInt },
                weight: {type: GraphQLString }
            },
            resolve(parentValue, args ){            
                let item = new Food({
                    name:args.name,
                    upc : args.upc,
                    dateBought: args.dateBought,
                    bestBefore: args.bestBefore,
                    description: args.description,
                    count: args.count,
                    weight: args.weight
                }); 
                return item.save().then(doc => doc);
            }
        },
        deleteFood:{
            type:FoodType, 
            args: {
                _id:{type: new GraphQLNonNull( GraphQLString )},
            },
            resolve(parentValue, args ){
                return Food.findOneAndRemove({_id:args._id}).then(doc => doc);
            }
        },
        editFood:{
            type:FoodType, 
            args: {
                _id:{type: new  GraphQLNonNull( GraphQLString) },            
                name:{type: GraphQLString},
                upc : {type: GraphQLString},
                dateBought: {type:GraphQLString},
                bestBefore: {type: GraphQLString },
                description: {type: GraphQLString },
                count: {type: GraphQLInt },
                weight: {type: GraphQLString }
            },
            resolve(parentValue, args ){
                return Food.findOneAndUpdate({_id:args._id},{
                    name:args.name,
                    upc : args.upc,
                    dateBought: args.dateBought,
                    bestBefore: args.bestBefore,
                    description: args.description,
                    count: args.count,
                    weight: args.weight
                },{new:true}).then( doc => doc );
            }
        },
    }
});




module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});