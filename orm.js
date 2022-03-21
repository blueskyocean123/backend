const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto(
   "mydb",
   "root",
   "password",
   {
      host: "127.0.0.1",
      port: "3306",
      dialect: "mysql",
      directory: "./models"
   }
);
auto.run((err)=>{
   if(err) throw err;
})