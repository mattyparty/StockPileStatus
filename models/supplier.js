module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define(
    'supplier',
    {
      // supplier_number: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false
      // },

      supplier_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { underscored: true }
  );
  // added association - mlp

  Supplier.associate = (models) => {
    // Supplier.hasMany(models.order);
    Supplier.hasMany(models.supplier_map_login);
  };
  return Supplier;
};
