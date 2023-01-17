
// Scroll to top of page
let scrollToTopBtn = document.getElementById("scroll-to-top-btn");
let rootElement = document.documentElement;

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

scrollToTopBtn.addEventListener("click", scrollToTop);