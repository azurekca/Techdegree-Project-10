'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  
  Course.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'title_Title is required' },
        notEmpty: { msg: 'title_Title is required' }
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'description_Description is required' },
        notEmpty: { msg: 'description_Description is required' }
      }
    },
    estimatedTime: {
      type: Sequelize.STRING,
      allowNull: true
    },
    materialsNeeded: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, { sequelize });

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Course;
}