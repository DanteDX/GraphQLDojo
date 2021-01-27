import React from 'react';
import {getBookDetails} from "../Queries/Queries";
import {graphql} from 'react-apollo';

function BookDetails(props){
    console.log('Following are the BookDetails Props');
    console.log(props);
    return (
        <p>This is BookDetails Component</p>
    )
};

export default graphql(getBookDetails,{
    options: (props) =>{
        return{
            variables:{
                id: "60115d0e70fd70163c6c7b86"
            }
        }
    }
})(BookDetails);

