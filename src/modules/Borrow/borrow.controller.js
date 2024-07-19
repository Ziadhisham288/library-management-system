import Book from "../../../db/models/booksModel.js";
import Borrow from "../../../db/models/borrowModel.js";

export const borrowBook = async (req, res) => {
  const { BookId } = req.params;
  const { id } = req.auth.user;
  try {
    const book = await Book.findByPk(BookId);

    if (!book || book.isBorrowed)
      return res.json({ message: "Book isn't available" });

    const borrow = await Borrow.create({ UserId: id, BookId });

    await book.update({
      isBorrowed: true,
    });

    res.json({ message: "Book borrowed", borrow });
  } catch (error) {
    console.log({ message: "error in borrowBook", error: error });
    req.status(500).json({ message: "Internal server error" });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;
    const { BookId } = req.params;

    const borrow = await Borrow.findOne({
      where: {
        id: borrowId,
        BookId: BookId,
      },
    });

    if (!borrow || borrow.returnDate) {
      return res.json({
        message: "No borrow found or book already returned!",
      });
    }

    await borrow.update({ returnDate: new Date() });

    await Book.update({ isBorrowed: false }, { where: { id: BookId } });

    res.json({ message: "Book returned successfully", borrow });
  } catch (error) {
    console.log({ message: "error in returnBook", error: error });
    req.status(500).json({ message: "Internal server error" });
  }
};

export const getBorrows = async (req, res) => {
  const { id } = req.auth.user;

  try {
    const borrows = await Borrow.findAll({
      where: {
        UserId: id,
      },
      include: [Book],
    });

    res.json({ message: "All borrowed books: ", books: borrows });
  } catch (error) {
    console.log({ message: "error in getBorrows", error: error });
    req.status(500).json({ message: "Internal server error" });
  }
};
