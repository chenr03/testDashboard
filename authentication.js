// Function to check if the user is authenticated
function isAuthenticated() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return username && password;
}

// Function to handle login
function handleLogin() {
    const username = prompt('Enter username:');
    const password = prompt('Enter password:');

    // Check if username and password are valid
    // Replace with your authentication logic (e.g., comparing against stored credentials)
    const isValidCredentials = (username === 'yourUsername' && password === 'yourPassword');

    if (isValidCredentials) {
        // Store username and password in local storage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        // Regenerate test items after login
        generateTestItems();
    } else {
        alert('Invalid username or password');
    }
}

// Function to handle logout
function handleLogout() {
    // Remove username and password from local storage
    localStorage.removeItem('username');
    localStorage.removeItem('password');

    // Regenerate test items after logout
    generateTestItems();
}

// Generate test items on page load
window.addEventListener('DOMContentLoaded', () => {
    if (isAuthenticated()) {
        generateTestItems();
    }
});

// Function to autosave the tests
function autosaveTests() {
    localStorage.setItem('tests', JSON.stringify(tests));
    alert('Tests saved!');
}

// Function to load tests from local storage
function loadTests() {
    const savedTests = localStorage.getItem('tests');
    if (savedTests) {
        tests = JSON.parse(savedTests);
        generateTestItems();
        alert('Tests loaded!');
    } else {
        alert('No saved tests found.');
    }
}

// Add test button event listener
const addTestButton = document.getElementById('add-test-button');
addTestButton.addEventListener('click', () => {
    if (isAuthenticated()) {
        addTest();
    } else {
        alert('Please log in to add a test.');
    }
});

// Login button event listener
const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', () => {
    if (!isAuthenticated()) {
        handleLogin();
    } else {
        alert('Already logged in.');
    }
});

// Logout button event listener
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
    if (isAuthenticated()) {
        handleLogout();
    } else {
        alert('Not logged in.');
    }
});

// Save button event listener
const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', () => {
    if (isAuthenticated()) {
        autosaveTests();
    } else {
        alert('Please log in to save the tests.');
    }
});

// Load button event listener
const loadButton = document.getElementById('load-button');
loadButton.addEventListener('click', () => {
    if (isAuthenticated()) {
        loadTests();
    } else {
        alert('Please log in to load the tests.');
    }
});