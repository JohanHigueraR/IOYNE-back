const pool = require("../db");

const getAllQuotations = async (req, res, next) => {

  // Obtener listado de todos las notas

  try {
      const result = await pool.query(`
                  SELECT 
                      quotations.qu_ident, 
                      quotations.qu_created,
                      users.us_name,
                      users.us_lastname, 
                      clients.cl_name,
                      clients.cl_lastname,
                      clients.cl_email
                  FROM 
                      quotations 
                  LEFT JOIN users 
                      ON quotations.user_id = users.user_id 
                  LEFT JOIN clients 
                      ON quotations.client_id = clients.client_id
                  `
      )
      res.json(result.rows)
  } catch (error) {
      next(error)
  }
}

module.exports = {
  getAllQuotations
}