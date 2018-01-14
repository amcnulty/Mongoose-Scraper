const express = require('express');
const router = express.Router();

const pageScraper = require('../logic/pageScraper');
const articleHelper = require('../logic/articleHelper');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Grab all articles and send to hbs
  articleHelper.findAll(function(err, articles) {
    if (err) throw err;
    res.render('index', {
      title: 'Mongoose Scraper',
      articles: articles
    });
  });
});

router.put('/scrape', function(req, res, next) {
  pageScraper.scrapeData(function(err, data) {
    if (err) {
      throw err;
      res.status(500).end();
    }
    else {
      articleHelper.insertRecords(data, function(err, numOfRecords) {
        if (err) {
          throw err;
          res.status(500).end();
        }
        else res.status(200).send({numOfRecords: numOfRecords}).end();
      });
    }
  });
});

module.exports = router;
