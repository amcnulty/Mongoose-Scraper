'use strict';

const cheerio = require('cheerio');
const request = require('request');

const urlToScrape = 'https://www.nytimes.com/';

function getArticleData(htmlToScrape) {
  const $ = cheerio.load(htmlToScrape);
  let articles = [];
  $('div.first-column-region').children('.collection').each(function (index, element) {
    const currentArticle = $(element).children('article');
    var heading, summary, link;
    if ('' !== $(currentArticle).children('.story-heading').text()) {
      heading = $(currentArticle).children('.story-heading').text();
      link = $(currentArticle).children('.story-heading').children('a').attr('href');
      if ($(currentArticle).children('.summary').text() === '') {
        summary = $(currentArticle).children('ul').text();
      } else {
        summary = $(currentArticle).children('.summary').text();
      }
      // Check that heading and summary are not empty strings
      if (heading !== '' && summary !== '') {
        articles.push({
          heading: heading,
          summary: summary,
          link: link
        });
      }
    }
  });
  return articles;
}

function scrapeData(callback) {
  request(urlToScrape, function (error, request, body) {
    if (error) {
      callback(error);
    } else {
      const articles = getArticleData(body);
      callback(null, articles);
    }
  });
}

module.exports = {
  scrapeData: scrapeData
}