const graphql = require('graphql');
const {
    GraphQLObjectType,GraphQLString,
    GraphQLSchema,GraphQLList,GraphQLID,
    GraphQLInt
} = graphql;
// const _ = require('lodash');
// no need of lodash

const BookData = [
    {id:'1',name:'BookOne',genre:'Science',authorId:'1'},
    {id:'2',name:'BookTwo',genre:'Physics',authorId:'2'},
    {id:'2',name:'BookThree',genre:'Chemistry',authorId:'3'},
    {id:'4',name:'BookFour',genre:'Biology',authorId:'3'}
];

const AuthorData = [
    {id:'1',name:'Shadman',age:27},
    {id:'2',name:'Martin',age:30},
    {id:'3',name:'Piyal',age:40},
    {id:'1',name:'Zarif',age:33}
];

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:() => ({
        id:{type: GraphQLID}, // previously it was, GraphQLString
        name:{type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return BookData.filter(eachBook => eachBook.authorId === parent.id );
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
        author:{
            type: new GraphQLList(AuthorType),
            resolve: (parent,args) => {
                console.log(parent);
                return AuthorData.filter(eachAuthor => eachAuthor.id === parent.authorId);
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
            resolve(parent,args){
                // return _.find(BookData,{id:args.id});
                return BookData.filter(eachBook => eachBook.id === args.id);
            }
        },
        author:{ // this field will be followed while returning data
            type: new GraphQLList(AuthorType), // what kind of data it will return
            args:{id:{type: GraphQLID}}, // what argument it will take
            resolve(parent,args){   // the functional process
                return AuthorData.filter(eachAuthor => eachAuthor.id === args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return BookData;
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return AuthorData;
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery
});