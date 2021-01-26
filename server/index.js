const express = require('express');
const app = express();
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');

app.use(express.json());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.get('/',(req,res) => {
    res.send('Welcome to the home page');
});



app.listen(4000,() => console.log('Listening to port 4000'));