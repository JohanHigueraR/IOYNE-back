const pool = require("../db");

const createProduct = async (req, res, next) => {
  // Create a product

  const { pd_name, pd_description, pd_price, pd_image } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO products (pd_name, pd_description, pd_price, pd_image) 
      VALUES ($1, $2, $3,$4) RETURNING *`,
      [pd_name, pd_description, pd_price, pd_image]
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
    const { pd_name, pd_description, pd_price, pd_image } = req.body;

    const result = await pool.query(
      "UPDATE products SET pd_name = $1, pd_description = $2,  pd_price = $3, pd_image = $4 WHERE product_id = $5",
      [pd_name, pd_description, pd_price, pd_image, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "El producto no ha sido encontrado",
      });

    return res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  editProduct,
};
