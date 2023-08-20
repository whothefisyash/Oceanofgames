
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.

  } else {
    window.location.href = "login.html";
    // No user is signed in.
  }
});

function logout() {
  firebase.auth().signOut().catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);
  });
}

let selected;
var c;
firebase.database().ref().child("New").on("value", function (snapshot) {
  c = snapshot.numChildren();
});
console.log(c);
function optSel() {
  selected = document.getElementById("filterid").value;

  let game = firebase.database().ref().child(selected);
  // game.on("value", (snap) => {
  //   console.log(snap.numChildren());
  // });
  const details = (num) => {
    document.getElementById("game" + (num)).style.display = "block";
    game.child(num).on("value", (snap) => {
      let image = snap.child("Image").val();
      let loc = snap.child("Link").val();
      document.getElementById("game" + (num)).style.backgroundImage = "url('" + image + "')";
      document.getElementById("head" + (num)).innerHTML = snap.child("Name").val();
      document.getElementById("desc" + (num)).innerHTML = snap.child("Desc").val();
      document.getElementById("game" + (num)).addEventListener("click", () => {
        // window.open(loc, "_blank");
        location.href = loc;
      });

      let flip = document.getElementById("flip" + (num));
      document.getElementById("game" + (num)).addEventListener("mouseover", () => {

        flip.style.visibility = "visible";
      });
      document.getElementById("game" + (num)).addEventListener("mouseout", () => {

        flip.style.visibility = "hidden";

      });
    });
  }
  if (selected === "New") {
    for (let i = 1; i <= c; i++)
      details(i);
    for (let i = c + 1; i <= 8; i++)
      document.getElementById("game" + (i)).style.display = "none";
  }
  else {
    for (let i = 1; i <= 8; i++) {
      details(i);
    }
  }
}

function changed() {
  optSel();
}

var names = [];
var links = [];
var images = [];
var descs = [];

for (let i = 1; i <= 8; i++) {
  firebase.database().ref().child("Best").child(i).on("value", (snap) => {
    names[i - 1] = snap.child("Name").val();
    links[i - 1] = snap.child("Link").val();
    images[i - 1] = snap.child("Image").val();
    descs[i - 1] = snap.child("Desc").val();
  });
  firebase.database().ref().child("Arcade").child(i).on("value", (snap) => {
    names[8 + i - 1] = snap.child("Name").val();
    links[8 + i - 1] = snap.child("Link").val();
    images[8 + i - 1] = snap.child("Image").val();
    descs[8 + i - 1] = snap.child("Desc").val();
  });
  firebase.database().ref().child("Cards").child(i).on("value", (snap) => {
    names[16 + i - 1] = snap.child("Name").val();
    links[16 + i - 1] = snap.child("Link").val();
    images[16 + i - 1] = snap.child("Image").val();
    descs[16 + i - 1] = snap.child("Desc").val();
  });
  firebase.database().ref().child("Girls").child(i).on("value", (snap) => {
    names[24 + i - 1] = snap.child("Name").val();
    links[24 + i - 1] = snap.child("Link").val();
    images[24 + i - 1] = snap.child("Image").val();
    descs[24 + i - 1] = snap.child("Desc").val();
  });
  firebase.database().ref().child("Puzzle").child(i).on("value", (snap) => {
    names[32 + i - 1] = snap.child("Name").val();
    links[32 + i - 1] = snap.child("Link").val();
    images[32 + i - 1] = snap.child("Image").val();
    descs[32 + i - 1] = snap.child("Desc").val();
  });
  firebase.database().ref().child("Quiz").child(i).on("value", (snap) => {
    names[40 + i - 1] = snap.child("Name").val();
    links[40 + i - 1] = snap.child("Link").val();
    images[40 + i - 1] = snap.child("Image").val();
    descs[40 + i - 1] = snap.child("Desc").val();
  });
  firebase.database().ref().child("Racing").child(i).on("value", (snap) => {
    names[48 + i - 1] = snap.child("Name").val();
    links[48 + i - 1] = snap.child("Link").val();
    images[48 + i - 1] = snap.child("Image").val();
    descs[48 + i - 1] = snap.child("Desc").val();
  });
  firebase.database().ref().child("Sports").child(i).on("value", (snap) => {
    names[56 + i - 1] = snap.child("Name").val();
    links[56 + i - 1] = snap.child("Link").val();
    images[56 + i - 1] = snap.child("Image").val();
    descs[56 + i - 1] = snap.child("Desc").val();
  });
  firebase.database().ref().child("New").child(i).on("value", (snap) => {
    names[64 + i - 1] = snap.child("Name").val();
    links[64 + i - 1] = snap.child("Link").val();
    images[64 + i - 1] = snap.child("Image").val();
    descs[64 + i - 1] = snap.child("Desc").val();
  });
}

function admin() {
  let email = prompt("Please enter your email");
  let password = prompt("Please enter your password");
  var ref = firebase.database().ref("Users");
  var emails, admins, pass, check = 0;
  ref.on("value", (snap) => {
    console.log(snap.val());
    var users = snap.val();
    var keys = Object.keys(users);
    console.log(keys);  
    for (let i = 0; i < keys.length; i++) {
      var k = keys[i];
      emails = users[k].Email;
      admins = users[k].Admin;
      pass = users[k].Password;
      console.log(emails, admins, k);
      if (emails === email && pass === password) {
        if (admins === "True")
          window.open("admin.html", "_blank");
        else
          window.alert("Sorry you're not an admin!");
        check = 1;
        break;
      }
    }
    if (check == 0)
      window.alert("Wrong credentials!");
  });
}


function optionselect() {
  let option = document.getElementById("useroptions").value;
  if (option === "logout")
    var con = confirm("Are you sure you want to logout?");
  if (con == true)
    logout();
  if (option === "admin")
    admin();
  // window.alert(option);
}

var index = [];
let searchgame = document.getElementById("searchgame");
searchgame.addEventListener("keyup", () => {
  let count = 1;
  for (let i = 1; i <= 10; i++) {
    document.getElementById("name" + (i)).style.display = "none";
  }
  let inputvalue = searchgame.value.toUpperCase();
  if (inputvalue.length >= 2) {
    for (let i = 0; i < 64 + c; i++) {
      if (names[i].indexOf(inputvalue) > -1) {
        document.getElementById("name" + (count)).innerHTML = names[i];
        index[count - 1] = i;
        count++;
        // console.log(names[i]);
        // console.log(links[i]);
      }
    }
  }
  for (let i = 1; i < count; i++) {
    document.getElementById("name" + (i)).style.display = "block";
    document.getElementById("name" + (i)).addEventListener("click", () => {
      for (let j = 1; j < count; j++)   //removes all search results
        document.getElementById("name" + (j)).style.display = "none";
      searchgame.value = "";    //clears the text inside search box
      document.getElementById("game1").style.backgroundImage = "url('" + images[index[i - 1]] + "')";
      document.getElementById("head1").innerHTML = names[index[i - 1]];
      document.getElementById("desc1").innerHTML = descs[index[i - 1]];
      document.getElementById("game1").addEventListener("click", () => {
        // window.open(loc, "_blank");
        location.href = links[index[i - 1]];
      });
      for (let j = 2; j <= 8; j++)    //displays only the required game
        document.getElementById("game" + (j)).style.display = "none";
    });
  }
});

function preloader() {
  document.getElementById("loading").style.display = "none";

}

setTimeout(preloader,3000);