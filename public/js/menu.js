var menuMainIntro = document.getElementById("menuMainIntro");

function MenuHeight() {
  var scrollValue = window.scrollY;
  if (scrollValue > 0) {
    menuMainIntro.style.height = "100vh";
  } else {
    menuMainIntro.style.height = "88.2vh";
  }
}

