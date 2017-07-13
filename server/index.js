const { PORT, DATABASE_URL } = require("./config")
const { User, GiftItem, GiftList } = require("./models")
const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const { BasicStrategy } = require("passport-http")
const bcrypt = require("bcryptjs")
const bodyParser = require("body-parser")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
require("dotenv").config()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.Promise = global.Promise

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
}

if (process.env.NODE_ENV != 'production') {
  secret = require('./secret');
}

app.use(passport.initialize());

// app.get('/*', function(req, res) {
//   res.send('Hello world!')
// });

passport.use(
  new GoogleStrategy({
    clientID: secret.CLIENT_ID,
    clientSecret: secret.CLIENT_SECRET,
    callbackURL: `/api/auth/google/callback`
  },
    (accessToken, refreshToken, profile, cb) => {
      User
        .findOneAndUpdate({
          googleId: profile.id, 
          displayName: profile.displayName
        }, { 
          $set: {
            accessToken: accessToken, 
            googleId: profile.id
          }
        }, {
          upsert: true, 
          new:true
        })
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          console.error(err)
        })
    })
);

passport.use(
  new BearerStrategy(
    (token, done) => {
      User
        .findOne({
          accessToken: token
        })
        .then((user) => {
          if(user){
            return done(null, user);
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  )
);

app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/api/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false
  }),
  (req, res) => {
    res.cookie('accessToken', req.user.accessToken, { expires: 0 });
    res.redirect('/');
  }
);

app.get('/api/auth/logout', (req, res) => {
  req.logout();
  res.clearCookie('accessToken');
  res.redirect('/');
});

app.get('/api/me',
  passport.authenticate('bearer', { session: false }),
  (req, res) => res.json({
    googleId: req.user.googleId,
    displayName: req.user.displayName
  })
);

app.get("/api/:id", (req, res) => {
  GiftList.findById(req.params.id)
    .exec()
    .then(giftlist => {
      if(!giftlist) {
        return res.status(400).send()
      }
      res.json(giftlist.apiRepr())
      console.log('giftlist ->', giftlist)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({error: "Internal server error"})
    })
})

app.post('/api/addGiftList', (req, res) => {
  let {title} = req.body
  console.log('post giftlist ->', req.body)
  GiftList
    .create({
      title: req.body.title
    })
    .then(giftlist => {
      console.log(giftlist)
      return res.status(201).json(giftlist)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({message: 'internal server error'})
    })
})

app.post('/api/:id/addGiftItem', (req, res) => {
  let { name, url, note } = req.body
  console.log('post giftlistitem ->', req.body)
  GiftItem
    .create({
      name: req.body.name,
      url: req.body.url,
      note: req.body.note
    })
    .then(giftlistitem => {
      console.log(giftlistitem)
      res.status(201).json(giftlistitem)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({message: 'internal server error'})
    })
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
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  console.log(databaseUrl)
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
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {
  app, runServer, closeServer
};


// API endpoints go here!
app.get("/api/users", (req, res) => {
  User.find()
    .exec()
    .then(users => {
      res.json(users.map(user => user.apiRepr()))
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: "Internal server error" })
    })
})

// app.get("/api/users/:id", (req, res) => {
//   User.findById(req.params.id)
//     .exec()
//     .then(user => {
//       if (!user) {
//         return res.status(400).send()
//       }
//       res.json(user.apiRepr())
//     })
//     .catch(err => {
//       console.error(err)
//       return res.status(500).json({ error: "Internal server error" })
//     })
// })

// app.get("/api/users/:id/:index", (req, res) => {
//   User.findById(req.params.id)
//     .exec()
//     .then(index => {
//       if (!index) {
//         return res.status(400).send()
//       }
//       return res.send(index.giftlist[req.params.index]) 
//     })
//     .catch(err => {
//       console.error(err)
//       return res.status(500).json({ error: "Internal server error" })
//     })
// })

// app.post("/api/users", (req, res) => {
//   let {user, email, password, birthday, giftlist} = req.body
//   console.log('post user ->', req.body)
//   if(!req.body) {
//     return res.status(400).json({message: 'no request body.'})
//   }
//   if(!('user' in req.body)) {
//     return res.status(422).json({message: 'missing field: user'})
//   }
//   if(typeof user !== 'string') {
//     return res.status(422).json({message: 'incorrect field type: user'})
//   }
//   if(user === '') {
//     return res.status(422).json({message: 'incorrect field length: user'})
//   }
//   if(!(password)) {
//     return res.status(422).json({message: 'missing field: password'})
//   }
//   if(typeof password !== 'string') {
//     return res.status(422).json({message: 'incorrect field type: password'})
//   }
//   if(password === '') {
//     return res.status(422).json({message: 'incorrect field length: password'})
//   }
//   User
//     .find({username})
//     .count()
//     .exec()
//     .then(count => {
//       if(count > 0) {
//         return res.status(400).json({message: 'user taken'})
//       }
//       return User.hashPassword(password)
//     })
//     .then(hash => {
//       return User
//       .create({
//         user: user.trim(),
//         email: email,
//         password: hash,
//         birthday: birthday,
//         giftlist: giftlist
//       })
//       console.log(password)
//     })
//   //   .create({
//   //   user: req.body.user,
//   //   email: req.body.email,
//   //   password: req.body.password,
//   //   birthday: req.body.birthday,
//   //   giftlist: req.body.giftlist
//   // })
//     .then(user => {
//       console.log(user)
//       res.status(201).json(user.apiRepr())
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json({ message: "Internal server error" })
//     })
// })

// app.patch("/api/users/:id/add", (req, res) => {
//   console.log(req.body)
//   User.findByIdAndUpdate(
//     req.params.id,
//     { $push: { giftlist: { name: req.body.name, purchased: false, editing: false } } },
//     { new: true }
//   )
//     .then(updatedUser => res.status(201).json(updatedUser.apiRepr()))
//     .catch(err => res.status(500).json({ message: "internal server error" }))
// })

// app.patch("/api/users/:id/:index", (req, res) => {
//   User.findById(req.params.id)
//     .exec()
//     .then(index => {
//       if (!index) {
//         return res.status(400).send()
//       }
//       index.giftlist[req.params.index] = req.body
//       User.update(
//         { _id: req.params.id },
//         { $set: { giftlist: index.giftlist } },
//         function(err) {
//           // index.save(function(err){
//           if (err) return res.status(500).send()
//           console.log(req.body)
//           console.log(res.body)
//           return res.send(index.giftlist[req.params.index])
//         }
//       )
//   })
// })

// app.delete("/api/users/:id", (req, res) => {
//   User.findByIdAndRemove(req.params.id)
//     .exec()
//     .then(() => {
//       res.status(204).json({ message: "success" })
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json({ error: "internal server error" })
//     })
// })

// app.put("/api/users/:id", (req, res) => {
//   const updated = {}
//   const updateableFields = ["user", "email", "giftlist", "birthday"]
//   updateableFields.forEach(field => {
//     if (field in req.body) {
//       updated[field] = req.body[field]
//     }
//   })
//   User.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
//     .exec()
//     .then(updatedUser => res.status(201).json(updatedUser.apiRepr()))
//     .catch(err => res.status(500).json({ message: "internal server error" }))
// })

// // Serve the built client
// app.use(express.static(path.resolve(__dirname, "../client/build")))

// // Unhandled requests which aren't for the API should serve index.html so
// // client-side routing using browserHistory can function
// app.get(/^(?!\/api(\/|$))/, (req, res) => {
//   const index = path.resolve(__dirname, "../client/build", "index.html")
//   res.sendFile(index)
// })

// let server
// function runServer(port = PORT, databaseUrl = DATABASE_URL) {
//   console.log(databaseUrl)
//   return new Promise((resolve, reject) => {
//     mongoose.connect(databaseUrl, err => {
//       if (err) {
//         return reject(err)
//       }
//       server = app
//         .listen(port, () => {
//           console.log(`Your app is listening on port ${port}`)
//           resolve()
//         })
//         .on("error", err => {
//           mongoose.disconnect()
//           reject(err)
//         })
//     })
//   })
// }

// function closeServer() {
//   return mongoose.disconnect().then(() => {
//     return new Promise((resolve, reject) => {
//       server.close(err => {
//         if (err) {
//           return reject(err)
//         }
//         resolve()
//       })
//     })
//   })
// }

// if (require.main === module) {
//   runServer()
// }

// module.exports = {
//   app,
//   runServer,
//   closeServer
// }
