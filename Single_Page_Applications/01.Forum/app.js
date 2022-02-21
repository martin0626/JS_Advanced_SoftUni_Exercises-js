import { clearPosts, loadPosts, showHome } from "./adjust.js";
import { showPost } from "./showElements.js";

function addFunctionality() {
    let postForm = document.querySelector('form').addEventListener('click', formAction);
    let homeEl = document.querySelector('nav a').addEventListener('click', showHome);
}


addFunctionality();
clearPosts();
loadPosts();


async function formAction(event) {
    event.preventDefault();

    let formElement = document.querySelector('form');

    if (event.target.textContent == 'Cancel') {
        formElement.reset();
    } else if (event.target.textContent == 'Post') {
        let data = new FormData(formElement);
        let title = data.get('topicName').trim();
        let username = data.get('username').trim();
        let content = data.get('postText').trim();

        if (title != '' && username != '' && content != '') {
            let date = new Date().toUTCString()
            let postRequest = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    username: username,
                    content: content,
                    currentDate: date
                })
            })
            let respond = await postRequest.json();


            formElement.reset();
            console.log(respond);
            clearPosts();
            loadPosts();
        }
    }
}