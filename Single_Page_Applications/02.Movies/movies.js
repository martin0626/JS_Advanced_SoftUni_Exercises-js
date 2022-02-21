import { addMovie } from "./addMovie.js";
import { checkStatus, clearView } from "./ajust.js";
import { load } from "./loadAllMovies.js";

export function showMovies() {
    clearView();
    let elements = {
        homePage: document.getElementById('home-page'),
        moviesH1: document.querySelector('.text-center'),
        addMovieBtn: document.getElementById('home-page-btn'),
        movieSection: document.getElementById('movie')
    }

    Object.values(elements).forEach(el => el.style.display = 'block');
    checkStatus();
    load();
}


export function showAddMovie(event) {
    event.preventDefault();
    clearView();

    let addMovieElement = document.getElementById('add-movie');
    addMovieElement.style.display = 'block';
    let submitBtn = addMovieElement.querySelector('button');
    submitBtn.addEventListener('click', addMovie);
}