let user = JSON.parse(sessionStorage.getItem('userData'));
if (user != null) {
    document.querySelector('.add').disabled = false;
    document.querySelector('.email').textContent = `Welcome ${user.email}!`;
    document.querySelector('#login').remove();
    document.querySelector('#register').remove();

    let logoutBtn = document.getElementById('logout');
    logoutBtn.addEventListener('click', logoutFunc);
} else {
    document.querySelector('#logout').remove();

}


let catches = document.getElementById('catches');
let catchForm = document.getElementById('addForm');
let loadButton = document.getElementsByClassName('load')[0];
let addBtn = document.querySelector('.add');
let delgationElem = document.getElementById('main');

loadButton.addEventListener('click', loadAllCatches);
addBtn.addEventListener('click', addCatch);
delgationElem.addEventListener('click', deleteEditFunc);

async function logoutFunc() {
    sessionStorage.removeItem('userData');
    window.location.reload();
}


function deleteEditFunc(event) {
    let catchElem = event.target.parentNode;
    if (event.target.textContent === 'Delete') {
        deleteElem(catchElem)

    } else if (event.target.textContent === 'Update')[
        updateElem(catchElem)
    ]
}

async function deleteElem(elem) {
    let id = elem.querySelector('button').attributes['data-id'].value;
    let del = await fetch(`http://localhost:3030/data/catches/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.token
        }
    })
    elem.remove();
}


async function updateElem(elem) {
    let id = elem.querySelector('button').attributes['data-id'].value;
    let updateRequest = await fetch(`http://localhost:3030/data/catches/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.token
        },
        body: JSON.stringify({
            angler: elem.querySelector('.angler').value,
            weight: elem.querySelector('.weight').value,
            species: elem.querySelector('.species').value,
            location: elem.querySelector('.location').value,
            bait: elem.querySelector('.bait').value,
            captureTime: elem.querySelector('.captureTime').value,
            _ownerId: id
        })
    })
}


async function loadAllCatches(event) {
    event.preventDefault();
    Array.from(catches.children).forEach(e => e.remove());
    let postRequest = await fetch('http://localhost:3030/data/catches');
    let catchesRespond = await postRequest.json();
    catchesRespond.forEach(elem => createElements(elem));

}


async function createElements(data) {
    let isDisable = true;
    if (user) {
        isDisable = (data._ownerId != user.id)
    }


    let divElem = document.createElement('div');
    divElem.className = 'catch';
    divElem.innerHTML = `<label>Angler</label>
<input type="text" class="angler" value="${data.angler}" ${isDisable? 'disabled': ''}>
<label>Weight</label>
<input type="text" class="weight" value="${data.weight}" ${isDisable? 'disabled': ''}>
<label>Species</label>
<input type="text" class="species" value="${data.species}" ${isDisable? 'disabled': ''}>
<label>Location</label>
<input type="text" class="location" value="${data.location}" ${isDisable? 'disabled': ''}>
<label>Bait</label>
<input type="text" class="bait" value="${data.bait}" ${isDisable? 'disabled': ''}>
<label>Capture Time</label>
<input type="number" class="captureTime" value="${data.captureTime}" ${isDisable? 'disabled': ''}>
<button class="update" data-id="${data._id}" ${isDisable? 'disabled': ''}>Update</button>
<button class="delete" data-id="${data._id}" ${isDisable? 'disabled': ''}>Delete</button>`
    catches.appendChild(divElem);
}


async function addCatch(event) {
    event.preventDefault();
    let data = new FormData(catchForm)
    let newUser = {
        _ownerId: user.id,
        angler: data.get('angler'),
        weight: data.get('weight'),
        species: data.get('species'),
        location: data.get('location'),
        bait: data.get('bait'),
        captureTime: data.get('captureTime')
    }

    let makeCatch = await fetch('http://localhost:3030/data/catches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.token
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(r => {
            let id = r._id;
            newUser['_id'] = id;
            createElements(newUser);
        })
    catchForm.reset()
}