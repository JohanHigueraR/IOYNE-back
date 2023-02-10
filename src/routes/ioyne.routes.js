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

// REQUESTED PRODUCT CONTROLLERS

const { createReqProduct } = require('../controllers/requested_products.controllers');


//QUOTATIONS CONTROLLERS
const {
  getAllQuotations,
  getIdentQuotation,
  createQuotation,
  createFinalQuotation
} = require('../controllers/quotations.controlers');


// USERS CONTROLLERS
const {
  createUser,
  getAllUsers,
  editUser,
  getLoggedUser
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

// REQUESTED PRODUCTS
//  create requested product
router.post('/requestedproduct', createReqProduct)


// QUOTATIONS ROUTES
// get all quotations
router.get('/quotations', getAllQuotations)
// get biggest qu_ident
router.get('/quotations/ident', getIdentQuotation)
// create quotations
router.post('/quotations', createQuotation)
// create final quotation
router.put('/quotations', createFinalQuotation)



// USERS ROUTES
// create a user
router.post('/users', createUser)
// get all users
router.get('/users', getAllUsers)
// edit user
router.put('/users/:id', editUser)
// validate logged user
router.put('/login', getLoggedUser)


module.exports = router;