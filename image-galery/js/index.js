let url = '';
function getPhotos() {
    fetch(url)
      .then((obj) => obj.json())
      .then((data) => {
        // console.log(data);
        showPhotos(data)
      });
      
  }

document.querySelector('input').addEventListener('blur', (event)=> {
url = `https://api.unsplash.com/search/photos?query=${document.querySelector('input').value}&per_page=0&orientation=landscape&client_id=4colJrPVgUKsfB2OkwF3G9KmiHb72P493LNMEQ1MVJ0`
getPhotos();
});

function showPhotos(data) {
    document.querySelector('div').style.background = `url('${data.results[0].urls.full}') center center/cover`;
}