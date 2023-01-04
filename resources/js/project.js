// Url params for selecting project to show
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('project');
let fullScreenProjects = document.querySelectorAll('.project-fullscreen');

showProject();

function showProject() {
    fullScreenProjects[projectId].style.display = 'flex';
}

// Code for slideshow

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  let i;
  let x = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("controls-middle");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" fill", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " fill";
}