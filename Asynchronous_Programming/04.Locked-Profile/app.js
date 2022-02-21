function lockedProfile() {
    let mainElement = document.getElementById('main');

    (async() => {
        let res = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
        let users = await res.json();


        Object.keys(users).forEach((key, i) => {
            let user = users[key];
            mainElement.appendChild(createUserBox(i + 1, user.username, user.email, user.age))
        })
    })()


    function createUserBox(id, username, email, age) {
        let parentDiv = createElementsFunc('div', '', 'profile');

        let imgElem = document.createElement('img');
        imgElem.src = './iconProfile2.png';
        imgElem.classList.add('userIcon');


        let lockLabel = createElementsFunc('label', 'Lock');

        let lockRadioBtn = createElementsFunc('input', '');
        lockRadioBtn.type = 'radio';
        lockRadioBtn.name = `user${id}Locked`;
        lockRadioBtn.value = 'lock';
        lockRadioBtn.checked = true;


        let unlockLabel = createElementsFunc('label', 'Unlock');

        let unlockRadioBtn = createElementsFunc('input', '');
        unlockRadioBtn.type = 'radio';
        unlockRadioBtn.name = `user${id}Locked`;
        unlockRadioBtn.value = 'unlock';
        unlockRadioBtn.checked = false;

        let firstHr = createElementsFunc('hr', '');

        let usernameLabe = createElementsFunc('label', 'Username:');

        let usernameInput = createElementsFunc('input', '');
        usernameInput.type = 'text';
        usernameInput.name = `user${id}Username`;
        usernameInput.value = username;
        usernameInput.disabled = true;
        usernameInput.readOnly = true;

        let hiddenElementsDiv = createElementsFunc('div', '');
        hiddenElementsDiv.id = `user${id}HiddenFields`;

        let secondHr = document.createElement('hr');
        hiddenElementsDiv.appendChild(secondHr);

        let emailLabel = createElementsFunc('label', 'Email:');
        hiddenElementsDiv.appendChild(emailLabel);


        let emailInput = createElementsFunc('input', '');
        emailInput.type = 'email';
        emailInput.name = `user${id}Email`;
        emailInput.value = email;
        emailInput.disabled = true;
        emailInput.readOnly = true;
        hiddenElementsDiv.appendChild(emailInput);



        let ageLabel = createElementsFunc('label', 'Age:');
        hiddenElementsDiv.appendChild(ageLabel);


        let ageInput = createElementsFunc('input', '');
        ageInput.type = 'email';
        ageInput.name = `user${id}Age`;
        ageInput.value = age;
        ageInput.disabled = true;
        hiddenElementsDiv.appendChild(ageInput);
        ageInput.readOnly = true;

        let showBtn = createElementsFunc('button', 'Show more');
        showBtn.addEventListener('click', showHide.bind(null, hiddenElementsDiv, lockRadioBtn));

        parentDiv.appendChild(imgElem);
        parentDiv.appendChild(lockLabel);
        parentDiv.appendChild(lockRadioBtn);
        parentDiv.appendChild(unlockLabel);
        parentDiv.appendChild(unlockRadioBtn);
        parentDiv.appendChild(firstHr);
        parentDiv.appendChild(usernameLabe);
        parentDiv.appendChild(usernameInput);
        parentDiv.appendChild(hiddenElementsDiv);
        parentDiv.appendChild(showBtn);

        return parentDiv;
    }

    function showHide(area, lockBtn) {

        if (lockBtn.checked) {
            return
        }
        let btn = area.parentNode.querySelector('button')
        btn.textContent = btn.textContent == 'Show more' ? 'Show less' : 'Show more';

        area.style.display == 'block' ?
            area.style.display = 'none' :
            area.style.display = 'block';
    }


    function createElementsFunc(typeElem, textContent, classElem = null) {
        let elem = document.createElement(typeElem);

        if (textContent != '') {
            elem.textContent = textContent;
        }

        if (classElem) {
            elem.classList.add(classElem);
        }

        return elem
    }
}