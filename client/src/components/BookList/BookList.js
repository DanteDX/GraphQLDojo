import React from 'react';
import "./BookList.scss";
import {graphql} from 'react-apollo';
import {flowRight as compose} from "lodash";
import {getBooksQuery,addBookMutation} from "../../Queries/Queries";

function BookList(props){
    console.log(props);
    const clickHandler = e =>{
        props.addBookMutation({
            variables:{
                name:'Sheldon Lee Cooper',
                genre:"Physics",
                authorId:"999"
            }
        });
        console.log('Done!');
    };
    return(
        <div className="bookWrapper">
            <p>This is the BookList component</p>
            <button onClick={e => clickHandler(e)}>ADD</button>
        </div>

    )
}

export default compose(
    graphql(getBooksQuery,{name:"getBooksQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(BookList);