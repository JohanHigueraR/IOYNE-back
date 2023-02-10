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

const createFinalQuotation = async (req, res, next) => {

    const { qu_value, qu_ident } = req.body;

    try {

        const result = await pool.query(
            `UPDATE quotations SET qu_value = $1 WHERE qu_ident = $2`
            , [qu_value, qu_ident]
        );

        return res.json(result.rows[0])

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

        return res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}


const getQuotationForEdit = async (req, res, next) => {

    const { qu_ident } = req.body;
   
    try {
        const result = await pool.query(`
        SELECT 	
        quotations.client_id,
        clients.cl_name,
        clients.cl_lastname,
        clients.cl_email,
		requested_products.quantity,
		products.pd_name,
		products.pd_price
        FROM quotations 
        LEFT JOIN clients 
        ON quotations.client_id = clients.client_id
        LEFT JOIN requested_products 
        ON   quotations.qu_ident = requested_products.qu_ident
        LEFT JOIN products
        ON requested_products.product_id = products.product_id
        WHERE quotations.qu_ident = $1`, [qu_ident]          
        )

        res.json(result.rows)

    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAllQuotations,
    createQuotation,
    getIdentQuotation,
    createFinalQuotation,
    getQuotationForEdit
}