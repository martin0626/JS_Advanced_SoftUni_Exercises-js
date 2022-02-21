import { renderTemplate } from "./loadElements.js";



document.querySelector('.content').addEventListener('submit', getElements);

function getElements(event) {
    event.preventDefault();

    let formElem = new FormData(document.querySelector('.content'));
    let content = formElem.get('towns').split(', ');
    document.querySelector('.content').reset();
    renderTemplate(content)

}