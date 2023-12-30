const infoProjects = document.querySelector(".info-projects");
const infoCoursework = document.querySelector(".info-coursework");
const infoExperience = document.querySelector(".info-experience");

const goToInfoProjects = e => location.href = "info-projects.html";
const goToInfoCoursework = e => location.href = "info-coursework.html";
const goToInfoExperience = e => location.href = "info-experience.html";

infoCoursework.addEventListener('click', goToInfoCoursework);
infoProjects.addEventListener('click', goToInfoProjects);
infoExperience.addEventListener('click', goToInfoExperience);