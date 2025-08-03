const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    // 1. Eliminar constraint existente
    await queryInterface.removeConstraint("blogs", "blogs_user_id_fkey");

    // 2. Volver a agregarla con CASCADE
    await queryInterface.addConstraint("blogs", {
      fields: ["user_id"],
      type: "foreign key",
      name: "blogs_user_id_fkey", // importante: mismo nombre que antes
      references: {
        table: "users",
        field: "id"
      },
      onDelete: "CASCADE"
    });
  },

  down: async ({ context: queryInterface }) => {
    // Revertir: quitar CASCADE y restaurar sin ella
    await queryInterface.removeConstraint("blogs", "blogs_user_id_fkey");

    await queryInterface.addConstraint("blogs", {
      fields: ["user_id"],
      type: "foreign key",
      name: "blogs_user_id_fkey",
      references: {
        table: "users",
        field: "id"
      }
      // sin onDelete
    });
  }
};
