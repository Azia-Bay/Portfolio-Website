var navigationBar = document.querySelector('.main-navigation');
var navigationLinks = navigationBar.querySelectorAll('a');

// Highlights navigation link upon hover
navigationLinks.forEach((link, index) => {
  if(index == 0) return;
  link.addEventListener("mouseenter", navigationLinkOnMouseEnter);
});
function navigationLinkOnMouseEnter() {
  if(this.style.color == "deepskyblue") return;
  this.style.color = "deepskyblue";
  this.addEventListener("mouseleave", navigationLinkOnMouseLeave);
}
function navigationLinkOnMouseLeave() {
  this.style.color = "white";
  this.removeEventListener("mouseleave", navigationLinkOnMouseLeave);
}

var toTopArrow = document.querySelector(".to-top-arrow");

// Updates navigation bar and to-top arrow corresponding to their positions relative to the banner
var banner = document.querySelector(".banner");
var navigationListItems = navigationBar.querySelectorAll("li");
var hamburgerMenu = document.querySelector('.hamburger-menu');
var hamburgerLines = hamburgerMenu.querySelectorAll('.line');
document.addEventListener("scroll", function() {
  if(banner.getBoundingClientRect().top <= -100) {
    // Below banner
    toTopArrow.style.opacity = "1";
    toTopArrow.style.visibility = "visible";
  }
  else {
    // Above banner
    toTopArrow.style.opacity = "0";
    toTopArrow.style.visibility = "hidden";
  }
  // If the hamburger menu is open, break out of the function
  if(hamburgerLines[0].style.background == "deepskyblue") return;
  if(banner.getBoundingClientRect().bottom <= 100) {
    // Below banner
    navigationBar.style.background = "black";
    navigationBar.style.marginBottom = "-50px";
    navigationBar.style.height = "50px";
    navigationListItems.forEach((listItem, index) => {
      if(index == 0) listItem.style.padding = "0px";
      listItem.style.marginTop = "0px"
    });
    hamburgerMenu.style.top = "14px";
  }
  else {
    // Above banner
    navigationBar.style.background = "linear-gradient(black, transparent)";
    navigationBar.style.marginBottom = "-100px";
    navigationBar.style.height = "100px";
    navigationListItems.forEach((listItem, index) => {
      if(index == 0) {
        listItem.style.padding = "15px 15px 15px 15px";
        listItem.style.marginTop = "0px";
        return;
      }
      listItem.style.marginTop = "25px"
    });
    hamburgerMenu.style.top = "35px";
  }
});

// Highlights navigation link corresponding to current section on page
document.addEventListener("scroll", function() {
  navigationLinks.forEach((link, index) => {
    if(index == 0) return;
    link.style.color = "white";
  });
  for(var i = navigationLinks.length - 1; i >= 1; i--) {
    var href = navigationLinks[i].href;
    var hashtagIndex = href.indexOf('#');
    href = href.substring(hashtagIndex);
    var section = document.querySelector(href);
    if(section.getBoundingClientRect().top <= 0.5) {
      navigationLinks[i].style.color = "deepskyblue";
      navigationLinks[i].removeEventListener("mouseleave", navigationLinkOnMouseLeave);
      return;
    }
  };
});

function openMenu() {
  navigationBar.style.background = "black";
  navigationBar.style.height = "250px";
  navigationBar.style.marginBottom = "-250px";
  navigationList.style.flexDirection = "column";
  navigationList.style.justifyContent = "flex-start";
  navigationListItems.forEach((listItem, index) => {
    if(index == 0) {
      listItem.style.height = "50px";
      listItem.style.padding = "0px";
      return;
    }
    listItem.style.display = "inline-block";
    listItem.style.marginTop = "0px"
  });
  hamburgerMenu.style.top = "14px";
  hamburgerLines.forEach((line, index) => {
    line.style.background = "deepskyblue";
  });
}

function closeMenu() {
  if(banner.getBoundingClientRect().bottom <= 100) {
    // Below banner
    navigationBar.style.background = "black";
    navigationBar.style.height = "50px";
    navigationBar.style.marginBottom = "-50px";
  }
  else {
    //Above banner
    navigationBar.style.background = "linear-gradient(black, transparent)";
    navigationBar.style.height = "100px";
    navigationBar.style.marginBottom = "-100px";
    hamburgerMenu.style.top = "35px";
  }
  navigationList.style.flexDirection = "row";
  navigationList.style.justifyContent = "flex-end";
  navigationListItems.forEach((listItem, index) => {
    if(index == 0) {
      listItem.style.height = "auto";
      listItem.style.padding = "15px 15px 15px 15px";
      return;
    }
    listItem.style.display = "none";
  });
  hamburgerLines.forEach((line, index) => {
    line.style.background = "white";
  });
}

// Handles hamburger menu upon click
var navigationList = navigationBar.querySelector('ul');
hamburgerMenu.addEventListener("click", hamburgerMenuOnClick);

function hamburgerMenuOnClick() {
  if(hamburgerLines[0].style.background != "deepskyblue") openMenu();
  else closeMenu();
}

// Handles hamburger menu upon screen resize
window.addEventListener("resize", function(event) {
  if(window.innerWidth > 700) {
    closeMenu();
    navigationListItems.forEach((listItem, index) => {
      if(index == 0) return;
      listItem.style.display = "inline-block";
      if(banner.getBoundingClientRect().bottom <= 100) {
        // Below banner
        listItem.style.marginTop = "0px";
      }
      else {
        // Above banner
        listItem.style.marginTop = "25px";
      }
    });
  }
  else if(hamburgerLines[0].style.background != "deepskyblue") {
    navigationListItems.forEach((listItem, index) => {
      if(index == 0) return;
      listItem.style.display = "none";
    });
  }
});

// Closes hamburger menu upon clicking outside of menu
document.body.addEventListener("click", (event) => {
  if(!navigationBar.contains(event.target) && hamburgerLines[0].style.background == "deepskyblue")
    closeMenu();
});

// Highlights slideshow navigation dots upon hover or selection
var unselected = "rgba(0, 0, 0, 0.5)";
var selected = "rgba(0, 0, 0, 0.7)";

function dotOnMouseEnter() {
  if(this.style.background == selected) return;
  this.style.background = selected;
  this.addEventListener("click", dotOnClick);
  this.addEventListener("mouseleave", dotOnMouseLeave);
}

function dotOnMouseLeave() {
  this.style.background = unselected;
  this.removeEventListener("click", dotOnClick);
  this.removeEventListener("mouseleave", dotOnMouseLeave);
}

// Displays image corresponding to navigation dot upon click
function dotOnClick() {
  var nav = this.parentNode;
  nav.querySelectorAll('li').forEach((dot, index) => {
    dot.style.background = unselected;
  });
  nav.parentNode.querySelectorAll('img').forEach((img, index) => {
    img.style.display = "none";
    if(img.className == this.className) img.style.display = "inherit";
  });
  this.style.background = selected;
  this.removeEventListener("click", dotOnClick);
  this.removeEventListener("mouseleave", dotOnMouseLeave);
}

// Displays the first slide in each slideshow by default
document.querySelectorAll('.slideshow').forEach((slideshow, index) => {
  slideshow.querySelectorAll('img').forEach((img, index) => {
    if(index == 0) return;
    img.style.display = "none";
  });
  slideshow.querySelectorAll('li').forEach((dot, index) => {
    if(index == 0) dot.style.background = selected;
    dot.addEventListener("mouseenter", dotOnMouseEnter);
  });
});
