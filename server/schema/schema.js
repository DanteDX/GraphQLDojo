const graphql = require('graphql');
const {
    GraphQLObjectType,GraphQLString,
    GraphQLSchema,GraphQLList,GraphQLID,
    GraphQLInt
} = graphql;
// const _ = require('lodash');

const BookData = [
    {id:'1',name:'BookOne',genre:'Science'},
    {id:'2',name:'BookTwo',genre:'Physics'},
    {id:'2',name:'BookThree',genre:'Chemistry'},
    {id:'4',name:'BookFour',genre:'Biology'}
];

const AuthorData = [
    {id:'1',name:'Shadman',age:27},
    {id:'2',name:'Martin',age:30},
    {id:'3',name:'Piyal',age:40},
    {id:'1',name:'Zarif',age:33}
];

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() => ({
        id:{type: GraphQLID}, // previously it was, GraphQLString
        name:{type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:() => ({
        id:{type: GraphQLID}, // previously it was, GraphQLString
        name:{type: GraphQLString},
        age: {type: GraphQLInt}
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
        author:{
            type: new GraphQLList(AuthorType),
            args:{id:{type: GraphQLID}},
            resolve(parent,args){
                return AuthorData.filter(eachAuthor => eachAuthor.id === args.id);
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery
});