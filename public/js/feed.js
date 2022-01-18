// post feild show button

var postbtn = document.getElementById("postBtn");

// post feild

var postArea = document.querySelector(".postArea");

// post feild showing

postbtn.addEventListener("click", () => {
  postArea.classList.toggle("active");
});

// post execution feild

var postFeild = document.querySelector(".feedbook .feeds");

// getting post execution feild submition

var PostSubmit = document.getElementById("postSubmit");

// post execution feild submition time

var cTime = new Date();
var fminute = cTime.getMinutes();
var fhour = cTime.getHours();
var fdate = cTime.getDate();
var fmonth = cTime.getMonth();
var fyear = cTime.getUTCFullYear();
