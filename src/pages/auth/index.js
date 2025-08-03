// Handle form submission with login API (employeeId, email, password)
async function handleLogin (e) {
    e.preventDefault();
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.classList.add('loading');
    loginBtn.textContent = 'Authenticating...';

    const email = document.getElementById('email').value.trim().toLowerCase();

    let redirectUrl = '';
    switch (email) {
        case 'driver@email.com':
            redirectUrl = '/dashboard/driver.html';
            break;
        case 'inventory-managr@email.com':
            redirectUrl = '/dashboard/inventory-manager.html';
            break;
        case 'auction-officer@email.com':
            redirectUrl = '/dashboard/auction-officer.html';
            break;
        case 'maintenance-manager@email.com':
            redirectUrl = '/dashboard/maintenance-manager.html';
            break;
        case 'supervisor@email.com':
            redirectUrl = '/dashboard/supervisor.html';
            break;
        case 'technician@email.com':
            redirectUrl = '/dashboard/technician.html';
            break;
        default:
            loginBtn.textContent = 'Login Failed';
            setTimeout(() => {
                loginBtn.textContent = 'Login';
                loginBtn.classList.remove('loading');
            }, 1500);
            return;
    }
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 800);
}



// Handle forgot password
function handleForgotPassword() {
    alert('Password reset functionality would be implemented here.\nUsers would receive a reset link via email.');
}

// Add some interactive enhancements
document.addEventListener('DOMContentLoaded', function () {
    // Add focus effects to form inputs
    const inputs = document.querySelectorAll('input, select');

    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
            const form = document.getElementById('loginForm');
            const formElements = Array.from(form.elements);
            const currentIndex = formElements.indexOf(e.target);
            const nextElement = formElements[currentIndex + 1];

            if (nextElement && nextElement.type !== 'submit') {
                nextElement.focus();
            } else {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
});

window.handleLogin = handleLogin;