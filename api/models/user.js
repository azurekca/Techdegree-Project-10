'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  
  User.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'firstName_First Name is required' },
        notEmpty: { msg: 'firstName_First Name is required' }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'lastName_Last Name is required' },
        notEmpty: { msg: 'lastName_Last Name is required' }
      }
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'emailAddress_Email address already in use'
      },
      validate: {
        notNull: { msg: 'emailAddress_Email is required' },
        notEmpty: { msg: 'emailAddress_Email is required' },
        isEmail: {
          args: true,
          msg: 'emailAddress_A valid email is required'
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'password_Password is required' },
        notEmpty: { msg: 'password_Password is required' }
      }
    }
  }, { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return User;
};