const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const{JWT_SECRET} = require('../keys');
const requireLogin = require('../../Backend/middleware/requireLogin');



router.get('/protected', requireLogin, (req, res) => {
    res.send("hello user")
})

// post request
router.post('/signup', (req, res) => {
    // when we make the request from the frontend
    // req.body method is used
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res.status(402).json({ 'message': 'fill out all the forms' });
    }


    // to check the user already exists or not
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(409).json({ 'message': 'user already exists' });
            }
            // to create a new user

bcrypt.hash(password, 12)
.then(hashedPassword => {


    const user = new User({
        email,
        password: hashedPassword,
        name
    });

    //to save a user
    user.save()
        .then(savedUser => {
            res.status(201).json({ 'message': 'saved successfully', user: savedUser });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ 'error': 'internal server error' });
        });

})

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ 'error': 'internal server error' });
        });
});


router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ 'error': 'please add email and password' });
    }

    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ 'error': 'user does not exist with this email' });
            }

            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                        return res.json({ 'message': 'successfully signed in', token });
                    } else {
                        return res.status(422).json({ 'error': 'Invalid password' });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ 'error': 'internal server error' });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ 'error': 'internal server error' });
        });
});


module.exports = router;
