const pool = require('../db');

const createUser = async (req, res, next) => {

  // Create a user

  const { us_name, us_lastname, us_email, us_password, us_admin = false } = req.body

  try {
    const result = await pool.query(
      `INSERT INTO users (us_name, us_lastname, us_email, us_password, us_admin) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [us_name, us_lastname, us_email, us_password, us_admin]
    )

    res.json(result.rows[0]);

  } catch (error) {
    next(error);
  };
}

const getAllUsers = async (req, res, next) => {

  // get all the clients

  try {
    const result = await pool.query('SELECT * FROM users')
    res.json(result.rows)
  } catch (error) {
    next(error)
  }
}


module.exports = {
  createUser,
  getAllUsers
}