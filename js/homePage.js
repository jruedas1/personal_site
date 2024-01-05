const infoSciTopic = document.querySelector(".infosci");
const webDevTopic = document.querySelector(".web-dev");
const anthroTopic = document.querySelector(".anthro");

const goToInfoSciPage = event => location.href = "info-studies.html";
const goToWebDevPage = event => location.href = "webdev.html";
const goToAnthroPage = event => location.href = "anthro.html";

infoSciTopic.addEventListener('click', goToInfoSciPage);
webDevTopic.addEventListener('click', goToWebDevPage);
anthroTopic.addEventListener('click', goToAnthroPage);