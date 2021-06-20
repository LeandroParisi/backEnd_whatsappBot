'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Promotions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        branchId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Branches',
            key: 'id'
          }
        },
        totalPrice: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        // startDate: {
        //   type: Sequelize.DATE,
        // },
        dueDate: {
          type: Sequelize.DATE,
        },
        avaiability: {
          allowNull: true,
          type: Sequelize.ARRAY(Sequelize.ENUM(
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday'
            )
          )
        },
        isActive: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now'),
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now'),
        },
      }, { transaction });

      await transaction.commit();

    } catch(error) {
      await transaction.rollback();
      throw error
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Promotions');
  }
};
