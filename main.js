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