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
document.addEventListener("scroll", function() {
  var banner = document.querySelector(".banner");
  var navigationListItems = navigationBar.querySelectorAll("li");
  if(banner.getBoundingClientRect().bottom <= 100) {
    // Below banner
    navigationBar.style.background = "black";
    navigationBar.style.marginBottom = "-50px";
    navigationBar.style.height = "50px";
    navigationListItems.forEach((listItem, index) => {
      if(index == 0) listItem.style.padding = "0px";
      listItem.style.marginTop = "0px"
    });
  }
  else {
    // Above banner
    navigationBar.style.background = "linear-gradient(black, transparent)";
    navigationBar.style.marginBottom = "-100px";
    navigationBar.style.height = "100px";
    navigationListItems.forEach((listItem, index) => {
      if(index == 0) listItem.style.padding = "15px 15px 15px 15px";
      listItem.style.marginTop = "25px"
    });
  }
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

/*var languages = document.querySelectorAll(".language");
languages.forEach((language, index) => {
  var name = language.innerHTML;
  var index = name.lastIndexOf('>');
  name = name.substring(index + 1);
  console.log(name, language.getBoundingClientRect().top);
});*/
