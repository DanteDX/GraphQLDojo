const express = require('express');
const app = express();
const {graphqlHTTP} = require('express-graphql');
app.use('/graphql', graphqlHTTP({
    // pass in a schema property
}));


app.listen(4000,() => console.log('Listening to port 4000'));