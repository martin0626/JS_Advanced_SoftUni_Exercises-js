import { clearView } from "./ajust.js";
import { load } from "./loadAllMovies.js";
import { showMovies } from "./movies.js";

let user = JSON.parse(sessionStorage.getItem('userInfo'));


export function showDetails(event) {
    let btn = event.target;
    if (btn.nodeName == 'BUTTON') {
        detailsElem(btn);
    }
}


async function detailsElem(button) {
    let user = JSON.parse(sessionStorage.getItem('userInfo'));
    let resMovie = await fetch(`http://localhost:3030/data/movies/${button.id}`)
    let movie = await resMovie.json();
    let isOwner = false;

    let resLikseForUser = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movie._id}%22%20and%20_ownerId%3D%22${user.id}%22`);
    let userLikedMovie = await resLikseForUser.json();
    let isLiked = userLikedMovie.length > 0

    let allLikesRes = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movie._id}%22&distinct=_ownerId&count`);
    let allLikes = await allLikesRes.json();


    if (user != null) {
        isOwner = button.getAttribute('data-ownerid') == user.id;
    }


    let sectionElem = document.createElement('section');
    sectionElem.id = 'movie-example';

    sectionElem.innerHTML = `<div class="container">
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src="${movie.img}" alt="Movie">
        </div>
        <div class="col-md-4 text-center" id=${button.id}>
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            <a class="btn btn-danger" ${isOwner? '': 'hidden'} href="#">Delete</a>
            <a class="btn btn-warning" href="#" ${isOwner? '': 'hidden'}>Edit</a>
            <a class="btn btn-primary" ${isOwner || isLiked? 'hidden': ''} href="#">Like</a>
            <span class="enrolled-span">Likes: ${allLikes}</span>
        </div>
    </div>
</div>`

    clearView();
    document.getElementById('movie-example').replaceWith(sectionElem);
    sectionElem.addEventListener('click', buttonAction);
}


export async function buttonAction(event) {
    let buttonClicked = event.target
    let movieId = buttonClicked.parentNode.id;

    if (buttonClicked.textContent == 'Edit') {
        edit(movieId);
    } else if (buttonClicked.textContent == 'Delete') {
        deleteElem(movieId);
    } else if (buttonClicked.textContent == 'Like') {
        like(movieId);

    }
}


async function edit(id) {
    let user = JSON.parse(sessionStorage.getItem('userInfo'));
    let editSection = document.getElementById('edit-movie');
    clearView();
    editSection.style.display = 'block';

    let movieRes = await fetch(`http://localhost:3030/data/movies/${id}`);
    let movie = await movieRes.json();


    document.querySelector('#edit-movie input:nth-of-type(1)').value = movie.title;
    document.querySelector('#edit-movie textarea').value = movie.description;
    document.querySelector('#edit-movie > form > div:nth-child(4) > input').value = movie.img;

    let editForm = editSection.querySelector('form');


    editForm.addEventListener('submit', async(event) => {
        let r = document.getElementById('edit-movie');
        let form = r.querySelector('form');

        event.preventDefault();
        let data = new FormData(form);
        let title = data.get('title');
        let description = data.get('description');
        let img = data.get('imageUrl');

        let resEdit = await fetch(`http://localhost:3030/data/movies/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.token

            },
            body: JSON.stringify({
                _ownerId: id,
                title: title,
                description: description,
                img: img
            })
        }).then(location.reload())

    });



}



async function deleteElem(id) {
    let user = JSON.parse(sessionStorage.getItem('userInfo'));
    let res = await fetch(`http://localhost:3030/data/movies/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.token
        }
    })

    showMovies();
    load();

}


async function like(id) {
    let user = JSON.parse(sessionStorage.getItem('userInfo'));
    await fetch('http://localhost:3030/data/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.token
        },
        body: JSON.stringify({
            movieId: id
        })

    });

    let getAllLikes = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_{ownerId}&count`);
    let allLikes = await getAllLikes.json();
    showMovies();
    alert('You succesfully liked this film!!!')





}