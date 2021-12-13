const request = require("request");

const fetchTopHeadline = (apiKey, callback) => {
  const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
  request({ url, json: true }, (err, { body }) => {
    callback(body);
  });
};

module.exports = fetchTopHeadline;
