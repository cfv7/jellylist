const path = require('path');
const express = require('express');

const app = express();

require('dotenv').config();

const {DATABASE_URL} = require('./config');

const {User} = require('./models');

// API endpoints go here!
app.get('/api/userdata', (req, res) => {
  User 
    .find()
    .exec()
    .then(users => {
      res.json(users.map(user => user.apiRepr()))
      //return res.status(200).json(cheeses);
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
function runServer(port = 3001) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      resolve();
    }).on('error', reject);
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer();
}

module.exports = {
  app, runServer, closeServer
};
