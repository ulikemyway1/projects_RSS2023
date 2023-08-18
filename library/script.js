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
const sliderArrowLeft = document.querySelector('.about_slider_arrow-left');
const sliderArrowRight = document.querySelector('.about_slider_arrow-right');
const sliderShift = 475;
let sliderIndex = 1;
sliderContent.style.left = 0;

sliderBtnsWithPadding.forEach((item, index)=>{
    item.addEventListener('click', (e)=>{
        if (!item.classList.contains('paginator-btn_active')) {
           sliderContent.style.left = `-${sliderShift*index}px`;
           sliderBtns.forEach((btn, i)=>{
           btn.classList.remove('paginator-btn_active');
           sliderBtnsWithPadding[i].classList.remove('no-shadow');
           btn.disabled = false;
        })  
        switchSliderPaginator(index);
        sliderIndex = index + 1;
        checkSliderArrows()
        }
       
    })
})

sliderArrowLeft.addEventListener('click', (e) => {
    if (sliderIndex !=1) {
        sliderContent.style.left = `${parseInt(sliderContent.style.left) + sliderShift}px`;
        sliderIndex -= 1;
        sliderBtns.forEach((btn, i)=>{
            btn.classList.remove('paginator-btn_active');
            sliderBtnsWithPadding[i].classList.remove('no-shadow');
            btn.disabled = false;
         })
         switchSliderPaginator(sliderIndex - 1);
    }
    checkSliderArrows()
});

sliderArrowRight.addEventListener('click', (e) => {
    if (sliderIndex !=5) {
        sliderContent.style.left = `${parseInt(sliderContent.style.left) - sliderShift}px`;
        sliderIndex += 1;
        sliderBtns.forEach((btn, i)=>{
            btn.classList.remove('paginator-btn_active');
            sliderBtnsWithPadding[i].classList.remove('no-shadow');
            btn.disabled = false;
         })
         switchSliderPaginator(sliderIndex - 1);
    }
    checkSliderArrows()
})

function switchSliderPaginator(index) {
    sliderBtns[index].classList.add('paginator-btn_active');
    sliderBtns[index].disabled = true;
    sliderBtnsWithPadding[index].classList.add('no-shadow');
    sliderArrowRight.classList.remove('no-pointer');
    sliderArrowLeft.classList.remove('no-pointer');
}

function checkSliderArrows() {
    if (sliderIndex == 1) sliderArrowLeft.classList.add('no-pointer');
    if (sliderIndex == 5) sliderArrowRight.classList.add('no-pointer');
}


//Favorites tabs

const inputWinter = document.getElementById('winter');
const inputSummer = document.getElementById('summer');
const inputSpring = document.getElementById('spring');
const inputAutumn = document.getElementById('autumn');
const contentWinter = document.querySelectorAll('.winter');
const contentSummer = document.querySelectorAll('.summer');
const contentSpring = document.querySelectorAll('.spring');
const contentAutumn = document.querySelectorAll('.autumn');
const contentAll = document.querySelectorAll('.tabs_item');
console.dir(inputWinter);
const tabsCategory = document.querySelector('.tabs_category');
// inputWinter.addEventListener('input', ()=>{
//     contentAll.forEach((item)=>{
//         item.classList
//     })
//     contentWinter.classList.remove('hidden');
// })

tabsCategory.addEventListener('click', (e)=>{
    if (e.target.value == 'spring') {
            if (contentSpring[0].classList.contains('hidden')) {
                contentAll.forEach((item)=> {
                    item.classList.add('transparent');
                setTimeout(()=>{
                    item.classList.add('hidden');
                }, 400)
                });
                setTimeout(()=> {
                    contentSpring.forEach((item)=> {
                        item.classList.remove('hidden');
                        setTimeout(()=>{
                            item.classList.remove('transparent');
                        }, 100)
          
                    })
                }, 450)
          
        }
    }
    if (e.target.value == 'winter') {
        if (contentWinter[0].classList.contains('hidden')) {
            contentAll.forEach((item)=> {
                item.classList.add('transparent');
                setTimeout(()=>{
                    item.classList.add('hidden');
                }, 400)
                
            });
            setTimeout(()=>{
                contentWinter.forEach((item)=> {
                    item.classList.remove('hidden');
                    setTimeout(()=>{
                        item.classList.remove('transparent');
                    }, 100)
                })
            }, 450)
       
    }
}
if (e.target.value == 'summer') {
    if (contentSummer[0].classList.contains('hidden')) {
        contentAll.forEach((item)=> {
            item.classList.add('transparent');
            setTimeout(()=>{
                item.classList.add('hidden');
            }, 400)
        });
        setTimeout(()=>{
            contentSummer.forEach((item)=> {
                item.classList.remove('hidden');
                setTimeout(()=>{
                    item.classList.remove('transparent');
                }, 100)
            })
        }, 450)
}
}
if (e.target.value == 'autumn') {
    if (contentAutumn[0].classList.contains('hidden')) {
        contentAll.forEach((item)=> {
            item.classList.add('transparent');
            setTimeout(()=>{
                item.classList.add('hidden');
            }, 400)
        });
        setTimeout(()=>{
            contentAutumn.forEach((item)=> {
                item.classList.remove('hidden');
                setTimeout(()=>{
                    item.classList.remove('transparent');
                }, 100)
            })
        }, 450)
}
}
})

});


