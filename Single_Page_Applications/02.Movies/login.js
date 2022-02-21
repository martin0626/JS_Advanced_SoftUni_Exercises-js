import { checkStatus, clearView } from "./ajust.js";
import { load } from "./loadAllMovies.js";
import { showMovies } from "./movies.js";

export function showLogin() {
    clearView();
    let loginForm = document.getElementById('form-login');
    loginForm.style.display = 'block';
    let loginBtn = loginForm.querySelector('button');
    loginBtn.addEventListener('click', logFunctionality);
}


async function logFunctionality(event) {
    event.preventDefault();

    let form = event.target.parentNode;

    let data = new FormData(form);

    let email = data.get('email');
    let password = data.get('password');


    if (email != '') {
        try {
            let reg = await fetch('http://localhost:3030/users/login', {
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
            form.reset();
            load();

        } catch (error) {
            alert('Incorrect Email or Password!')
        }
    } else {
        alert('Invalid Email or Password!')
    }
}