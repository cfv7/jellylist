module.exports.DATABASE_URL= process.env.DATABASE_URL || global.DATABASE_URL || 
`mongodb://${process.env.USER_NAME}:${process.env.PASSWORD}@ds163010.mlab.com:63010/jellylist` || `mongodb://localhost/jellylist`;

exports.PORT = process.env.PORT || 3001;