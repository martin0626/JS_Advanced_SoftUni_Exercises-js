import { clearView } from "./ajust.js";
import { showMovies } from "./movies.js";

export async function addMovie(event) {
    event.preventDefault();
    let formElem = event.target.parentNode;
    let data = new FormData(formElem);

    let title = data.get('title').trim();
    let description = data.get('description');
    let imgSrc = data.get('imageUrl').trim();

    let currentUser = JSON.parse(sessionStorage.getItem('userInfo'));

    if (title != '' && imgSrc != '' && currentUser != null) {
        try {
            let res = await fetch('http://localhost:3030/data/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': currentUser.token
                },
                body: JSON.stringify({
                    _ownerId: currentUser.id,
                    title: title,
                    description: description,
                    img: imgSrc
                })
            })

            if (!res.ok) {
                throw Error;
            }

            let respond = await res.json();
            formElem.reset();
            clearView();
            showMovies();

        } catch (error) {
            console.log(error);
        }

    }
}