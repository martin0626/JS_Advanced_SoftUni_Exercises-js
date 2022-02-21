import { checkStatus } from "./ajust.js";
import { showLogin } from "./login.js";
import { showAddMovie, showMovies } from "./movies.js";
import { showRegister } from "./register.js";
import { logoutFunc } from "./logout.js";
import { load } from "./loadAllMovies.js";
import { buttonAction, showDetails } from "./details.js";





let sections = {
    Movies: showMovies,
    Login: showLogin,
    Register: showRegister
}

checkStatus();
sections.Movies();
load();


let logoutBtn = document.querySelector('nav li:nth-of-type(2)');
logoutBtn.addEventListener('click', logoutFunc);


let navigation = document.querySelector('nav');
navigation.addEventListener('click', navAction);


let movieAddBtn = document.getElementById('home-page-btn');
movieAddBtn.addEventListener('click', showAddMovie);

let moviesDatails = document.getElementById('movie');
moviesDatails.addEventListener('click', showDetails);


function navAction(event) {
    let buttonClicked = event.target.textContent;

    if (Object.keys(sections).includes(buttonClicked)) {
        sections[buttonClicked]();
    }

}