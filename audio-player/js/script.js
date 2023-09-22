document.addEventListener('DOMContentLoaded', ()=>{
    //create player
    const audio = new Audio();
    document.querySelector('.player').append(audio);
    audio.preload = 'auto';
    
    //global paramets
    let trackNumber;
    if (localStorage.getItem('trackNumber_ULIKE')) {
        trackNumber = localStorage.getItem('trackNumber_ULIKE')
    } else trackNumber = 1;
    let isPlaying = false;
    let trackDuration = 0;
    let trackLoop;

    if (localStorage.getItem('loop_ULIKE') == 'true') {
        document.querySelector('.loop').classList.add('isActive');
        trackLoop = true;
    } else trackLoop = false;

    const volume = document.querySelector('#volume');
    let muted = false;
    if (localStorage.getItem('isMuted_ULIKE') == 'true') {
        document.querySelector('.volume_btn').classList.add('muted');
        audio.muted = true;
        volume.disabled = true;
        volume.classList.add('disabled');
        muted = true;
    } else audio.muted = false;

    const playList = [
        {'src': 'audio/kish_anar.mp3',
         'author': 'Король и Шут',
         'title': "Мертвый Анархист",
         'img': 'img/dead_anar.jpg',
        'lyricks': `[Интро]<br>
        Ослепший старый маг<br>
        Ночью по лесу бродил<br>
        На кладбище разлил<br>
        Он волшебный эликсир<br>
        И лишь проговорил:<br>
        «Что ж я, старый, натворил!»<br>
        <br>
        [Бридж]<br>
        Хой!<br>
        Хой, хой!<br>
        Пого-пого!<br>
        <br>
        [Куплет 1]<br>
        Трупы оживали, землю разрывали<br>
        Всюду выползали, дико бушевали<br>
        Глотки драли, всё вокруг ломали<br>
        Рвали свою плоть<br>
        Это место люди не любили<br>
        Потому что здесь гадов хоронили<br>
        Все они водку пили<br>
        Проклятыми были<br>
        <br>
        [Припев]<br>
        Среди ублюдков шёл артист<br>
        В кожаном плаще, Мёртвый анархист<br>
        Крикнул он: «Хой! Челюсть долой!»<br>
        Трупов вёл он за собой<br>
        <br>
        [Бридж]<br>
        Хой, хой!<br>
        Пого-пого!<br>
        <br>
        [Куплет 2]<br>
        Бешено в деревню мёртвые ворвались!<br>
        В свете фонарей их рожи показались<br>
        Дрались и по-полной отрывались<br>
        Шли дома громить<br>
        Взяли люди топоры и вилы<br>
        Мертвецов загнать в свои могилы<br>
        Но на это не хватило силы<br>
        Трупов не убить!<br>
        <br>
        [Припев]<br>
        Среди ублюдков шёл артист<br>
        В кожаном плаще, Мёртвый анархист<br>
        Крикнул он: «Хой! Челюсть долой!»<br>
        Трупов вёл он за собой<br>
        Был на руке застывший фак<br>
        Из кармана торчал пиратский флаг<br>
        Зомби всю ночь кричали: «Хой!<br>
        Мы, анархисты, народ не злой!»<br>
        <br>
        [Куплет 3]<br>
        Что за наваждение! Без предупреждения<br>
        На отрока напали, сильно напугали<br>
        Смеялись и толкались, парнишку заставляли<br>
        Пого танцевать!<br>
        Что есть мочи женщины визжали<br>
        И крестьяне в панике бежали<br>
        Трупы дохли и снова оживали<br>
        Ржали людям вслед<br>
        <br>
        [Припев]<br>
        Среди ублюдков шёл артист<br>
        В кожаном плаще, Мёртвый анархист<br>
        Крикнул он: «Хой! Челюсть долой!»<br>
        Трупов вёл он за собой<br>
        Был на руке застывший фак<br>
        Из кармана торчал пиратский флаг<br>
        Зомби всю ночь кричали: «Хой!<br>
        Мы, анархисты, народ не злой!»<br>
        <br>
        [Аутро]<br>
        В жизни артист весёлым был<br>
        И нажраться он всегда любил<br>
        Утро крестьянам помогло<br>
        Солнце трупы за полчаса сожгло<br>
        Но в тишине ночной<br>
        В подвале кто-то рявкнул «Хой!»`},

        {'src': 'audio/kish_home.mp3',
        'author': 'Король и Шут',
        'title': "Проклятый Старый Дом",
        'img': 'img/home.jpg',
    'lyricks': `[Куплет 1]<br>
    В заросшем парке стоит старинный дом<br>
    Забиты окна, и мрак царит извечно в нем<br>
    Сказать я пытался: «Чудовищ нет на земле»<br>
    Но тут же раздался ужасный голос во мгле<br>
    Голос во мгле<br>
    <br>
    [Припев]<br>
    «Мне больно видеть белый свет, мне лучше в полной темноте<br>
    Я очень много-много лет мечтаю только о еде<br>
    Мне слишком тесно взаперти, и я мечтаю об одном:<br>
    Скорей свободу обрести, прогрызть свой ветхий старый дом<br>
    Проклятый старый дом»<br>
    <br>
    [Куплет 2]<br>
    Был дед, да помер, слепой и жутко злой<br>
    Никто не вспомнил о нём с зимы холодной той<br>
    Соседи не стали его тогда хоронить<br>
    Лишь доски достали, решили заколотить<br>
    Двери и окна<br>
    <br>
    [Припев]<br>
    «Мне больно видеть белый свет, мне лучше в полной темноте<br>
    Я очень много-много лет мечтаю только о еде<br>
    Мне слишком тесно взаперти, и я мечтаю об одном:<br>
    Скорей свободу обрести, прогрызть свой ветхий старый дом<br>
    Проклятый старый дом»<br>
    [Аутро]<br>
    И это место стороной обходит сельский люд<br>
    И суеверные твердят: «Там призраки живут»`},

        {'src': 'audio/puppicleaner.mp3',
        'author': 'MashUp',
        'title': "Polish Dancing Cow feat Old Sh*t Cleaner",
        'img': 'img/polish-dancing-cow.gif',
    'lyricks':'Непереводимая игра слов...'},

    {'src': 'audio/oxy.mp3',
        'author': 'Oxxxymiron',
        'title': "Погружение feat. Horus",
        'img': 'img/oxy.jpg',
    'lyricks':'Непереводимая игра слов...'}
    ]

    //set buttons functions to control player
    document.querySelector('.next').addEventListener('click', ()=> {
        audio.src = next(trackNumber);
        if (isPlaying) {
            play();
        };
    })

    document.querySelector('.prev').addEventListener('click', ()=> {
        audio.src = prev(trackNumber);
        if (isPlaying) {
            play();
        };
    })

    document.querySelector('.go-first').addEventListener('click', ()=> {
       audio.src = goToFirst();
        if (isPlaying) {
            play();
        }
    })

    document.querySelector('.go-last').addEventListener('click', ()=> {
       audio.src = goToLast();
         if (isPlaying) {
             play();
         }
         showDescription(trackNumber);
         changeBacground(trackNumber);
         changeCover(trackNumber);
         showLyricks(trackNumber);
     })
     
    const playControlBtn = document.querySelector('.play-control');
    playControlBtn.addEventListener('click', playControl)
    
    document.querySelector('.loop').addEventListener('click', () => {
        document.querySelector('.loop').classList.toggle('isActive');
        if (trackLoop) {
            audio.loop = false;
            trackLoop = false;
            localStorage.setItem('loop_ULIKE', trackLoop);
        } else {
            audio.loop = true;
            trackLoop = true;
            localStorage.setItem('loop_ULIKE', trackLoop);
        }
    })

    function next (num) {
        num++;
        if (num > playList.length) {
            num = 1;
        }
        trackNumber = num;
        localStorage.setItem('trackNumber_ULIKE', trackNumber);
        return playList[num - 1].src;
    }

    function prev (num) {
        num--;
        if (num === 0) {
            num = playList.length;
        }
        trackNumber = num;
        localStorage.setItem('trackNumber_ULIKE', trackNumber);
        return playList[num - 1].src;
    }

    function playControl() {
        document.querySelector('.img').classList.toggle('img_not_playing');
        if (isPlaying) {
            isPlaying = false;
            audio.pause();
            playControlBtn.classList.remove('pause');
            playControlBtn.classList.add('play');
        } else {
            isPlaying = true;
            audio.play();
            playControlBtn.classList.add('pause');
            playControlBtn.classList.remove('play');
        }
        
    }

    function play() {
        audio.play();
    }

    function goToLast() {
        trackNumber = playList.length;
        localStorage.setItem('trackNumber_ULIKE', trackNumber);
        return playList[playList.length - 1].src;
    }

    function goToFirst() {
        trackNumber = 1;
        localStorage.setItem('trackNumber_ULIKE', trackNumber);
        return playList[0].src;
    }


    //init player onload
    audio.src = playList[trackNumber - 1].src;
    showDescription(trackNumber);
    changeBacground(trackNumber);
    changeCover(trackNumber);
    document.querySelector('.volume_line').style.width = `${localStorage.getItem('volume_ULIKE') * 100 }%`;

    if (localStorage.getItem('currentTime_ULIKE')) {
        audio.currentTime = localStorage.getItem('currentTime_ULIKE')
    } else  audio.currentTime = 0;
    if (trackLoop) {
        audio.loop = true;
        document.querySelector('.loop').classList.add('isActive');
    }

    
    const progressBar = document.getElementById('progress-bar');

    audio.addEventListener('timeupdate', (event) => {
        changeProgressByPlayin();
        document.querySelector('.time_current').textContent = convertDuration(audio.currentTime);
    })
  

   
    function changeProgressByPlayin () {
        progressBar.value = audio.currentTime;
        document.querySelector('.progress_line').style.width = `${progressBar.value / progressBar.max * 100 + 0.5}%`;
        localStorage.setItem('currentTime_ULIKE', audio.currentTime);
        if (audio.currentTime >= audio.duration && !trackLoop) {
            audio.src = next(trackNumber);
            localStorage.setItem('trackNumber_ULIKE', trackNumber);
            if (isPlaying) {
                play();
            }
            showDescription(trackNumber);
            changeBacground(trackNumber);
            changeCover(trackNumber);
        }
    }

    audio.addEventListener('loadedmetadata', ()=>{
        progressBar.max = audio.duration;
        if (audio.duration) {
            document.querySelector('.time_total').textContent = convertDuration(audio.duration);
        }
        showDescription(trackNumber);
        changeBacground(trackNumber);
        changeCover(trackNumber);
        showLyricks(trackNumber);
        
    })

    progressBar.addEventListener('change', setTimeByProgressBar);
    progressBar.addEventListener('input', setTimeByProgressBar);
    function setTimeByProgressBar () {
        audio.currentTime = progressBar.value;
        document.querySelector('.progress_line').style.width = `${progressBar.value / progressBar.max * 96}%`;
    }

    
    function showDescription(i) {
    document.querySelector('.author').textContent = playList[i - 1].author;
    document.querySelector('.title').textContent = playList[i - 1].title;

    }

    function changeBacground(i) {
        document.querySelector('.background').style.background = `url('${playList[i - 1].img}') center center/cover`;
    }

    function changeCover (i) {
        document.querySelector('.img').style.background = `url('${playList[i - 1].img}') center center/cover`;
    }

    const lyricks = document.createElement('div');
    lyricks.classList.add('lyricks');

    document.querySelector('.text').addEventListener('click', () => {
        document.querySelector('.text').classList.toggle('isActive');
        showLyricks(trackNumber);
    })

    function showLyricks(i) {
        if (document.querySelector('.text').classList.contains('isActive')) {
            lyricks.innerHTML = playList[i - 1].lyricks;
            document.querySelector('.img').append(lyricks)     
        } else if(document.querySelector('.lyricks')) {
            document.querySelector('.lyricks').remove();    
            
        }
    }
    function convertDuration(value) {
        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value % 60);
        return `${addZero(minutes)}:${addZero(seconds)}`
    };

    function addZero(value) {
        if (value < 10) {
            return `0${value}`
        } else return value;
    };



    volume.addEventListener('input', () => {
        document.querySelector('.volume_btn').classList.remove('muted');
        audio.volume = volume.value / 100;
        localStorage.setItem('volume_ULIKE', volume.value / 100);
        document.querySelector('.volume_line').style.width = `${audio.volume * 100 }%`;
        if (volume.value == 0) {
            document.querySelector('.volume_btn').classList.add('muted');
        }
    })

    
    if (localStorage.getItem('volume_ULIKE')) {
        audio.volume = localStorage.getItem('volume_ULIKE');
        volume.value = localStorage.getItem('volume_ULIKE') * 100;
        if (volume.value == 0) {
            document.querySelector('.volume_btn').classList.add('muted');
            localStorage.setItem('isMuted_ULIKE', true);
        }
    } else audio.volume = 0.5;


    document.querySelector('.volume_btn').addEventListener('click', () => {
        if (muted) {
            document.querySelector('.volume_btn').classList.remove('muted');
            audio.muted = false;
            muted = false;
            volume.disabled = false;
            volume.classList.remove('disabled');
            localStorage.setItem('isMuted_ULIKE', false);
        } else {
            document.querySelector('.volume_btn').classList.add('muted');
            audio.muted = true;
            muted = true;
            volume.disabled = true;
            volume.classList.add('disabled');
            localStorage.setItem('isMuted_ULIKE', true);
        }
        
    })
})

