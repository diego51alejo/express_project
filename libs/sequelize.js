const { Sequelize } = require('sequelize')

const { config } = require('./../config/config');
// const setupModels = require('./../db/models');


// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// const sequelize = new Sequelize(URI,{
//     host: '127.0.0.1',
//     dialect: 'postgres',
//     logging: true,

// })

// setupModels(sequelize)

const options = {
    dialect: config.dbEngine,
    logging: config.isProd? false : true
}
if(config.isProd){
    options.dialectModule = require('pg')
}

module.exports = new Sequelize(config.dbUrl, options)