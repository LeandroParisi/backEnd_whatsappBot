module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Branches', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        userId: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        managerName: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        branchName: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        countryId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Countries',
            key: 'id',
          },
          onUpdate: 'CASCADE',
        },
        stateId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'States',
            key: 'id',
          },
          onUpdate: 'CASCADE',
        },
        cityId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Cities',
            key: 'id',
          },
          onUpdate: 'CASCADE',
        },
        neibourhood: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        street: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        streetNumber: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        streetComplement: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        postalCode: {
          allowNull: false,
          type: Sequelize.STRING,
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
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Branches');
  },
};
