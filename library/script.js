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
    if(event.target != humburgerBtn && event.target !=nav && event.target != humburgerBtnLines[0] &&  event.target != humburgerBtnLines[1] &&  event.target != humburgerBtnLines[2] ) {
        humburgerBtn.classList.remove('touched');
        nav.classList.remove('open_nav');
    };
});


//About SLIDER
const sliderContent = document.querySelector('.about_slider_content');
const sliderBtns = document.querySelectorAll('.about_slider_paginator-btn-fill');
const sliderBtnsWithPadding = document.querySelectorAll('.about_slider_paginator-btn');
const sliderBtnsPanel = document.querySelector('.about_slider_paginator_wrapper');
const sliderArrowLeft = document.querySelector('.about_slider_arrow-left');
const sliderArrowRigth = document.querySelector('.about_slider_arrow-rigth');
const sliderShift = 475;

sliderBtnsWithPadding.forEach((item, index)=>{
    item.addEventListener('click', (e)=>{
        if (!item.classList.contains('paginator-btn_active')) {
           sliderContent.style.left = `-${sliderShift*index}px`;
           sliderBtns.forEach((btn)=>{
           btn.classList.remove('paginator-btn_active');
           sliderBtns[index].classList.add('paginator-btn_active');

        })  
        }
       
    })
})
// sliderBtnsPanel.addEventListener('click', (event)=>{
//     console.log(event.target)
//     if (event.target == sliderBtns[0]) {
//         sliderContent.style.left = '-475px';
//     }
// })

});


