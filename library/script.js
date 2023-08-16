window.addEventListener('DOMContentLoaded', ()=> {
// BURGER-MENU
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


//About SLIDER

});


