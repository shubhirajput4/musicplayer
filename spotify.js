// Step 1: Select Elements
const playButtons = document.querySelectorAll(".play-btn"); // All play buttons
const footerSongImage = document.getElementById("song-image"); // Footer song image
const footerSongName = document.getElementById("song-name"); // Footer song name
const footerSongArtist = document.getElementById("song-artist"); // Footer song artist
const playPauseButton = document.getElementById("play-pause"); // Footer play/pause button
const progressBar = document.getElementById("progress-bar"); // Progress bar
const currentTimeLabel = document.getElementById("current-time"); // Current time label
const durationLabel = document.getElementById("duration"); // Total duration label

// Step 2: Create an Array of Songs
const songs = [
{
        title: "Magenta Six - Christmas 5.mp3",
        artist: "Magenta Six",
        duration: "3:10",
        src:  "audio/Magenta Six - Christmas 5.mp3", // Relative path to the audio file
        // Replace with the actual song file path
        image: "https://up.yimg.com/ib/th?id=OIP.NP1L4lTc_MCk0ULuhKHzKgHaFA&pid=Api&rs=1&c=1&qlt=95&w=167&h=113"
    },    
    {
        title: "Chinese New Year is Coming",
        artist: "Alex-Productions",
        duration: "2:00",
        src: "audio/Alex-Productions - Chinese New Year is Coming.mp3",
        image: "https://tse2.mm.bing.net/th?id=OIP.QQR1ZuTF9dUAAviovy83QAHaEO&pid=Api&P=0&h=220"
    },
    {
        title: "Sad & Romantic Short Version / Piano & Strings",
        artist: "Lowtone Music",
        duration: "0:50",
        src: "audio/Lowtone Music - Sad & Romantic Short Version _ Piano & Strings.mp3",
        image:" https://freemusicarchive.org/image/?file=track_image%2FHoo9nm0ws70VxCLy42F6X0Z3UhozZkc0GOTHabNJ.jpg&width=290&height=290&type=track"
    }
];

// Step 3: Create an Audio Object
let audio = new Audio();
let currentSongIndex = 0;
let isPlaying = false;

// Step 4: Function to Play a Song
function playSong(index) {
    const song = songs[index];
    audio.src = song.src;
    footerSongImage.src = song.image;
    footerSongName.textContent = song.title;
    footerSongArtist.textContent = song.artist;
    durationLabel.textContent = song.duration;

    audio.play();
    isPlaying = true;
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Change play button to pause
}

// Step 5: Function to Pause a Song
function pauseSong() {
    audio.pause();
    isPlaying = false;
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>'; // Change pause button to play
}

// Step 6: Toggle Play/Pause from Footer
playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong(currentSongIndex);
    }
});

// Step 7: Attach Event Listeners to Play Buttons in the Song List
playButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        currentSongIndex = index; // Update the current song index
        playSong(index);
    });
});

// Step 8: Update the Progress Bar
audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.currentTime) && !isNaN(audio.duration)) { // Ensure currentTime and duration are valid numbers
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        progressBar.value = (currentTime / duration) * 100;

        // Update time labels only if both currentTime and duration are valid
        currentTimeLabel.textContent = formatTime(currentTime);
        durationLabel.textContent = formatTime(duration);
    }
});

// Helper Function to Format Time
function formatTime(time) {
    if (isNaN(time)) return "0:00"; // If time is NaN, return default time
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}


// Step 9: Seek Song when Progress Bar Changes
progressBar.addEventListener("input", () => {
    const duration = audio.duration;
    const newTime = (progressBar.value / 100) * duration;
    audio.currentTime = newTime;
});

// Step 10: Helper Function to Format Time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Step 11: Handle Next and Previous Buttons
document.getElementById("next").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
});

document.getElementById("prev").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
});

// Step 12: Handle Song End Event
audio.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
});
