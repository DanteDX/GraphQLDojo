import React from 'react';
import "./AuthorList.scss";
import {graphql} from 'react-apollo';
import {getAuthorsQuery} from "../../Queries/Queries";

function AuthorList(props){
    // console.log(props);
    return(
        <div className="authorWrapper">
            <p>This is the AuthorList component</p>
            {(props.data.loading ? <p>Still Loading</p> : <p>Authors data Loaded</p>)}
        </div>

    )
}

export default graphql(getAuthorsQuery)(AuthorList);