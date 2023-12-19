
const express = require('express');
const app = express();
const PORT=5000;

const mongoose= require('mongoose');
//destructing the properties

const {MONGO_URI} = require('./keys');
require('./models/user');
require('./models/post');

app.use(express.json())
app.use(require('./Routes/auth'));
app.use(require('./Routes/post'));

// on suscessful connection attempt
mongoose.connect(MONGO_URI)
mongoose.connection.on('connected',() => {
    console.log('Connected suscessfully');
});

// on error connection

mongoose.connection.on('error',(error) => {  
    console.log('Connection error', error)
});


//custom middleware
const customiddleware = (req, res, next) =>{
console.log('customiddleware executed');
next();
}

app.use(customiddleware);
app.get(  '/home' ,(req, res)=>{
res.send('hello ');

})

app.listen(PORT, ()=>{
    console.log('listening on port ',PORT);
});