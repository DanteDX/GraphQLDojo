import {gql} from "apollo-boost";

export const getBooksQuery = gql`
    {
        books{
            name
            genre 
            authorId
            author{
                name
                age
            }
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