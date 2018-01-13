const express = require('express');
const router = express.Router();

const pageScraper = require('../logic/pageScraper');
const articleHelper = require('../logic/articleHelper');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Mongoose Scraper'
  });
});

router.get('/scrape', function(req, res, next) {
  pageScraper.scrapeData(function(err, data) {
    if (err) {
      throw err;
      res.status(500).end();
    }
    else {
      articleHelper.insertRecords(data, function(err) {
        if (err) {
          throw err;
          res.status(500).end();
        }
        else res.status(200).send(data).end();
      });
    }
  });
});

module.exports = router;
