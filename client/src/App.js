import React from 'react';
import BookList from "./components/BookList/BookList.js";
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
        </div>
    </ApolloProvider>
   
  );
}

export default App;
