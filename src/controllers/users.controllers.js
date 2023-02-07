const pool = require("../db");
var Hashes = require("jshashes");

const createUser = async (req, res, next) => {
  // Create a user

  var admin = null;
  const { us_name, us_lastname, us_email, us_password, us_admin } = req.body;

  us_admin === "administrador" ? (admin = true) : (admin = false);

  try {
    const result = await pool.query(
      `INSERT INTO users (us_name, us_lastname, us_email, us_password, us_admin) 
      VALUES ($1, $2, $3, encode(digest($4, 'sha1'), 'hex'), $5) RETURNING *`,
      [us_name, us_lastname, us_email, us_password, admin]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  // get all the users

  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  // edit user

  try {
    var admin = null;
    const { id } = req.params;
    const { us_name, us_lastname, us_email, us_password, us_admin } = req.body;

    us_admin === "administrador" ? (admin = true) : (admin = false);

    const result = await pool.query(
      `UPDATE users SET us_name = $1, us_lastname= $2, us_email= $3,
       us_password= $4, us_admin= $5 WHERE user_id = $6`,
      [us_name, us_lastname, us_email, us_password, admin, id]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

var loginAttempt = 0;
var bloqueados = [];


const getLoggedUser = async (req, res, next) => {

  var SHA1 = new Hashes.SHA1();

  try {
    const { us_email, us_password } = req.body;
    const users = await pool.query("SELECT * FROM users");
    setTimeout(() => {
      loginAttempt=0
    }, 120000);

    if (loginAttempt === 3) {   
      bloqueados.push(us_email);
      
      setTimeout(() => {
        const index = bloqueados.indexOf(us_email);
        bloqueados.splice(index, 1);
      }, 72000000);
      

      res.json("cuenta bloqueada por dos horas")
    }

    users.rows.map((row) => {
      if (us_email == row.us_email && !bloqueados.includes(us_email)) {
        if (row.us_password == SHA1.hex(us_password)) {
          var loggedUser = row;
          res.json(loggedUser);
        } else {
          loginAttempt++;
          res.json("contraseña incorrecta");
        }
      }
    });

  } catch (error) {
    res.json({ error: error.message });
    console.log({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  editUser,
  getLoggedUser,
};
