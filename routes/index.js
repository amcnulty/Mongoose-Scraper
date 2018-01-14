const express = require('express');
const router = express.Router();

const pageScraper = require('../logic/pageScraper');
const articleHelper = require('../logic/articleHelper');

/* GET home page. */
router.get('/', function(req, res, next) {
  articleHelper.findAll(function(err, articles) {
    if (err) throw err;
    res.render('index', {
      title: 'Mongoose Scraper',
      articles: articles
    });
  });
});

router.get('/saved', function(req, res, next) {
  // Get all saved articles and return to the view
  articleHelper.findSaved(function(err, articles) {
    if (err) throw err;
    res.render('saved', {
      title: 'Mongoose Scraper | Saved Articles',
      articles: articles
    });
  });
});

router.put('/save-article', function(req, res, next) {
  // Save article by its id
  articleHelper.save(req.body.id, function(err, numAffected) {
    if (err) {
      throw err;
      req.status(500).end();
    }
    else if (numAffected === 0) res.status(404).end();
    else res.status(200).end();
  });
});

router.put('/remove-from-saves', function(req, res, next) {
  articleHelper.removeFromSaves(req.body.id, function(err, numAffected) {
    if (err) {
      throw err;
      req.status(500).end();
    }
    else if (numAffected === 0) res.status(404).end();
    else res.status(200).end();
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
