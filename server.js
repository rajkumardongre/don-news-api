// const path = require('path')
const express = require("express");

const fetchWithKeyword = require(`${__dirname}/router/fetchWithKeyword.js`);
const fetchTopHeadline = require(`${__dirname}/router/fetchTopHeadline.js`);
const newsWithKeywordCountry = require(`${__dirname}/router/newsWithKeywordCountry.js`);

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
      fetchWithKeyword(apiKey, q, (data) => {
        res.json(data);
      });
    } else if (query.country && query.category) {
      newsWithKeywordCountry(apiKey, query.country, query.category, (data) => {
        res.json(data);
      });
    } else {
      // console.log(query);
      // res.json({ message: "In Progress" });
      fetchTopHeadline(apiKey, (data) => {
        res.json(data);
      });
    }
  } else {
    res.json({ error: "api key required" });
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
