const datasourceUrl = 'sqlite::memory:';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(datasourceUrl, { force: true });

module.exports = sequelize;
