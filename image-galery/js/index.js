let url = `https://api.unsplash.com/photos/random?count=6&orientation=landscape&client_id=4colJrPVgUKsfB2OkwF3G9KmiHb72P493LNMEQ1MVJ0`;
function getPhotos() {
    fetch(url)
      .then((obj) => obj.json())
      .then((data) => {
        showPhotos(data);
        console.log(data)
      });
      
  }

const searchField = document.querySelector('input');
searchField.addEventListener('keydown', (event)=> {
 if(event.key === 'Enter' && searchField.value.trim().length !== 0) {
    url = `https://api.unsplash.com/search/photos?query=${searchField.value}&per_page=6&orientation=landscape&order_by=relevant&client_id=4colJrPVgUKsfB2OkwF3G9KmiHb72P493LNMEQ1MVJ0`
    getPhotos();
 }

});

const wrapper = document.querySelector('.wrapper');


function showPhotos(data) {
      document.querySelectorAll('.content').forEach((img) => img.remove());
      data.results.forEach((item, index) => {
      const content = document.createElement('div');
      content.classList.add('content');
      content.style.background = `url('${item.urls.regular}') center center/cover`;
      wrapper.appendChild(content);
    })
}

function getRandomPhotos(data) {
    fetch(url)
      .then((obj) => obj.json())
      .then((data) => showRandomPhotos(data));
}

getRandomPhotos();

function showRandomPhotos(data) {
  data.forEach((item, index) => {
    const content = document.createElement('div');
    content.classList.add('content');
    content.style.background = `url('${item.urls.regular}') center center/cover`;
    wrapper.appendChild(content);
  })
}

const searchBtn = document.querySelector('.search button');

searchField.addEventListener('input', () => {
  if (searchField.value.length !== 0) {
    searchBtn.textContent = 'X';
  } else  searchBtn.innerHTML = '&#x1F50E;&#xFE0E;';
});
searchBtn.addEventListener('click', () => {
  if (searchBtn.textContent === 'X') {
    searchField.focus();
    searchField.value='';
    searchBtn.innerHTML = '&#x1F50E;&#xFE0E;'
  }
})