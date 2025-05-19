import { getUserIDs } from './data.mjs';

const userSelect = document.getElementById('users');

// Populate user dropdown
getUserIDs().forEach(userId => {
    const option = document.createElement('option');
    option.value = userId;
    option.textContent = userId;
    usersSelect.appendChild(option);
});

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
