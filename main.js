import Book from './js/book.js';
import Store from './js/store.js';

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

// Add date

function refreshTime() {
  const timeDisplay = document.getElementById('date-time');
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const dateString = new Date().toLocaleString('en-us', dateOptions);
  timeDisplay.textContent = dateString;
}

function initTime() {
  refreshTime();
  setInterval(refreshTime, 1000);
}

initTime();
