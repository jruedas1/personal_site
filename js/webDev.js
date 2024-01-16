const aboutMe = document.querySelector(".about-me");
const resume = document.querySelector(".resume");
const projects = document.querySelector(".projects");

const goToAboutMe = event => location.href = "webdev-aboutme.html";
const goToResume = event => location.href = "webdev-resume.html";
const goToProjects = event => location.href = "web-dev-projects.html";

aboutMe.addEventListener('click', goToAboutMe);
resume.addEventListener('click', goToResume);
projects.addEventListener('click', goToProjects);