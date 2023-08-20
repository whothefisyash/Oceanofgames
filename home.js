function hide(x){
    x.style.visibility='visible';
}
setTimeout(hide, 1600, document.getElementById('heading'));
// setTimeout(hide, 1010, document.getElementsByTagName("h1"));
setTimeout(hide, 3501, document.getElementById('head2'));
setTimeout(hide, 6100, document.getElementById('login'));
setTimeout(hide, 6100, document.getElementById('register'));
// setTimeout(hide, 2010, document.getElementsByClassName('btn'));
var i=0;
function anim() {
    // setTimeout(anim,3001);
    let str="A Fathomless World of Online Games";
    if(i<str.length){
        document.getElementById("head2").innerHTML+=str[i++];
        setTimeout(anim,50);
    }
}
setTimeout(anim,3510);