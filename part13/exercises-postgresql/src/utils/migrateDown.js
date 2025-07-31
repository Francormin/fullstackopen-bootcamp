const { Umzug, SequelizeStorage } = require("umzug");
const { sequelize } = require("./db");

const migrator = new Umzug({
  migrations: {
    glob: "migrations/*.js"
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console
});

const revertMigration = async () => {
  try {
    await sequelize.authenticate();
    const migration = await migrator.down(); // Revierte la última migración
    console.log("Migration reverted:", migration[0].name);
    await sequelize.close();
  } catch (error) {
    console.error("Revert failed:", error);
    process.exit(1);
  }
};

revertMigration();
