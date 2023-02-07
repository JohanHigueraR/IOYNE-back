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
var error = "";
const getLoggedUser = async (req, res, next) => {
  var SHA1 = new Hashes.SHA1();
  var logged = false;
  var user = "User not found";
  try {
    const { us_email, us_password } = req.body;
    const login = await pool.query("SELECT * FROM users");
    if (loginAttempt === 3) {   
      bloqueados.push(us_email);
      error = "Cuenta bloqueada por 2 horas";
      setTimeout(() => {
        const index = bloqueados.indexOf(us_email);
        bloqueados.splice(index, 1);
        error = "";
      }, 72000000);
      res.json("cuenta bloqueada por dos horas")
    }
    login.rows.map((row) => {
      if (us_email == row.us_email && !bloqueados.includes(us_email)) {
        if (row.us_password == SHA1.hex(us_password)) {
          logged = true;
          user = row;
          res.json(user);
        } else {
          loginAttempt++;
          res.json("errores" + loginAttempt);
        }
        console.log("Errores: " + loginAttempt);
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
