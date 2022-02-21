import { checkStatus, clearView } from "./ajust.js";
import { load } from "./loadAllMovies.js";
import { showMovies } from "./movies.js";

let regForm = document.getElementById('form-sign-up');

export function showRegister() {
    clearView();
    regForm.style.display = 'block';
    let registerBtn = regForm.querySelector('button');

    registerBtn.addEventListener('click', registerFunctionality)

}

async function registerFunctionality(event) {
    event.preventDefault();
    let form = event.target.parentNode;

    let data = new FormData(form);

    let email = data.get('email');
    let password = data.get('password');
    let rep = data.get('repeatPassword');

    if (email != '' && password.length >= 6 && rep === password) {
        try {
            let reg = await fetch('http://localhost:3030/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            if (!reg.ok) {
                throw Error;
            }

            let result = await reg.json();
            let userInfo = {
                email: result.email,
                token: result.accessToken,
                id: result._id
            }
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
            checkStatus();
            showMovies();
            load();
            form.reset();

        } catch (error) {
            alert('Email already exist!')
        }
    } else {
        alert('Invalid Email or Password!')
    }

}