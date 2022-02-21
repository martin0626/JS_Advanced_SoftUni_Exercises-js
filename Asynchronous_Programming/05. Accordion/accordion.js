function solution() {

    let resultElem = document.getElementById('main');


    (async() => {
        let resId = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
        let idObjects = await resId.json();

        Object.keys(idObjects).forEach(key => {
            resultElem.appendChild(createElements(idObjects[key].title, idObjects[key]._id));
        })


    })()



    function createElements(title, id) {
        let parentDiv = document.createElement('div');
        parentDiv.className = 'accordion';


        let headDiv = document.createElement('div');
        headDiv.className = 'head';
        parentDiv.appendChild(headDiv);

        let titleSpan = document.createElement('span');
        titleSpan.textContent = title;
        headDiv.appendChild(titleSpan);

        let btnElem = document.createElement('button');
        btnElem.className = 'button';
        btnElem.id = id;
        btnElem.textContent = 'More'
        headDiv.appendChild(btnElem);

        let bodyDiv = document.createElement('div');
        bodyDiv.className = 'extra';
        parentDiv.appendChild(bodyDiv);

        btnElem.addEventListener('click', showMoreBtn)

        return parentDiv;
    }


    function showMoreBtn(e) {
        let parent = e.target.parentNode.parentNode;
        let bodyDiv = parent.querySelector('.extra');
        let id = e.target.id;



        let btn = parent.querySelector('button');

        if (btn.textContent === 'Less') {
            console.log(bodyDiv.querySelector('p'));
            bodyDiv.querySelector('p').remove()
        } else {
            (async() => {
                let res = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`);
                let cont = await res.json()
                let contentElem = document.createElement('p')
                contentElem.textContent = cont.content;
                bodyDiv.appendChild(contentElem)

            })()
        }

        bodyDiv.style.display = parent.querySelector('.extra').style.display === 'block' ? 'none' : 'block';
        btn.textContent = btn.textContent === 'More' ? 'Less' : 'More';




    }
}

solution();