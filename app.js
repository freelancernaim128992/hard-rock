const searchField = () => {
    const searchText = document.getElementById('input-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    displaySpinner();
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(err => displayError("Your are Wrong!! We can't find this song!!!"))
}

// Display Songs 
const displaySongs = songs => {
    songs.forEach(song => {
        const songContainer = document.getElementById('song-container');
        const div = document.createElement('div');
        div.className = 'single-result row align-items-center my-3 p-3';
        const showItem = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/ogg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="loadLyricsData('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
        div.innerHTML = showItem;
        songContainer.appendChild(div);
    });
    displaySpinner();
}


// Load Lyrics Data
const loadLyricsData = (artist,title) =>{
   const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
   displaySpinner();
   fetch(url)
   .then(res => res.json())
   .then(data => displayLyrics(data.lyrics))
}


// Display Lyrics 
const displayLyrics = lyrics => {
    const lyricsContainer = document.getElementById('lyrics-container');
    lyricsContainer.innerText = '';
    const div = document.createElement('div');
    div.innerText = lyrics;
    lyricsContainer.appendChild(div);
    displaySpinner();
}


// Input Enter Key Function 
document.getElementById("input-field").addEventListener("keypress", function (event) {
    if (event.key === 'Enter'){
    document.getElementById("search-btn").click();
    }
});


// Display Spinner
const displaySpinner = () =>{
    const spinner = document.getElementById('spinner');
    spinner.classList.toggle('d-none');
}


// Error Message 
const displayError = error => {
    const showError = document.getElementById('error-message');
    showError.innerText = error;
    displaySpinner();
}