const Sequelize=require('sequelize');

module.exports = {
    up: async ({ context:queryInterface }) => {
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.UUID,
          primaryKey:true,
          defaultValue:Sequelize.literal("gen_random_uuid()")
        },
        user_email: {
          type: Sequelize.TEXT,
          allowNull:false,
          unique:true,
        },
        password:{
          type:Sequelize.TEXT,
          allowNull:false
        }
        
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.sequelize.query(
        `drop table users cascade;`
      );},
  };