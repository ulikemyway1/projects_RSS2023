let url = '';
function getPhotos() {
    fetch(url)
      .then((obj) => obj.json())
      .then((data) => {
        console.log(data);
        showPhotos(data)
      });
      
  }

const searchField = document.querySelector('input');
searchField.addEventListener('change', (event)=> {
url = `https://api.unsplash.com/search/photos?query=${document.querySelector('input').value}&per_page=6&orientation=landscape&order_by=relevant&client_id=4colJrPVgUKsfB2OkwF3G9KmiHb72P493LNMEQ1MVJ0`
getPhotos();
});

function showPhotos(data) {
    const contents = document.querySelectorAll('.content');
    data.results.forEach((item, index) => {
      contents[index].style.background = `url('${item.urls.regular}') center center/cover`;
    })
}

const searchBtn = document.querySelector('.search button');

searchField.addEventListener('input', () => {
  if (searchField.value.length !== 0) {
    searchBtn.textContent = 'X';
  } else  searchBtn.textContent = 'O';
})