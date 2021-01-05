const $ = window.$;

$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $('form#login');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on('submit', event => {
    event.preventDefault();
    let form = event.target;
    let email = form['email'].value;
    let password = form['password'].value;
    loginUser(email, password);
    emailInput.val('');
    passwordInput.val('');
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser (email, password) {
    $.post('/api/login', {email, password})
      .then(() => {
        // alert('Login Successful!');
        location.href = '/members';
      })
      .catch(err => {
        alert('Invaild Email or Password!');
      });
  }
});
