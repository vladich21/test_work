<<<<<<< HEAD
module.exports = {
    development: {
      username: process.env.DB_USERNAME || process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      host: process.env.HOST,
      port: parseInt(process.env.PORT || '3306', 10),
      dialect: 'mysql'
    },
    test: {
      username: process.env.DB_USERNAME || process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      host: process.env.HOST,
      port: parseInt(process.env.PORT || '3306', 10),
      dialect: 'mysql'
    },
    production: {
      username: process.env.DB_USERNAME || process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      host: process.env.HOST,
      port: parseInt(process.env.PORT || '3306', 10),
      dialect: 'mysql'
    }
=======
module.exports = {
    development: {
      username: process.env.DB_USERNAME || process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      host: process.env.HOST,
      port: parseInt(process.env.PORT || '3306', 10),
      dialect: 'mysql'
    },
    test: {
      username: process.env.DB_USERNAME || process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      host: process.env.HOST,
      port: parseInt(process.env.PORT || '3306', 10),
      dialect: 'mysql'
    },
    production: {
      username: process.env.DB_USERNAME || process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      host: process.env.HOST,
      port: parseInt(process.env.PORT || '3306', 10),
      dialect: 'mysql'
    }
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
  }