// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//   .then(() => {
//     let email = document.getElementById("email").value;
//     let password = document.getElementById("password").value;
//     return firebase.auth().signInWithEmailAndPassword(email, password);
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     window.alert("Error : " + errorMessage);
//   });

firebase.auth.Auth.Persistence.SESSION;

var enter=document.getElementById("password");
enter.addEventListener("keyup",(snap)=>{
  if (snap.keyCode === 13) {
    snap.preventDefault(); 
    document.getElementById("btn_login").click();
  }
});

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);
  });
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // console.log(user.email);
    // console.log(user.uid);
    window.location.href = "main.html";
  }
});
// export{user_email};

let eye = document.getElementById("eye");
let slasheye = document.getElementById("slasheye");
let pass = document.getElementById("password");
eye.addEventListener('click', () => { //TogglePassword
  pass.type = "text";
  eye.style.display = "none";
  slasheye.style.display = "inline";
  // setTimeout(hide,500);
});

slasheye.addEventListener('click', hide); 

function hide() { //TogglePassword
  pass.type = "password";
  eye.style.display = "inline";
  slasheye.style.display = "none";
}

function googlesign(){    //Google Sign In
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    window.alert(errorMessage);
  });
}

function facebooksign(){    //Facebook Sign In
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
    window.alert(errorMessage);
    console.log(errorCode);
  });
}
function reset() {    //Forget Password

  var emailAddress = document.getElementById("email").value;

  firebase.auth().sendPasswordResetEmail(emailAddress).then(function () {
    window.alert("Password Reset Email has been sent");// Email sent.
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);// An error happened.
  });
}

function preloader() {
  document.getElementById("loading").style.display="none";
  
}

setTimeout(preloader,3000);
