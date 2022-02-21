function solve() {
    let inputForm = document.querySelector('form');
    let loadBooksBtn = document.getElementById('loadBooks');


    loadBooksBtn.addEventListener('click', load);
    inputForm.addEventListener('submit', formFunc);

    function formFunc(e) {
        e.preventDefault();

        let data = new FormData(inputForm);
        let author = data.get('author');
        let title = data.get('title');

        if (author != '' && title != '') {
            fetch('http://localhost:3030/jsonstore/collections/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "author": author,
                    "title": title
                })
            }).then(load()).catch(error => {
                console.log(error);
            })

            inputForm.reset()
        }
    }


    async function load() {
        let tableBody = document.querySelector('tbody');
        Array.from(tableBody.children).forEach(el => el.remove());
        await fetch('http://localhost:3030/jsonstore/collections/books')
            .then(res => res.json())
            .then(books => {
                Object.keys(books).forEach(key => {

                    let tableRow = document.createElement('tr');
                    tableRow.id = key;

                    let titleCol = document.createElement('td');
                    titleCol.textContent = books[key].title;
                    tableRow.appendChild(titleCol);

                    let authorCol = document.createElement('td');
                    authorCol.textContent = books[key].author;
                    tableRow.appendChild(authorCol);


                    let actionCol = document.createElement('td');

                    let deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete'
                    deleteBtn.addEventListener('click', deleteElem);

                    let editBtn = document.createElement('button');
                    editBtn.textContent = 'Edit'
                    editBtn.addEventListener('click', edit);

                    actionCol.appendChild(editBtn);
                    actionCol.appendChild(deleteBtn);
                    tableRow.appendChild(actionCol);

                    tableBody.appendChild(tableRow);
                })
            })
    }

    async function edit(event) {
        let parent = event.target.parentNode.parentNode;
        let id = parent.id
        let saveFormElement = saveFormCreator();

        let getBook = await fetch(`http://localhost:3030/jsonstore/collections/books/${parent.id}`)
        let book = await getBook.json();

        saveFormElement.querySelector('input[name="title"]').value = book.title;
        saveFormElement.querySelector('input[name="author"]').value = book.author;

        saveFormElement.addEventListener('submit', (e) => {
            e.preventDefault()
            let data = new FormData(saveFormElement);
            let name = data.get('title');
            let author = data.get('author');
            if (name != '' && author != '') {
                (async() => {
                    await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "author": author,
                            "title": name
                        })
                    }).catch(error => {
                        console.log(error);
                    })
                })().then(res => {
                    load()
                }).catch(error => {
                    console.log(error);
                })

                saveFormElement.remove()
                inputForm.style.display = 'block';
            }

        })



    }

    function deleteElem(event) {
        let parent = event.target.parentNode.parentNode;

        fetch(`http://localhost:3030/jsonstore/collections/books/${parent.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        parent.remove();
    }

    function saveFormCreator() {
        let cloneForm = inputForm.cloneNode(true);
        cloneForm.querySelector('h3').textContent = 'Edit FORM';
        cloneForm.querySelector('button').remove();
        let saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        cloneForm.appendChild(saveBtn);
        inputForm.style.display = 'none';
        document.querySelector('body').appendChild(cloneForm);
        return cloneForm;
    }


}

solve()