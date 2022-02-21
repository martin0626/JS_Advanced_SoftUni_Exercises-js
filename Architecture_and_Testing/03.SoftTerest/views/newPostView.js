import { post } from "../tools/api.js";
import { showView } from "./showView.js";


export function createPost() {
    let formElem = document.querySelector('#createPost > div > form');
    formElem.addEventListener('submit', create);
}


function create(event) {
    event.preventDefault();
    let formElem = document.querySelector('#createPost > div > form');

    let data = new FormData(formElem);

    let title = data.get('title');
    let content = data.get('description');
    let img = data.get('imageURL');

    if (title.length >= 6 && content.length >= 10 && img.length >= 5) {
        let info = {
            title: title,
            description: content,
            img: img
        }
        post(info, '/data/ideas');
        formElem.reset();
        showView('dashboard-holder')


    } else {
        alert('Incorect field!');
    }

}