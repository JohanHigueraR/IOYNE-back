const pool = require("../db");

const createReqProduct = async (req, res, next) => {
  // Create a product


  const { qu_ident, product_id, quantity} = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO requested_products (qu_ident, product_id, quantity) 
      VALUES ($1, $2, $3) RETURNING *`,
      [qu_ident, product_id, quantity]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
const deleteReqProduct = async (req, res, next) => {
  // Create a product
  const { qu_ident, product_id} = req.body;
  try {
    const result = await pool.query('DELETE FROM requested_products WHERE qu_ident= $1 AND product_id= $2 RETURNING *',
      [qu_ident, product_id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createReqProduct,
  deleteReqProduct
}