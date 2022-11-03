export default class Store {
  constructor() {
    this.count = this.getBooks().length + 1;
  }

  getBooks() {
    if (localStorage.getItem('books') === null) {
      this.books = [];
    } else {
      this.books = JSON.parse(localStorage.getItem('books'));
    }
    return this.books;
  }

  addBook(book) {
    const newBook = {
      id: this.count,
      title: book.title,
      author: book.author,
    };
    const books = this.getBooks();
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    this.count += 1;
  }

  removeBook(id) {
    const books = this.getBooks();
    const filteredBooks = books.filter((book) => book.id !== id);
    localStorage.setItem('books', JSON.stringify(filteredBooks));
  }
}
