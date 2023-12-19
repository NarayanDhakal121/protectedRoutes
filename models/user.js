
const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({

    name:{
        type: 'string',
        required: true 
    },
    email:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    }

});
mongoose.model('User', userSchema);

/*we have to register it in app.js 
so   in app.js 
required('./models/user)
*/ 
// mongoose.model('User', userSchema)


















/*
in  schemas ie for user schema

const mongoose = require('mongoose'); 
const userSchema = new mongoose.Schema({

    name:{
        type: 'string',
        required: true
    },

})
    
mongoose.model('User', userSchema)
    
    
   




*/ 