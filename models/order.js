// const { Sequelize } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'order',
    {
      po_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      item: {
        type: DataTypes.STRING,
        allowNull: false
      },
      po_received: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      po_due_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      est_ship_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      tracking_number: {
        type: DataTypes.STRING,
        allowNull: true
      },
      supplier_number: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      underscored: true
    }
  );

  Order.associate = (models) => {
    // Had to update this in order to get the FK to update
    // Order.belongsTo(models.supplier, { foreignKey: 'supplier_id' });
    Order.belongsTo(models.supplier_map_login);
  };

  return Order;
};

// select from orders
// join on supplier_map_login
// where users =  authtenicated user
