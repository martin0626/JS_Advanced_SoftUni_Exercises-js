import { showPost } from "./showElements.js";

export function showHome() {
    Array.from(document.getElementById('currentPost').children).forEach(e => e.remove())
    let elemHome = document.querySelector('.container');
    elemHome.style.display = 'block';
}


export function hideHome() {
    let elemHome = document.querySelector('.container');
    elemHome.style.display = 'none';
}


export function clearPosts() {
    let parent = document.querySelector('.topic-container');
    Array.from(parent.children).forEach(e => e.remove());
}


export async function loadPosts() {
    let req = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    let postsRes = await req.json();
    Object.keys(postsRes).forEach(key => createPost(postsRes[key]))
}


function createPost(data) {
    let conteinerPosts = document.querySelector('.topic-container');

    let divElem = document.createElement('div');
    divElem.className = "topic-container";
    divElem.innerHTML = `<div class="topic-name-wrapper">
<div class="topic-name">
    <a href="#" class="normal">
        <h2 id="${data._id}">${data.title}</h2>
    </a>
    <div class="columns">
        <div>
            <p>Date: <time>${data.currentDate}</time></p>
            <div class="nick-name">
                <p>Username: <span>${data.username}</span></p>
            </div>
        </div>


    </div>
</div>
</div>`
    conteinerPosts.appendChild(divElem);
    divElem.addEventListener('click', showPost)
}