import express from 'express'
import user from './user.js'
import products from './products.js'
import orders from './order.js'

const router = express.Router()

router.use('/users', user)
router.use('/products', products)
router.use('/order', orders)

export default router;