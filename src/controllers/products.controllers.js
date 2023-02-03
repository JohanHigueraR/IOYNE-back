const pool = require("../db");

const createProduct = async (req, res, next) => {
  // Create a product

  const { pd_name, pd_description, pd_price} = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO products (pd_name, pd_description, pd_price) 
      VALUES ($1, $2, $3) RETURNING *`,
      [pd_name, pd_description, pd_price]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  // get all the products

  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const editProduct = async (req, res, next) => {
  // Obtiene un estudiante por id

  try {
    const { id } = req.params;
    const { pd_name, pd_description, pd_price } = req.body;

    const result = await pool.query(
      "UPDATE products SET pd_name = $1, pd_description = $2, pd_price = $3 WHERE product_id = $4",
      [pd_name, pd_description, pd_price, id]
    );

    return res.json(result.rows[0]);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  editProduct,
};
