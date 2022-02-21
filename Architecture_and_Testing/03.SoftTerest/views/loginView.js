import { login } from "../tools/api.js";
import { showView } from "./showView.js";


export function loginrForm() {
    let loginElem = document.querySelector('#login form');
    loginElem.addEventListener('submit', funcLogin)
    document.querySelector('#login > div > form > div:nth-child(4) > p > a').addEventListener('click', signUp)
}

async function funcLogin(event) {
    event.preventDefault();
    let loginElem = document.querySelector('#login form');
    let data = new FormData(loginElem);

    let email = data.get('email');
    let pass = data.get('password');

    if (email.length >= 3 && pass.length >= 3) {
        let userData = {
            email: email,
            password: pass
        }

        await login(userData);
        showView('home');
        loginElem.reset();

    } else {
        alert('Invalid Password or Email!')
    }
}


function signUp(event) {
    event.preventDefault();
    showView('register')
}