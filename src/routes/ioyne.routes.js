// BACKEND ROUTES AND CALL TO CONTROLLERS

const { Router } = require('express');
const router = Router();

//---------------------------------------IMPORT-CONTROLLERS------------------------------------//

// CLIENTS CONTROLLERS
const {
  createClient,
  getAllClients,
  editClient
} = require('../controllers/clients.controllers');


// DB CONTROLLERS
//const { } = require('../controllers/db.controllers')  

// PRODUCTS CONTROLLERS
const {
  createProduct,
  getAllProducts,
  editProduct
} = require('../controllers/products.controllers');

//QUOTATIONS CONTROLLERS
const { getAllQuotations } = require('../controllers/quotations.controlers')

// USERS CONTROLLERS
const {
  createUser,
  getAllUsers,
  editUser
} = require('../controllers/users.controllers')


//---------------------------------------------ROUTES----------------------------------------//


// CLIENTS ROUTES
// create a client
router.post('/clients', createClient)
// get all clients
router.get('/clients', getAllClients)
// edit a client
router.put('/clients/:id', editClient)


// DB ROUTES


// PRODUCTS ROUTES
// create a product
router.post('/products', createProduct)
// get all products
router.get('/products', getAllProducts)
// edit a prodcut
router.put('/products/:id', editProduct)


// QUOTATIONS ROUTES
// get all quotations
router.get('/quotations', getAllQuotations)



// USERS ROUTES
// create a user
router.post('/users', createUser)
// get all users
router.get('/users', getAllUsers)
// edit user
router.put('/users/:id', editUser)


module.exports = router;