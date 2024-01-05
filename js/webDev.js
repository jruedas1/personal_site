const aboutMe = document.querySelector(".about-me");
const resume = document.querySelector(".resume");

const goToAboutMe = event => location.href = "webdev-aboutme.html";
const goToResume = event => location.href = "webdev-resume.html";

aboutMe.addEventListener('click', goToAboutMe);
resume.addEventListener('click', goToResume);