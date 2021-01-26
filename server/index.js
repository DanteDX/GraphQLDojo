require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI,{ 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true 
}).then((result) =>{
        app.listen(4000,() =>{
            console.log('mongoose connected');
            console.log('Listening to port 4000');
        })
    })
    .catch(err => {
        console.log('Error');
    });

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.get('/',(req,res) => {
    res.send('Welcome to the home page');
});



// app.listen(4000,() => console.log('Listening to port 4000'));