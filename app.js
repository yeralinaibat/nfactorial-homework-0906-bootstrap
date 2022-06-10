const playPause = document.querySelector("#play-stop");
const backward = document.querySelector("#backward");
const forward = document.querySelector("#forward");

const circleBig = document.querySelector("#circle-bg");
const circleSm = document.querySelector("#circle-sm");

const songName = document.querySelector("#song-name");
const audio = document.querySelector("#audio");
const coverArt = document.querySelector("#cover");
const musicbox = document.querySelector("#musicbox");

const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("durationTime");


const volume = document.querySelector(".sound-control input");
volume.addEventListener("change", () => {
  audio.volume = volume.value / 100;
});

let playImg = "./images/play.png";
let pauseImg = "./images/pause-button.png";

playPause.src = playImg;
let isPlaying = true;

const songList = [
  {
    name: "My life BeGrits, TobyMac – Ooh Ahh (My Life Be Like) Like",
    source: "./music/mylifebelike.mp3",
    cover: "./images/mylifebelike.jpg"
  },
  {
    name: "Blur-Song2",
    source: "./music/blursong2.mp3",
    cover: "./images/blursong2.jpg"
  }
];

function createEle(ele) {
  return document.createElement(ele);
}
function append(parent, child) {
  return parent.append(child);
}

const ul = createEle("ul");
function createPlayList() {
  songList.forEach((song) => {
    let h3 = createEle("h3");
    let li = createEle("li");

    li.classList.add("track-item");
    h3.innerText = song.name;
    append(li, h3);
    append(ul, li);
  });
  append(musicbox, ul);
}

let songIndex = 0;

loadMusic(songList[songIndex]);

function loadMusic() {
  coverArt.src = songList[songIndex].cover;
  songName.innerText = songList[songIndex].name;
  audio.src = songList[songIndex].source;
}

function playSong() {
  playPause.src = pauseImg;
  circleBig.classList.add("animate");
  circleSm.classList.add("animate");

  audio.play();
}

function pauseSong() {
  playPause.src = playImg;
  circleBig.classList.remove("animate");
  circleSm.classList.remove("animate");

  audio.pause();
}

function nextPlay() {
  songIndex++;
  if (songIndex > songList.length - 1) {
    songIndex = 0;
  }
  loadMusic(songList[songIndex]);
  playSong();
}

function backPlay() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songList.length - 1;
  }
  loadMusic(songList[songIndex]);
  playSong();
}
function playHandler() {
  isPlaying = !isPlaying;

  isPlaying ? pauseSong() : playSong();
}

function progressValue() {
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;

  currentTime.textContent = formatTime(audio.currentTime);
  durationTime.textContent = formatTime(audio.duration);
}

setInterval(progressValue, 500);

function formatTime(sec) {
  let minutes = Math.floor(sec / 60);
  let seconds = Math.floor(sec - minutes * 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

function changeProgressBar() {
  audio.currentTime = progressBar.value;
}

playPause.addEventListener("click", playHandler);
backward.addEventListener("click", backPlay);
forward.addEventListener("click", nextPlay);
progressBar.addEventListener("click", changeProgressBar);

createPlayList();
