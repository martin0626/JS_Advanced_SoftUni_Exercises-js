import { html, render } from "../../node_modules/lit-html/lit-html.js"

let currentId = ''
let booksTemplate = (ids, books) => html `
<button id="loadBooks" @click="${dataLoad}">LOAD ALL BOOKS</button>
<table>
    <thead>
    <tr>
    <th>Title</th>
    <th>Author</th>
    <th>Action</th>
</tr>
    </thead>
    <tbody>
    ${ids.length > 0? ids.map(id=> html`<tr>
        <td>${books[id].title}</td>
        <td>${books[id].author}</td>
        <td id="${id}">
            <button @click="${edit}">Edit</button>
            <button @click="${deleteButton}">Delete</button>
        </td>
    </tr>`): ''}
    </tbody>
</table>
<form id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input @click="${addBook}" type="submit" value="Submit">
    </form>

    <form style="display: none;" id="edit-form">
    <input type="hidden" name="id">
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input @click="${saveBook}" type="submit" value="Save">
</form>
`

async function dataLoad(){
    let res = await fetch('http://localhost:3030/jsonstore/collections/books');
    let data = await res.json();
    let booksID = Object.keys(data)
    render(booksTemplate(booksID, data), document.querySelector('body'));

}

async function addBook(event){
    event.preventDefault();
    let formElem = event.target.parentNode
    let data = new FormData(formElem);

    let author = data.get('author');
    let title = data.get('title');
    post(author, title, 'POST')
    dataLoad();
    formElem.reset();
}


async function deleteButton(event){
    let id = event.target.parentNode.id
    let res = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'DELETE'
    })
    event.target.parentNode.parentNode.remove();
}


async function saveBook(event){
    event.preventDefault();
    let formElem = event.target.parentNode;
    let data = new FormData(formElem);
    let title = data.get('title');
    let author = data.get('author');
    await post(author, title, 'PUT', '/' + currentId)
    document.getElementById('add-form').style.display = 'block';
    document.getElementById('edit-form').style.display = 'none';
    dataLoad()
    formElem.reset()
    
}



function edit(event){
    currentId = event.target.parentNode.id
    let editForm = document.getElementById('edit-form')
    editForm.style.display = 'block';
    document.getElementById('add-form').style.display = 'none';
    let title = editForm.querySelector('input[name="title"]');
    let author = editForm.querySelector('input[name="author"]');

    title.value = event.target.parentNode.parentNode.querySelector('td:nth-of-type(1)').textContent;
    author.value = event.target.parentNode.parentNode.querySelector('td:nth-of-type(2)').textContent;
}


async function post(author, title, method, id=''){
    if(author.trim() != '' && title.trim()){
        let res = await fetch('http://localhost:3030/jsonstore/collections/books' + id, {
        method: method, 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            author: author,
            title: title
        })
    })
    }else{
        alert('All fields are required!')
    }
    
}

dataLoad()