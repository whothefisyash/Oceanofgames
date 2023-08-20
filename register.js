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

var enter = document.getElementById("cnfpassword");
enter.addEventListener("keyup", (snap) => {
  if (snap.keyCode === 13) {
    snap.preventDefault();
    document.getElementById("btn_register").click();
  }
});

function register() {
  let email = document.getElementById("email").value;
  let dob = document.getElementById("dob").value;
  let password = document.getElementById("password").value;
  let cnfpassword = document.getElementById("cnfpassword").value;
  if (password == cnfpassword) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
    
    })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
      });
      let newUser = firebase.database().ref().child("Users").push();
      newUser.child("Email").set(email);
      newUser.child("DOB").set(dob);
      newUser.child("Password").set(password);
      newUser.child("Admin").set("False");
  }
  else {
    window.alert("Password does not match");
  }

}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    window.location.href = "main.html";
  }
});

function preloader() {
  document.getElementById("loading").style.display = "none";

}

setTimeout(preloader, 3000);