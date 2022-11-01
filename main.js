const addButton = document.getElementById('Add');
const title = document.getElementById('title');
const author = document.getElementById('author');
const adder = document.getElementById('keeper');

if (localStorage.getItem('books') !== null) {
    const getbook = JSON.parse(localStorage.getItem('books'));
  
    getbook.forEach((item) => {
      adder.innerHTML += `
        <div>
          <p>${item.title}</p>
          <p>${item.author}</p>
          <button class="remove" name="${item.title}">Remove</button>
          <hr>
        </div>
      `;
    });
  }

function Book(title,author) {
    this.title = title ; 
    this.author = author ;
}

addButton.addEventListener('click', (e) => {
    e.preventDefault();

    adder.innerHTML+= `
    <div> 
    <p>${title.value}</p>
    <p>${author.value}</P>
    <button class ="remove" name="${title.value}">Remove book </button>
    <hr>
    </div>
    `;

    const book1 = new Book(title.value, author.value);

    if (localStorage.getItem('books') === null) {
      const books = [];
      books.push(book1);
      localStorage.setItem('books', JSON.stringify(books));
    } else {
      const books = JSON.parse(localStorage.getItem('books'));
      books.push(book1);
      localStorage.setItem('books', JSON.stringify(books));
    }
  });
  

  const remove = document.querySelectorAll('.remove');

remove.forEach((item) => {
  item.addEventListener('click', () => {
    item.parentElement.remove();
    const bookname = item.name;
    // remove from local storage
    const getremove = JSON.parse(localStorage.getItem('books'));
    const newArr = getremove.filter((object) => object.title !== bookname);
    localStorage.setItem('books', JSON.stringify(newArr));
  });
});