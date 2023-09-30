//settings
let modeLifes = false;
let modeTimeLimit = false;
let scoresIndex = 0;
let time = 5;
let timerActive = false;
//initial render


const modeLifesSwitcher = document.querySelector('.mode_lifes_checkbox');
const modeTimeSwitcher = document.querySelector('.mode_time-limit_checkbox');

modeLifesSwitcher.addEventListener('click', (e)=>{
    if (modeLifes) { modeLifes = false} else {modeLifes = true}
    render();
});

modeTimeSwitcher.addEventListener('click', (e)=>{
    if (modeTimeLimit) { modeTimeLimit = false} else {modeTimeLimit = true}
    render();

    if (timerActive) {
        timerActive = false;
        time = 5;
        clearInterval(timerID);
        document.querySelector('.timer_count').textContent = time;
    }
});

let scores = document.querySelector('.scores')

//pick N pars of words from DB
const appContainer = document.querySelector('.app__container');
let cardsAmount = 1000;
let setupAmount = document.querySelector('#words_amount');
const wordAmountShow = document.querySelector('.word_amount_show');
let rusArr = [];
let engArr = [];

async function loadResources() {
    await fetch('./words.json').then((data)=>{
        return data.json()
    }).then((data) =>{
       
        for (let i = 0; i<=cardsAmount; i++) {
            let itemEng = {};
            let itemRus = {};
            itemEng.id = data[i].id;
            itemEng.en = data[i].en
            itemRus.id = data[i].id;
            itemRus.ru = data[i].ru.split(',')[0].split('(')[0]
            engArr.push(itemEng)
            rusArr.push(itemRus)

        }
 
    })

    renderWordsCard(5, '.eng__word', '.rus__word');
    
//установка количества карточек
wordAmountShow.textContent = setupAmount.value
setupAmount.addEventListener('input', ()=>{
    wordAmountShow.textContent = setupAmount.value;
    engParent.innerHTML='';
    rusParent.innerHTML='';
    render();

    
})
//активность карточек
let rus;
let eng;

appContainer.addEventListener('click', (e)=>{
  if (e.target.classList.contains('word__card') && modeTimeLimit) {
    startTimer();
    console.log('ddd')
  }
    if (e.target.classList.contains('rus') && !e.target.classList.contains('active')) {
        document.querySelectorAll('.rus__word > div').forEach((item)=>{item.classList.remove('active')});
        e.target.classList.add('active');
        rus = e.target;
    } else if (e.target.classList.contains('rus') && e.target.classList.contains('active')) {
        e.target.classList.remove('active')
    } else  if (e.target.classList.contains('eng') && !e.target.classList.contains('active')) {
        document.querySelectorAll('.eng__word > div').forEach((item)=>{item.classList.remove('active')});
        e.target.classList.add('active');
        eng = e.target;
    } else if (e.target.classList.contains('eng') && e.target.classList.contains('active')) {
        e.target.classList.remove('active')
    }

})
}


loadResources(); 
let engParent = document.querySelector('.eng__word'),
          rusParent = document.querySelector('.rus__word')
function renderWordsCard(count, engParentSelector, rusParentSelector) {
     engParent = document.querySelector(engParentSelector),
          rusParent = document.querySelector(rusParentSelector)

    let sessionRusCard = [];
    let sessionEngCard = [];
    for (let i = 0; i < count; i++) {

        const rand = Math.round(Math.random()*999);


        const newEngCard = document.createElement('div');
        newEngCard.classList.add('word__card', 'eng');
        newEngCard.dataset.id = rand;
        newEngCard.textContent = (engArr[rand].en);
        sessionEngCard.push(newEngCard);

        const newRusCard = document.createElement('div');
        newRusCard.classList.add('word__card', 'rus');
        newRusCard.dataset.id = rand;
        newRusCard.textContent = (rusArr[rand].ru);
        sessionRusCard.push(newRusCard);
 
    }
    sessionEngCard.forEach((item)=>{
        engParent.append(item)
    })

    shuffle(sessionRusCard).forEach((item)=>{
        rusParent.append(item)
    })
}

//перемешивание элементов в массиве
function shuffle(arr){
	let j, temp;
	for(let i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

// function deletePair(eng, rus) {
//    console.log(eng)

//         if (typeof eng || typeof rus === undefined) {
//             return
//         } 
//          if(eng.getAttribute(['data-id']) === rus.getAttribute(['data-id'])) {
//             eng.remove();
//             rus.remove();
//             console.log('pair')
//         }


// }


function deletePair() {
    let rusCard = document.querySelector('.rus__word > .active');
    let engCard = document.querySelector('.eng__word > .active');
   
    if (rusCard == null || engCard == null) {
        return
    } else if (rusCard.dataset.id === engCard.dataset.id) {
            rusCard.remove();
            engCard.remove();
            renderWordsCard(1, '.eng__word', '.rus__word')
            countScore();
    } else if (rusCard.dataset.id != engCard.dataset.id) {
        appContainer.style.background  = 'red';
        setTimeout(()=>{
            appContainer.style.background  = '';
        }, 300);
        minusLifes();
        rusCard.classList.remove('active');
        engCard.classList.remove('active');
    }
    
}

setInterval(deletePair, 10)


//lifes
function minusLifes(mode_lifes) {
    if (modeLifes) {
        
        let lifes = document.querySelectorAll('.lifes > div');

        if (lifes.length <= 0) {
            checkLifes()
        } else {
            lifes[0].remove();
            checkLifes()
        }
        
    }
   
}

function checkLifes() {
    let lifes = document.querySelectorAll('.lifes > div');
    if (lifes.length <= 0) {
       document.querySelector('.lifes').textContent = 'GAME OVER!';
       appContainer.innerHTML =' <h1>Press R to reload</h1>';
       document.addEventListener('keydown', (e)=>{
        if (e.code =='KeyR') {
            location.reload();
        }
       })

    } else {
        console.log('game')
    }
}






function render() {
    engParent.innerHTML='';
    rusParent.innerHTML='';
    scoresIndex = 0;
    scores.textContent = scoresIndex;
    document.querySelector('.timer_count').textContent = time;
    document.querySelector('.lifes').style.display = 'none';
    document.querySelector('.timer').style.display = 'none';
    document.querySelector('.lifes').innerHTML='<div></div><div></div><div></div>'
    renderWordsCard(setupAmount.value, '.eng__word', '.rus__word');   
    if (modeLifes) {
        document.querySelector('.lifes').style.display = 'flex';
        };
        if (modeTimeLimit) {
            document.querySelector('.timer').style.display = 'flex';
            }
}


function countScore() {
       scoresIndex++;
       scores.textContent = scoresIndex;

}

function downCount() {
        time--;
        document.querySelector('.timer_count').textContent = time;
        if (time == 0) {
            clearInterval(timerID);
            appContainer.innerHTML =' <h1>Time is out. <br><br> Press R to play again.</h1>';
            document.addEventListener('keydown', (e)=>{
        if (e.code =='KeyR') {
            location.reload();
        }
        })
}}
let timerID;
const startTimer = () => {timerID = setInterval(downCount, 1000)}
// timer()



