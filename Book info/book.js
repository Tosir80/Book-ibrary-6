// get input from user 
document.getElementById('submit-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const inputText = document.getElementById('input-search');
  const inputValue = inputText.value;
//   validation and spinner  
  document.getElementById('contain').innerHTML = '';
  document.getElementById('book-found').innerHTML = '';
  if (inputValue === '') {
    document.getElementById('error-msg').innerText = ' Give your Book Name';
  } else {
    document.getElementById('error-msg').innerHTML = '';
    document.getElementById('spinner').classList.remove('d-none');
    fetchData(inputValue);
  }
  inputText.value = '';
});

// get searchText
const fetchData = async (searchText) => {
  const res = await fetch(`http://openlibrary.org/search.json?q=${searchText}`);
  const data = await res.json();
  displayData(data.docs.slice(0, 30));
};

// display data
const displayData = (getData) => {
  const contain = document.getElementById('contain');
  document.getElementById('spinner').classList.add('d-none');
  const foundBook = document.getElementById('book-found');
  if (getData.length > 0) {
    foundBook.innerText = `${getData.length} Book found`;
  } else {
    foundBook.innerText = `Opps! This book are not available`;
  }
  getData.forEach((data) => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
         <div class="card p-2 text-center border-warning">
         <img src=" ${
           data.cover_i? `https://covers.openlibrary.org/b/id/${data.cover_i}-L.jpg`:`book img.jpg`}"> 
         <h4 class="p-1">Book: ${data.title}</h4>
         <h5 class="p-1">Author:${
           data.author_name ? data.author_name : 'Unknown!'
         }</h5>
         <h6 class="p-1"> ${data.first_publish_year? data.first_publish_year: 'Not given' }</h6>
        
         </div>
        `;
    contain.appendChild(div);
  });
};
