const express = require('express');
const bodyParser = require('body-parser');
const bcrypt =  require('bcrypt-nodejs');
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
    user : 'test',
    password : 'test',
    database : 'smart_brain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(database.users);
});

app.post('/signin', signin.handleSignin(db, bcrypt)); 
//advanced functions --> handleSignin(db, bcrypt) function returns another function with (req, res) as parameters
//this is nothing but a function call like::: handleSignin(db, bcrypt)(req,res)
//we don't explicitly mention the sencond function call in here since the call to handleSignin(db, bcrypt) internally returns another function with req, res which are present by default unlike other parameters

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) } );

app.put('/image', (req, res) => { image.handleImage(req, res, db) } );

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});


/*
/ --> res = this is working
/signin --> POST = success/fail ----> It's a POST req because we are passing otherwise if not POST then the username and password will be passed as a querystring resulting in man in the middle attacks
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/