const logo = document.querySelector(".logo");
const infoSciTopic = document.querySelector(".infosci");

const goToHomePage = event => location.href = "index.html";
const goToInfoSciPage = event => location.href = "info-studies.html";

logo.addEventListener('click', goToHomePage);
infoSciTopic.addEventListener('click', goToInfoSciPage);



