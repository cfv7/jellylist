module.exports.DATABASE_URL= process.env.DATABASE_URL || global.DATABASE_URL ||
`mongodb://colin:colin123@ds163010.mlab.com:63010/jellylistdb01` || `mongodb://localhost/jellylist`;

exports.PORT = process.env.PORT || 3001;


