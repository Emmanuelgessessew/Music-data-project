import { getUserIDs } from './data.mjs';

const userSelect = document.getElementById('user-select');

function loadUsers() {
    const userIDs =getUserIDs();

    userIDs.forEach(id => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = id;
        userSelect.appendChild(option);
    });
}

loadUsers();

function getMostListenedSong(userId) {
  const events = getListenEvents(userId);
  const counts = {};
  for (const event of events) {
    if (!counts[event.songID]) {
      counts[event.songID] = 0;
    }
    counts[event.songID]++;
  }

  let maxCount = 0;
  let mostListenedSongId = null;
  for (const songID in counts) {
    if (counts[songID] > maxCount) {
      maxCount = counts[songID];
      mostListenedSongId = songID;
    }
  }

  if (mostListenedSongId) {
    const song = getSong(mostListenedSongId);
    return song.title + ' - ' + song.artist;
  }

  return null;
}
