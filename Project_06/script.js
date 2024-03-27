//Getting html element
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const playlistSongs = document.getElementById("playlist-songs");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");
const getPlaylistBtn = document.getElementById("get-playlist");
const playlistSelection = document.getElementById("playlistsSelect");
const playerImageEle = document.getElementById("player-image");
const sortSelectionEle = document.getElementById("sort-select");
const sortBtnEle = document.querySelector(".sort-song-container button");
const seekbarEle = document.getElementById("songSeekbar");
const addSongBtn = document.getElementById("add-song");
const searchPopupEle = document.querySelector(".search-popup");
const closePopupBtn = document.getElementById("close-popup");
const searchSongBtn = document.getElementById("searh-song");
const songNameInput = document.getElementById("addSongName");
const searchSongDesEle = document.getElementById("search-des");

const playlistLinks = [
  "https://www.jiosaavn.com/featured/hindi-hit-songs/ZodsPn39CSjwxP8tCU-flw__",
  "https://www.jiosaavn.com/featured/best-of-romance-hindi/SBKnUgjNeMIwkg5tVhI3fw__",
  "https://www.jiosaavn.com/featured/lets-play-arijit-singh-bengali/0b7ww9kRVgXuCJW60TJk1Q__",
  "https://www.jiosaavn.com/featured/bollywood-rock-workout-mix/pkqEoKN5hGqO0eMLZZxqsA__",
  "https://www.jiosaavn.com/featured/ultimate-workout-mix/T0Uq4vn2byc_",
];

const durationConvert = (num) => {
  const min = Math.floor(num / 60);
  const sec = num - min * 60;
  return `${min}:${sec}`;
};

const getPlaylist = async () => {
  getPlaylistBtn.textContent = "Fetching data..";
  const allSongs2 = [];
  const playlistContent = await fetch(
    `https://saavn.dev/api/playlists?link=${
      playlistLinks[Number(playlistSelection.value)]
    }`
  );
  const data = await playlistContent.json();
  const allPlaylistSongs = data.data.songs;
  let count = 0;
  allPlaylistSongs.forEach((song) => {
    let tempObj = {};
    tempObj.id = count;
    tempObj.title = song.name;
    const artist = song.artists.primary[1];
    tempObj.artist = artist ? artist.name : "Unknown";
    tempObj.duration = durationConvert(song.duration);
    tempObj.src = song.downloadUrl[song.downloadUrl.length - 1]?.url;
    tempObj.image = song.image[1].url;
    allSongs2.push(tempObj);
    count++;
  });
  getPlaylistBtn.textContent = "Get Playlist";
  return allSongs2;
};

let allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src:
      "https://aac.saavncdn.com/223/7eddc0f9b56f110ae39a145752fabb34_320.mp4",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src:
      "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src:
      "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src:
      "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src:
      "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src:
      "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src:
      "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src:
      "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src:
      "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src:
      "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3",
  },
];

const audio = new Audio();

let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
  maxDuration: 0,
};

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id == id);
  audio.src = song.src;
  audio.title = song.title;
  
  if (song.image) {
    playerImageEle.src = song?.image;
  }
  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  audio.onloadedmetadata= () =>{
    seekbarEle.max = audio.duration;
    seekbarEle.value = audio.currentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");
  setPlayerDisplay();
  highlightCurrentSong();
  setPlayButtonAccessibleText();
  audio.play();
};





const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove("playing");
  audio.pause();
};

const playPreviousSong = () => {
  if (userData?.currentSong == null) {
    playSong(userData?.songs[userData.songs.length - 1].id);
  } else {
    let currentSongIndex = getCurrentSongIndex();
    if (currentSongIndex == 0) {
      currentSongIndex = userData?.songs.length;
    }
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  }
};

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    let currentSongIndex = getCurrentSongIndex();
    if (currentSongIndex == userData?.songs.length - 1) {
      currentSongIndex = -1;
    }
    const nextSong = userData?.songs[currentSongIndex + 1];
    playSong(nextSong.id);
  }
};

const renderSongs = (array) => {
  const songsHTML = array
    .map((song) => {
      return `<li id="song-${song.id}" class="playlist-song">
        <button onclick="playSong(${song.id})" class = "playlist-song-info">
        <span class = "playlist-song-title">${song.title}</span>
        <span class = "playlist-song-artist">${song.artist}</span>
        <span class = "playlist-song-duration">${song.duration}</span>
        <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label= "Delete ${song.title}">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
        </button>
        </li>`;
    })
    .join("");

  playlistSongs.innerHTML = songsHTML;
};

const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
  }
  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();

  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");
    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];
      renderSongs(sortSongs());
      setPlayButtonAccessibleText();
      resetButton.remove();
    });
  }
};

const updatePlaylist = () => {
  getPlaylist().then((data) => {
    allSongs = data;
    userData.songs = allSongs;
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    renderSongs(sortSongs());
    console.log(userData.songs);
  });
};

const sortSongs = () => {
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    } else if (a.title > b.title) {
      return 1;
    } else {
      return 0;
    }
  });
  return userData?.songs;
};

const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];
  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
};

const getCurrentSongIndex = () => {
  return userData?.songs.indexOf(userData?.currentSong);
};

playButton.addEventListener("click", () => {
  if (!userData?.currentSong) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );
  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
    if (songToHighlight) {
      songToHighlight.setAttribute("aria-current", "true");
    }
  });
};

const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.currentTime = 0;
  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

const sortBySelect = () => {
  const sortType = sortSelectionEle.value;
  switch (sortType) {
    case "atoz":
      userData?.songs.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    case "ztoa":
      userData?.songs.sort((a, b) => {
        if (a.title < b.title) {
          return 1;
        } else if (a.title > b.title) {
          return -1;
        } else {
          return 0;
        }
      });
      break;
    case "duration":
      userData?.songs.sort((a, b) => {
        let aDur = Number(a.duration.replace(":", "."));
        let bDur = Number(b.duration.replace(":", "."));
        if (aDur < bDur) {
          return -1;
        } else if (aDur > bDur) {
          return 1;
        } else {
          return 0;
        }
      });
      break;

    default:
      break;
  }

  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

const addNewSong = () => {
  if (songNameInput.value == "") {
    searchSongDesEle.textContent = "Please enter song name.";
    searchSongDesEle.style.color = "red";
    return;
  }
  let songName = songNameInput.value;
  songNameInput.value = "";
  searchSongDesEle.textContent = "Fetching song...";
  (async () => {
    let tempObj = {};
    const songJSON = await fetch(
      `https://saavn.dev/api/search/songs?query=${songName}`
    );
    const songData = await songJSON.json();
    let song = songData.data.results[0];
    tempObj.id = userData?.songs.length;
    tempObj.title = song.name;
    const artist = song.artists.primary[1];
    tempObj.artist = artist ? artist.name : "Unknown";
    tempObj.duration = durationConvert(song.duration);
    tempObj.src = song.downloadUrl[song.downloadUrl.length - 1]?.url;
    tempObj.image = song.image[1].url;
    return tempObj;
  })()
    .then((data) => {
      userData.songs.push(data);
      searchSongDesEle.style.color = "green"
      searchSongDesEle.textContent = "Song Added"
      console.log(userData.songs)
      renderSongs(userData?.songs);
      pauseSong();
      setPlayerDisplay();
      setPlayButtonAccessibleText();
    })
    .catch(() => {
      searchSongDesEle.style.color = "red"
      searchSongDesEle.textContent = "Error : Cant fetch song";
    });
};

if (audio.play()){
  setInterval(()=>{
    seekbarEle.value = audio.currentTime;
  }, 1000)
}

seekbarEle.onchange = ()=>{
  audio.play();
  audio.currentTime = seekbarEle.value;

}

audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists =
    currentSongIndex < userData.songs.length - 1 ? true : false;
  if (nextSongExists) {
    playNextSong();
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
});

addSongBtn.addEventListener("click", () => {
  searchPopupEle.style.display = "flex";
});
closePopupBtn.addEventListener("click", () => {
  searchPopupEle.style.display = "none";
  searchSongDesEle.textContent = "";
  searchSongDesEle.style.color = "white";
});

searchSongBtn.addEventListener("click", addNewSong);
getPlaylistBtn.addEventListener("click", updatePlaylist);
shuffleButton.addEventListener("click", shuffle);
previousButton.addEventListener("click", playPreviousSong);
nextButton.addEventListener("click", playNextSong);
sortBtnEle.addEventListener("click", sortBySelect);
pauseButton.addEventListener("click", pauseSong);

renderSongs(sortSongs()); // this is called  optional chaining
