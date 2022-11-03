const list = document.getElementById('show-1');
const add = document.getElementById('book-form');
const contact = document.getElementById('contact1');

const showlist = document.getElementById('listshow');
const addshow = document.getElementById('addshow');
const contactshow = document.getElementById('contactshow');

showlist.addEventListener('click', () => {
  list.style.display = 'flex';
  add.style.display = 'none';
  contact.style.display = 'none';
});

addshow.addEventListener('click', () => {
  list.style.display = 'none';
  add.style.display = 'flex';
  contact.style.display = 'none';
});

contactshow.addEventListener('click', () => {
  list.style.display = 'none';
  add.style.display = 'none';
  contact.style.display = 'flex';
});
