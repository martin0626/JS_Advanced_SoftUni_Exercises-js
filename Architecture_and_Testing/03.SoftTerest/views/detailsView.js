import { del, get } from "../tools/api.js";
import { userData } from "../tools/checkStatus.js";
import { showView } from "./showView.js";

export function detailsShow() {
    document.querySelector('#dashboard-holder').addEventListener('click', show)
}


async function show(event) {
    event.preventDefault();
    let button = event.target;
    if (button.textContent == 'Details') {
        let board = await get(`/data/ideas/${button.id}`)
        let ownerId = board._ownerId;
        let title = board.title;
        let content = board.description;
        let img = board.img;

        let user = userData();
        let isOwner = ownerId == user.user_id;

        let section = document.getElementById('details');
        section.addEventListener('click', deleteElem);
        Array.from(section).forEach(el => el.remove());

        section.innerHTML = `
<img class="det-img" src="${img}" />
<div class="desc">
    <h2 class="display-5">${title}</h2>
    <p class="infoType">Description:</p>
    <p class="idea-description">${content}</p>
</div>
<div id="${button.id}" class="text-center">
    <a class="btn detb" ${isOwner? "": "hidden"} id="del" href="">Delete</a>
</div>
        `

        showView('details');
    }
}


function deleteElem(event) {
    event.preventDefault();
    let btn = event.target
    if (btn.id == 'del') {
        del('/data/ideas/' + btn.parentNode.id)
        showView('dashboard-holder');
    }
}