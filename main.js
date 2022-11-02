class Book {
  constructor(title, author, id) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}
class Store {
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
const store = new Store();
class UI {
  static displayBooks() {
    const books = store.getBooks();
    books.forEach((book) => UI.addBookList(book));
  }
  static addBookList(book) {
    const bookList = document.getElementById('book-list');

    const content = document.createElement('div');
    content.innerHTML = `
    <div>${book.title} By ${book.author}</div>
    <button id="book-num-${book.id}"class="delete">Remove</button>
    `;
 
    bookList.appendChild(content);
    content.classList.add('book-row-content');
  }

  static deleteBook(element) {
    if (element.classList.contains('delete')) {
      element.parentElement.remove();
    }
  }
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}
document.addEventListener('DOMContentLoaded', UI.displayBooks);
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const id = store.count;
  const book = new Book(title, author, id);
  UI.addBookList(book);
  store.addBook(book);
  UI.clearFields();
});
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  const btnID = e.target.id;
  const arrValues = btnID.split('-');
  const idString = arrValues[arrValues.length - 1];
  const id = parseInt(idString, 10);
  store.removeBook(id);
});