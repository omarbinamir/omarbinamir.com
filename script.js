const usernameInput = document.getElementById('usernameInput');
const welcomeScreen = document.getElementById('welcomeScreen');
const mainScreen = document.getElementById('mainScreen');
const welcomeMsg = document.getElementById('welcomeMsg');
const enterBtn = document.getElementById('enterBtn');

enterBtn.addEventListener('click', enterObaland);

usernameInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') enterObaland();
});

function enterObaland() {
    const username = usernameInput.value.trim();

    if (!username) {
        usernameInput.placeholder = 'Please enter a username...';
        return;
    }

    welcomeScreen.classList.add('hidden');
    mainScreen.classList.add('show');
    welcomeMsg.textContent = `Welcome, ${username}`;
}
