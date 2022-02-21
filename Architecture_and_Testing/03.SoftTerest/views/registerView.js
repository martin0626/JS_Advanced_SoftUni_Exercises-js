import { register } from "../tools/api.js";
import { showView } from "./showView.js";

export function registerForm() {
    let registerElem = document.querySelector('#register form');
    registerElem.addEventListener('submit', funcReg)
    document.querySelector('#register > div > form > div:nth-child(6) > p > a').addEventListener('click', signIn)
}

async function funcReg(event) {
    event.preventDefault();
    let registerElem = document.querySelector('#register form');
    let data = new FormData(registerElem);

    let email = data.get('email');
    let pass = data.get('password');
    let rePass = data.get('repeatPassword');

    if (email.length >= 3 && pass.length >= 3 && rePass == pass) {
        let userData = {
            email: email,
            password: pass
        }
        await register(userData);
        showView('home');
        registerElem.reset();

    } else {
        alert('Invalid Password or Email!')
    }
}

function signIn(event) {
    event.preventDefault();
    showView('login')
}