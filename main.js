import { getUserIDs, getListenEvents, getSong } from './data.mjs';

const userSelect = document.getElementById('users');

// Populate user dropdown
getUserIDs().forEach(userId => {
    const option = document.createElement('option');
    option.value = userId;
    option.textContent = userId;
    usersSelect.appendChild(option);
});


usersSelect.addEventListener('change', () => {
    const userId = usersSelect.value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    if (!userId) return;

    const events = getListenEvents(userId);
    if (events.length === 0) {
        resultsDiv.textContent = 'This user didn’t listen to any songs.';
        return;
    }

    showQuestion1(events, resultsDiv);
});

function showQuestion1(events, container) {
    const counts = {};
    events.forEach(event => {
        counts[event.songId] = (counts[event.songId] || 0) + 1;
    });
    
    const maxCount = Math.max(...Object.values(counts));
    const topSongs = Object.keys(counts)
        .filter(songId => counts[songId] === maxCount)
        .map(songId => getSong(songId));
    
    if (topSongs.length > 0) {
        const div = document.createElement('div');
        div.innerHTML = `
            <h2>Most Listened Song</h2>
            <p>${topSongs.map(song => `${song.artist} - ${song.title}`).join(', ')}</p>
        `;
        container.appendChild(div);
    }
}