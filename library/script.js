window.addEventListener('DOMContentLoaded', ()=> {
    const humburgerBtn = document.querySelector('.humburger_btn'),
    nav = document.querySelector('nav'),
    humburgerBtnLines = document.querySelectorAll('.humburger_line');

humburgerBtn.addEventListener('click', ()=>{
  humburgerBtn.classList.toggle('touched');
  nav.classList.toggle('open_nav');
});

document.addEventListener('click', (event)=>{
    console.log(event.target)
    if(event.target != humburgerBtn && event.target !=nav && event.target != humburgerBtnLines[0] &&  event.target != humburgerBtnLines[1] &&  event.target != humburgerBtnLines[2] ) {
        humburgerBtn.classList.remove('touched');
        nav.classList.remove('open_nav');
    };
});
});

console.log(`
Вёрстка соответствует макету. Ширина экрана 768px:
            блок <header> +2
            секция Welcome +2
            секция About +2.
            под картинкой находится 5 точек: +2
            секция Favorites +4
            секция CoffeShop +4
            секция Contacts +4
            секция LibraryCard +4
            блок <footer> + 2


Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки.
Весь контент страницы при этом сохраняется:
            нет полосы прокрутки при ширине страницы от 1440рх до 640рх +4.
            элементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх +4.
            элементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх +4.

На ширине экрана 768рх реализовано адаптивное меню:
            при нажатии на бургер-иконку плавно появляется адаптивное меню +4
            при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран +4
            ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается +2
            размеры открытого бургер-меню соответствуют макету, так же открытое бургер-меню проверяется на PixelPerfect +2

TOTAL: 50
`)

