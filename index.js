
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const showSignupLink = document.getElementById('showSignup');
  const showLoginLink = document.getElementById('showLogin');

  const loginMessage = document.getElementById('loginMessage');
  const signupMessage = document.getElementById('signupMessage');

  // Show Signup form and hide Login form
  showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    clearMessages();
  });

  // Show Login form and hide Signup form
  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    clearMessages();
  });

  // Initially hide signup form
  signupForm.style.display = 'none';

  // Clear messages
  function clearMessages() {
    loginMessage.textContent = '';
    signupMessage.textContent = '';
  }

  // Login form submit
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessages();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // Simple validation check
    if (email === '' || password === '') {
      loginMessage.textContent = 'Please enter both email and password.';
      return;
    }

    // Here you can add your actual login authentication logic
    // For demo: if email and password are filled, redirect
    loginMessage.textContent = 'Logging in...';

    // Simulate login delay
    setTimeout(() => {
      // Redirect to dashboard page
      window.location.href = 'dashboard.html';
    }, 1000);
  });

  // Signup form submit (basic validation)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessages();

    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();

    if (email === '' || password === '') {
      signupMessage.textContent = 'Please enter both email and password.';
      return;
    }

    // You would handle actual signup here (e.g., API call)
    signupMessage.textContent = 'Signup successful! You can now login.';
    
    // Optionally switch to login form after signup
    setTimeout(() => {
      signupForm.classList.remove('active');
      loginForm.classList.add('active');
      signupForm.style.display = 'none';
      loginForm.style.display = 'block';
      clearMessages();
    }, 1500);
  });
});
