const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'mirek',
      password : '',
      database : 'smart-brain'
    }
  });

const app = express();

app.use(express.json());

app.use(cors());

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res, db)})
app.get('/', (req, res) => {
    res.send('Wrong address...Try port 3000');
})

app.listen(3001, () => {
    console.log('app is running on port 3001');
})

// SIGNIN
//      bcrypt.compare("apples",
//      '$2a$10$iloCXkH4Qybao4I6TfI4t.fGsBn01qQ2QXQWbt4qtBMs2xKMsj9gW',
//      function(err, res) {

//     console.log('first guess', res);
// });
// bcrypt.compare("veggies",
//      '$2a$10$l9wWXhwASpcfQrFS7LHeHODMP3qb3EERRRL6894KYQmN5lBurQ8V.',
//      function(err, res) {
//         console.log('second guess', res);
// });
    // if (req.body.email === database.users[0].email &&
    // req.body.password === database.users[0].password) {
    //     // res.json('success');
    //     res.json(database.users[0]);
    // } else {
    //     res.status(400).json('error logging in');
    // }
    // res.send('signin')
    // res.json('signin')

// FAKE DB
// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             email: 'sally@gmail.com',
//             password: 'bananas',
//             entries: 0,
//             joined: new Date()
//         }
//     ]
// }