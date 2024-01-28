const con = require("./db.con");

const queryDB = async (query, params = []) => {
  try {
    const data = await con.promise().query(query, params);
    return data[0];
  } catch (e) {
    throw e;
  }
};

module.exports = {
  //Get all quotes
  getQuotes: async function (req, res) {
    try {
      results = await queryDB(
        `SELECT value, name, last_name FROM  ${process.env.DB_NAME}.Quotes INNER JOIN Authors ON Authors.id = Quotes.author;`,
      );
      const quotes = results.map((result) => ({
        quote: result.value,
        author: result.name.concat(" ", result.last_name),
      }));
      res.status(202).json({
        quotes: quotes,
      });
    } catch (e) {
      res.status(500).json({
        error: e,
      });
    }
  },
  //Get single quote
  getSingleQuote: async function (req, res) {
    try {
      const id = req.params.id;
      result = await queryDB(
        `SELECT value, name, last_name FROM  ${process.env.DB_NAME}.Quotes INNER JOIN Authors ON Authors.id = Quotes.author WHERE ${process.env.DB_NAME}.Quotes.id = ?;`,
        [id],
      );
      const quote = {
        quote: result[0].value,
        author: result[0].name.concat(" ", result[0].last_name),
      };
      res.status(202).json({
        quote,
      });
    } catch (e) {
      res.status(500).json({
        error: e,
      });
    }
  },
  //Get all quotes per author
  getQuoteByAuthor: async function (req, res) {
    try {
      const id = req.params.id;
      const results = await queryDB(
        `SELECT value, name, last_name FROM  ${process.env.DB_NAME}.Quotes INNER JOIN Authors ON Authors.id = Quotes.author WHERE Authors.id = ?`,
        [id],
      );
      const quotes = results.map((result) => ({
        quote: result.value,
        author: result.name.concat(" ", result.last_name),
      }));
      res.status(202).json({
        quotes: quotes,
      });
    } catch (error) {
      res.status(500).json({ error: e });
    }
  },
  //POST: Create Quote
  createQuote: async function (req, res) {
    try {
      const { value, author } = req.body;
      const authorName = await queryDB(
        `SELECT name, last_name FROM  ${process.env.DB_NAME}.Authors WHERE id = ?`,
        [author],
      );
      const result = await queryDB(
        `INSERT INTO  ${process.env.DB_NAME}.Quotes (value, author) VALUES (?, ?)`,
        [value, author],
      );
      res.status(201).json({
        message: "New quote created",
        quote: `${value} by ${authorName[0].name} ${authorName[0].last_name || ""}`,
      });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  },
  //Get all authors
  getAuthors: async function (req, res) {
    try {
      results = await queryDB(`SELECT * FROM ${process.env.DB_NAME}.Authors`);
      res.status(202).json({
        authors: results,
      });
    } catch (e) {
      res.status(500).json({
        error: e,
      });
    }
  },
  //Get single author
  getAuthor: async function (req, res) {
    try {
      const id = req.params.id;
      results = await queryDB(
        `SELECT * FROM  ${process.env.DB_NAME}.Authors WHERE id = ?`,
        [id],
      );
      res.status(202).json({
        authors: results,
      });
    } catch (e) {
      res.status(500).json({
        error: e,
      });
    }
  },
  //Create author
  createAuthor: async function (req, res) {
    try {
      const { name, last_name, is_alive } = req.body;
      const result = await queryDB(
        `INSERT INTO  ${process.env.DB_NAME}.Authors (name, last_name, is_alive) VALUES (?, ?, ?)`,
        [name, last_name, is_alive],
      );
      res.status(201).json({
        message: "New author added",
        author: `${name} ${last_name}}`,
      });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  },
  //Delete Quote
  deleteQuote: async function (req, res) {
    try {
      const id = req.params.id;
      quote = await queryDB(
        `SELECT value, name, last_name FROM  ${process.env.DB_NAME}.Quotes INNER JOIN Authors ON Authors.id = Quotes.author where ${process.env.DB_NAME}.Quotes.id = ?;`,
        [id],
      );
      results = await queryDB(
        `DELETE FROM ${process.env.DB_NAME}.Quotes WHERE id = ?`,
        [id],
      );
      res.status(202).json({
        message: "Deleted quote",
        author: quote,
      });
    } catch (e) {
      res.status(500).json({
        error: e,
      });
    }
  },
  //Delete author
  deleteAuthor: async function (req, res) {
    try {
      const id = req.params.id;
      author = await queryDB(
        `SELECT * FROM ${process.env.DB_NAME}.Authors where id = ?`,
        [id],
      );
      results = await queryDB(
        `DELETE FROM ${process.env.DB_NAME}.Authors WHERE id = ?`,
        [id],
      );
      res.status(202).json({
        message: "Deleted author",
        author: author,
      });
    } catch (e) {
      res.status(500).json({
        error: e,
      });
    }
  },
  //Update quote
  updateQuote: async (req, res) => {
    try {
      const id = req.params.id;
      const { value, author } = req.body;
      console.log(value, author);
      const params = [];
      const clause = [];

      //Checkers
      if (value) {
        clause.push("value = ?");
        params.push(value);
      }
      if (author) {
        clause.push("author = ?");
        params.push(author);
      }

      if (clause.length <= 0) {
        res.status(400).json({
          error: "No values were provided for update",
        });
      }
      params.push(id);
      const query = `UPDATE ${process.env.DB_NAME}.Quotes SET ${clause.join(", ")} WHERE id = ?`;
      quote = await queryDB(query, params);
      res.status(202).json({
        message: "Updated quote",
        quote: quote,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        error: e,
      });
    }
  },
  //Update author
  updateAuthor: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, last_name, is_alive } = req.body;
      const params = [];
      const clause = [];

      //Checkers
      if (name) {
        clause.push("name = ?");
        params.push(name);
      }
      if (last_name) {
        clause.push("last_name = ?");
        params.push(last_name);
      }
      if (is_alive) {
        clause.push("is_alive = ?");
        params.push(is_alive);
      }

      if (!clause) {
        res.status(400).json({
          error: "No values were provided for update",
        });
      }
      params.push(id);
      author = await queryDB(
        `UPDATE ${process.env.DB_NAME}.Authors SET ${clause.join(", ")} WHERE id = ?`,
        params,
      );
      res.status(202).json({
        message: "Updated author",
        author: author,
      });
    } catch (e) {
      res.status(500).json({
        error: e,
      });
    }
  },
};
