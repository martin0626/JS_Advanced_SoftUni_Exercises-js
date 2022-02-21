import { hideHome, loadPosts } from "./adjust.js";
import { commentFormShow, loadAllComments, postComment } from "./comments.js";

export async function showPost(event) {
    event.preventDefault();
    if (event.target.nodeName == 'H2') {
        let post = await getPost(event.target.id);
        createView(post, event.target.id);
    }
}

async function getPost(id) {
    let res = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`);
    let data = await res.json();
    return data
}



function createView(postData, postId) {
    let commentForm = commentFormShow();
    commentForm.querySelector('form').addEventListener('submit', postComment);
    let divElem = document.createElement('div');
    divElem.className = 'comment';
    let h2Elem = document.createElement('h2');
    h2Elem.textContent = postData.title;

    divElem.id = postId;
    divElem.innerHTML = `<div class="header">
    <img src="./static/profile.png" alt="avatar">
    <p><span>${postData.username}</span> posted on <time>${postData.currentDate}</time></p>
    <p class="post-content">${postData.content}</p>
</div>`


    hideHome();
    document.getElementById('currentPost').appendChild(h2Elem);
    document.getElementById('currentPost').appendChild(divElem);
    document.getElementById('currentPost').appendChild(commentForm);
    loadAllComments(postId);
}