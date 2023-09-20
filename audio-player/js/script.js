document.addEventListener('DOMContentLoaded', ()=>{
    //global paramets
    let trackNumber = 1;
    let isPlaying = false;
    let trackDuration = 0;
    let trackLoop = false;
    //

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
    'lyricks':'Непереводимая игра слов...'}
    ]
    //create player
    const audio = new Audio();
    document.querySelector('.player').append(audio);
    // audio.controls = 'true';
    audio.loop = false;
    audio.preload = 'auto';

    //set buttons functions to control player
    document.querySelector('.next').addEventListener('click', ()=> {
        audio.src = next(trackNumber);
        if (isPlaying) {
            play();
        };
        showDescription(trackNumber);
        changeBacground(trackNumber);
        changeCover(trackNumber);
        showLyricks(trackNumber);
    })

    document.querySelector('.prev').addEventListener('click', ()=> {
        audio.src = prev(trackNumber);
        if (isPlaying) {
            play();
        };
        showDescription(trackNumber);
        changeBacground(trackNumber);
        changeCover(trackNumber);
        showLyricks(trackNumber);
    })

    document.querySelector('.go-first').addEventListener('click', ()=> {
       audio.src = goToFirst();
        if (isPlaying) {
            play();
        }
        showDescription(trackNumber);
        changeBacground(trackNumber);
        changeCover(trackNumber);
        showLyricks(trackNumber);
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
        } else {
            audio.loop = true;
            trackLoop = true;
        }
    })

    function next (num) {
        num++;
        if (num > playList.length) {
            num = 1;
        }
        trackNumber = num;
        return playList[num - 1].src
    }

    function prev (num) {
        num--;
        if (num === 0) {
            num = playList.length;
        }
        trackNumber = num;
        return playList[num - 1].src
    }

    function playControl() {
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
        return playList[playList.length - 1].src
    }

    function goToFirst() {
        trackNumber = 1;
        return playList[0].src
    }


    //init player onload
    audio.src = playList[0].src;
    showDescription(trackNumber);
    changeBacground(trackNumber);
    changeCover(trackNumber);
    
    const progressBar = document.getElementById('progress-bar');

    audio.addEventListener('timeupdate', (event) => {
        changeProgressByPlayin();
    })
  

   
    function changeProgressByPlayin () {
        progressBar.value = audio.currentTime;
        if (audio.currentTime >= audio.duration && !trackLoop) {
            audio.src = next(trackNumber);
            if (isPlaying) {
                play();
            }
            showDescription(trackNumber);
            changeBacground(trackNumber);
            changeCover(trackNumber);
        }
    }

    audio.addEventListener('loadedmetadata', ()=>{
        progressBar.max = audio.duration

    })

    progressBar.addEventListener('change', setTimeByProgressBar)
    function setTimeByProgressBar () {
        audio.currentTime = progressBar.value;
    }

    // progressBar.addEventListener('click', setTimeByProgressBar)
    // function setTimeByProgressBar () {
    //     audio.currentTime = progressBar.value;
    // }

    
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
})

