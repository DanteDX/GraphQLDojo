const graphql = require('graphql');
const Book = require("../models/Book");
const Author = require("../models/Author");
const {
    GraphQLObjectType,GraphQLString,
    GraphQLSchema,GraphQLList,GraphQLID,
    GraphQLInt, GraphQLNonNull
} = graphql;
// const _ = require('lodash');
// no need of lodash

// const BookData = [
//     {id:'1',name:'BookOne',genre:'Science',authorId:'1'},
//     {id:'2',name:'BookTwo',genre:'Physics',authorId:'2'},
//     {id:'2',name:'BookThree',genre:'Chemistry',authorId:'3'},
//     {id:'4',name:'BookFour',genre:'Biology',authorId:'3'}
// ];

// const AuthorData = [
//     {id:'1',name:'Shadman',age:27},
//     {id:'2',name:'Martin',age:30},
//     {id:'3',name:'Piyal',age:40},
//     {id:'1',name:'Zarif',age:33}
// ];

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:() => ({
        id:{type: GraphQLID}, // previously it was, GraphQLString
        name:{type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve: async (parent,args) => {
                try{
                    return await Book.find({authorId:parent.id});
                }catch(err){
                    return err;
                }
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() => ({
        id:{type: GraphQLID}, // previously it was, GraphQLString
        name:{type: GraphQLString},
        genre: {type: GraphQLString},
        authorId:{type: GraphQLID},
        author:{
            type: AuthorType,
            resolve: async (parent,args) => {
                try{
                    return await Author.findOne({_id:parent.authorId});
                }catch(err){
                    return err;
                }
            }
        }
    })
});



const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{ 
            type: new GraphQLList(BookType), // before it was just (type: BookType)
            args:{id:{type: GraphQLID}}, // previously it was, GraphQLString
            async resolve(parent,args){
                // return _.find(BookData,{id:args.id});
                //return BookData.filter(eachBook => eachBook.id === args.id);
                try{
                    return await Book.find({_id:args.id});
                }catch(err){
                    return err;
                }
            }
        },
        author:{ // this field will be followed while returning data
            type: new GraphQLList(AuthorType), // what kind of data it will return
            args:{id:{type: GraphQLID}}, // what argument it will take
            async resolve(parent,args){   // the functional process
                //return AuthorData.filter(eachAuthor => eachAuthor.id === args.id);
                try{
                    console.log(args.id);
                    console.log(typeof(args.id));
                    return await Author.find({_id:args.id});
                }catch(err){
                    return err;
                }
            }
        },
        books:{
            type: new GraphQLList(BookType),
            async resolve(parent,args){
                //return BookData;
                try{
                    return await Book.find({});
                }catch(err){
                    return err;
                }
                
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            async resolve(parent,args){
                //return AuthorData;
                try{
                    return await Author.find({});
                }catch(err){
                    return err;
                }
            }
        }
    }
});


// Mutation is Adding/Changing/Deleting Data
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type: AuthorType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve: async(parent,args) =>{
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                try{
                    const res = await author.save();
                    return res;
                }catch(err){
                    return err;
                }
            }
        },
        addBook:{
            type: BookType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve: async(parent,args) =>{
                const {name, genre,authorId} = args;
                let book = new Book({name,genre,authorId});
                try{
                    let res = await book.save();
                    return res;
                }catch(err){
                    return err;
                }
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});


