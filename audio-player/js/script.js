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
         'img': '/img/dead_anar.jpg'},

        {'src': 'audio/kish_home.mp3',
        'author': 'Король и Шут',
        'title': "Проклятый Старый Дом",
        'img': 'img/home.jpg'},

        {'src': 'audio/puppicleaner.mp3',
        'author': 'MashUp',
        'title': "Polish Dancing Cow feat Old Sh*t Cleaner",
        'img': 'img/polish-dancing-cow.gif'}
    ]
    //create player
    const audio = new Audio();
    document.querySelector('.player').append(audio);
    // audio.controls = 'true';
    audio.loop = false;

    //set buttons functions to control player
    document.querySelector('.next').addEventListener('click', ()=> {
        audio.src = next(trackNumber);
        if (isPlaying) {
            play();
        };
        showDescription(trackNumber);
        changeBacground(trackNumber);
        changeCover(trackNumber);
    })

    document.querySelector('.prev').addEventListener('click', ()=> {
        audio.src = prev(trackNumber);
        if (isPlaying) {
            play();
        };
        showDescription(trackNumber);
        changeBacground(trackNumber);
        changeCover(trackNumber);
    })

    document.querySelector('.go-first').addEventListener('click', ()=> {
       audio.src = goToFirst();
        if (isPlaying) {
            play();
        }
        showDescription(trackNumber);
        changeBacground(trackNumber);
        changeCover(trackNumber);
    })

    document.querySelector('.go-last').addEventListener('click', ()=> {
       audio.src = goToLast();
         if (isPlaying) {
             play();
         }
         showDescription(trackNumber);
         changeBacground(trackNumber);
         changeCover(trackNumber);
     })
     
    const playControlBtn = document.querySelector('.play-control');
    playControlBtn.addEventListener('click', playControl)
    
    document.querySelector('.loop').addEventListener('click', () => {
        document.querySelector('.loop').classList.toggle('isLoop')
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
        console.log(num);
        num--;
        console.log(num);
        if (num === 0) {
            num = playList.length;
        }
        console.log(num);
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
})

