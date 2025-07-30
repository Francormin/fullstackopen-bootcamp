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

const runMigrations = async () => {
  try {
    await sequelize.authenticate();
    const migrations = await migrator.up();
    console.log(
      "Migrations executed:",
      migrations.map(m => m.name)
    );
    await sequelize.close();
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

runMigrations();
