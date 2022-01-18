var HomeIntro = document.getElementById("HomeIntro");

function HomeHeight() {
  var scrollValue = window.scrollY;
  if (scrollValue > 0) {
    HomeIntro.style.height = "100vh";
  } else {
    HomeIntro.style.height = "88.2vh";
  }
}

var HelpPlay = document.getElementById("HelpPlay");
var Help = document.getElementById("Help");
HelpPlay.addEventListener("click" , () => {
  var data = HelpPlay.classList[1];
  if (data == "fa-play") {
    Help.play();
    HelpPlay.classList.replace("fa-play" , "fa-pause");
  }
  else {
    Help.pause();
    HelpPlay.classList.replace("fa-pause" , "fa-play");
  };
});


var term1 = document.getElementById("term1");
var term2 = document.getElementById("term2");
var term3 = document.getElementById("term3");
var term4 = document.getElementById("term4");
var term5 = document.getElementById("term5");

function Toggler(element) {
  var data = element.children[1].style.display;
  if (data === "") {
    element.children[1].style.display = "block";
    element.children[0].children[1].style.transform = "rotateZ(45deg)";
  }
  else {
    element.children[1].style.display = "";
    element.children[0].children[1].style.transform = "rotateZ(0deg)";
  }
};

term1.addEventListener("click" , () => {Toggler(term1)});
term2.addEventListener("click" , () => {Toggler(term2)});
term3.addEventListener("click" , () => {Toggler(term3)});
term4.addEventListener("click" , () => {Toggler(term4)});
term5.addEventListener("click" , () => {Toggler(term5)});
