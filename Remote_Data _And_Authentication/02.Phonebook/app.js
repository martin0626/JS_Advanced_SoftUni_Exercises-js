function attachEvents() {
    let personElem = document.getElementById('person');
    let phoneElem = document.getElementById('phone');
    let phonebookElem = document.getElementById('phonebook');
    let loadBtn = document.getElementById('btnLoad');
    let createBtn = document.getElementById('btnCreate');

    loadBtn.addEventListener('click', load);
    createBtn.addEventListener('click', post);


    async function load() {
        Array.from(phonebookElem.children).forEach(el => el.remove());
        let res = await fetch('http://localhost:3030/jsonstore/phonebook');
        let peopleList = await res.json();

        Object.keys(peopleList).forEach(key => {


            let liElement = document.createElement('li');
            liElement.textContent = peopleList[key].person + ': ' + peopleList[key].phone;
            liElement.id = key;

            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', (e) => {
                e.currentTarget.parentNode.remove();

                fetch(`http://localhost:3030/jsonstore/phonebook/${key}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            })

            liElement.appendChild(deleteBtn);
            phonebookElem.appendChild(liElement)
        })
    }

    async function post() {
        let postPerson = fetch('http://localhost:3030/jsonstore/phonebook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'person': personElem.value,
                    'phone': phoneElem.value
                })
            }).then(load())
            .catch(error => console.log(error));

        personElem.value = '';
        phoneElem.value = '';
    }

}

attachEvents();