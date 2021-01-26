const graphql = require('graphql');
const {GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql;
const _ = require('lodash');

const BookData = [
    {id:'1',name:'BookOne',genre:'Science'},
    {id:'2',name:'BookTwo',genre:'Physics'},
    {id:'2',name:'BookThree',genre:'Chemistry'},
    {id:'4',name:'BookFour',genre:'Biology'}
];

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() => ({
        id:{type: GraphQLString},
        name:{type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args:{id:{type: GraphQLString}},
            resolve(parent,args){
                return _.find(BookData,{id:args.id});
                // let result = BookData.filter(eachBook => eachBook.id === args.id);
                // return result;
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery
});