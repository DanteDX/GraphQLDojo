"use strict";

var graphql = require('graphql');

var Book = require("../models/Book");

var Author = require("../models/Author");

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLSchema = graphql.GraphQLSchema,
    GraphQLList = graphql.GraphQLList,
    GraphQLID = graphql.GraphQLID,
    GraphQLInt = graphql.GraphQLInt; // const _ = require('lodash');
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

var AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: function fields() {
    return {
      id: {
        type: GraphQLID
      },
      // previously it was, GraphQLString
      name: {
        type: GraphQLString
      },
      age: {
        type: GraphQLInt
      },
      books: {
        type: new GraphQLList(BookType),
        resolve: function resolve(parent, args) {//return BookData.filter(eachBook => eachBook.authorId === parent.id );
        }
      }
    };
  }
});
var BookType = new GraphQLObjectType({
  name: 'Book',
  fields: function fields() {
    return {
      id: {
        type: GraphQLID
      },
      // previously it was, GraphQLString
      name: {
        type: GraphQLString
      },
      genre: {
        type: GraphQLString
      },
      author: {
        type: new GraphQLList(AuthorType),
        resolve: function resolve(parent, args) {
          console.log(parent); //return AuthorData.filter(eachAuthor => eachAuthor.id === parent.authorId);
        }
      }
    };
  }
});
var RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: new GraphQLList(BookType),
      // before it was just (type: BookType)
      args: {
        id: {
          type: GraphQLID
        }
      },
      // previously it was, GraphQLString
      resolve: function resolve(parent, args) {// return _.find(BookData,{id:args.id});
        //return BookData.filter(eachBook => eachBook.id === args.id);
      }
    },
    author: {
      // this field will be followed while returning data
      type: new GraphQLList(AuthorType),
      // what kind of data it will return
      args: {
        id: {
          type: GraphQLID
        }
      },
      // what argument it will take
      resolve: function resolve(parent, args) {// the functional process
        //return AuthorData.filter(eachAuthor => eachAuthor.id === args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: function resolve(parent, args) {//return BookData;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: function resolve(parent, args) {//return AuthorData;
      }
    }
  }
}); // Mutation is Adding/Changing/Deleting Data

var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: GraphQLString
        },
        age: {
          type: GraphQLInt
        }
      },
      resolve: function resolve(parent, args) {
        var author, res;
        return regeneratorRuntime.async(function resolve$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                author = new Author({
                  name: args.name,
                  age: args.age
                });
                _context.prev = 1;
                _context.next = 4;
                return regeneratorRuntime.awrap(author.save());

              case 4:
                res = _context.sent;
                return _context.abrupt("return", res);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", _context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, null, null, [[1, 8]]);
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: GraphQLString
        },
        genre: {
          type: GraphQLString
        }
      },
      resolve: function resolve(parent, args) {
        var name, genre, book, res;
        return regeneratorRuntime.async(function resolve$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                name = args.name, genre = args.genre;
                book = new Book({
                  name: name,
                  genre: genre
                });
                _context2.prev = 2;
                _context2.next = 5;
                return regeneratorRuntime.awrap(book.save());

              case 5:
                res = _context2.sent;
                return _context2.abrupt("return", res);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](2);
                return _context2.abrupt("return", _context2.t0);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, null, null, [[2, 9]]);
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});