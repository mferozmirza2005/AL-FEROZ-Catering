var images = ["images/Asset1.svg" , "images/close_white_24dp.svg"];

function navbar() {
    var cssLink = document.createElement("link");
    cssLink.rel = "StyleSheet";
    cssLink.type = "text/css";
    cssLink.href = "css/style.css";
    var fontawesome = document.createElement("link");
    fontawesome.rel="stylesheet";
    fontawesome.href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css";
    fontawesome.crossorigin="anonymous";
    document.getElementsByTagName("head")[0].appendChild(cssLink);
    document.getElementsByTagName("head")[0].appendChild(fontawesome);
    
    var links = {
        Home : ['Home', '/'],
        Menu : ['Menu', '/menu.html'],
        Cart : [`Cart`, '/cart.html'],
        Feedback : ['Feedback', '/feed.html'],
    };

    var nav = `
        <div class='nav' id='nav'>
            <div class='navLogo'>
                <img src='${images[0]}'>
            </div>
            <div class='navList'>
                <ul>
                    <li>
                        <a href='${links.Home[1]}'>
                        ${links.Home[0]}
                        </a>
                    </li>
                    <li>
                        <a href='${links.Menu[1]}'>
                            ${links.Menu[0]}
                        </a>
                    </li>
                    <li>
                        <a href='${links.Cart[1]}'>
                            ${links.Cart[0]}
                        </a>
                    </li>
                    <li>
                        <a href='${links.Feedback[1]}'>
                            ${links.Feedback[0]}
                        </a>
                    </li>
                    <li>
                        <button id="loginBtn1">
                            Login
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class='mobNav' id='mobNav'>
            <div class='mobNavTop'>
                <div class='navSliderContainer'>
                    <div class='navSlider'>
                        <div class='line1'></div>
                        <div class='line2'></div>
                    </div>
                </div>
                <div class='navLogo'>
                    <img src='${images[0]}'>
                </div>
                <div class="login">
                    <button id="loginBtn2">
                        Login
                    </button>
                </div>
            </div>
            <div class='mobNavList'>
                <ul>
                    <li>
                        <a href='${links.Home[1]}'>
                        ${links.Home[0]}
                        </a>
                    </li>
                    <li>
                        <a href='${links.Menu[1]}'>
                            ${links.Menu[0]}
                        </a>
                    </li>
                    <li>
                        <a href='${links.Cart[1]}'>
                            ${links.Cart[0]}
                        </a>
                    </li>
                    <li>
                        <a href='${links.Feedback[1]}'>
                            ${links.Feedback[0]}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="userLogin"></div>
        <div class="navBack"></div>
    `;

    return nav;
};

var navbar = (document.getElementById("navbar").innerHTML += navbar());

var navSliderContainer = document.querySelector(".mobNavTop .navSliderContainer");
var mobNav = document.querySelector(".mobNav");

navSliderContainer.addEventListener("click", () =>  {
    mobNav.classList.toggle("active");
});

var logDiv = document.querySelector(".userLogin");

var login1 = document.getElementById("loginBtn1");
var login2 = document.getElementById("loginBtn2");

var loginForm = `
    <div class="logBody">
        <button id="formClose">
            <img src='${images[1]}'>
        </button>
        <h3>Login</h3>
        <form method="post" action="">
            <div class="logName">
                <p>Name</p>
                <span class="error" id="nameProb"></span>
                <input type="text" name="Name" id="name"/>
            </div>
            <div class="logNumber">
                <p>Phone Number</p>
                <span class="error" id="phoneProb"></span>
                <input type"text" name="phone" id="phone"/>
            </div>
            <div class="logEmail">
                <p>Email</p>
                <span class="error" id="mailProb"></span>
                <input type="email" autocomplete="username" name="Email" id="email"/>
            </div>
            <div class="logPass">
                <p>Password</p>
                <span class="error" id="passProb"></span>
                <input type="password" autocomplete="current-password" name="password" id="pass"/>
            </div>
            <div class="logSubmit">
                <button id="submit">
                    Login
                </button>
            </div>
            <div id='already'>Already have an account? <span id='signup'>signup</span> </div>
        </form>
    <div>
`;

logDiv.innerHTML = loginForm;

login1.addEventListener("click", () => {
    logDiv.classList.add("active");
});

login2.addEventListener("click", () => {
    logDiv.classList.add("active");
});

var formClose = document.getElementById("formClose");

formClose.addEventListener("click", () => {
    logDiv.classList.remove("active");
});

var navFixing = document.getElementById("nav");
var mobnavFixing = document.getElementById("mobNav");

function navPositions() {
    var scrollValue = window.scrollY;
    if (scrollValue > 0) {
        logDiv.style.marginTop = "85px";
        navFixing.style.position = 'fixed';
        mobnavFixing.style.position = 'fixed';
    }
    else{
        logDiv.style.marginTop = "10px";
        navFixing.style.position = 'relative';
        mobnavFixing.style.position = 'relative';
    }
}

window.addEventListener("scroll" , () => {
    navPositions();
    if (window.location.href == window.origin+'/feed.html') {
    }
    else if (window.location.href == window.origin+'/menu.html') {
        MenuHeight();
    }
    else if (window.location.href == window.origin+'/cart.html') {
        CartHeight();
    }
    else if (window.location.href == window.origin+'/') {
        HomeHeight();
    }
});

function footer() {
    var footer = document.createElement("footer");
    
    var child1 = document.createElement("div"); 
    var child2 = document.createElement("div"); 
    var child3 = document.createElement("div");
    
    var child1Link1 = document.createElement("a");
    child1Link1.href = "https://api.whatsapp.com/send/?phone=923180202325";
    var child1Link2 = document.createElement("a");
    child1Link2.href = "";
    
    var child2Link1 = document.createElement("a");
    child2Link1.href = "/";
    var child2Link2 = document.createElement("a");
    child2Link2.href = "/menu.html";
    var child2Link3 = document.createElement("a");
    child2Link3.href = "/cart.html";
    var child2Link4 = document.createElement("a");
    child2Link4.href = "/feed.html";
    
    var child1Link1I = document.createElement("i");
    child1Link1I.setAttribute("class" , "fab fa-whatsapp-square");
    var child1Link2I = document.createElement("i");
    child1Link2I.setAttribute("class" , "fab fa-facebook-square");

    var child2Link1TXT = document.createTextNode("Home");
    var child2Link2TXT = document.createTextNode("Menu");
    var child2Link3TXT = document.createTextNode("Cart");
    var child2Link4TXT = document.createTextNode("Feedback");
    
    var child3Node = document.createElement("p");
    var child3TXTNode = document.createTextNode("Copyright© by ");

    var child3TXTchild = document.createElement("span");
    var child3TXTchildtxt = document.createTextNode("AL-Feroz Develops");
    
    child3TXTchild.appendChild(child3TXTchildtxt);
    
    child1Link1.appendChild(child1Link1I);
    child1Link2.appendChild(child1Link2I);
    
    child2Link1.appendChild(child2Link1TXT);
    child2Link2.appendChild(child2Link2TXT);
    child2Link3.appendChild(child2Link3TXT);
    child2Link4.appendChild(child2Link4TXT);
    
    child3Node.appendChild(child3TXTNode);
    child3Node.appendChild(child3TXTchild);
    
    child1.appendChild(child1Link1);
    child1.appendChild(child1Link2);
    child2.appendChild(child2Link1);
    child2.appendChild(child2Link2);
    child2.appendChild(child2Link3);
    child2.appendChild(child2Link4);
    child3.appendChild(child3Node);
    
    footer.appendChild(child1);
    footer.appendChild(child2);
    footer.appendChild(child3);
    
    return footer;
}

var footerPlace = document.getElementsByTagName("body")[0];

window.addEventListener("load" , () => {
    footerPlace.appendChild(footer());
})