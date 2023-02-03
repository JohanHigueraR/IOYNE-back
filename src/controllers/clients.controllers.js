const pool = require('../db');

const createClient = async (req, res, next) => {

  // Create a client

  const { cl_name, cl_lastname, cl_email, cl_ident, cl_address } = req.body

  try {
    const result = await pool.query(
      `INSERT INTO clients (cl_name, cl_lastname, cl_email, cl_ident, cl_address) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [cl_name, cl_lastname, cl_email, cl_ident, cl_address]
    )

    res.json(result.rows[0]);

  } catch (error) {
    next(error);
  };
}

const getAllClients = async (req, res, next) => {

  // get all the clients

  try {
    const result = await pool.query('SELECT * FROM clients')
    res.json(result.rows)
  } catch (error) {
    next(error)
  }
}

const editClient = async (req, res, next) => {
  // Obtiene un estudiante por id

  try {
    const { id } = req.params;
    const { cl_name, cl_lastname, cl_email, cl_ident, cl_address } = req.body;

    const result = await pool.query(
      "UPDATE clients SET cl_name = $1, cl_lastname = $2,  cl_email = $3, cl_ident = $4, cl_address = $5 WHERE client_id = $6",
      [cl_name, cl_lastname, cl_email, cl_ident, cl_address, id]
    );

    return res.json(result.rows[0]);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createClient,
  getAllClients,
  editClient
}