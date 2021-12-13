const request = require("request");

const fetchWithKeyword = async (apiKey, q, callback) => {
  const requestURL = `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${q}`;
  request.get({ url: requestURL, json: true }, (err, { body }) => {
    callback(body);
  });
};
module.exports = fetchWithKeyword;
