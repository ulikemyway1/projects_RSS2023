window.addEventListener('DOMContentLoaded', ()=> {
// BURGER-MENU
    const humburgerBtn = document.querySelector('.humburger_btn'),
    nav = document.querySelector('nav'),
    ul = document.querySelector('nav ul'),
    humburgerBtnLines = document.querySelectorAll('.humburger_line');

humburgerBtn.addEventListener('click', ()=>{
  humburgerBtn.classList.toggle('touched');
  nav.classList.toggle('open_nav');
});

document.addEventListener('click', (event)=>{
    if(event.target != humburgerBtn && event.target != nav && event.target != ul && event.target != humburgerBtnLines[0] &&  event.target != humburgerBtnLines[1] &&  event.target != humburgerBtnLines[2] ) {
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
           dropMenu.classList.toggle('dropped');
           dropMenu.classList.toggle('nonetransparent'); 
           humburgerBtn.classList.remove('touched');
           nav.classList.remove('open_nav');

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

//check user metrica if user exists
const libraryCardForm = document.querySelector('.librarycard_card-form')
libraryCardForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    usersDB.forEach((user) => {
        if ( (libraryCardForm.elements.name.value.split(' ').join('') == (user.userName_ULIKE + user.userLastName_ULIKE) || libraryCardForm.elements.name.value.split(' ').join('') == (user.userLastName_ULIKE + user.userName_ULIKE) ) && libraryCardForm.elements.card_number.value == user.readerCardNumber_ULIKE) {
            user.isActive_ULIKE = true;
            updateMetrica();
           libraryCardCheckBtn.style.display = 'none';
           cardInfo.style.display = 'flex';
           setTimeout(()=> {
            libraryCardCheckBtn.style.display = 'block';
            cardInfo.style.display = 'none';
            document.querySelector('input#name').placeholder =  "Reader's name";
            document.querySelector('input#card_number').placeholder =  'Card number';
            document.querySelector('input#card_number').disabled = false;
            document.querySelector('input#name').disabled = false;
            libraryCardForm.reset();
            user.isActive_ULIKE = false;
           }, 10000)
        }
    })
});


//login
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
    usersDB.forEach((user) => {
        if  (formRegister.elements.e_mail.value.trim() == user.userEmail_ULIKE) {
            formRegister.classList.add('not_valid');
            const err = document.createElement('div');
            err.classList.add('register_error');
            err.textContent = 'User with this E-mail already exists';
            formRegister.elements.e_mail.classList.add('validate_error')
            formRegister.elements.e_mail.parentNode.append(err)
            formRegister.elements.e_mail.parentNode.style.height = '60px';
            formRegister.elements.sign_up.disabled = true;
            formRegister.elements.e_mail.addEventListener('focus', ()=> {
                formRegister.elements.sign_up.disabled = false;
                err.remove();
                formRegister.elements.e_mail.parentNode.style.height = '50px';
            })
        } else {
            formRegister.classList.remove('not_valid')
        } 
    })
    
    //if register form is valid write create new user and write info in localstorge
    if (!formRegister.classList.contains('not_valid')) {
        let newUser = {
            'userName_ULIKE': formRegister.elements.first_name.value.trim(),
            'userLastName_ULIKE': formRegister.elements.last_name.value.trim(),
            'userEmail_ULIKE': formRegister.elements.e_mail.value.trim(),
            'userPassword_ULIKE': formRegister.elements.password.value.trim(),
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
        updateProfile();
    }
   

});


// genetation Reader's card number. max 16-m number = FFFFFFFFF and equal 68719476735 in 10-m
function generateReaderCardNumber() {
    let readerCardNumberULIKE = Math.floor(Math.random() * 68719476735).toString(16).toUpperCase();

//check if generated number already exists 
    usersDB.forEach((user) => {
        if (readerCardNumberULIKE == user.readerCardNumberULIKE) {
            return generateReaderCardNumber()
        }
    })
//check if generated number less than 9
    while (readerCardNumberULIKE.length < 9) {
        return generateReaderCardNumber()
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
            updateProfile()
        }
    })
}

//re render page after log-in
const  buyBookBtns = document.querySelectorAll('button.active_btn');
let dropMenuLinks = document.querySelector('.drop_menu-links');
const libraryCardCheckBtn = document.querySelector('button.librarycard-form');
const cardInfo = document.querySelector('.user_profile_icons-wrapper.card_info');
function renderAfterLogin() {
    usersDB.forEach((user) => {
        if (user.isActive_ULIKE) {
            //change user icon
            profileImg.style.backgroundColor  = '#ffffff'
            const userAbr = '' + user.userName_ULIKE[0] + user.userLastName_ULIKE[0];
            profileImg.innerHTML = userAbr.toUpperCase();
            profileImg.setAttribute('title', user.userName_ULIKE + ' ' + user.userLastName_ULIKE)
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
            };
            let profileBtns = document.querySelectorAll('.profile_btn');
            for (let i = 0; i<profileBtns.length; i++) {
            profileBtns[i].addEventListener('click', () => {
                renderAfterLogin();
                modalOverlay.style.display = 'block';
                profileCard.style.display = 'flex';
            })
            }
           
            //create list of bought books
            const rentedBookList = document.querySelector('#rented_books_list ul');
            let bookList = document.createElement('ul');
            if (user.userRentedBooksList_ULIKE.length == 0) {
                let item = document.createElement('div');
                item.style.fontSize = '16px'
                item.textContent = "You haven't rented any books yet"
                bookList.append(item);
                rentedBookList.innerHTML = rentedBookList.innerHTML = 'ss';

            }
                      
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
            });
            
        }
    })


}

//buy abonement
const buyCardModal = document.querySelector('.buy_card');
const buyCardForm = document.querySelector('.form_buy_card');
const buyCardAllInputs = document.querySelectorAll('.form_buy_card input')
const buyCardBtn = document.querySelector('.form_buy_card button')

buyCardForm.addEventListener('input', (event) =>{
    let allInputsNotEmpty = true;
    let allInputsValid = true;
    buyCardAllInputs.forEach((input)=>{
        if (input.value == '') {
            allInputsNotEmpty = false;
            buyCardBtn.classList.add('disabled_purch'); 
            buyCardBtn.disabled = true;
        }
        if (input.classList.contains('validate_error')) {
            allInputsValid = false;
        }
    })
    if (allInputsNotEmpty) {
        buyCardBtn.classList.remove('disabled_purch');
        if (allInputsValid) {
            
            buyCardBtn.disabled = false;
        };
    }
})

buyCardForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    let allInputsValid = true;
    buyCardAllInputs.forEach((input)=>{
              if (input.classList.contains('validate_error')) {
            allInputsValid = false;
        }
    });
    if (allInputsValid) {
        usersDB.forEach((user) => {
            if (user.isActive_ULIKE) {
                user.hasSubcription_ULIKE = true;
                localStorage.setItem('usersDB', JSON.stringify(usersDB));
            }
            
        })
        closeAll(modals)
        renderAfterLogin();
        activateFeaturesAfterLogin();
    }

})

function validate(input, regExpr, message, length) {
    const err = document.createElement('div');
    err.classList.add('buy_card_error')

    input.addEventListener("keypress", (event) => {
        if (!regExpr.test(event.key)) {
          event.preventDefault();
        }});

    input.addEventListener('blur', (event) => {
        if (input.value.split(' ').join('').length != length  && event.target == input) {
            err.textContent = message;
            input.classList.add('validate_error')
            input.parentNode.append(err)
            input.parentNode.style.height = '90px';
        }
    })
    input.addEventListener('focus', (event) => {
        if (err && input.classList.contains('validate_error') && event.target == input) {
            err.remove();
            input.parentNode.style.height = '50px';
            input.classList.remove('validate_error');
        }
    })
}
function validateMinLength(input, regExpr, message, length) {
    const err = document.createElement('div');
    err.classList.add('buy_card_error')

    input.addEventListener("keypress", (event) => {
        if (!regExpr.test(event.key)) {
          event.preventDefault();
        }});

    input.addEventListener('blur', (event) => {
        if (input.value.split(' ').join('').length < length  && event.target == input) {
            err.textContent = message;
            input.classList.add('validate_error')
            input.parentNode.append(err)
            input.parentNode.style.height = '90px';
        }
    })
    input.addEventListener('focus', (event) => {
        if (err && input.classList.contains('validate_error') && event.target == input) {
            err.remove();
            input.parentNode.style.height = '50px';
            input.classList.remove('validate_error');
        }
    })
}

// buy card validation
buyCardAllInputs.forEach((input)=>{
    if (input.name == 'bankcard_number') {
        validate(input, /[0-9\s]+/, 'The bank card number must contain only 16 digits' , 16) 
    };

    if (input.name == 'expiration_code_month') {
        validate(input, /[0-9]+/, 'Enter months in the format mm', 2);
    }

    if (input.name == 'expiration_code_year') {
        validate(input, /[0-9]+/, 'Enter months in the format yy', 2);
    }

    if (input.name == 'cvc') {
        validate(input, /[0-9]+/, 'The CVC must contain only 3 digits', 3);
    }

    if (input.name == 'cardholder_name') {
        validateMinLength(input, /^[а-яА-ЯёЁa-zA-Z0-9]+$/, 'Please enter card holder name', 1);
    }

    if (input.name == 'postal_code') {
        validateMinLength(input, /^[а-яА-ЯёЁa-zA-Z0-9]+$/, 'Please enter postal code', 1);
    }

    if (input.name == 'cardholder_city') {
        validateMinLength(input, /^[а-яА-ЯёЁa-zA-Z0-9]+$/, 'Please enter City / Town', 1);
    }
})


//
function showByCardModal() {
    modalOverlay.style.display = 'block';
    buyCardModal.style.display = 'block';
}
function  updateProfile() {
    usersDB.forEach((user) => {
        if (user.isActive_ULIKE) {
        const userAbr = '' + user.userName_ULIKE[0] + user.userLastName_ULIKE[0];
        document.querySelector('.user_photo-abbr').textContent =  userAbr.toUpperCase();
        document.querySelector('.user_photo-name').textContent =  '' + user.userName_ULIKE + ' ' + user.userLastName_ULIKE;
        document.querySelectorAll('#visits').forEach((item)=>item.textContent =  user.userVisits_ULIKE);
        document.querySelectorAll('#bonuses').forEach((item)=>item.textContent =  user.userBonuses_ULIKE);
        document.querySelectorAll('#rented_books_amount').forEach((item)=>item.textContent =  user.userRentedBooksAmount_ULIKE);
        document.querySelector('#card_number').textContent =  user.readerCardNumber_ULIKE;    
        document.querySelector('input#name').placeholder =  '' + user.userName_ULIKE + ' ' + user.userLastName_ULIKE;
        document.querySelector('input#card_number').placeholder =  user.readerCardNumber_ULIKE; 
        document.querySelector('input#card_number').disabled = true;
        document.querySelector('input#name').disabled = true;
        }})
    }
    function  updateMetrica() {
        usersDB.forEach((user) => {
            if (user.isActive_ULIKE) {
            document.querySelectorAll('#visits').forEach((item)=>item.textContent =  user.userVisits_ULIKE);
            document.querySelectorAll('#bonuses').forEach((item)=>item.textContent =  user.userBonuses_ULIKE);
            document.querySelectorAll('#rented_books_amount').forEach((item)=>item.textContent =  user.userRentedBooksAmount_ULIKE);
            document.querySelector('#card_number').textContent =  user.readerCardNumber_ULIKE;    
            document.querySelector('input#name').placeholder =  '' + user.userName_ULIKE + ' ' + user.userLastName_ULIKE;
            document.querySelector('input#card_number').placeholder =  user.readerCardNumber_ULIKE; 
            document.querySelector('input#card_number').disabled = true;
            document.querySelector('input#name').disabled = true;
            }})
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
    });
    libraryCardCheckBtn.style.display = 'none';
    cardInfo.style.display = 'flex';
    document.querySelector('.librarycard_info-title').textContent = 'Visit your profile';
    document.querySelector('.librarycard_info-descr').textContent = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
      if(document.querySelector('.librarycard_info.button.register_btn').style.display  != 'none')  {
            document.querySelector('.librarycard_info.button.register_btn').style.display = 'none';
            document.querySelector('.librarycard_info.button.login_btn').removeEventListener('click', closeAllfunct);
            document.querySelector('.librarycard_info.button.login_btn').classList.add('profile_btn');
            document.querySelector('.librarycard_info.button.login_btn').textContent = 'Profile';
            document.querySelector('.librarycard_info.button.login_btn').classList.remove('login_btn');
            renderAfterLogin(); 
      }
      document.querySelector('.drop_menu-title').textContent = user.readerCardNumber_ULIKE;
      document.querySelector('.drop_menu-title').style.fontSize = '12px';
      document.querySelector('.copy_toClipBoard').addEventListener(('click'), (event)=>{
        event.stopPropagation();
        navigator.clipboard.writeText(document.querySelector('#card_number').textContent);
    })
      
}
})
}
//
function addBook(btn) {
    usersDB.forEach((user) => {
        if (user.isActive_ULIKE) {
            user.userRentedBooksAmount_ULIKE++;
            user.userRentedBooksList_ULIKE.push({
                author: btn.dataset.author,
                title: btn.dataset.title,
            });
            user.boughtBooksBtns_ULIKE.push(btn.dataset.title);
        }
    })
    localStorage.setItem('usersDB', JSON.stringify(usersDB));
    btn.textContent = 'Own';
    btn.disabled = true;
    btn.classList.remove('active_btn');
    btn.classList.add('disabled');
    updateProfile();
};

renderAfterLogin();
activateFeaturesAfterLogin();
updateProfile();

const profileCard = document.querySelector('.user_profile');

});

console.log(`

САМОПРОВЕРКА: 200/200

Этап 1: Пользователь не зарегистрирован
 V Ограниченная карусель в блоке About
   * Карусель реагирует на нажатие кнопок (кнопки под каруселью и стрелочки слева и справа в мобильной версии) и происходит анимация перелистывания. +15
   * На экране шириной 1440px  доступно 2 других скрытых картинки. При каждом нажатии выезжает следующая, и так до границ справа и слева. +2
   * Выделенная кнопка под каруселью - неактивная. +2
   * Если анимация карусели не успела завершиться, при этом нажата была следующая кнопка, то картинка не должна зависнуть в промежуточном состоянии. +2
   * На экране шириной 768px доступно 4 других скрытых картинки. +2
   * Неактивными становятся не только выделенные кнопки, но и стрелочки на границах карусели. +2

 V Слайдер в блоке Favorites
   * "Слайдер" реагирует на нажатие кнопок панели навигации и происходит анимация затухания и проявления. +15
   * На любой ширине экрана все 4 карточки с книгами одновременно будут плавно затухать, а затем плавно проявляться следующие. +2
   * Анимация может быть прервана следующим нажатием на кнопку выбора поры года, но при этом анимация не должна застывать в промежуточном состоянии. Если анимация не была прервана следующим нажатием кнопки, то она должна отрабатывать до конца. +2
   * Во время анимаций высота блока Favorites не должна меняться. +2
   * Панель навигации "слайдера" сделана по технологии "sticky" для разрешений с одним рядом книг (768px и меньше), т.е. опускается вниз вместе со скроллом страницы, прилипая к верхней части экрана, в рамках блока Favorites. +2

  V  До регистрации
  * Нажатие на кнопку Check the card ни к чему не приведёт.


  V До авторизации
  * Иконка юзера в хедере отображается в виде силуэта.
  * В блоке Favorites все кнопки должны иметь имя Buy, а не Own. +2


  Этап 2: Пользователь на этапе регистрации
 V Меню авторизации при нажатии на иконку пользователя
  * Нажатие на иконку пользователя в хедере открывает меню, которое должно оказаться под иконкой таким образом, что правый верхний угол меню находится в той же точке, что и нижний правый угол контейнера с иконкой в хедере. Меню под иконкой. +2
  * На разрешении 768px, при открытом бургер-меню, оно закрывается и открывается меню авторизации. +2
  * То же верно и в обратную сторону, кнопка бургер-меню должна быть доступна при открытом меню авторизации. +2
  * Нажатие на любую область или элемент вне меню приводят к закрытию меню авторизации. +2

 V Модальное окно REGISTER
  * Дизайн модального окна соответствует макету. +15.
  * При нажатии на кнопку Register появляется модальное окно REGISTER, где есть поля First name, Last name, E-mail и Password. +2
  * При нажатии кнопки Sign Up в блоке Digital Library Cards также появляется модальное окно REGISTER. +2
  * Окно центрировано, а область вокруг затемнена. +2
  * При нажатии на крестик в углу окна, или на затемнённую область вне этого окна, оно закрывается. +2
  * ограничения по полям - все поля должны быть не пустыми. +2
  * Пароль должен быть не короче 8 символов. +2
  * В поле E-mail  валидация типа email. +2
  
 V Окончание регистрации
  * Данные сохраняются в хранилище localStorage. +2
  * Иконка пользователя меняется на заглавные буквы имени. +2
  * Отображение страницы приходит в состояние после авторизации (этап 4). +2
  * сгенерирован девятизначный Card Number случайным образом в формате 16-ричного числа. +2

  V При наличии регистрации, но будучи не авторизованным
  * Блок Digital Library Cards. Если введённые имя и номер карты совпадают с данными пользователя, то отображается панель с информацией, вместо кнопки Check the card на 10 секунд. +2
  * Там же после отображения информации, кнопка возвращается в прежнее состояние, а поля в форме сбрасываются. +2


  Этап 3: Пользователь на этапе входа в учётную запись после регистрации.
  V Модальное окно LOGIN
    * Дизайн модального окна соответствует макету. +15
    * При нажатии на кнопку Log In появляется модальное окно LOGIN, где есть поля E-mail or readers card и Password. +2
    * При нажатии кнопки Log In в блоке Digital Library Cards также появляется модальное окно LOGIN. +2
    * Окно центрировано, а область вокруг затемнена. +2
    * При нажатии на крестик в углу окна, или на затемнённую область вне этого окна, оно закрывается. +2
    * Для авторизации все поля должны быть не пустыми. +2
    * Пароль должен быть не короче 8 символов. +2

  V  Блок Favorites
    * Если пользователь ещё не вошёл в учётную запись, то при нажатии на любую кнопку Buy открывается модальное окно LOGIN. +2



  Этап 4: Пользователь после входа в учётную запись
   V Меню профиля при нажатии на иконку с инициалами пользователя
       * При наведении курсором на иконку пользователя должно отображаться полное имя пользователя (атрибут title). +2
    * Нажатие на иконку пользователя в хедере открывает меню, которое должно оказаться под иконкой таким образом, что правый верхний угол меню находится в той же точке, что и нижний правый угол контейнера с иконкой в хедере. Меню под иконкой. +2
    * На разрешении 768px при открытом бургер-меню, оно закрывается и открывается меню авторизации. +2
    * То же верно и в обратную сторону, кнопка бургер-меню должна быть доступна. +2
    * Нажатие на любую область или элемент вне меню приводят к закрытию меню профиля. +2
    * Вместо надписи Profile отображается девятизначный Card Number. +2
    * Нажатие на кнопку My Profile открывает модальное окно MY PROFILE. +2
    * Нажатие на кнопку Log Out приводит к выходу пользователю из состояния авторизации, возвращаемся к этапу #1. +2

   V Модальное окно MY PROFILE
     * Дизайн модального окна соответствует макету. +15.
     * В случае если имя и фамилия слишком длинные и не влазят в блок то должен произойти перенос фамилии на следующую строку.
     * Счетчик для Visits отображает, сколько раз пользователь проходил процесс авторизации, включая самый первый - регистрацию. +2
     * Счетчик для Books отображает, сколько у пользователя книг находятся в состоянии Own. Значение варьируется 0-16. +2
     * Рядом с Card Number есть кнопка, нажатие на которую копирует код карты клиента в буфер обмена. +2
     * Окно центрировано, а область вокруг затемнена. +2
     * При нажатии на крестик в углу окна, или на затемненную область вне этого окна, оно закрывается. +2
  
   V Блок Favorites
    * При нажатии на любую кнопку Buy, еще до покупки абонемента, открывается модальное окно BUY A LIBRARY CARD. +2
    * При нажатии на любую кнопку Buy, после покупки абонемента, меняет вид кнопки на неактивную Own, добавляя единицу к счетчику книг в профиле. +2
    * После нажатия обновляется не только счетчик, но и название книги должно отобразится в разделе Rented Books. Название формируется по принципу <название книги>, <автор книги>. В случае если название книги слишком длинное или список стал слишком большой список книг в блоке Rented Books становится скроллируемым (по необходимости горизонтально/ вертикально или оба скролла сразу) Тайтл Rented Books скроллироваться не должен +2

  V Модальное окно BUY A LIBRARY CARD
    * Модальное окно нужно сделать шириной 640px. Будет это обрезка по 5px по бокам, или просто уменьшение длины с сохранением сетки - значения не имеет, хотя при правильной сеточной структуре, сделать это будет намного проще. +2
    * Дизайн модального окна соответствует макету. +15.
    * При нажатии на крестик в углу окна, или на затемнённую область вне этого окна, оно закрывается. +2
    * Для того, чтобы кнопка Buy была активна, все поля должны быть не пустыми. +2
    * Bank card number должен содержать 16 цифр. С пробелами каждые 4 символа или нет - значения не имеет. +2
    * Expiration code содержит 2 поля с ограничением в 2 цифры. +2
    * CVC должен содержать 3 цифры. +2
    * После удачного нажатия на кнопку Buy, окно закрывается, и больше мы к нему не возвращаемся.
    
  V Блок Digital Library Cards
    * При наличии авторизации вместо кнопки Check the Card будут отображаться данные пользователя и бейджи, как на дизайне LibraryCard after login in account. +2


  ВСЕГО: 200
`)