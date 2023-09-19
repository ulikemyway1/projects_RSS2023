document.addEventListener('DOMContentLoaded', ()=>{
    //global paramets
    let trackNumber = 1;
    let isPlaying = false;
    //

    const playList = [
        {'src': 'audio/beyonce.mp3'},
        {'src': 'audio/dontstartnow.mp3'},
    ]
    //create player
    const audio = new Audio();
    document.querySelector('.player').append(audio);
    audio.controls = 'true';

    //set buttons functions to control player
    document.querySelector('.next').addEventListener('click', ()=> {
        audio.src = next(trackNumber);
        if (isPlaying) {
            play();
        }
    })

    document.querySelector('.prev').addEventListener('click', ()=> {
        audio.src = prev(trackNumber);
        if (isPlaying) {
            play();
        }
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
     })
     
    const playControlBtn = document.querySelector('.play-control');
    playControlBtn.addEventListener('click', playControl)
    

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
    
})

