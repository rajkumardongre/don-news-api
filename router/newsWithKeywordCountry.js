const request = require("request");

const newsWithKeywordCountry = (apiKey, country, category, callback) => {
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&category=${category}`;
  request({ url, json: true }, (err, { body }) => {
    callback(body);
  });
};

module.exports = newsWithKeywordCountry;
