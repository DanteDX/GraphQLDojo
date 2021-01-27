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