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

const btnMutedOff = document.querySelector(".off")
const btnMutedOn = document.querySelector(".up")

const btnPlay = document.querySelector("#play")
const btnPause = document.querySelector("#pause")
const btnPrev = document.querySelector("#prev")
const btnNext = document.querySelector("#next")
const progressBar = document.querySelector("progress")
const pastTime = document.querySelector(".start")
const entTime = document.querySelector(".end")

const imgCover1 = document.querySelector(".next-cover-1")
const songName1 = document.querySelector(".next-song-1")
const artistName1 = document.querySelector(".next-artist-1")
const imgCover2 = document.querySelector(".next-cover-2")
const songName2 = document.querySelector(".next-song-2")
const artistName2 = document.querySelector(".next-artist-2")
const imgCover3 = document.querySelector(".next-cover-3")
const songName3 = document.querySelector(".next-song-3")
const artistName3 = document.querySelector(".next-artist-3")
const imgCover4 = document.querySelector(".next-cover-4")
const songName4 = document.querySelector(".next-song-4")
const artistName4 = document.querySelector(".next-artist-4")

btnMutedOn.addEventListener("click", () => {
    song.muted = true;
    btnMutedOff.style.display = "block"
    btnMutedOn.style.display = "none"
})

btnMutedOff.addEventListener("click", () => {
    song.muted = false;
    btnMutedOn.style.display = "block"
    btnMutedOff.style.display = "none"
})

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
        songName.textContent = songs[index].title
        artistName.textContent = songs[index].artist
        entTime.textContent = secToMin(song.duration)
        progressBar.style.width = "0%"
        btnPlay.style.display = "block"
        btnPause.style.display = "none"
        renderNextSongs(indexSong)
    })
}

function renderNextSongs(index){
    imgCover1.src = songs[index + 1].img
    songName1.textContent = songs[index + 1].title
    artistName1.textContent = songs[index + 1].artist
    imgCover2.src = songs[index + 2].img
    songName2.textContent = songs[index + 2].title
    artistName2.textContent = songs[index + 2].artist
    imgCover3.src = songs[index + 3].img
    songName3.textContent = songs[index + 3].title
    artistName3.textContent = songs[index + 3].artist
    imgCover4.src = songs[index + 4].img
    songName4.textContent = songs[index + 4].title
    artistName4.textContent = songs[index + 4].artist
}

renderSong(indexSong)
renderNextSongs(indexSong)