"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var graphql = require('graphql');

var Book = require("../models/Book");

var Author = require("../models/Author");

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLSchema = graphql.GraphQLSchema,
    GraphQLList = graphql.GraphQLList,
    GraphQLID = graphql.GraphQLID,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLNonNull = graphql.GraphQLNonNull; // const _ = require('lodash');
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
        resolve: function resolve(parent, args) {
          return regeneratorRuntime.async(function resolve$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return regeneratorRuntime.awrap(Book.find({
                    authorId: parent.id
                  }));

                case 3:
                  return _context.abrupt("return", _context.sent);

                case 6:
                  _context.prev = 6;
                  _context.t0 = _context["catch"](0);
                  return _context.abrupt("return", _context.t0);

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, null, null, [[0, 6]]);
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
      authorId: {
        type: GraphQLID
      },
      author: {
        type: AuthorType,
        resolve: function resolve(parent, args) {
          return regeneratorRuntime.async(function resolve$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return regeneratorRuntime.awrap(Author.findOne({
                    _id: parent.authorId
                  }));

                case 3:
                  return _context2.abrupt("return", _context2.sent);

                case 6:
                  _context2.prev = 6;
                  _context2.t0 = _context2["catch"](0);
                  return _context2.abrupt("return", _context2.t0);

                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, null, null, [[0, 6]]);
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
      resolve: function resolve(parent, args) {
        return regeneratorRuntime.async(function resolve$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return regeneratorRuntime.awrap(Book.find({
                  _id: args.id
                }));

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", _context3.t0);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, null, null, [[0, 6]]);
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
      resolve: function resolve(parent, args) {
        return regeneratorRuntime.async(function resolve$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                console.log(args.id);
                console.log(_typeof(args.id));
                _context4.next = 5;
                return regeneratorRuntime.awrap(Author.find({
                  _id: args.id
                }));

              case 5:
                return _context4.abrupt("return", _context4.sent);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", _context4.t0);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, null, null, [[0, 8]]);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: function resolve(parent, args) {
        return regeneratorRuntime.async(function resolve$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return regeneratorRuntime.awrap(Book.find({}));

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", _context5.t0);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, null, null, [[0, 6]]);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: function resolve(parent, args) {
        return regeneratorRuntime.async(function resolve$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return regeneratorRuntime.awrap(Author.find({}));

              case 3:
                return _context6.abrupt("return", _context6.sent);

              case 6:
                _context6.prev = 6;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", _context6.t0);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, null, null, [[0, 6]]);
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
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: function resolve(parent, args) {
        var author, res;
        return regeneratorRuntime.async(function resolve$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                author = new Author({
                  name: args.name,
                  age: args.age
                });
                _context7.prev = 1;
                _context7.next = 4;
                return regeneratorRuntime.awrap(author.save());

              case 4:
                res = _context7.sent;
                return _context7.abrupt("return", res);

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](1);
                return _context7.abrupt("return", _context7.t0);

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, null, null, [[1, 8]]);
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        genre: {
          type: new GraphQLNonNull(GraphQLString)
        },
        authorId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: function resolve(parent, args) {
        var name, genre, authorId, book, res;
        return regeneratorRuntime.async(function resolve$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                name = args.name, genre = args.genre, authorId = args.authorId;
                book = new Book({
                  name: name,
                  genre: genre,
                  authorId: authorId
                });
                _context8.prev = 2;
                _context8.next = 5;
                return regeneratorRuntime.awrap(book.save());

              case 5:
                res = _context8.sent;
                return _context8.abrupt("return", res);

              case 9:
                _context8.prev = 9;
                _context8.t0 = _context8["catch"](2);
                return _context8.abrupt("return", _context8.t0);

              case 12:
              case "end":
                return _context8.stop();
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