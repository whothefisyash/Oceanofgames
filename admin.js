// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCDMvFD5zthICujULAK7ocBmpZamJ7View",
    authDomain: "gamebase-fa264.firebaseapp.com",
    projectId: "gamebase-fa264",
    storageBucket: "gamebase-fa264.appspot.com",
    messagingSenderId: "307863343800",
    appId: "1:307863343800:web:8a4bf144a06b04f4869a4d",
    measurementId: "G-5L8T4Q6WGY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let c = 0;
function upload() {
    let gamename = document.getElementById("gamename").value;
    let gamedesc = document.getElementById("gamedesc").value;
    let gameimage = document.getElementById("gameimage").value;
    let gamelink = document.getElementById("gamelink").value;
    let newGame = firebase.database().ref().child("New");
    c++;
    newGame.child(c).child("Name").set(gamename);
    newGame.child(c).child("Desc").set(gamedesc);
    newGame.child(c).child("Image").set(gameimage);
    newGame.child(c).child("Link").set(gamelink);
    window.alert("Game Uploaded Successfully");
    document.getElementById("gamename").value = "";
    document.getElementById("gamedesc").value = "";
    document.getElementById("gameimage").value = "";
    document.getElementById("gamelink").value = "";
}

function make() {
    let email = document.getElementById("email").value;
    var ref = firebase.database().ref("Users");
    var emails, admins, check = 0;
    ref.on("value", (snap) => {
        // console.log(snap.val());
        var users = snap.val();
        var keys = Object.keys(users);
        // console.log(keys);  
        for (let i = 0; i < keys.length; i++) {
            var k = keys[i];
            emails = users[k].Email;
            admins = users[k].Admin;
            if (emails === email) {
                if (admins === "False") {
                    firebase.database().ref().child("Users").child(k).child("Admin").set("True");

                    check = 1;
                    break;
                }
                else {
                    window.alert("The user is already an admin");
                    check = 2;
                }
            }
            // console.log(emails, admins, k);
        }
        if (check == 0)
            window.alert("No such user found");
        else if (check == 1)
            window.alert(emails + " is now an admin!");
    });
    // email.value = "";
}

function remove() {
    let email = document.getElementById("email").value;
    var ref = firebase.database().ref("Users");
    var emails, admins, check = 0;
    ref.on("value", (snap) => {
        // console.log(snap.val());
        var users = snap.val();
        var keys = Object.keys(users);
        // console.log(keys);  
        for (let i = 0; i < keys.length; i++) {
            var k = keys[i];
            emails = users[k].Email;
            admins = users[k].Admin;
            if (emails === email) {
                if (admins === "True") {
                    firebase.database().ref().child("Users").child(k).child("Admin").set("False");

                    check = 1;
                    break;
                }
                else {
                    window.alert("The user is not an admin yet");
                    check = 2;
                }
            }
            // console.log(emails, admins, k);
        }
        if (check == 0)
            window.alert("No such user found");
        else if (check == 1)
            window.alert(emails + " is now not an admin!");

    });
    // email.value = "";
}

function preloader() {
    document.getElementById("loading").style.display = "none";

}

setTimeout(preloader,3000);