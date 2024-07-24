const express = require('express');

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
} = require('./../schemas/products.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', validatorHandler(queryProductSchema, 'query'),async (req, res, next) => {
  try{

    const products = await service.find(req.query);
    res.json(products);
  } catch(error){
    next(error)
  }
});

router.get('/filter', async (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', 
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try{
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json({
        message: 'created',
        data: newProduct,
      });

    } catch(err){
      next(err)
    }
});

router.patch('/:id', 
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
