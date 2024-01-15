// const publicationsTopic = document.querySelector(".publications");
// const papersTopic = document.querySelector(".papers");
const projectsTopic = document.querySelector(".anthro-projects");

const goToPublications = event => location.href = "anthro-publications.html";
const goToPapers = event => location.href = "anthro-papers.html";
const goToProjects = event => location.href = "anthro-projects.html";

// publicationsTopic.addEventListener('click', goToPublications);
// papersTopic.addEventListener('click', goToPapers);
projectsTopic.addEventListener('click', goToProjects);