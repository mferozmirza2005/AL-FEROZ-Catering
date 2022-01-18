// firebase module importing
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";import {getDatabase,onValue,push,get,ref,set,child,update,remove,}from"https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";import{getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,}from"https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import Swiper from "https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js";
// firebase app configuration
const firebaseConfig = {measurementId: "G-C6N2HZX2JQ",projectId: "al-feroz-catering",messagingSenderId: "484902524065",storageBucket: "al-feroz-catering.appspot.com",authDomain: "al-feroz-catering.firebaseapp.com",apiKey: "AIzaSyDCbondLc_JAByjvYFqJhBRKhIdjE0zqMI",appId: "1:484902524065:web:8125f11f65f4a77aa84ce0",databaseURL: "https://al-feroz-catering-default-rtdb.firebaseio.com",};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const Database = getDatabase(app);

// checking user login / signUp or not

var UserAdded = false;

// login Submition

var submit = document.getElementById("submit");

// user phone number feild restrictions

var UserPhone = document.getElementById("phone");

UserPhone.addEventListener("keypress", (evt) => {
  var ch = String.fromCharCode(evt.which);
  if (!/[0-9]/.test(ch)) {
    evt.preventDefault();
  }
});

// login submition function

submit.addEventListener("click", (e) => {
  // for form default behaivior

  e.preventDefault();

  // getting login form inputs

  var UserName = document.getElementById("name");
  var UserPhone = document.getElementById("phone");
  var UserEmail = document.getElementById("email");
  var UserPass = document.getElementById("pass");

  // getting login form input values in {User Login Details} object.

  var ULD = {
    UserNamev: UserName.value,
    UserPhonev: UserPhone.value,
    UserEmailv: UserEmail.value,
    UserPassv: UserPass.value,
  };

  // getting login form problems spans

  var UserNameProb = document.getElementById("nameProb");
  var UserPhoneProb = document.getElementById("phoneProb");
  var UserEmailProb = document.getElementById("mailProb");
  var UserPassProb = document.getElementById("passProb");

  // getting login problem spans in {User Login Details problems} object.

  var ULDProb = {
    UserNamep: UserNameProb,
    UserPhonep: UserPhoneProb,
    UserEmailp: UserEmailProb,
    UserPassp: UserPassProb,
  };

  // user email value restrictions valiable

  var echeck = [/^[^@]+@\w/, /(\.\w+)+\w$/];

  // user name value restrictions

  if (ULD.UserNamev.length <= 5) {
    ULDProb.UserNamep.innerHTML = "Please enter 6 letters of your name.";
  } else if (ULD.UserNamev.length > 5) {
    ULDProb.UserNamep.innerHTML = "";
  }

  // user phone number value restrictions

  if (ULD.UserPhonev.length < 11) {
    ULDProb.UserPhonep.innerHTML = "Please give your complete Phone Number.";
  } else if (ULD.UserPhonev.length > 11) {
    ULDProb.UserPhonep.innerHTML = "Please give your complete Phone Number.";
  } else if (ULD.UserPhonev.length == 11) {
    ULDProb.UserPhonep.innerHTML = "";
  }

  // user email value restrictions

  if (echeck[0].test(ULD.UserEmailv) == false) {
    ULDProb.UserEmailp.innerHTML = "Please write '@' in your email.";
  } else if (echeck[1].test(ULD.UserEmailv) == false) {
    ULDProb.UserEmailp.innerHTML =
      "Please write something like '.com' in your email.";
  } else {
    ULDProb.UserEmailp.innerHTML = "";
  }

  // user login all value final restrictions

  if (
    ULD.UserNamev.length > 5 ||
    ULD.UserPhonev.length == 11 ||
    echeck[0].test(ULD.UserEmailv) == true ||
    echeck[1].test(ULD.UserEmailv) == true
  ) {
    const email = ULD.UserEmailv;
    const password = ULD.UserPassv;

    // creation of new user

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;

        // user id

        const uid = user.uid;

        // current date

        var date = new Date();

        // changing userAdded value

        UserAdded = true;

        // adding user login data into database

        set(ref(Database, "users/" + uid), {
          Email: ULD.UserEmailv,
          Name: ULD.UserNamev,
          Phone: ULD.UserPhonev,
          logDate:
            date.getDate() + " " + date.getMonth() + " " + date.getFullYear(),
          userid: uid,
        })
          .then(() => {
            // show user login success.

            ULDProb.UserNamep.style.color = "green";
            ULDProb.UserNamep.innerHTML = "You login successfully";

            // closing login div

            var logDiv = document.querySelector(".userLogin");
            logDiv.classList.remove("active");
          })
          .catch((error) => {});

        // getting username from database using logined user id

        const CuserID = auth.currentUser.uid;

        const CUSERNAME = ref(Database, "users/" + CuserID);
        onValue(CUSERNAME, (snapshot) => {
          window.sessionStorage.setItem("username", snapshot.val().Name);
          window.sessionStorage.setItem("UserAdded", UserAdded);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
});

//  getting signup form button

var signup = document.getElementById("already");

// making signup form html

var signupForm = `
<div class="logBody">
    <button id="SignformClose">
        <img src='${images[1]}'>
    </button>
    <h3>SignUp</h3>
    <form method="post" action="">
        <div class="logEmail">
            <p>Email</p>
            <span class="error" id="signUpEmailProb"></span>
            <input type="email" autocomplete="username" name="Email" id="signUpEmail"/>
        </div>
        <div class="logPass">
            <p>Password</p>
            <span class="error" id="passProb"></span>
            <input type="password" autocomplete="current-password" name="password" id="signUpPass"/>
        </div>
        <div class="logSubmit">
            <button id="SignUp">
                signup
            </button>
        </div>
    </form>
<div>
`;

// changing login div into signup dav

signup.addEventListener("click", () => {
  // deploying signup form in login form

  logDiv.innerHTML = signupForm;

  // getting signup form closing button

  var SignformClose = document.getElementById("SignformClose");

  // making signup form closing function

  SignformClose.addEventListener("click", () => {
    logDiv.classList.remove("active");
  });

  // getting signup form submit button

  var SignUp = document.getElementById("SignUp");

  // signup form submition function

  SignUp.addEventListener("click", (element) => {
    // for form default behaivior

    element.preventDefault();

    // getting signup form inputs

    var UserEmail = document.getElementById("signUpEmail");
    var UserPass = document.getElementById("signUpPass");

    // getting signup form problems spans

    var UserEmailProb = document.getElementById("signUpEmailProb");

    //   var UserPassProb = document.getElementById("passProb");

    // user email value restrictions valiable

    var echeck = [/^[^@]+@\w/, /(\.\w+)+\w$/];

    // user email value restrictions

    if (echeck[0].test(UserEmail.value) == false) {
      UserEmailProb.innerHTML = "Please write '@' in your email.";
    } else if (echeck[1].test(UserEmail.value) == false) {
      UserEmailProb.UserEmailp.innerHTML =
        "Please write something like '.com' in your email.";
    } else {
      // user signup form finalization

      UserEmailProb.innerHTML = "";

      // getting signup form inputs values

      const email = UserEmail.value;
      const password = UserPass.value;

      //signup form submition function

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // user id

          const uid = user.uid;

          // user current date

          var date = new Date();

          // closing signup form

          logDiv.classList.remove("active");

          // ...

          // console previous warnings and errors cleaning

          console.clear();

          // changing userAdded value

          UserAdded = true;

          // getting username from database using logined user id

          const CUserID = auth.currentUser.uid;

          const CUSERNAME = ref(Database, "users/" + CUserID);
          onValue(CUSERNAME, (snapshot) => {
            window.sessionStorage.setItem("username", snapshot.val().Name);
            window.sessionStorage.setItem("UserAdded", UserAdded);
          });

          // show user signup success

          UserEmailProb.style.color = "green";
          UserEmailProb.innerHTML = "You SignUp successfully";

          // updating user login / signup data

          update(ref(Database, "users/" + uid), {
            UserCredential: user,
            logDate:
              date.getMinutes() +
              " " +
              date.getDate() +
              " " +
              date.getMonth() +
              " " +
              date.getFullYear(),
          })
            .then(() => {})
            .catch((error) => {});
        })
        .catch((error) => {
          const errorCode = error.code;

          const errorMessage = error.message;
        });
    }
  });
});

console.log()

if (window.location.href == window.origin + "/") {
  const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });

  var swiperContainer1 = document.getElementById("swiperContainer1");

  const DBRef1 = ref(Database, "MainMenu/AllMenu");
  const HomeMenu = [];

  onValue(DBRef1, (snapshot) => {
    var i = 0;
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      HomeMenu[i] = data;
      i++;
    });
    for (let x = 0; x < HomeMenu.length; x++) {
      var SwiperSlide = document.createElement("div");
      SwiperSlide.setAttribute("class", "swiper-slide");
  
      var CSIMG = document.createElement("div");
      CSIMG.setAttribute("class", "CSIMG");
  
      var CSTXT = document.createElement("div");
      CSTXT.setAttribute("class", "CSTXT");
  
      var CSimg = document.createElement("img");
      var CSName = document.createElement("h2");
      var CSPrice = document.createElement("p");
      var CSLink = document.createElement("button");
  
      CSimg.src = HomeMenu[x].Img;
      CSimg.alt = "...";
  
      var CSNameTxt = document.createTextNode(HomeMenu[x].ItemName);
      var CSPriceTxt = document.createTextNode("Rs." + HomeMenu[x].price);
      var CSLinkTxt = document.createTextNode("Goto Menu");
  
      CSName.appendChild(CSNameTxt);
      CSPrice.appendChild(CSPriceTxt);
      CSLink.appendChild(CSLinkTxt);
  
      CSIMG.appendChild(CSimg);
      CSTXT.appendChild(CSName);
      CSTXT.appendChild(CSPrice);
      CSTXT.appendChild(CSLink);
  
      SwiperSlide.appendChild(CSIMG);
      SwiperSlide.appendChild(CSTXT);
  
      swiperContainer1.appendChild(SwiperSlide);

      CSLink.addEventListener("click" , () => {
        window.location = window.origin + "/menu.html";
      })
    }
  });

  var swiper2 = new Swiper(".mySwiper2", {
    grabCursor: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
  });

  var swiperContainer2 = document.getElementById("swiperContainer2");

  const DBRef2 = ref(Database, "MainMenu/SeasonMenu");
  const SeasonMenu = [];

  onValue(DBRef2, (snapshot) => {
    var i = 0;
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      SeasonMenu[i] = data;
      i++;
    });
    for (let x = 0; x < SeasonMenu.length; x++) {
      var SwiperSlide = document.createElement("div");
      SwiperSlide.setAttribute("class", "swiper-slide");
  
      var CSIMG = document.createElement("div");
      CSIMG.setAttribute("class", "CSIMG");
  
      var CSTXT = document.createElement("div");
      CSTXT.setAttribute("class", "CSTXT");
  
      var CSimg = document.createElement("img");
      var CSName = document.createElement("h2");
      var CSPrice = document.createElement("p");
      var CSLink = document.createElement("button");
  
      CSimg.src = SeasonMenu[x].Img;
      CSimg.alt = "...";
  
      var CSNameTxt = document.createTextNode(SeasonMenu[x].Name);
      var CSPriceTxt = document.createTextNode("Rs." + SeasonMenu[x].price);
      var CSLinkTxt = document.createTextNode("Goto Menu");
  
      CSName.appendChild(CSNameTxt);
      CSPrice.appendChild(CSPriceTxt);
      CSLink.appendChild(CSLinkTxt);
  
      CSIMG.appendChild(CSimg);
      CSTXT.appendChild(CSName);
      CSTXT.appendChild(CSPrice);
      CSTXT.appendChild(CSLink);
  
      SwiperSlide.appendChild(CSIMG);
      SwiperSlide.appendChild(CSTXT);
  
      swiperContainer2.appendChild(SwiperSlide);

      CSLink.addEventListener("click" , () => {
        window.location = window.origin + "/menu.html";
      })
    }
  });
}

var selectedMenu = [];

if (window.location.href == window.origin + "/menu.html") {
  window.addEventListener("unload", () => {
    window.sessionStorage.setItem("selectedMenu", JSON.stringify(selectedMenu));
  });
  // getting Main Menu div from DOM.

  const mainMenu = document.getElementById("mainMenu");
  var DBMenuItems = [];

  const DBRef = ref(Database, "MainMenu/AllMenu");

  onValue(
    DBRef,
    (snapshot) => {
      var i = 0;
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        DBMenuItems[i] = data;
        i++;
      });
      for (let i = 0; i < DBMenuItems.length; i++) {
        // creating menu item div.

        const menuItem = document.createElement("div");

        // setting id attribute on menu item div.

        var menuItemID = DBMenuItems[i].ItemName.replace(/[ ]/g, "");

        menuItem.setAttribute("id", menuItemID);
        menuItem.setAttribute("class", "menuItem");

        // creating menu item img div.

        const menuItemImg = document.createElement("div");

        // setting class attribute on menu item img div.

        menuItemImg.setAttribute("class", "menuItemImg");

        // creating menu item txt div.

        const menuItemTxt = document.createElement("div");

        // setting class attribute on menu item txt div.

        menuItemTxt.setAttribute("class", "menuItemTxt");

        // inserting menu item img div in menu item div.

        menuItem.append(menuItemImg);

        // inserting menu item txt div in menu item div.

        menuItem.append(menuItemTxt);

        // creating menu item img.

        const menuItemImage = document.createElement("img");

        // setting menu item img src and alt.

        menuItemImage.src = DBMenuItems[i].Img;
        menuItemImage.alt = "...";

        // inserting menu item img in menu item img div.

        menuItemImg.appendChild(menuItemImage);

        // creating menu item span.

        const menuItemLike = document.createElement("i");

        // setting menu item img span like button.

        menuItemLike.setAttribute("class", "far fa-heart");

        // inserting menu item img in menu item img div.

        menuItemImg.appendChild(menuItemLike);

        menuItemLike.addEventListener("click", () => {
          const ratingRef = ref(Database, "MainMenu/AllMenu/" + i);
          if (menuItemLike.classList[0] == "far") {
            menuItemLike.classList.replace("far", "fas");
            update(ratingRef, {
              rating: DBMenuItems[i].rating + 1,
            });
          } else if (menuItemLike.classList[0] == "fas") {
            menuItemLike.classList.replace("fas", "far");
            const upRating = DBMenuItems[i].rating - 1;
            update(ratingRef, {
              rating: upRating + 1,
            });
          }
        });

        // creating menu item txt (h2).

        const Itemheading = document.createElement("h2");

        // creating menu item txt (h2) text.

        const ItemheadingTxt = document.createTextNode(DBMenuItems[i].ItemName);

        // inserting text in menu item txt (h2).

        Itemheading.appendChild(ItemheadingTxt);

        // inserting (h2) in menu item txt .

        menuItemTxt.appendChild(Itemheading);

        // creating menu item txt rating(div).

        const ItemRating = document.createElement("div");
        ItemRating.setAttribute("class", "rating");

        // creating menu item txt rating(div) span.

        const ItemRatingTxt = document.createElement("span");

        // getting rating from database.

        const TotalUsersRef = ref(Database, "users/");
        const TotalUsersReceived = [];
        onValue(TotalUsersRef, (snapshot) => {
          var i = 0;
          snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            TotalUsersReceived[i] = data;
            i++;
          });
        });

        // making rating calculor and storing

        const TotalratingReceive = DBMenuItems[i].rating;
        const TotalUsersReceive = TotalUsersReceived.length + 1;
        const TotalRating = (TotalratingReceive / TotalUsersReceive) * 100;

        // creating menu item txt rating(div) span text.

        const ItemRatingTxtNode = document.createTextNode(TotalRating);

        // inserting text in menu item txt rating(div) span.

        ItemRatingTxt.appendChild(ItemRatingTxtNode);

        // inserting span in menu item txt rating(div).

        ItemRating.appendChild(ItemRatingTxt);

        // creating menu item txt rating(div) i.

        const ItemRatingI = document.createElement("i");
        ItemRatingI.setAttribute("class", "fas fa-star");

        // inserting i in menu item txt rating(div).

        ItemRating.appendChild(ItemRatingI);

        // inserting rating(div) in menu item txt .

        menuItemTxt.appendChild(ItemRating);

        // creating menu item txt child (div).

        const ItemAddDiv = document.createElement("div");

        // setting class attribute on menu item txt div.

        ItemAddDiv.setAttribute("class", "menuItemAdd");

        // inserting child (div) in menu item txt .

        menuItemTxt.appendChild(ItemAddDiv);

        // creating menu item txt child div (p).

        const ItemAddDivP = document.createElement("p");

        // creating menu item txt child div (p) text part 1.

        const ItemAddDivPTxt1 = document.createTextNode("RS.");

        // inserting text in menu item txt child div (p).

        ItemAddDivP.appendChild(ItemAddDivPTxt1);

        // creating menu item txt child div (p) small tag.

        const ItemAddDivPS = document.createElement("small");

        // creating small tag text.

        const ItemAddDivPStxt = document.createTextNode(DBMenuItems[i].price);

        // inserting text in menu item txt child div (p) small tag.

        ItemAddDivPS.appendChild(ItemAddDivPStxt);

        // inserting small tag in menu item txt child div (p).

        ItemAddDivP.appendChild(ItemAddDivPS);

        // creating menu item txt child div (p) text part 2.

        const ItemAddDivPTxt2 = document.createTextNode(" per / 1KG");

        // inserting text in menu item txt child div (p).

        ItemAddDivP.appendChild(ItemAddDivPTxt2);

        // inserting (p) in menu item txt child div.

        ItemAddDiv.appendChild(ItemAddDivP);

        // creating menu item txt child div (dutton).

        const ItemAddDivB = document.createElement("button");

        // creating menu item child div (button) text.

        const ItemAddDivBTxt = document.createTextNode("Add To Cart");

        // inserting button text in menu item child div (button).

        ItemAddDivB.appendChild(ItemAddDivBTxt);

        // inserting button in menu item child div.

        ItemAddDiv.appendChild(ItemAddDivB);

        // inserting menu item div in main menu.

        mainMenu.appendChild(menuItem);

        // setting function on menu item txt child div (button).

        ItemAddDivB.addEventListener("click", () => {
          const addItem = ItemAddDivB.parentNode.parentNode.parentNode.id;
          const AddItemSuccess = document.getElementById("orderSuccess");

          AddItemSuccess.style.display = "flex";

          ItemAddDivB.disabled = true;
          ItemAddDivBTxt.replaceWith("Item Added");

          const AddItemSuccessBTN = document.getElementById("orderSuccessBTN");

          AddItemSuccessBTN.addEventListener("click", () => {
            AddItemSuccess.style.display = "none";
          });

          if (addItem == DBMenuItems[i].ItemName.replace(/[ ]/g, "")) {
            var NewItem = {
              Name: DBMenuItems[i].ItemName,
              Img: DBMenuItems[i].Img,
              Price: DBMenuItems[i].price,
            };
            selectedMenu.push(NewItem);
            console.log(selectedMenu);
          }
        });
      }
    },
    {
      onlyOnce: true,
    }
  );

  // getting Season Menu div from DOM.

  const SeasonMenuItems = document.getElementById("SeasonMenuItems");

  var DBSMenuItems = [];

  const SDBRef = ref(Database, "MainMenu/SeasonMenu");

  onValue(
    SDBRef,
    (snapshot) => {
      var i = 0;
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        DBSMenuItems[i] = data;
        i++;
      });
      for (let i = 0; i < DBSMenuItems.length; i++) {
        const SMenuItem = document.createElement("div");

        var SMenuItemID = DBSMenuItems[i].Name.replace(/[ ]/g, "");

        SMenuItem.setAttribute("id", SMenuItemID);
        SMenuItem.setAttribute("class", "SmenuItem");

        SeasonMenuItems.appendChild(SMenuItem);

        const SmenuItemImg = document.createElement("div");
        SmenuItemImg.setAttribute("class", "SmenuItemImg");

        SMenuItem.appendChild(SmenuItemImg);

        const SmenuItemImage = document.createElement("img");
        SmenuItemImage.src = DBSMenuItems[i].Img;
        SmenuItemImage.alt = "...";

        SmenuItemImg.appendChild(SmenuItemImage);

        const SmenuItemLike = document.createElement("i");
        SmenuItemLike.setAttribute("class", "far fa-heart");

        // inserting menu item img in menu item img div.

        SmenuItemImg.appendChild(SmenuItemLike);

        SmenuItemLike.addEventListener("click", () => {
          const SratingRef = ref(Database, "MainMenu/SeasonMenu/" + i);
          if (SmenuItemLike.classList[0] == "far") {
            SmenuItemLike.classList.replace("far", "fas");
            update(SratingRef, {
              rating: DBSMenuItems[i].rating + 1,
            });
          } else if (SmenuItemLike.classList[0] == "fas") {
            SmenuItemLike.classList.replace("fas", "far");
            const SupRating = DBSMenuItems[i].rating - 1;
            update(SratingRef, {
              rating: SupRating + 1,
            });
          }
        });

        const SmenuItemTxt = document.createElement("div");
        SmenuItemTxt.setAttribute("class", "SmenuItemTxt");

        const SmenuItemTxtHead = document.createElement("h2");

        SMenuItem.appendChild(SmenuItemTxt);

        const SmenuItemTxtHeadTxt = document.createTextNode(
          DBSMenuItems[i].Name
        );

        SmenuItemTxtHead.appendChild(SmenuItemTxtHeadTxt);
        SmenuItemTxt.appendChild(SmenuItemTxtHead);

        // creating menu item txt rating(div).

        const SItemRating = document.createElement("div");
        SItemRating.setAttribute("class", "rating");

        // creating menu item txt rating(div) span.

        const SItemRatingTxt = document.createElement("span");

        // getting rating from database.

        const STotalUsersRef = ref(Database, "users/");
        const STotalUsersReceived = [];
        onValue(STotalUsersRef, (snapshot) => {
          var i = 0;
          snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            STotalUsersReceived[i] = data;
            i++;
          });
        });

        // making rating calculor and storing

        const STotalratingReceive = DBSMenuItems[i].rating;
        const STotalUsersReceive = STotalUsersReceived.length + 1;
        const STotalRating = (STotalratingReceive / STotalUsersReceive) * 100;

        // creating menu item txt rating(div) span text.

        const SItemRatingTxtNode = document.createTextNode(STotalRating);

        // inserting text in menu item txt rating(div) span.

        SItemRatingTxt.appendChild(SItemRatingTxtNode);

        // inserting span in menu item txt rating(div).

        SItemRating.appendChild(SItemRatingTxt);

        // creating menu item txt rating(div) i.

        const SItemRatingI = document.createElement("i");
        SItemRatingI.setAttribute("class", "fas fa-star");

        // inserting i in menu item txt rating(div).

        SItemRating.appendChild(SItemRatingI);

        // inserting rating(div) in menu item txt .

        SmenuItemTxt.appendChild(SItemRating);

        // creating menu item txt child (div).

        const SItemAddDiv = document.createElement("div");

        // setting class attribute on menu item txt div.

        SItemAddDiv.setAttribute("class", "SmenuItemAdd");

        // inserting child (div) in menu item txt .

        SmenuItemTxt.appendChild(SItemAddDiv);

        // creating menu item txt child div (p).

        const SItemAddDivP = document.createElement("p");

        // creating menu item txt child div (p) text part 1.

        const SItemAddDivPTxt1 = document.createTextNode("RS.");

        // inserting text in menu item txt child div (p).

        SItemAddDivP.appendChild(SItemAddDivPTxt1);

        // creating menu item txt child div (p) small tag.

        const SItemAddDivPS = document.createElement("small");

        // creating small tag text.

        const SItemAddDivPStxt = document.createTextNode(DBSMenuItems[i].price);

        // inserting text in menu item txt child div (p) small tag.

        SItemAddDivPS.appendChild(SItemAddDivPStxt);

        // inserting small tag in menu item txt child div (p).

        SItemAddDivP.appendChild(SItemAddDivPS);

        // creating menu item txt child div (p) text part 2.

        const SItemAddDivPTxt2 = document.createTextNode(" per / 1KG");

        // inserting text in menu item txt child div (p).

        SItemAddDivP.appendChild(SItemAddDivPTxt2);

        // inserting (p) in menu item txt child div.

        SItemAddDiv.appendChild(SItemAddDivP);

        // creating menu item txt child div (dutton).

        const SItemAddDivB = document.createElement("button");

        // creating menu item child div (button) text.

        const SItemAddDivBTxt = document.createTextNode("Add To Cart");

        // inserting button text in menu item child div (button).

        SItemAddDivB.appendChild(SItemAddDivBTxt);

        // inserting button in menu item child div.

        SItemAddDiv.appendChild(SItemAddDivB);

        // setting function on menu item txt child div (button).

        SItemAddDivB.addEventListener("click", () => {
          const addItem = SItemAddDivB.parentNode.parentNode.parentNode.id;

          const AddItemSuccess = document.getElementById("orderSuccess");

          AddItemSuccess.style.display = "flex";

          SItemAddDivB.disabled = true;
          SItemAddDivBTxt.replaceWith("Item Added");

          const AddItemSuccessBTN = document.getElementById("orderSuccessBTN");

          AddItemSuccessBTN.addEventListener("click", () => {
            AddItemSuccess.style.display = "none";
          });
          if (addItem == DBSMenuItems[i].Name.replace(/[ ]/g, "")) {
            var NewItem = {
              Name: DBSMenuItems[i].Name,
              Img: DBSMenuItems[i].Img,
              Price: DBSMenuItems[i].price,
            };
            selectedMenu.push(NewItem);
            console.log(selectedMenu);
          }
        });
      }
    },
    {
      onlyOnce: true,
    }
  );
}

if (window.location.href == window.origin + "/cart.html") {
  var CartTBody = document.getElementById("cartTbody");
  var SubmitOrder = document.getElementById("SubmitOrder").children[0];

  selectedMenu = JSON.parse(window.sessionStorage.getItem("selectedMenu"));

  var ODate;
  var OQuantity;
  var ordered = false;
  function itemRemover(arr, index) {
    var array = arr;
    array.splice(index, 1);
    return array;
  }

  if (selectedMenu.length === 0) {
    var CartEmpty = document.createElement("div");
    CartEmpty.setAttribute("class", "emptyCart");
    SubmitOrder.remove();

    var CartEmptyP1 = document.createElement("p");
    var CartEmptyP2 = document.createElement("p");
    var CartEmptyP1TXT = document.createTextNode("Your Cart is empty.");
    var CartEmptyP2TXT = document.createTextNode(
      "Please add items in your to order now."
    );

    var CartEmptyP1Img = document.createElement("img");
    CartEmptyP1Img.src =
      "images/production_quantity_limits_white_24dp.svg";

    CartEmptyP1.appendChild(CartEmptyP1Img);
    CartEmptyP1.appendChild(CartEmptyP1TXT);
    CartEmptyP2.appendChild(CartEmptyP2TXT);
    CartEmpty.appendChild(CartEmptyP1);
    CartEmpty.appendChild(CartEmptyP2);
    CartTBody.appendChild(CartEmpty);
  } else {
    for (let i = 0; i < selectedMenu.length; i++) {

      var CartTrow = document.createElement("div");
      CartTrow.setAttribute("class", "cartTrow");

      var CartTData1 = document.createElement("div");
      CartTData1.setAttribute("class", "cartTdata");

      var CartTData2 = document.createElement("div");
      CartTData2.setAttribute("class", "cartTdata");

      var CartTData3 = document.createElement("div");
      CartTData3.setAttribute("class", "cartTdata");

      var CartTData4 = document.createElement("div");
      CartTData4.setAttribute("class", "cartTdata");

      var CartTData5 = document.createElement("div");
      CartTData5.setAttribute("class", "cartTdata");

      var CartTData6 = document.createElement("div");
      CartTData6.setAttribute("class", "cartTdata");

      var CartTData7 = document.createElement("div");
      CartTData7.setAttribute("class", "cartTdata");

      var CTD2main = document.createElement("img");
      CTD2main.src = selectedMenu[i].Img;

      var CTD1main = document.createElement("h2");
      var CTD3main = document.createElement("p");
      var CTD4main = document.createElement("p");
      var CTD5main = document.createElement("p");
      var CTD6main = document.createElement("p");

      var CTD7main1 = document.createElement("button");
      var CTD7main2 = document.createElement("span");
      var CTD7main3 = document.createElement("button");

      var CTD1mainTxt = document.createTextNode(i + 1);
      var CTD3mainTxt = document.createTextNode(selectedMenu[i].Name);
      var CTD4mainTxt = document.createTextNode("1kg / 5kg");
      var CTD5mainTxt = document.createTextNode(".");
      var CTD6mainTxt = document.createTextNode(selectedMenu[i].Price);
      var CTD7main1Txt = document.createTextNode("-");
      var CTD7main2Txt = document.createTextNode("1");
      var CTD7main3Txt = document.createTextNode("+");

      var DeleteItem = document.createElement("div");
      DeleteItem.setAttribute("class", "deleteItem");

      var DImain = document.createElement("i");
      DImain.setAttribute("class", "fad fa-trash-alt");

      CTD1main.appendChild(CTD1mainTxt);
      CTD3main.appendChild(CTD3mainTxt);
      CTD4main.appendChild(CTD4mainTxt);
      CTD5main.appendChild(CTD5mainTxt);
      CTD6main.appendChild(CTD6mainTxt);

      CTD7main1.appendChild(CTD7main1Txt);
      CTD7main2.appendChild(CTD7main2Txt);
      CTD7main3.appendChild(CTD7main3Txt);

      CartTData1.appendChild(CTD1main);
      CartTData2.appendChild(CTD2main);
      CartTData3.appendChild(CTD3main);
      CartTData4.appendChild(CTD4main);
      CartTData5.appendChild(CTD5main);
      CartTData6.appendChild(CTD6main);

      CartTData7.appendChild(CTD7main1);
      CartTData7.appendChild(CTD7main2);
      CartTData7.appendChild(CTD7main3);

      DeleteItem.appendChild(DImain);

      CartTrow.appendChild(CartTData1);
      CartTrow.appendChild(CartTData2);
      CartTrow.appendChild(CartTData3);
      CartTrow.appendChild(CartTData4);
      CartTrow.appendChild(CartTData5);
      CartTrow.appendChild(CartTData6);
      CartTrow.appendChild(CartTData7);
      CartTrow.appendChild(DeleteItem);

      CartTBody.appendChild(CartTrow);

      DeleteItem.addEventListener("click", (e) => {
        var MName =
          e.target.parentElement.previousSibling.previousSibling.previousSibling
            .previousSibling.previousSibling.innerText;
        for (let n = 0; n < selectedMenu.length; n++) {
          if (selectedMenu[n].Name === MName) {
            itemRemover(selectedMenu, n);
          }
        }
        return e.target.parentElement.parentElement.remove();
      });

      CTD7main1.addEventListener("click", (e) => {
        var minus = parseInt(e.target.nextSibling.innerText);
        var MName =
          e.target.parentElement.previousSibling.previousSibling.previousSibling
            .previousSibling.innerText;
        if (minus > 1) {
          for (let y = 0; y < selectedMenu.length; y++) {
            if (selectedMenu[y].Name === MName) {
              e.target.parentElement.previousSibling.innerText =
                parseInt(e.target.parentElement.previousSibling.innerText) -
                selectedMenu[y].Price;
            }
          }
          e.target.nextSibling.innerText = minus - 1;
          e.target.nextSibling.nextSibling.disabled = false;
        } else {
          e.target.disabled = true;
        }
      });

      CTD7main3.addEventListener("click", (e) => {
        var plus = parseInt(e.target.previousSibling.innerText);
        var MName =
          e.target.parentElement.previousSibling.previousSibling.previousSibling
            .previousSibling.innerText;
        if (plus < 5) {
          for (let y = 0; y < selectedMenu.length; y++) {
            if (selectedMenu[y].Name === MName) {
              e.target.parentElement.previousSibling.innerText =
                parseInt(e.target.parentElement.previousSibling.innerText) +
                selectedMenu[y].Price;
            }
          }
          e.target.previousSibling.innerText = plus + 1;
          e.target.previousSibling.previousSibling.disabled = false;
        } else {
          e.target.disabled = true;
        }
      });
    }
    SubmitOrder.addEventListener("click", (e) => {
      ODate = new Date();
      for (var y = 0; y < selectedMenu.length; y++) {
        OQuantity = CartTBody.children[y].children[6].children[1].innerText;
        selectedMenu[y]["Quantity"] = OQuantity;
      }
      if (ordered === false) {
        ordered = true;
        if (window.sessionStorage.getItem("UserAdded") == "true") {
          set(
            push(
              ref(
                Database,
                "Orders/" + window.sessionStorage.getItem("username")
              )
            ),
            {
              order: selectedMenu,
              OrderTime: {
                Date:
                  ODate.getFullYear() +
                  " : " +
                  ODate.getMonth() +
                  " : " +
                  ODate.getDate(),
                Time:
                  ODate.getHours() +
                  " : " +
                  ODate.getMinutes() +
                  " : " +
                  ODate.getSeconds(),
              },
            }
          )
            .then(() => {})
            .catch((error) => {});
        }
      }
      e.disabled = true;
    });
  }
}

if (window.location.href == window.origin + "/feed.html") {
  function ShowPosts() {
    // list of all Feedbacks

    var AllPosts = {};

    const DBRef = ref(Database, "Feedbacks/");

    onValue(
      DBRef,
      (snapshot) => {
        var i = 0;
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          i++;
          AllPosts[i] = childData;

          // ...

          // user's post html genetating

          var userImg = "images/person-fill.svg";

          var posting = `
                        <div class="userFeed">
                            <div class="userImg">
                                <div class="img">
                                    <img src="${userImg}" alt="">
                                </div>
                            </div>
                            <div class="userMsg">
                                <div class="msg">
                                    <h1>${AllPosts[i].PostingUser}</h1>
                                    <span>
                                        Time: ${AllPosts[i].postMinute} - ${AllPosts[i].postHour} 
                                        <br>
                                        Date: ${AllPosts[i].postDate} - ${AllPosts[i].postMonth} - ${AllPosts[i].postYear}
                                    </span>
                                    <div>
                                    ${AllPosts[i].UserPost}
                                    </div>
                                </div>
                            </div>
                        </div>
                      `;

          postFeild.innerHTML += posting;
        });
      },
      {
        onlyOnce: true,
      }
    );
  }
  window.onload = ShowPosts();

  // post execution feild submition

  PostSubmit.addEventListener("click", () => {
    // getting user post value

    var post = document.getElementById("userPost");
    post = post.value;

    if (window.sessionStorage.getItem("UserAdded") == "true") {
      // post feild value checking

      if (post === "") {
        return false;
      } else {
        set(push(ref(Database, "Feedbacks/")), {
          PostingUser: window.sessionStorage.getItem("username"),
          postMinute: fminute,
          postHour: fhour,
          postDate: fdate,
          postMonth: fmonth,
          postYear: fyear,
          UserPost: fpost,
        })
          .then(() => {})
          .catch((error) => {});

        var post = (document.getElementById("userPost").value = "");
        postFeild.innerHTML = "";
        ShowPosts();
      }
    }
  });
}
