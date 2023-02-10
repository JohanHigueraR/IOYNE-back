const pool = require("../db");

const getAllQuotations = async (req, res, next) => {

    try {
        const result = await pool.query(`
                  SELECT 
                      quotations.qu_ident, 
                      TO_CHAR(quotations.qu_created, 'DD-MM-YYYY'),
                      quotations.qu_value,
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

const createQuotation = async (req, res, next) => {

    const { qu_ident, user_id, client_id } = req.body;

    try {

        const result = await pool.query(
            `INSERT INTO quotations (qu_ident, user_id, client_id) VALUES ($1, $2, $3)`
            , [qu_ident, user_id, client_id]
        )

        res.json(result.rows)

    } catch (error) {
        next(error)
    }
}


const getIdentQuotation = async (req, res, next) => {

    try {
        const result = await pool.query(`
                  SELECT qu_ident FROM quotations 
                  ORDER BY qu_ident DESC LIMIT 1
                  `
        )
        res.json(result.rows)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAllQuotations,
    createQuotation,
    getIdentQuotation
}