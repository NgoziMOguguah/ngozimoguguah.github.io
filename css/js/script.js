// Future animations will go here
console.log("Dr. Ngozi Margaret Oguguah Website Loaded");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});