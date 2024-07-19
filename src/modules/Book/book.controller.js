import Book from "../../../db/models/booksModel.js";

export const addBook = async (req, res) => {
  const { title, genre, author } = req.body;

  try {
    const bookExists = await Book.findOne({
      where: {
        title,
      },
    });

    if (bookExists)
      return res.json({ message: "Book already exists in database!" });

    const book = await Book.create({ title, genre, author });

    res.status(201).json({ messsage: "Book added successfully", book: book });
  } catch (error) {
    console.log({ message: "error in addBook", error: error });
    req.status(500).json({ message: "Internal server error" });
  }
};

export const updateBook = async (req, res) => {
  const { title, genre, author } = req.body;
  const { id } = req.params;

  try {
    const book = await Book.update(
      {
        title,
        genre,
        author,
      },
      {
        where: {
          id,
        },
      }
    );

    res.json({ messsage: "Book updated successfully", book: book });
  } catch (error) {
    console.log({ message: "error in updateBook", error: error });
    req.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.destroy({
      where: {
        id,
      },
    });
    res.json({ messsage: "Book deleted successfully", book });
  } catch (error) {
    console.log({ message: "error in deleteBook", error: error });
    req.status(500).json({ message: "Internal server error" });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    if (!books) return res.json({ message: "No books available currently" });
    res.json({ messsage: "Book list", books });
  } catch (error) {
    console.log({ message: "error in getBooks", error: error });
    req.status(500).json({ message: "Internal server error" });
  }
};

export const searchBooks = async (req, res) => {
  const { author, genre, title } = req.query;

  try {
    if (author) {
      const books = await Book.findAll({
        where: {
          author,
        },
      });

      if (!books)
        return res.json({ message: `No books availabile for ${author}` });

      return res.json({ message: `All ${author} books`, books: books });
    }

    if (genre) {
      const books = await Book.findAll({
        where: {
          genre,
        },
      });

      if (!books)
        return res.json({ message: `No books availabile for ${genre}` });

      return res.json({ message: `All ${genre} books`, books: books });
    }

    if (title) {
      const book = await Book.findOne({
        where: {
          title,
        },
      });

      if (!book) return res.json({ message: `Books isn't available` });

      return res.json({ message: `${title} book: `, book: book });
    }
  } catch (error) {
    console.log({ message: "error in searchBooks", error: error });
    req.status(500).json({ message: "Internal server error" });
  }
};
