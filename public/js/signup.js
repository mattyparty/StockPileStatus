const $ = window.$;

$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $('form#signup');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on('submit', event => {
    event.preventDefault();
    let form = event.target;
    let email = form['email'].value;
    let password = form['password'].value;
    signUpUser(email, password);
    emailInput.val('');
    passwordInput.val('');
  });

  // Does a post to the signup route. If successful, we are redirected to the account page
  // Otherwise we log any errors
  function signUpUser(email, password) {
<<<<<<< HEAD
    console.log(email, password)
    $.post('/api/signup', { email, password })
      .then((res) => {
        alert('You Signed Up Successfully. Please use the Credential for Login.');
=======
    $.post('/api/signup', {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace('/account');
        // If there's an error, handle it by throwing up a bootstrap alert
>>>>>>> develop
      })
      .catch(err => {
        alert('Invaild Email or Password!');
      });
  }

  function handleLoginErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }
});
