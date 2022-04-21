const songs = [
    {
        title: "Two times",
        artist: "Jack Stauber",
        src: "music/two times jack stauber.mp3",
        img: "cover/jack stauber.jpg"
    },
    {
        title: "Somebody to love",
        artist: "Queen",
        src: "music/somebody to love remasterred 2011 queen.mp3",
        img: "cover/queen.jpg"
    },
    {
        title: "Do it on",
        artist: "Nomadic XXL",
        src: "music/do-it-on.mp3",
        img: "cover/nomadic.jpg"
    },
    {
        title: "Enemy",
        artist: "Imagine Dragons",
        src: "music/enemy.mp3",
        img: "cover/imagine dragons.jpg"
    },
    {
        title: "Strand out fit in",
        artist: "ONE OK ROCK",
        src: "music/Stand-Out-Fit-In.mp3",
        img: "cover/one ok rock.jpg"
    }
    
]

let indexSong = 0
const songNumbers = songs.length
const song = document.querySelector("audio")
const songName = document.querySelector(".song-name")
const artistName = document.querySelector(".artist-name")
const coverImg = document.querySelector(".cover-img")

const btnPlay = document.querySelector("#play")
const btnPause = document.querySelector("#pause")
const btnPrev = document.querySelector("#prev")
const btnNext = document.querySelector("#next")
const progressBar = document.querySelector("progress")
const pastTime = document.querySelector(".start")
const entTime = document.querySelector(".end")

btnPlay.addEventListener("click", () => {
    song.play()
    btnPlay.style.display = "none"
    btnPause.style.display = "block"
})

btnPause.addEventListener("click", () => {
    song.pause()
    btnPause.style.display = "none"
    btnPlay.style.display = "block"
})

btnPrev.addEventListener("click", () => {
    console.log("prev")
    if(indexSong === 0){
        indexSong = songNumbers - 1
        renderSong(indexSong)
    } else {
        indexSong--
        renderSong(indexSong)
    }
})

btnNext.addEventListener("click", () => {
    console.log("next")
    if(indexSong === songNumbers - 1){
        indexSong = 0
        renderSong(indexSong)
    } else {
        indexSong++
        renderSong(indexSong)
    }
})

song.addEventListener("timeupdate", () => {
    let actualTime = (song.currentTime / song.duration) * 100
    actualTime = Math.floor(actualTime)
    progressBar.style.width = actualTime + "%"
    pastTime.textContent = secToMin(song.currentTime)
    if(song.currentTime === song.duration){
        btnPause.style.display = "none"
        btnPlay.style.display = "block"
    }

})

function secToMin(seconds) {
    let min = Math.floor(seconds / 60)
    let sec = Math.floor(seconds % 60)
    if(sec < 10){
        sec = `0${sec}`
    }

    return `${min}:${sec}`
}

function renderSong(index) {
    song.setAttribute("src", songs[index].src)
    song.addEventListener("loadeddata", () => {
        coverImg.src = songs[index].img
        artistName.textContent = songs[index].artist
        songName.textContent = songs[index].title
        entTime.textContent = secToMin(song.duration)
        progressBar.style.width = "0%"
        btnPlay.style.display = "block"
        btnPause.style.display = "none"
    })
}

renderSong(indexSong)