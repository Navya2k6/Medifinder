// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Check login state on page load
document.addEventListener('DOMContentLoaded', function() {
    checkLoginState();
});

function checkLoginState() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const loginNavItem = document.getElementById('loginNavItem');
    const accountNavItem = document.getElementById('accountNavItem');
    
    if (isLoggedIn) {
        loginNavItem.style.display = 'none';
        accountNavItem.style.display = 'block';
    } else {
        loginNavItem.style.display = 'block';
        accountNavItem.style.display = 'none';
    }
}

// Login modal functions
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

document.getElementById('closeModal').onclick = function() {
    document.getElementById('loginModal').style.display = 'none';
};

window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// OTP and login handling
function sendOTP() {
    const number = document.getElementById('mobile').value;
    if (number.length === 10 && /^\d{10}$/.test(number)) {
        // In a real app, you would verify the OTP here
        // For demo, we'll just log the user in
        localStorage.setItem('userLoggedIn', 'true');
        document.getElementById('loginModal').style.display = 'none';
        checkLoginState(); // Update the UI
    } else {
        alert('Please enter a valid 10-digit mobile number.');
    }
}

// Logout function
function logoutUser() {
    localStorage.removeItem('userLoggedIn');
    checkLoginState(); // Update the UI
    // Optional: Redirect to home page
    // window.location.href = 'homepage.html';
}