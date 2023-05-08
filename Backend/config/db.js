const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    'VueJS_CRUD',
    'root',
    'batuan2002', {
      dialect: 'mysql',
      host: 'localhost'
    }
);

const connectToDb = async () => {
  try {
        await sequelize.authenticate();
        console.log("Successfully connected to database!!");
  }
  catch(error){
        console.log(error);
  }
};

module.exports = {
  sequelize,
  connectToDb
}