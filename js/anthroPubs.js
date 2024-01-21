const toggleIcons = document.querySelectorAll(".toggleIcon");


/* The general strategy taken here for expanding the section is
* derived from https://css-tricks.com/using-css-transitions-auto-dimensions/
* since each section has a different end height, we use JS to calculate
* how far each section has to expand. The result is a bit imprecise but
*  good enough
*/
const expandSection = event => {
    const wrappingDiv = event.target.parentElement.parentElement;
    const contentDiv = event.target.parentElement.parentElement.firstElementChild;
    /* this next allows the css transition to work.
    * since we start at 60dvh, we need the end point
    * of the transition to also be in dvh
    * to calculate dvh from pixels, innerHeight = 100dvh
    * scrollHeight / innerHeight * 100 = new dvh
    * Then we are experiencing a bit of an unexpected crunch
    * where the toggle icon is often covering text
    * so we use a function to get the user's default rem
    * (usually 16px, but we are making sure)
    * we add 3 rem to the height of the element, so as to
    * accommodate the icon
    * we also move the icon down to ony 1 rem from the bottom
    * */

    // default font size in dvh is
    const defaultFontSizeInDVH = getDefaultFontSize() / window.innerHeight * 100;

    wrappingDiv.style.height = ((contentDiv.scrollHeight / window.innerHeight) * 100) + defaultFontSizeInDVH*3 + 'dvh';

    event.target.style.bottom = "1rem";
    contentDiv.classList.remove("opacityGradient");
    event.target.src = "img/close.svg";
    /* switch the event listener attached to the icon */
    event.target.removeEventListener('click', expandSection);
    event.target.addEventListener('click', collapseSection);
}

const collapseSection = event => {
    const wrappingDiv = event.target.parentElement.parentElement;
    const contentDiv = event.target.parentElement.parentElement.firstElementChild;
    /* we delete the inline style set by the expandSection function */
    wrappingDiv.style.height = null;
    event.target.style.bottom = null;
    contentDiv.classList.add("opacityGradient");
    event.target.src = "img/expand.svg";
    event.target.removeEventListener('click', collapseSection);
    event.target.addEventListener('click', expandSection);
}

toggleIcons.forEach(icon => icon.addEventListener('click', expandSection));


// This code comes from: https://brokul.dev/detecting-the-default-browser-font-size-in-javascript
const getDefaultFontSize = () => {
    const element = document.createElement('div');
    element.style.width = '1rem';
    element.style.display = 'none';
    document.body.append(element);

    const widthMatch = window
        .getComputedStyle(element)
        .getPropertyValue('width')
        .match(/\d+/);

    element.remove();

    if (!widthMatch || widthMatch.length < 1) {
        return null;
    }

    const result = Number(widthMatch[0]);
    return !isNaN(result) ? result : null;
};