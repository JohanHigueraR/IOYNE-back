const pool = require('../db');

const createUser = async (req, res, next) => {

  // Create a user

  var admin = null
  const { us_name, us_lastname, us_email, us_password, us_admin } = req.body

  us_admin === "administrador" ? admin = true : admin = false

  try {
    const result = await pool.query(
      `INSERT INTO users (us_name, us_lastname, us_email, us_password, us_admin) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [us_name, us_lastname, us_email, us_password, admin]
    )

    res.json(result.rows[0]);

  } catch (error) {
    next(error);
  };
};


const getAllUsers = async (req, res, next) => {

  // get all the users

  try {
    const result = await pool.query('SELECT * FROM users')
    res.json(result.rows)
  } catch (error) {
    next(error)
  }
};


const editUser = async (req, res, next) => {

  // edit user

  try {

    var admin = null
    const { id } = req.params;
    const { us_name, us_lastname, us_email, us_password, us_admin } = req.body

    us_admin === "administrador" ? admin = true : admin = false

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


module.exports = {
  createUser,
  getAllUsers,
  editUser
}