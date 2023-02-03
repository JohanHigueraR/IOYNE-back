// Create and configure backend routes

const { Router } = require('express');
const router = Router();

// CLIENTS CONTROLLERS
const {
  createClient,
  getAllClients
} = require('../controllers/clients.controllers');


// DB CONTROLLERS
//const { } = require('../controllers/db.controllers')  

// PRODUCTS CONTROLLERS
const {
  createProduct,
  getAllProducts,
  editProduct
} = require('../controllers/products.controllers');

//quotations controllers
//const { } = require('../controllers/quotations.controllers')

// USERS CONTROLLERS
const {
  createUser,
  getAllUsers
} = require('../controllers/users.controllers')


// CLIENTS ROUTES

// create a client
router.post('/clients', createClient)
// get all clients
router.get('/clients', getAllClients)




// DB ROUTES



// PRODUCTS ROUTES

// create a product
router.post('/products', createProduct)
// get all products
router.get('/products', getAllProducts)
// get a prodcut
router.put('/products/:id' , editProduct)


// QUOTATIONS ROUTES



// USERS ROUTES

// create a user
router.post('/users', createUser)
// get all users
router.get('/users', getAllUsers)


console.log()

module.exports = router;