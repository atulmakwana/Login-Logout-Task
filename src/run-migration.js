const { Umzug, SequelizeStorage } = require('umzug');
const Sequelize = require('sequelize');



const sequelize = new Sequelize('users_db', 'root', '', {
  host: 'localhost',
  dialect: 'postgres',
  port:26261,
  dialectOptions: {
    SSL:{
      rejectUnauthorized:false
    }
  }
});


const umzug = new Umzug({
  migrations: { glob: './migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

async function migrate() {
  try {
    await umzug.up();
  } 
  catch (error) {
  }
}

migrate();