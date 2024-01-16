"use strict"

function renderCoffee(coffee) {
    let html = '<div class="coffee">';
    html += '<p class="del"><span>&times;</span></p>';
    html += `<h2>${coffee.name}</h2>`;
    html += `<p>${coffee.roast}</p>`;
    html += '</div>';
    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for(let i = 0; i <= coffees.length - 1; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

const updateCoffees = e => {
    e.preventDefault(); // don't submit the form, we just want to update the data
    const selectedRoast = roastSelection.value;
    if (selectedRoast === 'all'){
        coffeesOutput.innerHTML = renderCoffees(coffees);
    } else {
        const filteredCoffees = [];
        coffees.forEach( coffee => {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }
        });
        coffeesOutput.innerHTML = renderCoffees(filteredCoffees);
    }
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

if (localStorage.getItem('coffees')){
    coffees = JSON.parse(localStorage.getItem('coffees'));
}

const coffeesOutput = document.querySelector('#coffees');
const roastSelection = document.querySelector('#roast-selection');
const nameSearch = document.querySelector('#coffee-search');

// When the page loads, all the coffees are rendered on the page
coffeesOutput.innerHTML = renderCoffees(coffees);

document.querySelector("#roast-search").addEventListener('click', event => {
   const roastChoice = event.target.innerText.toLowerCase();
   const currentSelected = document.querySelector(".selected");
   currentSelected.classList.remove('selected');
   event.target.classList.add('selected');
    coffeesOutput.innerHTML = renderCoffees(findCoffeeByRoastAndName(roastChoice, nameSearch.value, coffees));
});

// function to find coffees that match a given roast
const findCoffeeByRoast = (roast, coffeesArray) => {
    if (roast === 'all') return coffees;
    const searchResults = [];
    coffeesArray.forEach(coffee => {
        if (coffee.roast.toLowerCase() === roast.toLowerCase()){
            searchResults.push(coffee);
        }
    });
    return searchResults;
}

// function to find coffees with a name that matches a given string input
const findCoffeeByName = (searchInput, coffeesArray) => {
    const searchResults = [];
    coffeesArray.forEach(coffee => {
        if (coffee.name.toLowerCase().includes(searchInput.toLowerCase())){
            searchResults.push(coffee);
        }
    });
    return searchResults;
}

// function to find coffees that match BOTH a roast AND a name selection
const findCoffeeByRoastAndName = (roast, name, coffeesArray) => {
    const roastMatches = findCoffeeByRoast(roast, coffeesArray);
    const nameMatches = findCoffeeByName(name, coffeesArray);
    return coffeesArray.filter(coffee => roastMatches.includes(coffee) && nameMatches.includes(coffee));
}

// typing in the name search bar will search for both name and roast inputs
// and return coffees that match both in both roast and name
nameSearch.addEventListener('keyup', e => {
    const nameInput = e.target.value;
    const roastInput = document.querySelector('.selected').innerText.toLowerCase();
    // if there is nothing input in the name search field, just return
    // matches to current roast selection. There is always a roast selected, even if it's "all"
    if (nameInput === '') {
        coffeesOutput.innerHTML = renderCoffees(findCoffeeByRoast(roastInput, coffees));
    } else {
        coffeesOutput.innerHTML = renderCoffees(findCoffeeByRoastAndName(roastInput, nameInput, coffees));
    }
});

// Bonus to add a coffee to the coffees array
// Get a reference to the submit button
const addCoffeeButton = document.querySelector("nav ul li:first-of-type");
const addCoffeeForm = document.querySelector("#addCoffeeForm");

addCoffeeButton.addEventListener('click', event => {
    const modalWrapper = document.querySelector("#addCoffeeModalWrapper");
    modalWrapper.classList.toggle('hideModal');
    modalWrapper.classList.toggle('showModal');
});

window.addEventListener('click', event => {
   const modalWrapper = document.querySelector("#addCoffeeModalWrapper");
   if (event.target === modalWrapper){
       modalWrapper.classList.remove('showModal');
       modalWrapper.classList.add('hideModal');
   }
});

// event handler for the add coffee button click
function addCoffee(e){
    e.preventDefault();
    coffees.push({
        id: coffees.length + 1,
        roast: e.target[0].value,
        name: e.target[1].value
    });
    document.querySelector("#add-coffee-name").value = "";
    coffeesOutput.innerHTML = renderCoffees(coffees);
    // persist the data to localStorage
    localStorage.setItem('coffees', JSON.stringify(coffees));
    document.querySelector("#addCoffeeModalWrapper").click();
}

// register the event handler
addCoffeeForm.addEventListener('submit', addCoffee);

coffeesOutput.addEventListener('click', event => {
    if (event.target.parentElement.classList.contains('del')){
        const cardToRemove = event.target.parentElement.parentElement;
        const positionOfCard = Array.from(cardToRemove.parentNode.children).indexOf(cardToRemove);
        let coffeesArray = [];
        if (localStorage.getItem('coffees')){
            coffeesArray = JSON.parse(localStorage.getItem('coffees'));
        } else {
            coffeesArray = coffees;
        }
        coffeesArray.splice(positionOfCard, 1);
        localStorage.setItem('coffees', JSON.stringify(coffeesArray));
        cardToRemove.remove();
    }
});

