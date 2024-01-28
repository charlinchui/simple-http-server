const express = require("express");
const functions = require("./functions");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/quotes", async (req, res) => {
  await functions.getQuotes(req, res);
});
router.get("/quotes/:id", async (req, res) => {
  await functions.getSingleQuote(req, res);
});
router.get("/quotes/author/:id", async (req, res) => {
  await functions.getQuoteByAuthor(req, res);
});
router.get("/authors", async (req, res) => {
  await functions.getAuthors(req, res);
});
router.get("/authors/:id", async (req, res) => {
  await functions.getAuthor(req, res);
});
router.post("/quotes", async (req, res) => {
  await functions.createQuote(req, res);
});
router.post("/authors", async (req, res) => {
  await functions.createAuthor(req, res);
});
router.delete("/quotes/@id", async (req, res) => {
  await functions.deleteQuote(req, res);
});
router.delete("/authors/:id", async (req, res) => {
  await functions.deleteAuthor(req, res);
});
router.patch("/authors/:id", async (req, res) => {
  await functions.updateAuthor(req, res);
});
router.patch("/quotes/:id", async (req, res) => {
  await functions.updateQuote(req, res);
});

module.exports = router;
