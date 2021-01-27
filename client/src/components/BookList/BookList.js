import React from 'react';
import "./BookList.scss";
import {graphql} from 'react-apollo';
import {getBooksQuery} from "../../Queries/Queries";

function BookList(props){
    console.log(props);
    return(
        <div className="bookWrapper">
            <p>This is the BookList component</p>
            {(props.data.loading ? <p>Still Loading</p> : <p>Books data Loaded</p>)}
        </div>

    )
}

export default graphql(getBooksQuery)(BookList);