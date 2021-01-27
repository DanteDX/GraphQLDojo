import {gql} from "apollo-boost";

export const getBooksQuery = gql`
    {
        books{
            name
            genre 
            authorId
        }
    }
`;

export const getAuthorsQuery = gql`
    {
        authors{
            name
            age
            books{
                name
                genre
            }
        }
    }
`;

export const addBookMutation = gql`
    mutation($name:String!,$genre:String!,$authorId:ID!){
        addBook(name:$name,genre:$genre,authorId:$authorId){
            name
            genre
            authorId
        }
    }
`;  

export const getBookDetails = gql`
    query GetBook($id: ID!){
        book(id: $id){
            id
            name
            genre
            authorId
        }
    }
`;