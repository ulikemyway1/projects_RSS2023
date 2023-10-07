//settings
let settings = {};
if (localStorage.getItem('settings_ULIKE')) {
    settings = JSON.parse(localStorage.getItem('settings_ULIKE')); 
} else {
    settings = {
        modeLifes: false,
        modeTimeLimit: false,
    };
}
let modeLifes = settings.modeLifes;
let modeTimeLimit = settings.modeTimeLimit;
let scoresIndex = 0;
let timeDown = 120;
let timeUp = 0;
let timerDownActive = false;
let timerApActive = false;
let timerCount;
let timerDown;
let wantedScores = 5;
const startTimerDown = () => {timerDown = setInterval(downCount, 1000)}
const startTimerUp = () => {timerUp = setInterval(upCount, 1000)}
// sounds
const clickSound = new Audio;
clickSound.src = 'sounds/click.mp3';
const errorSound = new Audio;
errorSound.src = 'sounds/error.mp3';
const okSound = new Audio;
okSound.src = 'sounds/ok.mp3';



//


//initial render
let playersDB = [];
if (localStorage.getItem('playersDB_ULIKE')) {
    playersDB = JSON.parse(localStorage.getItem('playersDB_ULIKE')); 
}

const modeLifesSwitcher = document.querySelector('.mode_lifes_checkbox');
const modeTimeSwitcher = document.querySelector('.mode_time-limit_checkbox');

modeLifesSwitcher.addEventListener('click', (e)=>{
    if (modeLifes) {
        settings.modeLifes = false;
        localStorage.setItem('settings_ULIKE', JSON.stringify(settings));
        
    } else {
        settings.modeLifes = true;
        localStorage.setItem('settings_ULIKE', JSON.stringify(settings));
    }
    render();
});

modeTimeSwitcher.addEventListener('click', (e)=>{
    if (modeTimeLimit) {
        settings.modeTimeLimit = false;
        localStorage.setItem('settings_ULIKE', JSON.stringify(settings));
    } else {
        settings.modeTimeLimit = true;
        localStorage.setItem('settings_ULIKE', JSON.stringify(settings));
    }
    render();

});

let scores = document.querySelector('.session_scores')

//pick 8000 pars of words from DB
const appContainer = document.querySelector('.app__container');
let cardsAmount = 8000;
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
}

    
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
    if (e.target.classList.contains('word__card')) {
        if (!timerApActive) {
            timerApActive = true;
            startTimerUp();
            } 
          if (e.target.classList.contains('word__card') && modeTimeLimit && !timerDownActive ) {
            startTimerDown();
            timerDownActive = true;
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
            let rusCard = document.querySelector('.rus__word > .active');
            let engCard = document.querySelector('.eng__word > .active');
            if ((rusCard && !engCard) || (!rusCard && engCard) || (!rusCard && !engCard)) {
                clickSound.play();
            }
            deletePair();
    }
  
})

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
        shuffle(sessionEngCard).forEach((item)=>{
        engParent.append(item)
    })

       shuffle(sessionRusCard).forEach((item)=>{
        rusParent.append(item)
    })
}

//shuffle elements of array
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
// shuffle word cards after removing one pair
function shuffleField() {
    let shuffledRUS = [];
    let shuffledENG = [];
    document.querySelectorAll('.eng').forEach(item => shuffledENG.push(item))
    document.querySelectorAll('.rus').forEach(item => shuffledRUS.push(item))
    shuffledENG = shuffle(shuffledENG);
    shuffledRUS = shuffle(shuffledRUS);
    document.querySelectorAll('.eng').forEach(item => item.remove())
    document.querySelectorAll('.rus').forEach(item => item.remove())
    shuffledENG.forEach(item => engParent.append(item));
    shuffledRUS.forEach(item => rusParent.append(item));
}

function deletePair() {
    let rusCard = document.querySelector('.rus__word > .active');
    let engCard = document.querySelector('.eng__word > .active');
   
    if (rusCard == null || engCard == null) {
        return
    } else if (rusCard.dataset.id === engCard.dataset.id) {
            okSound.play();
            appContainer.classList.add('ok');
            setTimeout(()=>{
                appContainer.classList.remove('ok');
            }, 100);
            rusCard.remove();
            engCard.remove();
            renderWordsCard(1, '.eng__word', '.rus__word');
            shuffleField();
            countScore();
    } else if (rusCard.dataset.id != engCard.dataset.id) {
        errorSound.play();
        appContainer.classList.add('errors');
        setTimeout(()=>{
            appContainer.classList.remove('errors');
        }, 50);
        minusLifes();
        rusCard.classList.remove('active');
        engCard.classList.remove('active');
    } 
}

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
      if(timerDown) {
        clearInterval(timerDown);
      }
      if(timerApActive) {
        clearInterval(timerUp);
      }
       appContainer.innerHTML =' <h1>Game Over</h1>';
       const reloadBtn = document.createElement('button');
       reloadBtn.classList.add('reload_btn');
       reloadBtn.textContent = 'Start New Game';
       appContainer.classList.add('game_over');
       appContainer.append(reloadBtn);
       reloadBtn.addEventListener('click', () => {
        location.reload();
       })

    }
}


function render() {
    engParent.innerHTML = '';
    rusParent.innerHTML = '';
    scoresIndex = 0;
    scores.textContent = scoresIndex;
    document.querySelector('.timer_count').textContent = timeDown;
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

function downCount() {
        timeDown--;
        document.querySelector('.timer_count').textContent = timeDown;
        if (timeDown == 0) {
            clearInterval(timerDown);
            appContainer.innerHTML =' <h1>Time is out. <br><br> Press R to play again.</h1>';
            if(timerApActive) {
                clearInterval(timerUp);
              }
            document.addEventListener('keydown', (e)=>{
        if (e.code =='KeyR') {
            location.reload();
        }
        })
}}

function upCount() {
    timeUp++;
    document.querySelector('.timeUp').textContent = timeUp;
}

function countScore() {
    scoresIndex++;
    scores.textContent = scoresIndex;
    if (scoresIndex === wantedScores) {
        win()
    }
}
const winForm = document.getElementById('win_form');
function win() {
    clearInterval(timerUp);
    clearInterval(timerDown);
    const winPanel = document.querySelector('.win');
    winPanel.classList.remove('hidden')
    const winTime = document.querySelector('.win_time');
    winTime.textContent =`You've scored 5 points in ${timeUp} s`;
    const sendNameBtn = document.getElementById('send_player_name');
    const playerName = document.getElementById('player_name');
    playerName.addEventListener('input', () => {
    if (playerName.value.trim().length > 0) {
        sendNameBtn.disabled = false;
    } else {
        sendNameBtn.disabled = true;
    }
    })
sendNameBtn.addEventListener('click', makeRecord);
winForm.addEventListener('submit', (e) => {
    e.preventDefault();
})
function makeRecord () {
    if (playerName.value.trim().length > 0) {
        saveLocal(playerName.value.trim());
        playerName.value = '';
        setTimeout(()=>{
            winPanel.classList.add('hidden')
        }, 400);
        location.reload();
    }
}
}



function saveLocal(name) {
    let player = new Object;
    player.name = name;
    player.time = timeUp;
    playersDB.push(player);
    playersDB.sort((a, b) => a.time - b.time );
    localStorage.setItem('playersDB_ULIKE', JSON.stringify(playersDB.filter((item, index) => {
        if (index < 10) {
            return item}
    })));
}



//open settings
modals = document.querySelectorAll('.modal');
btns = document.querySelectorAll('.btn');
settingsBtn = document.getElementById('settings_btn');
settingsPanel = document.querySelector('.settings');
infoBtn = document.getElementById('info_btn');
infoPanel = document.querySelector('.info');
scoresBtn = document.getElementById('scores_btn');
scoresPanel = document.querySelector('.scores');

settingsBtn.addEventListener('click', () => {
    settingsBtn.classList.toggle('active');
    if (!settingsPanel.classList.contains('hidden')) {
        settingsPanel.classList.toggle('hidden');
    } else {
           modals.forEach(modal => modal.classList.add('hidden'));
           settingsPanel.classList.toggle('hidden');
           btns.forEach(modal => modal.classList.remove('active'));
           settingsBtn.classList.add('active');  
    }
})

infoBtn.addEventListener('click', () => {
    infoBtn.classList.toggle('active');
    if (!infoPanel.classList.contains('hidden')) {
        infoPanel.classList.toggle('hidden');
    } else {
           modals.forEach(modal => modal.classList.add('hidden'));
           infoPanel.classList.toggle('hidden');
           btns.forEach(modal => modal.classList.remove('active'));
           infoBtn.classList.add('active');  
    }
})

scoresBtn.addEventListener('click', () => {
    scoresBtn.classList.toggle('active');
    createTopList();
    if (!scoresPanel.classList.contains('hidden')) {
        scoresPanel.classList.toggle('hidden');
    } else {
           modals.forEach(modal => modal.classList.add('hidden'));
           scoresPanel.classList.toggle('hidden');
           btns.forEach(modal => modal.classList.remove('active'));
           scoresBtn.classList.add('active');  
    }
})

function createTopList() {
    const scoreTable = document.querySelector('.score_table');
    scoreTable.innerHTML = 'Nothing to show yet...';
    if (playersDB.length != 0) {
        scoreTable.innerHTML = '';
        playersDB.forEach((player) => {
            const record = document.createElement('li');
            record.textContent = `${player.name} scored 5 points in ${player.time} s`;
            scoreTable.append(record);
        })
    } 
}

if (modeLifes) {
    document.querySelector('.lifes').style.display = 'flex';
    modeLifesSwitcher.checked = true;
    };

if (modeTimeLimit) {
        document.querySelector('.timer').style.display = 'flex';
        modeTimeSwitcher.checked = true;
        }

const applySettingsBtn = document.querySelector('#apply_settings');
applySettingsBtn.addEventListener('click', () => {
    location.reload();
})