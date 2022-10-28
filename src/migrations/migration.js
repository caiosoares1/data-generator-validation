import Database from '../db/database.js'

async function up() {
  const db = await Database.connect();

  await db.run(`
    CREATE TABLE IF NOT EXISTS domain (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      domain TEXT(12)
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS pass (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pass TEXT(20)
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS email (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT(30),
      domain_domain TEXT(10),
      FOREIGN KEY (domain_domain) REFERENCES domain (domain)
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS cpf (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cpf TEXT(20)
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS cnpj (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cnpj TEXT(20) 
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      name TEXT(80) NOT NULL,
      image VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      senha VARCHAR(20) NOT NULL CHECK(LENGTH(senha) >= 8)
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS generated (
      id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      userid INTEGER NOT NULL,
      username TEXT(80) NOT NULL,
      data VARCHAR (1000) NOT NULL
    )
  `);
};

export default { up };