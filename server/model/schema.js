const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


var users = [
    { id : '1', name : 'John Gang', email : 'gang@gmail.com', age : 14 },
    { id : '2', name : 'John Kim', email : 'kim@gmail.com', age : 15 },
    { id : '3', name : 'John Min', email : 'min@gmail.com', age : 18 },
    { id : '4', name : 'John Yu', email : 'yu@gmail.com', age : 18 }            
];


const UserType = new GraphQLObjectType({
    name : 'User',
    fields : () => ({
        id    : { type : GraphQLString },
        name  : { type : GraphQLString },
        email : { type : GraphQLString },
        age   : { type : GraphQLInt}
    })
});


const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields: {
        /*
            /graphql?query={ user(id : "1") { id, name, email, age } }
        */
        user :{
            type : UserType,
            args : {
                id : { type : GraphQLString }
            },
            resolve(parentValue, args){
                return users.filter(e => e.id === args.id)[0];
            }
        },
        /* 
            /graphql?query={ users{ id, name, email, age } }
        */
        users : {
            type : new GraphQLList(UserType),
            resolve(parentValue, args){
                return users;
            }
        }
    } 
});


const mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        /* POST
            /graphql?query=mutation{ 
                addUser( name : "John Jang", email : "jang@gamil.com", age : 14){
                    id,
                    name,
                    email,
                    age
                }
            }
        */
        addUser : {
            type : UserType,
            args : {
                name : { type : new GraphQLNonNull(GraphQLString) },
                email : { type : new GraphQLNonNull(GraphQLString) },
                age : { type : new GraphQLNonNull(GraphQLInt) } 
            },
            resolve(parentValue, args){

                users.push({ 
                    id : (users.length+1).toString(), 
                    name : args.name, 
                    email : args.email, 
                    age : args.age 
                });

                return users[users.length-1];
            }
        },
        /* POST
            /graphql?query=mutation{
                removeUser(id : "1"){
                    id,
                    name,
                    email,
                    age
                }
            }
        */
        removeUser : {
            type : UserType,
            args : {
                id : { type : new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                let user = users.filter(e => e.id === args.id)[0];
                users = users.filter(e => e.id !== args.id);

                return user;
            }
        },
        /* POST
            /graphql?query=mutation{
                updateUser(id : "1" , age : 15 ){
                    id,
                    name,
                    email,
                    age
                }
            }
        */
        updateUser : {
            type : UserType,
            args : {
                id : { type : new GraphQLNonNull(GraphQLString)},
                name : { type : GraphQLString },
                email : { type : GraphQLString },
                age : { type : GraphQLInt } 
            },
            resolve(parentValue, args){
                let user = users.filter(e => e.id === args.id)[0];
                return Object.assign(user, user, { ...args });
            }
        },        
    }
});


module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation
});