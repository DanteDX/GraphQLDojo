const express = require('express');
const app = express();
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');

app.get('/',function(req,res){
    res.send('Welcome to the home page');
})
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(4000,() => console.log('Listening to port 4000'));