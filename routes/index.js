const express = require('express');
const router = express.Router();

const pageScraper = require('../logic/pageScraper');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Mongoose Scraper'
  });
});

router.get('/scrape', function(req, res, next) {
  console.log("Scraping Data!");
  pageScraper.scrapeData(function(data) {
    console.log(data);
    res.status(200).send(data).end();
  });
});

module.exports = router;
