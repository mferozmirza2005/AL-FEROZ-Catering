var CartIntro = document.getElementById("CartIntro");

function CartHeight() {
  var scrollValue = window.scrollY;
  if (scrollValue > 0) {
    CartIntro.style.height = "100vh";
  } else {
    CartIntro.style.height = "88.2vh";
  }
}
