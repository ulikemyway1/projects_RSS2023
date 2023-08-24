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
    if(event.target != humburgerBtn && event.target != nav && event.target != humburgerBtnLines[0] &&  event.target != humburgerBtnLines[1] &&  event.target != humburgerBtnLines[2] ) {
        humburgerBtn.classList.remove('touched');
        nav.classList.remove('open_nav');
    };
    if(event.target != document.querySelector('.drop_menu-links') && event.target != profileBtn && event.target != dropMenu && event.target != dropMenuTitle && dropMenu.classList.contains('dropped')) {
        dropMenu.classList.remove('dropped');
        dropMenu.classList.remove('nonetransparent');
    }

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
const contentWinter = document.querySelectorAll('.winter');
const contentSummer = document.querySelectorAll('.summer');
const contentSpring = document.querySelectorAll('.spring');
const contentAutumn = document.querySelectorAll('.autumn');
const contentAll = document.querySelectorAll('.tabs_item');
const tabsCategory = document.querySelector('.tabs_category');
tabsCategory.addEventListener('click', (e)=>{
    if (e.target.value == 'spring') {
            inputChecked = true;
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


//drop-menu

const profileBtn = document.querySelector('.profile_icon_wrapper');
const dropMenu = document.querySelector('.drop_menu');
const dropMenuTitle = document.querySelector('.drop_menu-title');
profileBtn.addEventListener('click', (event)=>{
    event.stopPropagation();
    if (event.target == document.querySelector('.profile_icon_wrapper img') || event.target == document.querySelector('.profile_icon_wrapper a')) {
           dropMenu.classList.toggle('dropped');
           dropMenu.classList.toggle('nonetransparent'); 
    }

})

//modals
modals = document.querySelectorAll('.modal');
//register
const registerBtns = document.querySelectorAll('.register_btn');
const modalOverlay = document.querySelector('.modal_overlay');
const modalRegister = document.querySelector('.modal_register');
const formRegister = document.querySelector('.form_register');
const btnCloseModalRegister = document.querySelector('.modal_register .close_modal');
const btnCloseModalLogin = document.querySelector('.modal_login .close_modal');
const closeModalBtns = document.querySelectorAll('.close_modal');
closeModalBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        closeAll(modals);
    })
});

registerBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        closeAll(modals);
        modalOverlay.style.display = 'block';
        modalRegister.style.display = 'block';
    })
});
btnCloseModalRegister.addEventListener('click', ()=> {
    formRegister.reset();
    modalRegister.style.display = 'none';
    modalOverlay.style.display = 'none';
});

btnCloseModalLogin.addEventListener('click', ()=> {
    formRegister.reset();
    modalLogin.style.display = 'none';
    modalOverlay.style.display = 'none';
});

//login
const loginBtns = document.querySelectorAll('.login_btn');
const modalLogin = document.querySelector('.modal_login');
const formLogin = document.querySelector('.form_login');

loginBtns.forEach((btn)=>{
    btn.addEventListener('click', closeAllfunct)
});
function closeAllfunct() {
    closeAll(modals);
    modalOverlay.style.display = 'block';
    modalLogin.style.display = 'block';
}

function closeAll(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.display = 'none';
    };
};

modalOverlay.addEventListener('click', (event) => {
    if (event.target == modalOverlay) {
         closeAll(modals);
    }



}) 

//
const libraryCardForm = document.querySelector('.librarycard_card-form')
libraryCardForm.addEventListener('submit', (event)=>{
    event.preventDefault();
});


formLogin.addEventListener('submit', (event)=>{
    event.preventDefault();
    userLogIn(formLogin.elements.login.value, formLogin.elements.password.value);
    closeAll(modals);

});
//registration
let usersDB = [];
if (localStorage.getItem('usersDB')) {
    usersDB = JSON.parse(localStorage.getItem('usersDB'));
};


formRegister.addEventListener('submit', (event)=>{
    event.preventDefault();
    let newUser = {
        'userName_ULIKE': formRegister.elements.first_name.value,
        'userLastName_ULIKE': formRegister.elements.last_name.value,
        'userEmail_ULIKE': formRegister.elements.e_mail.value,
        'userPassword_ULIKE': formRegister.elements.password.value,
        'readerCardNumber_ULIKE': generateReaderCardNumber(),
        'userVisits_ULIKE': 0,
        'userRentedBooksAmount_ULIKE': 0,
        'userRentedBooksList_ULIKE': [],
        'userBonuses_ULIKE': 1240,
        'hasSubcription_UlIKE': false,
        'boughtBooksBtns_ULIKE': [],
        'isActive_ULIKE': false,  
    };
    usersDB.push(newUser);
    localStorage.setItem('usersDB', JSON.stringify(usersDB));
    userLogIn(formRegister.elements.e_mail.value, formRegister.elements.password.value);
    closeAll(modals);

});


console.log(usersDB);


function generateReaderCardNumber() {
    let readerCardNumberULIKE = Math.floor(Math.random() * 4294967295).toString(16).toUpperCase();
    while (readerCardNumberULIKE.length < 8) {
        readerCardNumberULIKE = readerCardNumberULIKE + '' + 0;
    }
    return readerCardNumberULIKE
};


//Log In
const profile = document.querySelector('.profile')
const profileImg = document.querySelector('.profile a')
function userLogIn(login, password) {
    usersDB.forEach((user) => {
        if ((login == user.userEmail_ULIKE && password == user.userPassword_ULIKE) || (login == user.readerCardNumber_ULIKE && password == user.userPassword_ULIKE)) {
            user.isActive_ULIKE = true; 
            user.userVisits_ULIKE++;
            localStorage.setItem('usersDB', JSON.stringify(usersDB));
            renderAfterLogin();
            activateFeaturesAfterLogin();
          
        }
    })
}
const  buyBookBtns = document.querySelectorAll('button.active_btn');
let dropMenuLinks = document.querySelector('.drop_menu-links');
function renderAfterLogin() {
    usersDB.forEach((user) => {
        if (user.isActive_ULIKE) {
            //change user icon
            profileImg.style.backgroundColor  = '#ffffff'
            const userAbr = '' + user.userName_ULIKE[0] + user.userLastName_ULIKE[0];
            profileImg.innerHTML = userAbr;
            dropMenuLinks.innerHTML = '<li class="profile_btn">My profile</li><li class="logout_btn">Log Out</li>'
            //change drop menu
            const logOutBtn = document.querySelector('.logout_btn');

            if (logOutBtn) {
                logOutBtn.addEventListener('click', ()=> {
                    usersDB.forEach((user) => {
                        if (user.isActive_ULIKE) {
                            user.isActive_ULIKE = false;
                            localStorage.setItem('usersDB', JSON.stringify(usersDB));
                        }
                    })
                    location.reload();
                })
            }
            const profileBtns = document.querySelectorAll('.profile_btn');
            for (let i = 0; i<profileBtns.length; i++) {
            profileBtns[i].addEventListener('click', () => {
                renderAfterLogin();
                modalOverlay.style.display = 'block';
                profileCard.style.display = 'flex';
        
        
            })
            }
            document.querySelector('.user_photo-abbr').textContent =  userAbr;
            document.querySelector('.user_photo-name').textContent =  '' + user.userName_ULIKE + ' ' + user.userLastName_ULIKE;
            document.querySelector('#visits').textContent =  user.userVisits_ULIKE;
            document.querySelector('#bonuses').textContent =  user.userBonuses_ULIKE;
            document.querySelector('#rented_books_amount').textContent =  user.userRentedBooksAmount_ULIKE;
            document.querySelector('#card_number').textContent =  user.readerCardNumber_ULIKE;
            //create list of bought books
            const rentedBookList = document.querySelector('#rented_books_list ul');
            let bookList = document.createElement('ul');
            user.userRentedBooksList_ULIKE.forEach((book)=> {
               let item = document.createElement('li');
               item.textContent = `${book.title}, ${book.author} `
               bookList.append(item);
            })
            rentedBookList.innerHTML = bookList.innerHTML;

            //mark bought books
            buyBookBtns.forEach((btn)=>{
                if ( user.boughtBooksBtns_ULIKE.includes(btn.dataset.title)) {
                    btn.textContent = 'Own';
                    btn.disabled = true;
                    btn.classList.remove('active_btn');
                    btn.classList.add('disabled');
                }
            })
        }
    })


}
const buyCardModal = document.querySelector('.buy_card');
const buyCardForm = document.querySelector('.form_buy_card');

buyCardForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    usersDB.forEach((user) => {
        if (user.isActive_ULIKE) {
            user.hasSubcription_ULIKE = true;
            localStorage.setItem('usersDB', JSON.stringify(usersDB));
        }
        
    })
    closeAll(modals)
    renderAfterLogin();
    activateFeaturesAfterLogin();
})

function showByCardModal() {
    modalOverlay.style.display = 'block';
    buyCardModal.style.display = 'block';
}

function activateFeaturesAfterLogin() {
    usersDB.forEach((user) => {
        if (user.isActive_ULIKE) {
    
    buyBookBtns.forEach((btn)=> {
        btn.removeEventListener('click', closeAllfunct);
        if (user.hasSubcription_ULIKE) {
            btn.removeEventListener('click', showByCardModal)
            btn.addEventListener('click', () => {
                 addBook(btn)
            });
        } else {
            btn.addEventListener('click', showByCardModal)
        }
    })}})

}

function addBook(btn) {
    usersDB.forEach((user) => {
        if (user.isActive_ULIKE) {
            user.userRentedBooksAmount_ULIKE++;
            user.userRentedBooksList_ULIKE.push({
                author: btn.dataset.author,
                title: btn.dataset.title,
            });
            user.boughtBooksBtns_ULIKE.push(btn.dataset.title);
            console.dir(btn)
        }
    })
    localStorage.setItem('usersDB', JSON.stringify(usersDB));
    btn.textContent = 'Own';
    btn.disabled = true;
    btn.classList.remove('active_btn');
    btn.classList.add('disabled');
    // renderAfterLogin();
};

renderAfterLogin();
activateFeaturesAfterLogin();


const profileCard = document.querySelector('.user_profile');

});
