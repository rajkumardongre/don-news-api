// const path = require('path')
const express = require("express");
const https = require('https')


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/api/v1", (req, res) => {
  const query = req.query;
  if (query.apiKey) {
    const apiKey = query.apiKey;
    if (query.q) {
      const q = query.q;
      const userAgent = req.get('user-agent');
      const options = {
          host: 'newsapi.org',
          path : `/v2/everything?apiKey=${apiKey}&q=${q}`,
          headers: {
              'User-Agent': userAgent
          }
      }
      https.get(options, function (response) {
          let data;
          response.on('data', function (chunk) {
              if (!data) {
                  data = chunk;
              }
              else {
                  data += chunk;
              }
          });
          response.on('end', function () {
              const newsData = JSON.parse(data);
              res.send(newsData)
              // console.log(newsData);
          });
      });
      // fetchWithKeyword(apiKey, q, (data) => {
      //   res.json(data);
      // });
    } else if (query.country && query.category) {
      const userAgent = req.get('user-agent');
      const options = {
          host: 'newsapi.org',
          path: `/v2/top-headlines?country=${query.country}&apiKey=${apiKey}&category=${query.category}`,
          headers: {
              'User-Agent': userAgent
          }
      }
      https.get(options, function (response) {
          let data;
          response.on('data', function (chunk) {
              if (!data) {
                  data = chunk;
              }
              else {
                  data += chunk;
              }
          });
          response.on('end', function () {
              const newsData = JSON.parse(data);
              res.send(newsData)
              // console.log(newsData);
          });
      });
      // newsWithKeywordCountry(apiKey, query.country, query.category, (data) => {
      //   res.json(data);
      // });
    } else {
      // console.log(query);
      // res.json({ message: "In Progress" });
      const userAgent = req.get('user-agent');
      const options = {
          host: 'newsapi.org',
          path: `/v2/top-headlines?country=in&apiKey=${apiKey}`,
          headers: {
              'User-Agent': userAgent
          }
      }
      https.get(options, function (response) {
          let data;
          response.on('data', function (chunk) {
              if (!data) {
                  data = chunk;
              }
              else {
                  data += chunk;
              }
          });
          response.on('end', function () {
              const newsData = JSON.parse(data);
              // console.log(newsData);
              res.send(newsData)
          });
      });
      // res.send("hello");
      // fetchTopHeadline(apiKey, (data) => {
      //   res.json(data);
      // });
    }
  } else {
    res.json({ error: "api key required" });
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
