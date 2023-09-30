document.addEventListener('DOMContentLoaded', () => {

  
})

let url = `https://api.unsplash.com/photos/random?count=6&orientation=landscape&client_id=4colJrPVgUKsfB2OkwF3G9KmiHb72P493LNMEQ1MVJ0`;
function getPhotos() {
    fetch(url)
      .then((obj) => obj.json())
      .then((data) => {
        showPhotos(data);
      });
      
  }

const searchField = document.querySelector('input');
searchField.addEventListener('keydown', (event)=> {
 if(event.key === 'Enter' && searchField.value.trim().length !== 0) {
    url = `https://api.unsplash.com/search/photos?query=${searchField.value}&per_page=30&orientation=landscape&order_by=relevant&client_id=4colJrPVgUKsfB2OkwF3G9KmiHb72P493LNMEQ1MVJ0`
    getPhotos();
    if(document.querySelector('.more')) {
      document.querySelector('.more').remove();
    }
 }

});

const wrapper = document.querySelector('.wrapper');

function showPhotos(data) {
      wrapper.textContent = '';
      wrapper.classList.remove('nothing_found');
      document.querySelectorAll('.content').forEach((img) => img.remove());
      if (data.results.length === 0) {
        wrapper.classList.add('nothing_found');
        wrapper.textContent = "We're sorry, we didn't find anything matching your search query."
      } else {
        for (let i = 0; i < 6; i++) {
          const content = document.createElement('div');
          content.classList.add('content');
          content.style.background = `url('${data.results[i].urls.regular}') center center/cover`;
          wrapper.appendChild(content);
        }
      }
      if (data.total > 6) {
        const moreBtn = document.createElement('button');
        moreBtn.classList.add('more')
        moreBtn.textContent = 'Show more...';
        wrapper.after(moreBtn)
        moreBtn.addEventListener('click', () => showMore(data))
      }


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


function showMore(data) {
  const alreadyShown = document.querySelectorAll('.content').length;
  for (let i = alreadyShown; i < alreadyShown + 3; i++) {
    if (i <= data.results.length - 1) {
      const content = document.createElement('div');
      content.classList.add('content');
      content.style.background = `url('${data.results[i].urls.regular}') center center/cover`;
      wrapper.appendChild(content);
    }
  }
  if (document.querySelectorAll('.content').length === data.results.length) {
    document.querySelector('.more').disabled = true;
    document.querySelector('.more').classList.add('disabled');
  }
}