const audioPlayer = document.getElementById('audio-player');
const fileInput = document.getElementById('file-input');
const volumeControl = document.getElementById('volume-control');
let currentSongIndex = 0;
let playlist = [];
const playlistElement = document.getElementById('playlist');
const playlistContainer = document.getElementById('playlist-container');

fileInput.addEventListener('change', function() {
    playlist = Array.from(fileInput.files).map(file => ({ url: URL.createObjectURL(file), name: file.name }));
    updatePlaylist();
    if (playlist.length > 0) {
        currentSongIndex = 0;
        playSong(currentSongIndex);
    }
});

function updatePlaylist() {
    playlistElement.innerHTML = '';
    playlist.forEach((song, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${song.name}`;
        listItem.addEventListener('click', function() {
            playSong(index);
        });
        playlistElement.appendChild(listItem);
    });
}

function togglePlaylist() {
    if (playlistContainer.style.display === 'none') {
        playlistContainer.style.display = 'block';
    } else {
        playlistContainer.style.display = 'none';
    }
}

function playSong(index) {
    audioPlayer.src = playlist[index].url;
    audioPlayer.play();
}

function play() {
    audioPlayer.play();
}

function pause() {
    audioPlayer.pause();
}

function stop() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}

function next() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    playSong(currentSongIndex);
}

function previous() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    playSong(currentSongIndex);
}

function setVolume(volume) {
    audioPlayer.volume = volume;
}
