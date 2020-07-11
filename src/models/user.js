const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class User extends Model {};
User.init({
	id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
	email: { type: DataTypes.STRING, unique: true },
	verificationStatus: { type: DataTypes.ENUM('UNVERIFIED', 'VERIFIED'), defaultValue: 'UNVERIFIED' }
}, { sequelize });

module.exports = User;
