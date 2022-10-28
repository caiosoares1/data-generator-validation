import Database from '../db/database.js';
import bcrypt from 'bcryptjs';

const salt = Number(process.env.SALT);

async function signup(data) {

  console.log(data)

  const db = await Database.connect();

  const { name, email, senha, image } = data;

  const hash = bcrypt.hashSync(senha, salt);

  const { lastID } = await db.run(`
  INSERT INTO 
    user (name, image, email, senha)
  VALUES
    (?, ?, ? ,?)
  `, [ name, image, email, hash ]);

  const newUser = await read(lastID);

  delete newUser.password;

  return newUser;
};

async function signin(email){
  
  const content = email;

  if (!content){
    console.log('dados')
    return { error: 2, mensage: 'Dados incompletos!' };
  }
  
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      user
    WHERE
      email = ? 
  `;

  const result = await db.get(sql, [email]);

  return result
  
  /*if(!result){
    return { error: 1, mensage: 'E-mail ou senha incorreto(s)!' };
  } else {
    return { error: 0, name: result.name, email: result.email};
  }*/

};

async function read(id) {
  const db = await Database.connect();

  const sql = `
    SELECT 
      *
    FROM 
      user
    WHERE
      id = ?
  `;

  const user = await db.get(sql, [id]);

  return user;
}

export default { signup, signin, read }