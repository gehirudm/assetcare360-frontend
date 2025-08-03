import { getToday } from "../../../lib/utils";

console.log(getToday);

// Handle form submission with login API (employeeId, email, password)
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const loginBtn = document.querySelector('.login-btn');
    const btnText = document.querySelector('.btn-text');
    loginBtn.classList.add('loading');
    btnText.textContent = 'Authenticating...';

    const employeeId = document.getElementById('employeeId').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ employeeId, email, password })
        });
        if (!response.ok) {
            let msg = 'Login failed. Please try again.';
            if (response.status === 400) msg = 'Missing required fields.';
            if (response.status === 401) msg = 'Invalid credentials or email mismatch.';
            throw new Error(msg);
        }
        const data = await response.json();
        btnText.textContent = 'Success!';
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1000);
    } catch (err) {
        btnText.textContent = 'Login Failed';
        alert(err.message || 'Login failed. Please try again.');
        setTimeout(() => {
            btnText.textContent = 'Login';
            loginBtn.classList.remove('loading');
        }, 1500);
    }
});



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