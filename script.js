const songs = [
    {
        title: "Two times",
        artist: "Jack Stauber",
        src: "music/two times jack stauber.mp3",
        img: "cover/jack stauber.jpg",
        isPlaying: true
    },
    {
        title: "Somebody to love",
        artist: "Queen",
        src: "music/somebody to love remasterred 2011 queen.mp3",
        img: "cover/queen.jpg",
        isPlaying: false
    },
    {
        title: "Do it on",
        artist: "Nomadic XXL",
        src: "music/do-it-on.mp3",
        img: "cover/nomadic.jpg",
        isPlaying: false
    },
    {
        title: "Enemy",
        artist: "Imagine Dragons",
        src: "music/enemy.mp3",
        img: "cover/imagine dragons.jpg",
        isPlaying: false
    },
    {
        title: "Strand out fit in",
        artist: "ONE OK ROCK",
        src: "music/Stand-Out-Fit-In.mp3",
        img: "cover/one ok rock.jpg",
        isPlaying: false
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

    changeCurrentMusic(indexSong)
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
    
    changeCurrentMusic(indexSong)
})

function changeCurrentMusic(currentSongIndex){
    const newSongs = songs.map((item, index) => {
        if(index === currentSongIndex){
            return {...item, isPlaying: true}
        }
        return {...item, isPlaying: false}
    })
    
    renderNextSongs(newSongs)
}

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
    })
}

function containerFactory(img, name, artist){
    const containerNextMusic = document.createElement("div")
    containerNextMusic.classList.add("container-next-music")
    
    const containerNextImg = document.createElement("div")
    containerNextImg.classList.add("container-next-img")
    const containerNextImgCover = document.createElement("img")
    containerNextImgCover.src = img
    containerNextImg.appendChild(containerNextImgCover)

    containerNextMusic.appendChild(containerNextImg)

    const containerNextNames = document.createElement("div")
    containerNextNames.classList.add("container-next-names")
    const containerNextSongName = document.createElement("h4")
    containerNextSongName.classList.add("container-next-song-name")
    containerNextSongName.textContent = name
    const containerNextArtistName = document.createElement("h5")
    containerNextArtistName.classList.add("container-next-artist-name")
    containerNextArtistName.textContent = artist

    containerNextNames.appendChild(containerNextSongName)
    containerNextNames.appendChild(containerNextArtistName)
    containerNextMusic.appendChild(containerNextNames)

    return containerNextMusic
}

function renderNextSongs(songs){
    const containerNs = document.querySelector(".container-ns")
    containerNs.innerHTML = ""
    songs.forEach(({title, artist, img, isPlaying}) => {
        if(!isPlaying){
            containerNs.appendChild(containerFactory(img, title, artist))
        }
    });
}

renderSong(indexSong)
renderNextSongs(songs)