import React from 'react';
import "./BookList.scss";
import {gql} from "apollo-boost";
import {graphql} from 'react-apollo';

const getBooksQuery = gql`
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

function BookList(props){
    console.log(props);
    return(
        <div className="bookWrapper">
            <p>This is the BookList component</p>
        </div>

    )
}

export default graphql(getBooksQuery)(BookList);