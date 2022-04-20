const song = document.querySelector("audio")
const btnPlay = document.querySelector("#play")
const btnPause = document.querySelector("#pause")
const progressBar = document.querySelector("progress")

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

song.addEventListener("timeupdate", () => {
    let actualTime = (song.currentTime / song.duration) * 100
    actualTime = Math.floor(actualTime)
    progressBar.style.width = actualTime + "%"
})