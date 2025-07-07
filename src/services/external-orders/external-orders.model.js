// src/models/external-orders.model.js
// or src/services/external-orders/external-orders.model.js

// Example for Sequelize
module.exports = function (app) {
  const Sequelize = app.get('sequelizeClient');
  const externalOrders = Sequelize.define('external_orders', {
    orderId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    crew: {
      type: Sequelize.STRING,
      allowNull: false
    },
    items: {
      type: Sequelize.JSONB, // or Sequelize.JSON
      allowNull: false
    },
    total: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    orderedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    // options
    tableName: 'external_orders',
    timestamps: true
  });

  return externalOrders;
};