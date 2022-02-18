const express = require('express')
const router = express.Router()

const dataController = require('../controllers/dataController');

router.get('/GET',dataController.getProduct)
router.get('/get/:id',dataController.getProductById)

router.post('/post',dataController.addProduct)
router.patch('/put/:id',dataController.updateProduct)

// router.delete('/',dataController.deleteProduct)
router.delete('/delete/:id',dataController.deleteProductById)

module.exports = router;