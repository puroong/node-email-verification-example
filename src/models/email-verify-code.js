const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class EmailVerifyCode extends Model {};
EmailVerifyCode.init({
	id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
	userId: { type: DataTypes.INTEGER, allowNull: false },
	code: { type: DataTypes.STRING, allowNull: false }
}, { sequelize });

module.exports = EmailVerifyCode;
