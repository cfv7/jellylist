const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

const {User} = require('./models');

const app = express();

// API endpoints go here!
app.get('/api/users', (req, res) => {
  User 
    .find()
    .exec()
    .then(users => {
      console.log('->', users);
      res.json(users.map(user => user.apiRepr()))
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({error: 'Internal server error'});
    });
})
app.get('/api/users/:id', (req, res) => {
  User 
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) {
        return res.status(400).send();
      }
      res.json(user.apiRepr())
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({error: 'Internal server error'});
    });
})


// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});

let server;
function runServer(port = PORT, databaseUrl=DATABASE_URL) {
  console.log(databaseUrl);
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });  
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  })
}

if (require.main === module) {
  runServer();
}

module.exports = {
  app, runServer, closeServer
};
