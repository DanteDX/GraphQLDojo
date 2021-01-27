import React from 'react';
import BookList from "./components/BookList/BookList.js";
import AuthorList from "./components/AuthorList/AuthorList.js";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";

const client = new ApolloClient({
  uri:"http://localhost:4000/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
       <div className="App">
          This is apollo client
          <BookList />
          <AuthorList />
        </div>
    </ApolloProvider>
   
  );
}

export default App;
