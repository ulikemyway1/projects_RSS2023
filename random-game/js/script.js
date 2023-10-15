//settings
let settings = {};
if (localStorage.getItem('settings_ULIKE')) {
    settings = JSON.parse(localStorage.getItem('settings_ULIKE')); 
} else {
    settings = {
        modeLifes: false,
        modeTimeLimit: false,
        modeEndless: false,
        cardsAmount: 5,
    };
}

let scoresIndex = 0;
let timeDown = 120;
let timeUp = 0;
let timerDownActive = false;
let timerApActive = false;
let timerCount;
let timerDown;
let wantedScores = 5;
let pairs = 0;
let truePairs = 0;
const startTimerDown = () => {timerDown = setInterval(downCount, 1000)};
const startTimerUp = () => {timerUp = setInterval(upCount, 1000)};
if (settings.modeEndless) {
    document.querySelector('.stat_accuracy').style.display = 'unset';
}
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
let playersDBAccurasy = [];
if (localStorage.getItem('playersDB_ULIKE')) {
    playersDB = JSON.parse(localStorage.getItem('playersDB_ULIKE')); 
}
if (localStorage.getItem('playersDBAccurasy_ULIKE')) {
    playersDBAccurasy = JSON.parse(localStorage.getItem('playersDBAccurasy_ULIKE')); 
}

const modeLifesSwitcher = document.querySelector('.mode_lifes_checkbox');
const modeTimeSwitcher = document.querySelector('.mode_time-limit_checkbox');
const modeEndlessSwitcher = document.querySelector('.mode_endless_checkbox');
modeLifesSwitcher.addEventListener('click', (e)=>{
    if (settings.modeLifes) {
        settings.modeLifes = false;
        localStorage.setItem('settings_ULIKE', JSON.stringify(settings));
        
    } else {
        settings.modeLifes = true;
        localStorage.setItem('settings_ULIKE', JSON.stringify(settings));
    }
    render();
});

modeTimeSwitcher.addEventListener('click', (e)=>{
    if (settings.modeTimeLimit) {
        settings.modeTimeLimit = false;
        localStorage.setItem('settings_ULIKE', JSON.stringify(settings));
    } else {
        settings.modeTimeLimit = true;
        localStorage.setItem('settings_ULIKE', JSON.stringify(settings));
    }
    render();
});

modeEndlessSwitcher.addEventListener('click', (e)=>{
    if (settings.modeEndless) {
        settings.modeEndless = false;
        localStorage.setItem('settings_ULIKE', JSON.stringify(settings));
    } else {
        settings.modeEndless = true;
        localStorage.setItem('settings_ULIKE', JSON.stringify(settings));
    }
    timeUp = 0;
    timeDown = 120;
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

renderWordsCard(settings.cardsAmount, '.eng__word', '.rus__word');
}

    
//установка количества карточек
wordAmountShow.textContent = setupAmount.value
setupAmount.addEventListener('input', ()=>{
    wordAmountShow.textContent = setupAmount.value;
    settings.cardsAmount = setupAmount.value;
    localStorage.setItem('settings_ULIKE', JSON.stringify(settings));
    engParent.innerHTML='';
    rusParent.innerHTML='';
    timeUp = 0;
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
          if (e.target.classList.contains('word__card') && settings.modeTimeLimit && !timerDownActive ) {
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
    rusParent = document.querySelector(rusParentSelector);
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
        return;
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
            if (settings.modeEndless) {
                pairs++;
                truePairs++;
                document.querySelector('.session_accuracy').textContent = calculateАccuracy(pairs, truePairs);
                stopGame.disabled = false;
            };
    } else if (rusCard.dataset.id != engCard.dataset.id) {
        if (settings.modeEndless) {
        pairs++;
        document.querySelector('.session_accuracy').textContent = calculateАccuracy(pairs, truePairs);
        };
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
    if (settings.modeLifes) {
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
    document.querySelector('.stat_accuracy ').style.display = 'none';
    document.querySelector('.lifes').innerHTML='<div></div><div></div><div></div>'
    renderWordsCard(settings.cardsAmount, '.eng__word', '.rus__word');   
    if (settings.modeLifes) {
        document.querySelector('.lifes').style.display = 'flex';
    };
    if (settings.modeTimeLimit) {
            document.querySelector('.timer').style.display = 'flex';
     }
     if (settings.modeEndless) {
        document.querySelector('.stat_accuracy').style.display = 'unset';
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
    if (scoresIndex === wantedScores && !settings.modeEndless) {
        win()
    }
}
const winForm = document.getElementById('win_form');
function win() {
   if(timeUp) {
    clearInterval(timerUp);
   }
   if (timeDown) {
    clearInterval(timerDown);
   }
    const winPanel = document.querySelector('.win');
    winPanel.classList.remove('hidden');
    wordsWrapper.classList.add('hidden');
    btns.forEach(item => item.disabled = true);
    modules.classList.add('hidden');
    const winTime = document.querySelector('.win_time');
    if (!settings.modeEndless) {
        winTime.textContent =`You've scored 5 points in ${timeUp} s`
    } else {
        winTime.textContent =`You've scored ${scoresIndex} p. in ${timeUp} s with ${Number.parseInt(document.querySelector('.session_accuracy').textContent)}% accuracy`;
    }
    const sendNameBtn = document.getElementById('send_player_name');
    const playerName = document.getElementById('player_name');
    playerName.addEventListener('input', () => {
    if (playerName.value.trim().length > 0) {
        sendNameBtn.disabled = false;
    } else {
        sendNameBtn.disabled = true;
    }
    })
    if (!settings.modeEndless) {
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
    } else {
        sendNameBtn.addEventListener('click', makeRecordAccurate);
        winForm.addEventListener('submit', (e) => {
            e.preventDefault();
        })
        function makeRecordAccurate () {
            if (playerName.value.trim().length > 0) {
                saveLocalAccurate(playerName.value.trim());
                playerName.value = '';
                setTimeout(()=>{
                    winPanel.classList.add('hidden');
                    wordsWrapper.classList.remove('hidden');
                    btns.forEach(item => item.disabled = false);
                    modules.classList.remove('hidden');
                }, 400);
                location.reload();
            }
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

function saveLocalAccurate (name) {
    let player = new Object;
    player.name = name;
    player.scores = scoresIndex;
    player.accuracy = Number.parseInt(document.querySelector('.session_accuracy').textContent);
    playersDBAccurasy.push(player);
    playersDBAccurasy.sort((b, a) => a.accuracy - b.accuracy);
    localStorage.setItem('playersDBAccurasy_ULIKE', JSON.stringify(playersDBAccurasy.filter((item, index) => {
        if (index < 10) {
            return item}
    })));
}
const stopGame = document.querySelector('.stop_game');
stopGame.addEventListener('click', () => {
    if(timeUp) {
        clearInterval(timerUp);
    }
    if (timeDown) {
        clearInterval(timerDown);
    }
    win();
});
//open settings
const modals = document.querySelectorAll('.modal');
const btns = document.querySelectorAll('.btn');
const settingsBtn = document.getElementById('settings_btn');
const settingsPanel = document.querySelector('.settings');
const infoBtn = document.getElementById('info_btn');
const infoPanel = document.querySelector('.info');
const scoresBtn = document.getElementById('scores_btn');
const scoresPanel = document.querySelector('.scores');
const wordsWrapper = document.querySelector('.words_wrapper');
const modules = document.querySelector('.mode_modules');

settingsBtn.addEventListener('click', () => {
    settingsBtn.classList.toggle('active');
    wordsWrapper.classList.add('hidden');
    modules.classList.add('hidden');
    if (!settingsPanel.classList.contains('hidden')) {
        settingsPanel.classList.toggle('hidden');
        wordsWrapper.classList.remove('hidden');
        modules.classList.remove('hidden');
    } else {
           modals.forEach(modal => modal.classList.add('hidden'));
           settingsPanel.classList.toggle('hidden');
           btns.forEach(modal => modal.classList.remove('active'));
           settingsBtn.classList.add('active');  
    }
})

infoBtn.addEventListener('click', () => {
    infoBtn.classList.toggle('active');
    wordsWrapper.classList.add('hidden');
    modules.classList.add('hidden');
    if (!infoPanel.classList.contains('hidden')) {
        infoPanel.classList.toggle('hidden');
        wordsWrapper.classList.remove('hidden');
        modules.classList.remove('hidden');
    } else {
           modals.forEach(modal => modal.classList.add('hidden'));
           infoPanel.classList.toggle('hidden');
           btns.forEach(modal => modal.classList.remove('active'));
           infoBtn.classList.add('active');  
    }
})

scoresBtn.addEventListener('click', () => {
    scoresBtn.classList.toggle('active');
    wordsWrapper.classList.add('hidden');
    modules.classList.add('hidden');
    createTopList();
    if (!scoresPanel.classList.contains('hidden')) {
        scoresPanel.classList.toggle('hidden');
        wordsWrapper.classList.remove('hidden');
        modules.classList.remove('hidden');
    } else {
           modals.forEach(modal => modal.classList.add('hidden'));
           scoresPanel.classList.toggle('hidden');
           btns.forEach(modal => modal.classList.remove('active'));
           scoresBtn.classList.add('active');  
    }
})
const scoreTable = document.querySelector('.score_table');
const accurateTable = document.querySelector('.accurate_table');

function createTopList() {
    scoreTable.innerHTML = 'Nothing to show yet...';
    accurateTable.innerHTML = 'Nothing to show yet...';
    if (playersDB.length != 0) {
        scoreTable.innerHTML = '';
        playersDB.forEach((player) => {
            const record = document.createElement('li');
            record.textContent = `${player.name} scored 5 points in ${player.time} s`;
            scoreTable.append(record);
        })
    };
    if (playersDBAccurasy.length != 0) {
        accurateTable.innerHTML = '';
        playersDBAccurasy.forEach((player) => {
            const recordAccurasy = document.createElement('li');
            recordAccurasy.textContent = `${player.name} scored ${player.scores} p. with ${player.accuracy}% accuracy`;
            accurateTable.append(recordAccurasy);
        })
    } 
}

setupAmount.value = settings.cardsAmount;
wordAmountShow.textContent = settings.cardsAmount;

if (settings.modeLifes) {
    document.querySelector('.lifes').style.display = 'flex';
    modeLifesSwitcher.checked = true;
    };

if (settings.modeTimeLimit) {
        document.querySelector('.timer').style.display = 'flex';
        modeTimeSwitcher.checked = true;
        }

if (settings.modeEndless) {
     modeEndlessSwitcher.checked = true;
            }

const applySettingsBtn = document.querySelector('#apply_settings');
applySettingsBtn.addEventListener('click', () => {
    location.reload();
})

//endless mode
function calculateАccuracy(pairs, truePairs) {
    return `${Math.round(truePairs / pairs * 100)}%`
}

const resultBtns = document.querySelector('.game_result_wrapper');
const fastestBtn = document.querySelector('.fastest');
const accurateBtn = document.querySelector('.more_accurate');
resultBtns.addEventListener('click', (e) => {
    if (e.target == accurateBtn) {
        e.target.classList.add('active');
        fastestBtn.classList.remove('active');
        scoreTable.style.display = 'none';
        accurateTable.style.display = 'block';
    }
    if (e.target == fastestBtn) {
        e.target.classList.add('active');
        accurateBtn.classList.remove('active');
        scoreTable.style.display = 'block';
        accurateTable.style.display = 'none';
    }
})


//helloween theme
let creaturesMoving = false;
const hellThemeBtn = document.querySelector('#hell_theme');
const container = document.querySelector('.container');
const spider = document.createElement('img');
const witch = document.createElement('img');
hellThemeBtn.addEventListener('click', ()=> {
    if (!hellThemeBtn.classList.contains('turn_on')) {
        hellThemeBtn.classList.add('turn_on');
        localStorage.setItem('helloween_ULIKE', true)
    } else {
        hellThemeBtn.classList.remove('turn_on');
        localStorage.setItem('helloween_ULIKE', false);
    }
    helloween();
})

function helloween() {
    document.body.classList.toggle('hell_bg');
    container.classList.toggle('hell_bg_color');
    spider.classList.add('spider')
    spider.src = 'theme/spider.svg';
    container.append(spider);
    witch.classList.add('witch');
    witch.src='theme/witch.svg';
    container.append(witch);
    if (!creaturesMoving) {
        moveCreatures();
        creaturesMoving = true;
    }

    if (!JSON.parse(localStorage.getItem('helloween_ULIKE'))) {
        spider.remove();
        witch.remove();
    }

}

if (JSON.parse(localStorage.getItem('helloween_ULIKE'))) {
    helloween();
    hellThemeBtn.classList.add('turn_on');
}

function moveCreatures() {
    function moveSpider45 (spider) {
        spider.style.transform = 'rotate(35deg)';
        spider.style.top = '-40px'
    }
    function moveSpiderMinus45 (spider) {
        spider.style.transform = 'rotate(-35deg)';
        spider.style.top = '-15px'
    }
    
   const move1 = setInterval(() => moveSpider45(spider), 2000);
   const move2 = setInterval(() => moveSpiderMinus45(spider), 4000);
    
    function moveWitchLeft (witch) {
        witch.style.transform = 'translateX(-100%) translateY(-30%)'
    }
    
    function moveWitchRight (witch) {
        witch.style.transform = 'translateX(100%) translateY(100%) rotate(110deg)'
    }
    const move3 = setInterval(() => moveWitchLeft(witch), 10000);
    const move4 =  setInterval(() => moveWitchRight(witch), 12000);
    
}


