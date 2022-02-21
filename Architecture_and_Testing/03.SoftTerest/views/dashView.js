import {get } from "../tools/api.js";
import { detailsShow } from "./detailsView.js";

export function addBoards() {

    document.querySelector('#dash').addEventListener('click', dashboardView);
}

export async function dashboardView() {

    Array.from(document.querySelector('#dashboard-holder').children).forEach(el => el.remove());
    let allBoards = await get('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');

    if (allBoards.length == 0) {
        let h1 = document.createElement('h1');
        h1.textContent = "No ideas yet! Be the first one :)"
        document.querySelector('#dashboard-holder').appendChild(h1)
    } else {
        allBoards.forEach(board => createBoard(board))
    }
}




function createBoard(board) {
    let title = board.title;
    let img = board.img;
    let id = board._id;

    let parentElem = document.createElement('div');
    parentElem.className = 'card overflow-hidden current-card details';
    parentElem.style.width = '20rem';
    parentElem.style.height = '18rem';

    parentElem.innerHTML = `
<div class="card-body">
    <p class="card-text">${title}</p>
</div>
<img class="card-image" src="${img}" alt="Card image cap">
<a class="btn" href="" id="${id}">Details</a>
    `

    document.querySelector('#dashboard-holder').appendChild(parentElem);
}