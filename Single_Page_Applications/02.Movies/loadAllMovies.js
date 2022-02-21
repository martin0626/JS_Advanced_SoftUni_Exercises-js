export async function load() {
    let res = await fetch('http://localhost:3030/data/movies');
    let result = await res.json();
    let parentElem = document.querySelector('#movie > div > div > div');
    visualizeElements(parentElem, result);
}

function visualizeElements(parent, elementsArr) {

    Array.from(parent.children).forEach(el => el.remove());

    elementsArr.forEach(obj => {
        let elem = createElem(obj);
        parent.appendChild(elem);
    })
}


function createElem(movie) {
    let parentDiv = document.createElement('div');
    parentDiv.className = "card mb-4";
    let isLog = sessionStorage.getItem('userInfo') != null;

    parentDiv.innerHTML = `<img class="card-img-top" src="${movie.img}" alt="Card image cap" width="400">
<div class="card-body">
    <h4 class="card-title">${movie.title}</h4>
</div>
<div class="card-footer">
    <a href="#/details/CUtL9j4qI0XVhn9kTUsx">
        <button type="button" class="btn btn-info" data-ownerId = '${movie._ownerId}' id=${movie._id} ${isLog? '': 'hidden'}>Details</button>
    </a>
</div>`
    return parentDiv;
}