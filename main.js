// On menu icon tapped
document.querySelector(".menu-icon").addEventListener("click", () => {
  var menu = document.querySelector(".menu");
  menu.style.display = menu.style.display == "none" ? "flex" : "none";
});

// On outside navigation bar tapped
document.addEventListener('click', (e) => {
  if(document.querySelector("nav").contains(e.target)) return;
  document.querySelector(".menu").style.display = "none";
});
