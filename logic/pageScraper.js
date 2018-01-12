'use strict';

const cheerio = require('cheerio');
const request = require('request');

const urlToScrape = 'https://www.nytimes.com/';

function getArticleData(htmlToScrape) {
    const $ = cheerio.load(htmlToScrape);
    let articles = [];

    $('div.first-column-region').children('.collection').each(function(index, element) {
        const currentArticle = $(element).children('article');
        var heading, summary, link;
          if ('' !== $(currentArticle).children('.story-heading').text()) {
            heading = $(currentArticle).children('.story-heading').text();
            link = $(currentArticle).children('.story-heading').children('a').attr('href');
            if ($(currentArticle).children('.summary').text() === '') {
              summary = $(currentArticle).children('ul').text();
            }
            else {
              summary = $(currentArticle).children('.summary').text();
            }
            articles.push({
              heading: heading,
              summary: summary,
              link: link
            });
          }
    });
      // const collections = $(element).children();
      // console.log($(collections).hasClass('collection'));
        // const articleElt = $(element).children()[2];

        // const title = $(articleElt).text();
        // const link = $(articleElt).children().first().attr('href');

        // articles.push({
            // title: title,
            // link: link
        // });

    return articles;
}

function scrapeData(callback) {
    request(urlToScrape, function (error, request, body) {
        if (error) {
            callback(error);
        } else {
            const articles = getArticleData(body);
            // callback(null, articles);
            callback(articles);
        }
    });
}

module.exports = {
    scrapeData: scrapeData
}

