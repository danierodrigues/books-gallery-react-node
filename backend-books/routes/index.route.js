var express = require('express');
var router = express.Router();
var { getBooks, getBookById, getCategoriesFilters, createBook } = require('../controllers/books.controller')
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({'home':'home'});
});

router.get('/books', getBooks);
router.get('/books/book/:id', getBookById);
router.get('/books/categoriesFilters', getCategoriesFilters);
router.post('/books/create', createBook);

module.exports = router;
