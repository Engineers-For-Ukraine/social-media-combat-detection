module.exports = {
    HOST: "0.0.0.0",
    port: 5432,
    USER: "postgres", //change this to correct username 
    PASSWORD: "test", //change this to correct password
    DB: "testdb", //change this to correct database name
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };